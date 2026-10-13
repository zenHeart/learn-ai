<script setup lang="ts">
/**
 * 证明权威性格（交互式）
 *
 * 数据来自 morluto/rea @ 70611713e 的 ReconstructionObligationAuthority.ts：
 * - proofAuthoritySatisfies() 的 accepted 表（第 33–59 行）
 * - proofEvidenceAuthorities 表（第 15–26 行）
 *
 * 这张表不是全序，这一点是本页要讲的核心机制之一：单元测试不能关掉一个打包进程的义务，
 * 但打包进程可以替单元测试背书。把它画成矩阵，是为了让读者亲手找到那几个不对称格子。
 */
import { computed, ref, shallowRef } from 'vue'
import {
  EVIDENCE_AUTHORITIES,
  PROOF_AUTHORITIES,
  PROOF_EVIDENCE_AUTHORITIES,
  proofAuthoritySatisfies,
  type EvidenceAuthority,
  type ProofAuthority
} from './useClosureLedger'

const ROW_LABEL = '要求 required（这条义务需要什么权威性）'
const COL_LABEL = '实际 actual（你手上这份证明是什么）'

/** 读起来更顺的中文别名；缺省时回落到源码里的英文标识。 */
const ZH: Readonly<Record<ProofAuthority, string>> = {
  unit: '单元',
  integration: '集成',
  protocol: '协议',
  renderer: '渲染进程',
  'packaged-process': '打包进程',
  'native-abi': '原生 ABI',
  'live-observation': '实况观测',
  external: '外部服务'
}

/** 列头用的两字短标签；完整英文标识在单元格的 aria-label 与静态等价表里。 */
const ZH_SHORT: Readonly<Record<ProofAuthority, string>> = {
  unit: '单元',
  integration: '集成',
  protocol: '协议',
  renderer: '渲染',
  'packaged-process': '打包',
  'native-abi': '原生',
  'live-observation': '实况',
  external: '外部'
}

const EVIDENCE_ZH: Readonly<Record<EvidenceAuthority, string>> = {
  'shipped-artifact': '出货产物',
  'controlled-replay': '受控重放',
  'historical-reference': '历史参考',
  'external-service': '外部服务',
  'analyst-inference': '分析师推断'
}

const required = shallowRef<ProofAuthority>('integration')
const actual = shallowRef<ProofAuthority>('unit')
const hovered = shallowRef<ProofAuthority | null>(null)

const accepts = (requiredLevel: ProofAuthority, actualLevel: ProofAuthority): boolean =>
  proofAuthoritySatisfies(actualLevel, requiredLevel)

const cellState = computed(() => (req: ProofAuthority, act: ProofAuthority): 'yes' | 'no' =>
  accepts(req, act) ? 'yes' : 'no'
)

const selected = computed(() => ({
  required: required.value,
  actual: actual.value,
  satisfies: accepts(required.value, actual.value),
  witnesses: PROOF_EVIDENCE_AUTHORITIES[actual.value],
  requiredWitnesses: PROOF_EVIDENCE_AUTHORITIES[required.value]
}))

/** 对称的格子数 —— 用来说明「它不是全序」这件事，而不是靠文字断言。 */
const asymmetry = computed(() => {
  const pairs: { a: ProofAuthority; b: ProofAuthority }[] = []
  for (const a of PROOF_AUTHORITIES) {
    for (const b of PROOF_AUTHORITIES) {
      if (a === b) continue
      if (accepts(b, a) !== accepts(a, b)) pairs.push({ a, b })
    }
  }
  return pairs
})

const rejectedAll = computed(() => PROOF_AUTHORITIES.filter((level) => !accepts(required.value, level)))

interface Fixture {
  id: string
  label: string
  note: string
  required: ProofAuthority
  actual: ProofAuthority
}

const FIXTURES: Fixture[] = [
  {
    id: 'unit-cannot-close-process',
    label: '边界 · 单元测试关不掉打包进程',
    note: 'required=packaged-process、actual=unit。源码的 accepted 表里 packaged-process 只接受 packaged-process 与 live-observation。',
    required: 'packaged-process',
    actual: 'unit'
  },
  {
    id: 'unit-accepts-everything',
    label: '边界 · 要求最低时什么都能顶',
    note: 'required=unit 时 accepted 表列出了全部八种权威性 —— 单元测试要求最松，任何更强的证明都算。',
    required: 'unit',
    actual: 'external'
  },
  {
    id: 'live-beats-native',
    label: '非对称 · 实况观测强于原生 ABI',
    note: 'required=native-abi、actual=live-observation 不被接受；但 required=live-observation、actual=native-abi 也不被接受。两格都红，说明这一对不可比，而不是单向覆盖。',
    required: 'native-abi',
    actual: 'live-observation'
  },
  {
    id: 'external-strict',
    label: '失败 · 外部服务只认外部服务',
    note: 'required=external 时 accepted 只有 external 一项。内部任何级别的证明都无法替代一次真实的外部服务观测。',
    required: 'external',
    actual: 'packaged-process'
  }
]

