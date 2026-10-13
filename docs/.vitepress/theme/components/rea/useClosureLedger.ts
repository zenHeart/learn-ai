/**
 * 重建义务闭包判定器 —— 对 REA 源码的忠实移植，用于本站的交互式讲解。
 *
 * 移植来源（morluto/rea @ 70611713e140a86201cdef659181012cbdd17f4d）：
 * - src/application/ReconstructionObligationLedgerEvaluation.ts
 *     evaluateObligation / obligationStatus / applyDependencyDiagnostics / dependencyStatus
 * - src/domain/reconstructionObligationLedgerIntegrity.ts
 *     reconstructionObligationLedgerStatus / summarizeReconstructionObligations
 * - src/application/ReconstructionObligationAuthority.ts
 *     proofAuthoritySatisfies / proofEvidenceAuthorities
 * - src/domain/reconstructionObligationLedgerSchemas.ts
 *     diagnostic code 枚举、obligationStatus 枚举
 *
 * 这里的每一条判定规则都对应上面某个函数，未做简化或"讲得通"的改写；
 * 讲不清的地方按源码原样保留（见站内「事实分层」一节）。
 */

/** src/domain/reconstructionObligationLedgerSchemas.ts:202 的 diagnostic code 全集。 */
export type DiagnosticCode =
  | 'duplicate-definition'
  | 'missing-owner'
  | 'ambiguous-owner'
  | 'missing-parser-type'
  | 'missing-original-case'
  | 'weak-original-case-authority'
  | 'missing-case'
  | 'weak-fixture-authority'
  | 'missing-verifier'
  | 'verifier-does-not-enumerate'
  | 'missing-verifier-result'
  | 'weak-verifier-authority'
  | 'verifier-failed'
  | 'static-only'
  | 'contradiction'
  | 'contradiction-evidence-missing'
  | 'residual-unknown'
  | 'dependency-missing'
  | 'dependency-open'
  | 'unavailable-authority'
  | 'blocked'
  | 'out-of-scope'

/** src/domain/reconstructionObligationLedgerSchemas.ts:44 的 status 全集。 */
export type ObligationStatus =
  | 'unowned'
  | 'characterized'
  | 'implemented'
  | 'verified'
  | 'contradicted'
  | 'blocked'
  | 'out-of-scope'
  | 'unknown'

export type LedgerStatus = 'ready' | 'open' | 'failed' | 'unknown'

/** src/application/ReconstructionObligationAuthority.ts:15 proofEvidenceAuthorities。 */
export const EVIDENCE_AUTHORITIES = [
  'shipped-artifact',
  'controlled-replay',
  'historical-reference',
  'external-service',
  'analyst-inference'
] as const
export type EvidenceAuthority = (typeof EVIDENCE_AUTHORITIES)[number]

/** src/domain/reconstructionObligationLedgerSchemas.ts:76 obligationProofAuthoritySchema。 */
export const PROOF_AUTHORITIES = [
  'unit',
  'integration',
  'protocol',
  'renderer',
  'packaged-process',
  'native-abi',
  'live-observation',
  'external'
] as const
export type ProofAuthority = (typeof PROOF_AUTHORITIES)[number]

/** src/domain/reconstructionObligationLedgerSchemas.ts:87 obligationOriginalAuthoritySchema。 */
export const ORIGINAL_AUTHORITIES = ['static', 'runtime', 'process', 'external'] as const
export type OriginalAuthority = (typeof ORIGINAL_AUTHORITIES)[number]

/** src/domain/reconstructionObligationLedgerSchemas.ts:68 obligationCaseKindSchema。 */
export const CASE_KINDS = [
  'positive',
  'negative',
  'malformed',
  'cancellation',
  'teardown'
] as const
export type CaseKind = (typeof CASE_KINDS)[number]

/**
 * 一种证明权威性能被哪些 Evidence 权威性认证。
 * 移植自 ReconstructionObligationAuthority.ts:15-26 的 proofEvidenceAuthorities。
 */
export const PROOF_EVIDENCE_AUTHORITIES: Readonly<Record<ProofAuthority, readonly EvidenceAuthority[]>> = {
  unit: ['shipped-artifact', 'controlled-replay'],
  integration: ['controlled-replay'],
  protocol: ['controlled-replay', 'external-service'],
  renderer: ['controlled-replay', 'external-service'],
  'packaged-process': ['controlled-replay'],
  'native-abi': ['shipped-artifact', 'controlled-replay'],
  'live-observation': ['controlled-replay', 'external-service'],
  external: ['external-service']
}

/**
 * 要求 required 权威性时，实际权威性 actual 中被接受的那一组。
 * 移植自 ReconstructionObligationAuthority.ts:33-59 的 accepted 表。
 *
 * 注意这张表不是全序：unit 接受 native-abi，但 native-abi 不接受 unit；
 * integration 既不接受 unit 也不接受 external。
 */
