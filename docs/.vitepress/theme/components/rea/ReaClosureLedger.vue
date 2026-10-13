<script setup lang="ts">
/**
 * 重建义务闭包判定器（交互式）
 *
 * 求值逻辑全部来自 useClosureLedger.ts —— 那是 morluto/rea @ 70611713e 的忠实移植。
 * 本组件只负责「可操纵的条件」与「求值结果的可见差异」，不重复实现任何判定规则。
 *
 * 对应源码：
 * - src/application/ReconstructionObligationLedgerEvaluation.ts（义务级诊断与 status）
 * - src/domain/reconstructionObligationLedgerIntegrity.ts（台账级 status 与 summary）
 * - src/application/ReconstructionObligationLedgerService.ts（CLI 与 MCP 共用的同一个 workflow）
 */
import { computed, ref } from 'vue'
import {
  DIAGNOSTIC_LABELS,
  LEDGER_STATUS_LABELS,
  STATUS_LABELS,
  evaluateLedger,
  type CaseKind,
  type ObligationInput,
  type ObligationStatus,
  type ProofAuthority
} from './useClosureLedger'

interface ToggleSpec {
  key: string
  label: string
  hint: string
}

interface ObligationSpec {
  id: string
  title: string
  source: string
  dependency: string
  toggles: ToggleSpec[]
  base: ObligationInput
}

/** 三条义务的字段值取自 docs/reconstruction-obligation-ledgers.md 的官方示例。 */
const SPECS: ObligationSpec[] = [
  {
    id: 'protocol.rpc.cancel',
    title: '取消在途请求并只发一个终态响应',
    source: 'reviewed_obligations · 协议处理器示例',
    dependency: '依赖 cli.config.invalid-option',
    toggles: [
      { key: 'bindingCount', label: '唯一 binding', hint: 'manifest 里恰好一条 binding 认领它' },
      { key: 'bindingHasParserType', label: 'parser / schema / domain type', hint: 'requires_parser_type = true' },
      { key: 'fixtures', label: '四类 fixture 齐备且权威性达标', hint: 'positive / negative / malformed / cancellation' },
      { key: 'verifier', label: 'verifier 通过', hint: '绑定、枚举本义务、结果 Evidence 在 bundle 中、状态 pass' },
      { key: 'originalAuthority', label: '原始权威性已观测', hint: 'required_original_authority = external' }
    ],
    base: {
      id: 'protocol.rpc.cancel',
      title: '取消在途请求并只发一个终态响应',
      layer: 'protocol',
      required: true,
      bindingCount: 1,
      requiresParserType: true,
      bindingHasParserType: true,
      requiredCaseKinds: ['positive', 'negative', 'malformed', 'cancellation'],
      fixtureKinds: ['positive', 'negative', 'malformed', 'cancellation'],
      fixtureAuthorityOk: true,
      fixtureEvidenceOk: true,
      verifierPresent: true,
      verifierEnumerates: true,
      verifierResultEvidencePresent: true,
      verifierAuthority: 'protocol',
      requiredVerifierAuthority: 'protocol',
      verifierStatus: 'pass',
      originalAuthoritySatisfied: true,
      requiredOriginalAuthority: 'external',
      definitionCount: 1,
      residualUnknownIds: [],
      unavailableAuthority: [],
      contradicted: false,
      disposition: 'active',
      dependencyIds: ['cli.config.invalid-option'],
      knownObligationIds: ['protocol.rpc.cancel', 'cli.config.invalid-option', 'electron.background.startup']
    }
  },
  {
    id: 'cli.config.invalid-option',
    title: '用受支持的 CLI 错误拒绝非法配置项',
    source: 'reviewed_obligations · CLI 解析示例',
    dependency: '无',
    toggles: [
      { key: 'bindingCount', label: '唯一 binding', hint: '0 条 = missing-owner，2 条 = ambiguous-owner' },
      { key: 'bindingHasParserType', label: 'parser / schema / domain type', hint: 'requires_parser_type = true' },
      { key: 'fixtures', label: '三类 fixture 齐备且权威性达标', hint: 'positive / negative / malformed' },
      { key: 'verifier', label: 'verifier 通过', hint: '缺结果 Evidence 或非 pass 都会留下 diagnostic' },
      { key: 'originalAuthority', label: '原始权威性已观测', hint: 'required_original_authority = process' }
    ],
    base: {
      id: 'cli.config.invalid-option',
      title: '用受支持的 CLI 错误拒绝非法配置项',
      layer: 'cli',
      required: true,
      bindingCount: 1,
      requiresParserType: true,
      bindingHasParserType: true,
      requiredCaseKinds: ['positive', 'negative', 'malformed'],
      fixtureKinds: ['positive', 'negative', 'malformed'],
      fixtureAuthorityOk: true,
      fixtureEvidenceOk: true,
      verifierPresent: true,
      verifierEnumerates: true,
      verifierResultEvidencePresent: true,
      verifierAuthority: 'packaged-process',
      requiredVerifierAuthority: 'packaged-process',
      verifierStatus: 'pass',
      originalAuthoritySatisfied: true,
      requiredOriginalAuthority: 'process',
      definitionCount: 1,
      residualUnknownIds: [],
      unavailableAuthority: [],
      contradicted: false,
      disposition: 'active',
      dependencyIds: [],
      knownObligationIds: ['protocol.rpc.cancel', 'cli.config.invalid-option', 'electron.background.startup']
    }
  },
  {
    id: 'electron.background.startup',
    title: '先启动后台进程，再暴露 renderer bridge',
    source: 'reviewed_obligations · Electron 启动示例',
    dependency: '无',
    toggles: [
      { key: 'bindingCount', label: '唯一 binding', hint: '0 条 = missing-owner' },
      { key: 'bindingHasParserType', label: 'parser / schema / domain type', hint: 'requires_parser_type = false，本项不影响判定' },
      { key: 'fixtures', label: '三类 fixture 齐备且权威性达标', hint: 'positive / negative / teardown' },
      { key: 'verifier', label: 'verifier 通过', hint: '权威性由 renderer 提供' },
      { key: 'originalAuthority', label: '原始权威性已观测', hint: 'required_original_authority = runtime' }
    ],
    base: {
      id: 'electron.background.startup',
      title: '先启动后台进程，再暴露 renderer bridge',
      layer: 'electron',
      required: true,
      bindingCount: 1,
      requiresParserType: false,
      bindingHasParserType: false,
      requiredCaseKinds: ['positive', 'negative', 'teardown'],
      fixtureKinds: ['positive', 'negative', 'teardown'],
      fixtureAuthorityOk: true,
      fixtureEvidenceOk: true,
      verifierPresent: true,
      verifierEnumerates: true,
      verifierResultEvidencePresent: true,
      verifierAuthority: 'renderer',
      requiredVerifierAuthority: 'renderer',
      verifierStatus: 'pass',
      originalAuthoritySatisfied: true,
      requiredOriginalAuthority: 'runtime',
      definitionCount: 1,
      residualUnknownIds: [],
      unavailableAuthority: [],
      contradicted: false,
      disposition: 'active',
      dependencyIds: [],
      knownObligationIds: ['protocol.rpc.cancel', 'cli.config.invalid-option', 'electron.background.startup']
    }
  }
]