const activeFixture = shallowRef(FIXTURES[0]!.id)

function applyFixture(fixture: Fixture): void {
  activeFixture.value = fixture.id
  required.value = fixture.required
  actual.value = fixture.actual
}

function resetAll(): void {
  applyFixture(FIXTURES[0]!)
}

function onSelectRequired(event: Event): void {
  required.value = (event.target as HTMLSelectElement).value as ProofAuthority
  activeFixture.value = ''
}

function onSelectActual(event: Event): void {
  actual.value = (event.target as HTMLSelectElement).value as ProofAuthority
  activeFixture.value = ''
}
</script>

<template>
  <section class="ra" aria-labelledby="ra-title">
    <h3 id="ra-title" class="ra-title">交互 · 证明权威性格</h3>
    <p class="ra-lead">
      REA 用一张手写的接受表判断「这份证明配不配得上这条义务」。它故意<strong>不是</strong>全序：
      要求越具体，能顶上去的证明越少。下面这张矩阵每一格都是源码
      <code>proofAuthoritySatisfies()</code> 的一次真实求值。用方向键可以在格间移动。
    </p>

    <div class="ra-fixtures" role="group" aria-label="夹具预设">
      <span class="ra-fixtures-label">夹具</span>
      <button
        v-for="fixture in FIXTURES"
        :key="fixture.id"
        type="button"
        class="ra-fixture"
        :class="{ active: activeFixture === fixture.id }"
        :aria-pressed="activeFixture === fixture.id"
        @click="applyFixture(fixture)"
      >
        {{ fixture.label }}
      </button>
      <button type="button" class="ra-reset" @click="resetAll">重置</button>
    </div>

    <div class="ra-selects">
      <label class="ra-field">
        <span class="ra-field-label">要求 required</span>
        <select :value="required" @change="onSelectRequired">
          <option v-for="level in PROOF_AUTHORITIES" :key="level" :value="level">{{ ZH[level] }} · {{ level }}</option>
        </select>
      </label>
      <label class="ra-field">
        <span class="ra-field-label">实际 actual</span>
        <select :value="actual" @change="onSelectActual">
          <option v-for="level in PROOF_AUTHORITIES" :key="level" :value="level">{{ ZH[level] }} · {{ level }}</option>
        </select>
      </label>
    </div>

    <div class="ra-verdict" :data-ok="selected.satisfies">
      <p class="ra-verdict-line">
        <span class="ra-verdict-mark" aria-hidden="true">{{ selected.satisfies ? '✓' : '×' }}</span>
        <span>
          实际权威性 <code>{{ selected.actual }}</code>
          {{ selected.satisfies ? '满足' : '不满足' }}要求
          <code>{{ selected.required }}</code>
        </span>
      </p>
      <p class="ra-verdict-note">
        <template v-if="selected.satisfies">
          源码的 accepted 表在 required = <code>{{ selected.required }}</code> 这一行里列出了
          <code>{{ selected.actual }}</code>，因此这条义务的权威性要求得到满足。
        </template>
        <template v-else>
          required = <code>{{ selected.required }}</code> 时，accepted 表只接受
          <strong v-if="rejectedAll.length === PROOF_AUTHORITIES.length">（没有任何一种证明权威性）</strong>
          <template v-else>{{ rejectedAll.length }} 种中的特定几种</template>；<code>{{ selected.actual }}</code> 不在其中。
          源码随后会写下 <code>weak-verifier-authority</code> 或 <code>weak-fixture-authority</code>，
          义务就不会被计为 verified。
        </template>
      </p>
      <p class="ra-witness">
        <code>{{ selected.actual }}</code> 这类证明只能由这些 Evidence 权威性认证：
        <span v-for="authority in selected.witnesses" :key="authority" class="ra-chip">
          {{ EVIDENCE_ZH[authority] }} · <code>{{ authority }}</code>
        </span>
      </p>
    </div>

    <div class="ra-matrix-wrap">
      <table class="ra-matrix">
        <caption class="ra-caption">
          接受关系矩阵：{{ ROW_LABEL }}，{{ COL_LABEL }}。每格对应源码
          <code>accepted[required].includes(actual)</code> 的一次求值。
        </caption>
        <thead>
          <tr>
            <th scope="col" class="ra-corner">required ↓<br />actual →</th>
            <th v-for="level in PROOF_AUTHORITIES" :key="`h-${level}`" scope="col" class="ra-col-head" :title="level">
              {{ ZH_SHORT[level] }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowLevel in PROOF_AUTHORITIES" :key="`r-${rowLevel}`">
            <th scope="row" class="ra-row-head">
              <span class="ra-head-zh">{{ ZH[rowLevel] }}</span>
              <code>{{ rowLevel }}</code>
            </th>
            <td
              v-for="colLevel in PROOF_AUTHORITIES"
              :key="`c-${rowLevel}-${colLevel}`"
              class="ra-cell"
              :data-state="cellState(rowLevel, colLevel)"
              :class="{
                selected: required === rowLevel && actual === colLevel,
                hovered: hovered === colLevel
              }"
              tabindex="0"
              role="button"
              :aria-label="`${colLevel} 是否满足要求 ${rowLevel}：${cellState(rowLevel, colLevel) === 'yes' ? '是' : '否'}`"
              :aria-pressed="required === rowLevel && actual === colLevel"
              @click="required = rowLevel; actual = colLevel; activeFixture = ''"
              @keydown.enter.prevent="required = rowLevel; actual = colLevel; activeFixture = ''"
              @keydown.space.prevent="required = rowLevel; actual = colLevel; activeFixture = ''"
              @focus="hovered = colLevel"
              @blur="hovered = null"
            >
              <span class="ra-cell-mark" aria-hidden="true">{{ cellState(rowLevel, colLevel) === 'yes' ? '·' : '' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="ra-note">
      <strong>着色并带点的格子代表「被接受」</strong>，空白格子代表不接受。对角线全部着色，因为任何权威性都满足自己；
      第一行（单元）整行着色，因为要求最低时任何更强的证明都算。
      全表共有 <strong>{{ asymmetry.length }}</strong> 个格子与它的转置格结论相反 —— 也就是说这张表不是全序，
      「更强的证明」在这里不是一个单一序关系上的概念。
    </p>

    <details class="ra-static">
      <summary>静态等价：接受表全文（不需要运行任何脚本）</summary>
      <table class="ra-text-table">
        <thead>
          <tr><th scope="col">required</th><th scope="col">接受哪些 actual</th><th scope="col">可认证它的 Evidence 权威性</th></tr>
        </thead>
        <tbody>
          <tr v-for="level in PROOF_AUTHORITIES" :key="`t-${level}`">
            <th scope="row"><code>{{ level }}</code><br /><span class="ra-head-zh">{{ ZH[level] }}</span></th>
            <td>
              <code v-for="candidate in PROOF_AUTHORITIES.filter((c) => accepts(level, c))" :key="candidate" class="ra-code-cell">{{ candidate }}</code>
            </td>
            <td>
              <code v-for="authority in PROOF_EVIDENCE_AUTHORITIES[level]" :key="authority" class="ra-code-cell">{{ authority }}</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="ra-static-note">
        Evidence 权威性全集共 {{ EVIDENCE_AUTHORITIES.length }} 种。
        注意 <code>historical-reference</code> 与 <code>analyst-inference</code> 不出现在任何一行的可认证列表里 ——
        历史材料和分析师推断都无法认证任何一种重建证明。
      </p>
    </details>

    <p class="ra-source">
      数据移植自
      <a href="https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/application/ReconstructionObligationAuthority.ts">
        <code>ReconstructionObligationAuthority.ts</code>
      </a>。
    </p>
  </section>
</template>

<style scoped>
.ra { margin: 2rem 0; padding: 1.25rem 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.ra-title { margin: 0 0 .5rem; font-size: 1.1rem; font-weight: 700; }
.ra-lead { margin: 0 0 1rem; font-size: .92rem; color: var(--vp-c-text-2); line-height: 1.65; }
.ra-fixtures { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-bottom: 1rem; }
.ra-fixtures-label { font-size: .78rem; color: var(--vp-c-text-3); }
.ra-fixture, .ra-reset { font: inherit; font-size: .82rem; padding: .35rem .75rem; border-radius: 999px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-2); cursor: pointer; }
.ra-fixture:hover, .ra-reset:hover { border-color: var(--vp-c-brand); }
.ra-fixture.active { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: var(--vp-c-white); font-weight: 600; }
.ra-reset { margin-left: auto; }
.ra-selects { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; }
.ra-field { display: flex; flex-direction: column; gap: .25rem; font-size: .8rem; }
.ra-field-label { color: var(--vp-c-text-3); }
.ra-field select { font: inherit; font-size: .85rem; padding: .35rem .5rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); min-width: 14rem; }
.ra-field select:focus-visible { outline: 2px solid var(--vp-c-brand); outline-offset: 1px; }
.ra-verdict { padding: .85rem 1.1rem; border-radius: 10px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); margin-bottom: 1.25rem; }
.ra-verdict[data-ok='true'] { border-color: var(--vp-c-green-1, #16a34a); }
.ra-verdict[data-ok='false'] { border-color: var(--vp-c-danger-1, #dc2626); }
.ra-verdict-line { margin: 0 0 .4rem; font-size: .95rem; font-weight: 600; display: flex; gap: .5rem; align-items: baseline; }
.ra-verdict-mark { font-weight: 700; }
.ra-verdict[data-ok='true'] .ra-verdict-mark { color: var(--vp-c-green-1, #16a34a); }
.ra-verdict[data-ok='false'] .ra-verdict-mark { color: var(--vp-c-danger-1, #dc2626); }
.ra-verdict-note { margin: 0 0 .5rem; font-size: .84rem; line-height: 1.65; color: var(--vp-c-text-2); }
.ra-witness { margin: 0; font-size: .8rem; color: var(--vp-c-text-3); display: flex; flex-wrap: wrap; gap: .35rem; align-items: center; }
.ra-chip { display: inline-block; padding: .1rem .45rem; border-radius: 4px; background: var(--vp-c-brand-soft); color: var(--vp-c-text-1); font-size: .76rem; }
.ra-matrix-wrap { overflow-x: auto; margin-bottom: .75rem; }
/* 低于这个宽度时改为横向平移，而不是把行头压成竖排单词。 */
.ra-matrix { border-collapse: separate; border-spacing: 3px; font-size: .74rem; min-width: 21.5rem; }
.ra-caption { caption-side: bottom; text-align: left; font-size: .78rem; color: var(--vp-c-text-3); padding-top: .6rem; line-height: 1.6; white-space: normal; }
.ra-corner { font-weight: 400; color: var(--vp-c-text-3); text-align: left; padding: .25rem .4rem; font-size: .7rem; line-height: 1.5; }
.ra-col-head { font-weight: 600; padding: .3rem .2rem; vertical-align: bottom; text-align: center; white-space: nowrap; font-size: .72rem; color: var(--vp-c-text-1); }
.ra-row-head { font-weight: 400; padding: .2rem .4rem .2rem .3rem; vertical-align: middle; text-align: left; width: 5rem; max-width: 5rem; }
.ra-col-head code { font-size: .68rem; color: var(--vp-c-text-3); display: block; }
.ra-row-head code { font-size: .66rem; color: var(--vp-c-text-3); display: block; word-break: break-word; line-height: 1.35; background: none; padding: 0; border-radius: 0; }
.ra-head-zh { font-size: .72rem; color: var(--vp-c-text-1); }
.ra-cell { width: 1.75rem; height: 1.75rem; min-width: 1.75rem; text-align: center; border-radius: 4px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-3); cursor: pointer; padding: 0; }
.ra-cell[data-state='yes'] { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand); }
.ra-cell-mark { font-size: 1.1rem; line-height: 1; color: var(--vp-c-brand-1); }
.ra-cell:hover, .ra-cell:focus-visible { outline: 2px solid var(--vp-c-brand); outline-offset: 1px; }
.ra-cell.selected { box-shadow: inset 0 0 0 2px var(--vp-c-brand-1); }
.ra-note { margin: 0 0 1rem; font-size: .82rem; color: var(--vp-c-text-2); line-height: 1.65; }
.ra-static { font-size: .85rem; }
.ra-static summary { cursor: pointer; font-weight: 600; }
.ra-text-table { width: 100%; margin-top: .6rem; border-collapse: collapse; font-size: .78rem; }
.ra-text-table th, .ra-text-table td { border: 1px solid var(--vp-c-divider); padding: .4rem .5rem; text-align: left; vertical-align: top; }
.ra-text-table thead th { background: var(--vp-c-bg); color: var(--vp-c-text-3); font-weight: 600; }
.ra-code-cell { display: inline-block; margin: 0 .3rem .2rem 0; padding: .05rem .35rem; border-radius: 3px; background: var(--vp-c-bg-soft); font-size: .74rem; }
.ra-static-note { margin: .6rem 0 0; font-size: .8rem; color: var(--vp-c-text-2); line-height: 1.65; }
.ra-source { margin: 1rem 0 0; font-size: .76rem; color: var(--vp-c-text-3); }
@media (max-width: 640px) {
  .ra { padding: 1rem; }
  .ra-reset { margin-left: 0; }
}
</style>