const ACCEPTED_PROOF_AUTHORITIES: Readonly<Record<ProofAuthority, readonly ProofAuthority[]>> = {
  unit: [
    'unit',
    'integration',
    'protocol',
    'renderer',
    'packaged-process',
    'native-abi',
    'live-observation',
    'external'
  ],
  integration: ['integration', 'protocol', 'renderer', 'packaged-process', 'native-abi', 'live-observation'],
  protocol: ['protocol', 'packaged-process', 'live-observation'],
  renderer: ['renderer', 'packaged-process', 'live-observation'],
  'packaged-process': ['packaged-process', 'live-observation'],
  'native-abi': ['native-abi'],
  'live-observation': ['live-observation'],
  external: ['external']
}

/** 移植自 proofAuthoritySatisfies()。 */
export function proofAuthoritySatisfies(actual: ProofAuthority, required: ProofAuthority): boolean {
  return ACCEPTED_PROOF_AUTHORITIES[required].includes(actual)
}

/**
 * 一条义务的输入条件。每一项都对应源码里一个会产出 diagnostic 的分支，
 * 关闭某一项就等于让源码走进那个分支。
 */
export interface ObligationInput {
  id: string
  title: string
  layer: string
  required: boolean
  /** manifest 里声明的唯一 binding 数量。0 = missing-owner，2 = ambiguous-owner。 */
  bindingCount: number
  requiresParserType: boolean
  bindingHasParserType: boolean
  requiredCaseKinds: readonly CaseKind[]
  /** 已提交且权威性达标的 fixture kind；缺失 → missing-case。 */
  fixtureKinds: readonly CaseKind[]
  /** 每个已提交 fixture 的权威性是否满足要求；缺失 → weak-fixture-authority。 */
  fixtureAuthorityOk: boolean
  /** fixture 引用的 Evidence 是否都在 bundle 里且可认证；缺失 → weak-fixture-authority。 */
  fixtureEvidenceOk: boolean
  verifierPresent: boolean
  verifierEnumerates: boolean
  verifierResultEvidencePresent: boolean
  verifierAuthority: ProofAuthority | null
  requiredVerifierAuthority: ProofAuthority
  verifierStatus: 'pass' | 'fail' | 'unknown'
  originalAuthoritySatisfied: boolean
  requiredOriginalAuthority: OriginalAuthority
  definitionCount: number
  residualUnknownIds: readonly string[]
  unavailableAuthority: readonly string[]
  contradicted: boolean
  disposition: 'active' | 'blocked' | 'out-of-scope'
  dependencyIds: readonly string[]
  /** 依赖 id 是否存在于候选集合中；不存在 → dependency-missing。 */
  knownObligationIds: readonly string[]
}

export interface Diagnostic {
  code: DiagnosticCode
  detail: string
}

export interface EvaluatedObligation {
  input: ObligationInput
  diagnostics: Diagnostic[]
  status: ObligationStatus
}

function hasDiagnostic(diagnostics: readonly Diagnostic[], code: DiagnosticCode): boolean {
  return diagnostics.some((diagnostic) => diagnostic.code === code)
}

function push(diagnostics: Diagnostic[], code: DiagnosticCode, detail: string): void {
  if (!hasDiagnostic(diagnostics, code)) diagnostics.push({ code, detail })
}