const ALL_ON = SPECS.map((spec) => ({
  bindingCount: 1,
  bindingHasParserType: true,
  fixtures: true,
  verifier: true,
  originalAuthority: true
}))

type FlagKey = keyof (typeof ALL_ON)[number]

interface Fixture {
  id: string
  label: string
  goal: string
  /** 每条义务每个开关的状态。 */
  flags: Record<string, Record<FlagKey, boolean>>
  /** 对单条义务的额外改写，用来制造 source 里真实存在的失败模式。 */
  patch?: (input: ObligationInput) => ObligationInput
}

const FIXTURES: Fixture[] = [
  {
    id: 'all-pass',
    label: '正常 · 全部闭合',
    goal: '三条 required 义务都拿到唯一 owner、齐备 fixture、达标 verifier，台账应判定为可闭合。',
    flags: {
      'protocol.rpc.cancel': { ...ALL_ON[0]! },
      'cli.config.invalid-option': { ...ALL_ON[1]! },
      'electron.background.startup': { ...ALL_ON[2]! }
    }
  },
  {
    id: 'authority-lie',
    label: '边界 · 单元测试冒充打包进程',
    goal:
      '把 cli.config.invalid-option 的 verifier 权威性降级为 unit。required 是 packaged-process，' +
      '而 proofAuthoritySatisfies 不接受 —— 于是该义务退回 implemented，它的依赖者被判 blocked。',
    flags: {
      'protocol.rpc.cancel': { ...ALL_ON[0]! },
      'cli.config.invalid-option': { ...ALL_ON[1]! },
      'electron.background.startup': { ...ALL_ON[2]! }
    },
    patch: (input) =>
      input.id === 'cli.config.invalid-option'
        ? { ...input, verifierAuthority: 'unit' as ProofAuthority, fixtureAuthorityOk: false, fixtureEvidenceOk: false }
        : input
  },
  {
    id: 'no-owner',
    label: '边界 · 无人认领',
    goal: '撤掉一条义务的 manifest binding。没有 binding 就没有 binding 内的判定，status 直接落到 unowned。',
    flags: {
      'protocol.rpc.cancel': { ...ALL_ON[0]! },
      'cli.config.invalid-option': { ...ALL_ON[1]!, bindingCount: false },
      'electron.background.startup': { ...ALL_ON[2]! }
    }
  },
  {
    id: 'contradiction',
    label: '失败 · 证据自相矛盾',
    goal:
      '给 electron.background.startup 记一条矛盾，并让其 verifier 失败。' +
      '台账级判定里，required 义务出现 contradicted 或 verifier-failed 直接判 failed。',
    flags: {
      'protocol.rpc.cancel': { ...ALL_ON[0]! },
      'cli.config.invalid-option': { ...ALL_ON[1]! },
      'electron.background.startup': { ...ALL_ON[2]!, verifier: false }
    },
    patch: (input) => (input.id === 'electron.background.startup' ? { ...input, contradicted: true } : input)
  },
  {
    id: 'unknown',
    label: '失败 · 残留未知使状态不可知',
    goal:
      '保留一条未知项并撤掉 owner。unknown 的优先级高于 unowned，' +
      '台账级遇到 required 义务为 unknown 时判 unknown 而不是 open。',
    flags: {
      'protocol.rpc.cancel': { ...ALL_ON[0]! },
      'cli.config.invalid-option': { ...ALL_ON[1]! },
      'electron.background.startup': { ...ALL_ON[2]!, bindingCount: false }
    },
    patch: (input) =>
      input.id === 'electron.background.startup' ? { ...input, residualUnknownIds: ['uk_renderer_bridge_order'] } : input
  }
]