/** 移植自 evaluateBinding() + evaluateVerifier() + evaluateAuthority() + evaluateDisposition()。 */
function evaluateOne(input: ObligationInput): EvaluatedObligation {
  const diagnostics: Diagnostic[] = []
  const bindings = input.bindingCount

  if (input.definitionCount > 1)
    push(diagnostics, 'duplicate-definition', 'Multiple candidate definitions share this obligation ID.')
  if (bindings === 0) push(diagnostics, 'missing-owner', 'No reconstruction manifest binding owns this obligation.')
  if (bindings > 1)
    push(diagnostics, 'ambiguous-owner', 'Multiple reconstruction manifest bindings claim this obligation.')

  // 源码 evaluateObligation 只有在 bindings.length === 1 时才调用 evaluateBinding。
  if (bindings === 1) {
    if (input.requiresParserType && !input.bindingHasParserType)
      push(diagnostics, 'missing-parser-type', 'This boundary requires an explicit parser, schema, and domain type.')

    for (const caseKind of input.requiredCaseKinds) {
      if (!input.fixtureKinds.includes(caseKind)) {
        push(diagnostics, 'missing-case', `Required ${caseKind} fixture is missing.`)
        continue
      }
      // 源码 evaluateBinding 判定 weak-fixture-authority 的两个来源在此合并为一个开关。
      if (!input.fixtureAuthorityOk || !input.fixtureEvidenceOk)
        push(
          diagnostics,
          'weak-fixture-authority',
          `${caseKind} fixture lacks the required fixture authority or authenticated Evidence.`
        )
    }

    // evaluateVerifier()
    if (!input.verifierPresent) {
      push(diagnostics, 'missing-verifier', 'No verifier claim is bound to this obligation.')
    } else {
      if (!input.verifierEnumerates)
        push(diagnostics, 'verifier-does-not-enumerate', 'The verifier claim does not enumerate this obligation ID.')
      if (!input.verifierResultEvidencePresent)
        push(diagnostics, 'missing-verifier-result', 'The latest verifier result Evidence is absent from the bundle.')
      const verifierOk =
        input.verifierAuthority !== null &&
        proofAuthoritySatisfies(input.verifierAuthority, input.requiredVerifierAuthority)
      if (!verifierOk)
        push(
          diagnostics,
          'weak-verifier-authority',
          `Verifier authority does not satisfy ${input.requiredVerifierAuthority}.`
        )
      if (input.verifierStatus !== 'pass')
        push(diagnostics, 'verifier-failed', `Latest verifier status is ${input.verifierStatus}.`)
    }
  }

  if (!input.originalAuthoritySatisfied)
    push(
      diagnostics,
      'static-only',
      `No ${input.requiredOriginalAuthority} authority characterizes the original finite behavior.`
    )

  if (input.disposition === 'blocked') push(diagnostics, 'blocked', 'Reviewed disposition marks this obligation blocked.')
  if (input.disposition === 'out-of-scope')
    push(diagnostics, 'out-of-scope', 'Reviewed disposition marks this obligation out of scope; it remains visible.')

  if (input.contradicted) push(diagnostics, 'contradiction', 'Manifest records a contradiction for this obligation.')

  for (const unknownId of input.residualUnknownIds)
    push(diagnostics, 'residual-unknown', `Residual unknown remains visible: ${unknownId}.`)
  for (const unavailable of input.unavailableAuthority)
    push(diagnostics, 'unavailable-authority', unavailable)

  return { input, diagnostics, status: obligationStatus(input, diagnostics) }
}

/** 移植自 obligationStatus()：严格按源码的 if 顺序短路。 */
export function obligationStatus(input: ObligationInput, diagnostics: readonly Diagnostic[]): ObligationStatus {
  if (hasDiagnostic(diagnostics, 'out-of-scope')) return 'out-of-scope'
  if (hasDiagnostic(diagnostics, 'blocked')) return 'blocked'
  if (hasDiagnostic(diagnostics, 'contradiction')) return 'contradicted'
  if (
    hasDiagnostic(diagnostics, 'duplicate-definition') ||
    hasDiagnostic(diagnostics, 'residual-unknown') ||
    hasDiagnostic(diagnostics, 'unavailable-authority')
  )
    return 'unknown'
  if (input.bindingCount === 0) return 'unowned'
  if (diagnostics.length === 0) return 'verified'
  return 'implemented'
}

/** 移植自 dependencyStatus()。 */
function dependencyStatus(status: ObligationStatus, diagnostics: readonly Diagnostic[]): ObligationStatus {
  const dependencyHolds =
    hasDiagnostic(diagnostics, 'dependency-missing') || hasDiagnostic(diagnostics, 'dependency-open')
  return dependencyHolds && !['contradicted', 'out-of-scope'].includes(status) ? 'blocked' : status
}

/**
 * 移植自 applyDependencyDiagnostics()。
 * 源码是一个有界不动点：最多跑 obligations.length 轮，某一轮没有 status 变化就 break。
 * `passes` 暴露出来是为了让读者看见不动点跑了几轮 —— 这是源码里真实存在的循环次数。
 */
export function applyDependencyDiagnostics(
  obligations: readonly EvaluatedObligation[]
): { obligations: EvaluatedObligation[]; passes: number } {
  let evaluated = [...obligations]
  let passes = 0
  for (let pass = 0; pass < obligations.length; pass += 1) {
    passes += 1
    const statuses = new Map(evaluated.map(({ input, status }) => [input.id, status]))
    let changed = false
    evaluated = evaluated.map((obligation) => {
      const diagnostics = [...obligation.diagnostics]
      for (const dependencyId of obligation.input.dependencyIds) {
        const missing = !obligation.input.knownObligationIds.includes(dependencyId)
        if (missing || statuses.get(dependencyId) !== 'verified')
          push(
            diagnostics,
            missing ? 'dependency-missing' : 'dependency-open',
            `Dependency obligation is ${missing ? 'missing' : 'not verified'}: ${dependencyId}.`
          )
      }
      const normalized = dedupeDiagnostics(diagnostics)
      const status = dependencyStatus(obligation.status, normalized)
      changed ||= status !== obligation.status
      return { input: obligation.input, diagnostics: normalized, status }
    })
    if (!changed) break
  }
  return { obligations: evaluated, passes }
}

function dedupeDiagnostics(diagnostics: readonly Diagnostic[]): Diagnostic[] {
  const seen = new Set<string>()
  const out: Diagnostic[] = []
  for (const diagnostic of diagnostics) {
    if (seen.has(diagnostic.code)) continue
    seen.add(diagnostic.code)
    out.push(diagnostic)
  }
  return out
}

/** 移植自 summarizeReconstructionObligations() 中本模型涉及的三个计数。 */
export interface LedgerSummary {
  total: number
  required: number
  verified: number
  requiredOpen: number
}

/** 移植自 summarizeReconstructionObligations()。 */
export function summarizeReconstructionObligations(obligations: readonly EvaluatedObligation[]): LedgerSummary {
  return {
    total: obligations.length,
    required: obligations.filter(({ input }) => input.required).length,
    verified: obligations.filter(({ status }) => status === 'verified').length,
    requiredOpen: obligations.filter(({ input, status }) => input.required && status !== 'verified').length
  }
}

/** 移植自 reconstructionObligationLedgerStatus()。limitations 由 ledgerLimitations() 汇入。 */
export function ledgerStatus(
  obligations: readonly EvaluatedObligation[],
  limitations: readonly string[]
): LedgerStatus {
  if (obligations.length === 0) return 'unknown'
  const requiredOpen = obligations.filter(({ input, status }) => input.required && status !== 'verified')
  if (
    requiredOpen.some(
      ({ status, diagnostics }) => status === 'contradicted' || hasDiagnostic(diagnostics, 'verifier-failed')
    )
  )
    return 'failed'
  if (limitations.length > 0) return 'unknown'
  if (requiredOpen.some(({ status }) => status === 'unknown')) return 'unknown'
  return requiredOpen.length === 0 ? 'ready' : 'open'
}

/** 一次完整求值：evaluateObligation 映射 → applyDependencyDiagnostics → ledgerStatus。 */
export function evaluateLedger(inputs: readonly ObligationInput[]): {
  obligations: EvaluatedObligation[]
  passes: number
  summary: LedgerSummary
  status: LedgerStatus
} {
  const firstPass = inputs.map(evaluateOne)
  const { obligations, passes } = applyDependencyDiagnostics(firstPass)
  return { obligations, passes, summary: summarizeReconstructionObligations(obligations), status: ledgerStatus(obligations, []) }
}

export const STATUS_LABELS: Readonly<Record<ObligationStatus, string>> = {
  unowned: '无人认领',
  characterized: '已刻画',
  implemented: '已实现',
  verified: '已验证',
  contradicted: '存在矛盾',
  blocked: '被阻塞',
  'out-of-scope': '超出范围',
  unknown: '未知'
}

export const LEDGER_STATUS_LABELS: Readonly<Record<LedgerStatus, string>> = {
  ready: '可闭合',
  open: '未闭合',
  failed: '已失败',
  unknown: '未知'
}

/**
 * diagnostic code 的中文说明。
 * 措辞对齐源码里的 detail 文本，不额外引入源码没有的判断。
 */
export const DIAGNOSTIC_LABELS: Readonly<Record<DiagnosticCode, string>> = {
  'duplicate-definition': '同一 obligation ID 存在多个候选定义',
  'missing-owner': '没有 manifest binding 认领这条义务',
  'ambiguous-owner': '多个 manifest binding 争抢同一条义务',
  'missing-parser-type': '该边界要求显式 parser / schema / domain type',
  'missing-original-case': '缺少原始用例',
  'weak-original-case-authority': '原始用例权威性不足',
  'missing-case': '缺少必需的 case fixture',
  'weak-fixture-authority': 'fixture 权威性不足或缺少已认证 Evidence',
  'missing-verifier': '没有 verifier 声明绑定到这条义务',
  'verifier-does-not-enumerate': 'verifier 声明没有枚举这条 obligation ID',
  'missing-verifier-result': 'verifier 结果 Evidence 不在 bundle 中',
  'weak-verifier-authority': 'verifier 权威性不满足要求',
  'verifier-failed': 'verifier 最新状态不是 pass',
  'static-only': '没有任何原始权威性能刻画被观测到的有限行为',
  contradiction: 'manifest 记录了矛盾',
  'contradiction-evidence-missing': '矛盾缺少对应 Evidence',
  'residual-unknown': '残留未知项仍然可见',
  'dependency-missing': '依赖的义务不存在',
  'dependency-open': '依赖的义务未验证',
  'unavailable-authority': '所需权威性不可用',
  blocked: '评审处置标记为 blocked',
  'out-of-scope': '评审处置标记为超出范围'
}