const flags = ref<Record<string, Record<FlagKey, boolean>>>(structuredClone(FIXTURES[0]!.flags))
const extra = ref<Record<string, Partial<ObligationInput>>>({})
const activeFixture = ref(FIXTURES[0]!.id)

const inputs = computed<ObligationInput[]>(() =>
  SPECS.map((spec, index) => {
    const flag = flags.value[spec.id] ?? ALL_ON[index]!
    const base = spec.base
    const patched = FIXTURES.find((fixture) => fixture.id === activeFixture.value)?.patch?.(base) ?? base
    const fixtureKinds: readonly CaseKind[] = flag.fixtures ? patched.requiredCaseKinds : []
    return {
      ...patched,
      ...(extra.value[spec.id] ?? {}),
      bindingCount: flag.bindingCount ? patched.bindingCount : 0,
      bindingHasParserType: flag.bindingHasParserType ? patched.bindingHasParserType : false,
      fixtureKinds,
      fixtureAuthorityOk: flag.fixtures ? patched.fixtureAuthorityOk : false,
      fixtureEvidenceOk: flag.fixtures ? patched.fixtureEvidenceOk : false,
      verifierPresent: flag.verifier ? patched.verifierPresent : false,
      verifierEnumerates: flag.verifier ? patched.verifierEnumerates : false,
      verifierResultEvidencePresent: flag.verifier ? patched.verifierResultEvidencePresent : false,
      verifierStatus: flag.verifier ? patched.verifierStatus : 'unknown',
      originalAuthoritySatisfied: flag.originalAuthority ? patched.originalAuthoritySatisfied : false
    }
  })
)

const result = computed(() => evaluateLedger(inputs.value))

function applyFixture(fixture: Fixture): void {
  activeFixture.value = fixture.id
  flags.value = structuredClone(fixture.flags)
  extra.value = {}
}

function toggle(spec: ObligationSpec, key: FlagKey): void {
  const current = flags.value[spec.id]
  if (!current) return
  flags.value = {
    ...flags.value,
    [spec.id]: { ...current, [key]: !current[key] }
  }
}

function resetAll(): void {
  applyFixture(FIXTURES[0]!)
}

const rows = computed(() =>
  result.value.obligations.map((evaluated) => ({
    spec: SPECS.find((s) => s.id === evaluated.input.id)!,
    evaluated,
    flagsForSpec: flags.value[evaluated.input.id] ?? {}
  }))
)

const staticTranscript = computed(() =>
  result.value.obligations
    .map((evaluated) => {
      const codes = evaluated.diagnostics.length
        ? evaluated.diagnostics.map((d) => `${d.code}（${DIAGNOSTIC_LABELS[d.code]}）`).join('；')
        : '无'
      return `${evaluated.input.id}：status=${evaluated.status}（${STATUS_LABELS[evaluated.status]}）；diagnostics=${codes}`
    })
    .join('\n')
)

const STATUS_HINT: Record<ObligationStatus, string> = {
  verified: '没有 diagnostic，且恰好一个 binding —— 这是唯一能让台账计入 required_open = 0 的义务级状态。',
  implemented: 'binding 在手，但仍有 diagnostic 没解决。它没有依赖者时不会阻塞别人，自己却也让台账开不了口。',
  unowned: 'binding 数量为 0。源码在 binding 为 null 时根本不进入 binding 内的判定分支。',
  unknown: '重复定义、残留未知或权威性不可用，三者之一成立即落到这里，优先级高于 unowned。',
  contradicted: 'manifest 记录了矛盾。台账级看到 required 义务 contradicted 直接判 failed。',
  blocked: '自身处置被标记，或依赖者未验证 / 不存在而触发的降级。',
  'out-of-scope': '评审把它划到范围外。它仍然出现在台账里，不算已验证。',
  characterized: '源码枚举里有这个状态，但 obligationStatus() 不会返回它。'
}
</script>

<template>
  <section class="rc" aria-labelledby="rc-title">
    <h3 id="rc-title" class="rc-title">交互 · 重建义务闭包判定器</h3>
    <p class="rc-lead">
      下面每一条义务的判定，都由 REA 源码里的同一组函数算出。关掉某个条件，对应的
      <code>diagnostic</code> 就会出现在同一条义务上；改变一条义务的状态，它的依赖者会在同一轮不动点迭代里被改写。
      台账顶部的判定不是标签，是 <code>reconstructionObligationLedgerStatus()</code> 的返回值。
    </p>

    <div class="rc-fixtures" role="group" aria-label="夹具预设">
      <span class="rc-fixtures-label">夹具</span>
      <button
        v-for="fixture in FIXTURES"
        :key="fixture.id"
        type="button"
        class="rc-fixture"
        :class="{ active: activeFixture === fixture.id }"
        :aria-pressed="activeFixture === fixture.id"
        @click="applyFixture(fixture)"
      >
        {{ fixture.label }}
      </button>
      <button type="button" class="rc-reset" @click="resetAll">重置</button>
    </div>

    <p class="rc-goal">
      <strong>这个夹具想让你看到：</strong>{{ FIXTURES.find((f) => f.id === activeFixture)?.goal }}
    </p>

    <div class="rc-verdict" :data-status="result.status">
      <div class="rc-verdict-main">
        <span class="rc-verdict-label">台账判定</span>
        <strong class="rc-verdict-value">{{ LEDGER_STATUS_LABELS[result.status] }}</strong>
        <code class="rc-verdict-code">{{ result.status }}</code>
      </div>
      <dl class="rc-summary">
        <div><dt>义务总数</dt><dd>{{ result.summary.total }}</dd></div>
        <div><dt>required</dt><dd>{{ result.summary.required }}</dd></div>
        <div><dt>verified</dt><dd>{{ result.summary.verified }}</dd></div>
        <div><dt>required 未闭合</dt><dd>{{ result.summary.requiredOpen }}</dd></div>
        <div><dt>依赖迭代轮数</dt><dd>{{ result.passes }}</dd></div>
      </dl>
    </div>

    <ol class="rc-list">
      <li v-for="row in rows" :key="row.spec.id" class="rc-item">
        <div class="rc-item-head">
          <div>
            <p class="rc-item-id"><code>{{ row.spec.id }}</code></p>
            <p class="rc-item-title">{{ row.spec.title }}</p>
          </div>
          <span class="rc-status" :data-status="row.evaluated.status">
            {{ STATUS_LABELS[row.evaluated.status] }}
          </span>
        </div>
        <p class="rc-item-meta">
          layer <code>{{ row.evaluated.input.layer }}</code> · 依赖：{{ row.spec.dependency }} ·
          来源：{{ row.spec.source }}
        </p>

        <div class="rc-toggles" role="group" :aria-label="`${row.spec.id} 的闭包条件`">
          <div v-for="toggleSpec in row.spec.toggles" :key="toggleSpec.key" class="rc-toggle-cell">
            <button
              type="button"
              class="rc-toggle"
              :class="{ on: row.flagsForSpec[toggleSpec.key as FlagKey] }"
              :aria-pressed="row.flagsForSpec[toggleSpec.key as FlagKey]"
              @click="toggle(row.spec, toggleSpec.key as FlagKey)"
            >
              <span class="rc-toggle-mark" aria-hidden="true">{{ row.flagsForSpec[toggleSpec.key as FlagKey] ? '✓' : '×' }}</span>
              {{ toggleSpec.label }}
            </button>
            <span v-if="!row.flagsForSpec[toggleSpec.key as FlagKey]" class="rc-hint">{{ toggleSpec.hint }}</span>
          </div>
        </div>

        <div class="rc-diag">
          <p class="rc-diag-head">
            diagnostics
            <span class="rc-count" :class="{ zero: row.evaluated.diagnostics.length === 0 }">
              {{ row.evaluated.diagnostics.length }}
            </span>
          </p>
          <p v-if="row.evaluated.diagnostics.length === 0" class="rc-diag-none">
            无 diagnostic —— 这是 status 能变成 <code>verified</code> 的唯一方式。
          </p>
          <ul v-else class="rc-diag-list">
            <li v-for="diagnostic in row.evaluated.diagnostics" :key="diagnostic.code">
              <code>{{ diagnostic.code }}</code>
              <span>{{ DIAGNOSTIC_LABELS[diagnostic.code] }}</span>
            </li>
          </ul>
          <p class="rc-diag-why">{{ STATUS_HINT[row.evaluated.status] }}</p>
        </div>
      </li>
    </ol>

    <details class="rc-static">
      <summary>静态等价：本次判定的完整文字记录（不需要运行任何脚本）</summary>
      <pre class="rc-pre">{{ staticTranscript }}</pre>
      <p class="rc-static-note">
        上面这段文字与上方视图是同一次求值的结果。如果脚本没有执行，这一段仍然是可读的判定依据；
        只是它不再随开关变化。判定顺序以源码 <code>obligationStatus()</code> 的 if 短路为准：
        out-of-scope → blocked → contradicted → unknown → unowned → verified → implemented。
      </p>
    </details>

    <p class="rc-source">
      求值逻辑移植自
      <a href="https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/application/ReconstructionObligationLedgerEvaluation.ts">
        <code>ReconstructionObligationLedgerEvaluation.ts</code>
      </a>
      与
      <a href="https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/domain/reconstructionObligationLedgerIntegrity.ts">
        <code>reconstructionObligationLedgerIntegrity.ts</code>
      </a>。
    </p>
  </section>
</template>

<style scoped>
.rc { margin: 2rem 0; padding: 1.25rem 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.rc-title { margin: 0 0 .5rem; font-size: 1.1rem; font-weight: 700; }
.rc-lead { margin: 0 0 1rem; font-size: .92rem; color: var(--vp-c-text-2); line-height: 1.65; }
.rc-fixtures { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-bottom: .75rem; }
.rc-fixtures-label { font-size: .78rem; color: var(--vp-c-text-3); margin-right: .25rem; }
.rc-fixture, .rc-reset { font: inherit; font-size: .82rem; padding: .35rem .75rem; border-radius: 999px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-2); cursor: pointer; }
.rc-fixture:hover, .rc-reset:hover { border-color: var(--vp-c-brand); }
.rc-fixture.active { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: var(--vp-c-white); font-weight: 600; }
.rc-reset { margin-left: auto; }
.rc-goal { margin: 0 0 1rem; font-size: .88rem; line-height: 1.6; color: var(--vp-c-text-2); background: var(--vp-c-bg); border-left: 3px solid var(--vp-c-brand); padding: .6rem .85rem; border-radius: 0 8px 8px 0; }
.rc-verdict { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; align-items: center; justify-content: space-between; padding: .85rem 1.1rem; border-radius: 10px; margin-bottom: 1.25rem; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); }
.rc-verdict-main { display: flex; align-items: baseline; gap: .6rem; }
.rc-verdict-label { font-size: .8rem; color: var(--vp-c-text-3); }
.rc-verdict-value { font-size: 1.25rem; font-weight: 700; }
.rc-verdict-code { font-size: .8rem; color: var(--vp-c-text-3); }
.rc-verdict[data-status='ready'] { border-color: var(--vp-c-green-1, #16a34a); }
.rc-verdict[data-status='failed'] { border-color: var(--vp-c-danger-1, #dc2626); }
.rc-verdict[data-status='unknown'] { border-color: var(--vp-c-warning-1, #d97706); }
.rc-summary { display: flex; flex-wrap: wrap; gap: .25rem 1.25rem; margin: 0; font-size: .82rem; }
.rc-summary div { display: flex; gap: .35rem; }
.rc-summary dt { color: var(--vp-c-text-3); }
.rc-summary dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
.rc-list { list-style: none; margin: 0; padding: 0; display: grid; gap: .85rem; }
.rc-item { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: .9rem 1.1rem; background: var(--vp-c-bg); }
.rc-item-head { display: flex; gap: 1rem; align-items: flex-start; justify-content: space-between; }
.rc-item-id { margin: 0; font-size: .82rem; }
.rc-item-title { margin: .15rem 0 0; font-size: .95rem; font-weight: 600; }
.rc-item-meta { margin: .4rem 0 .7rem; font-size: .78rem; color: var(--vp-c-text-3); }
.rc-status { flex: 0 0 auto; font-size: .78rem; font-weight: 700; padding: .2rem .6rem; border-radius: 999px; border: 1px solid var(--vp-c-divider); }
.rc-status[data-status='verified'] { color: var(--vp-c-green-1, #16a34a); border-color: currentColor; }
.rc-status[data-status='implemented'] { color: var(--vp-c-brand-1); border-color: currentColor; }
.rc-status[data-status='unowned'], .rc-status[data-status='unknown'] { color: var(--vp-c-warning-1, #d97706); border-color: currentColor; }
.rc-status[data-status='blocked'], .rc-status[data-status='contradicted'] { color: var(--vp-c-danger-1, #dc2626); border-color: currentColor; }
.rc-status[data-status='out-of-scope'], .rc-status[data-status='characterized'] { color: var(--vp-c-text-3); }
.rc-toggles { display: flex; flex-wrap: wrap; gap: .5rem; align-items: flex-start; }
.rc-toggle-cell { display: flex; flex-direction: column; gap: .2rem; max-width: 16rem; }
.rc-toggle { display: inline-flex; align-items: center; gap: .35rem; font: inherit; font-size: .78rem; padding: .3rem .6rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); cursor: pointer; align-self: flex-start; }
.rc-toggle:hover { border-color: var(--vp-c-brand); }
.rc-toggle.on { color: var(--vp-c-text-1); border-color: var(--vp-c-brand); background: var(--vp-c-brand-soft); }
.rc-toggle:focus-visible { outline: 2px solid var(--vp-c-brand); outline-offset: 1px; }
.rc-toggle-mark { font-weight: 700; }
.rc-toggle.on .rc-toggle-mark { color: var(--vp-c-brand-1); }
.rc-hint { font-size: .73rem; color: var(--vp-c-text-3); line-height: 1.5; padding-left: .2rem; }
.rc-diag { margin-top: .75rem; padding-top: .7rem; border-top: 1px dashed var(--vp-c-divider); }
.rc-diag-head { margin: 0 0 .4rem; font-size: .78rem; color: var(--vp-c-text-3); display: flex; align-items: center; gap: .4rem; }
.rc-count { display: inline-grid; place-items: center; min-width: 1.5em; padding: 0 .35em; border-radius: 999px; background: var(--vp-c-warning-soft, var(--vp-c-divider)); font-weight: 700; color: var(--vp-c-text-1); }
.rc-count.zero { background: var(--vp-c-brand-soft); }
.rc-diag-none { margin: 0; font-size: .8rem; color: var(--vp-c-text-2); }
.rc-diag-list { margin: 0; padding-left: 1.1rem; display: grid; gap: .25rem; font-size: .8rem; }
.rc-diag-list code { margin-right: .4rem; color: var(--vp-c-danger-1, #dc2626); }
.rc-diag-why { margin: .55rem 0 0; font-size: .78rem; color: var(--vp-c-text-2); line-height: 1.6; }
.rc-static { margin-top: 1rem; font-size: .85rem; }
.rc-static summary { cursor: pointer; font-weight: 600; }
.rc-pre { margin: .6rem 0 0; padding: .8rem; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); font-size: .76rem; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
.rc-static-note { margin: .5rem 0 0; font-size: .78rem; color: var(--vp-c-text-2); line-height: 1.65; }
.rc-source { margin: 1rem 0 0; font-size: .76rem; color: var(--vp-c-text-3); line-height: 1.6; }
@media (max-width: 640px) {
  .rc { padding: 1rem; }
  .rc-reset { margin-left: 0; }
  .rc-item-head { flex-direction: column; gap: .5rem; }
}
</style>