/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Frontier Substrate — Codified Game_one Architecture Types
 * Direct codification from https://github.com/rodlife1314-cell/Game_one
 */

// ── CRUCIBLE DEFENSE AUDITOR & DIRTY DOZEN ─────────────────────────────

export interface CrucibleAttackTest {
  id: string;
  attackName: string;
  targetInvariant: string;
  attackVector: string;
  simulatedPayload: Record<string, unknown>;
  expectedRefusalCode: string;
  actualRefusalCode?: string;
  auditProof: string;
  executionStatus: "UNTESTED" | "REFUSED_AS_EXPECTED" | "FAILED_VULNERABILITY_LEAK";
  receiptHash?: string;
}

export interface AttackExecutionResult {
  testId: string;
  attackName: string;
  blocked: boolean;
  expectedRefusalCode: string;
  actualRefusalCode: string;
  auditProof: string;
  receiptHash: string;
}

export interface DailyCheckpointAuditReceipt {
  timestamp: string;
  checkpoint: string;
  auditorModel: string;
  buildStatus: "SUCCESS" | "FAILED";
  executiveVerdict: "PASS" | "PASS_WITH_CONDITIONS" | "FAIL";
  verifiedClaims: string[];
  unverifiedClaims: string[];
  criticalFindings: string[];
  securityFindings: Array<{
    id: string;
    title: string;
    severity: "P1" | "P2" | "P3";
    description: string;
    correctionOrMitigation: string;
  }>;
  transactionalIntegrityAudit: {
    getBeforeWrite: boolean;
    idempotentRetries: boolean;
    runTransactionWrapped: boolean;
  };
  realtimeSubscriptionAudit: {
    subscriptionsChecked: number;
    unmountCleanupsVerified: number;
  };
}

// ── 12-STAGE CAUSAL WORKFLOW PIPELINE ──────────────────────────────────

export type PipelineStepStatus = "COMPLETED" | "ACTIVE" | "PENDING" | "HALTED";

export interface PipelineStep {
  stepNumber: string;
  name: string;
  actor: string;
  role: string;
  actionSummary: string;
  status: PipelineStepStatus;
  details: string;
  outputs?: string[];
  refusalCriteria?: string;
  predicateCheck?: {
    predicateName: string;
    passed: boolean;
    rationale: string;
  };
  stateBadge?: string;
  badgeColor?: string;
}

export interface CausalSignalPipeline {
  id: string;
  title: string;
  category: "FRONTIER_HARDWARE" | "COMMERCIAL_DISTRIBUTION_MODEL4" | "ENERGY_PLASMA" | "PHYSICAL_TWIN_TELEMETRY";
  sourceDomain: string;
  currentStepIndex: number;
  materiality: "CRITICAL" | "HIGH" | "MEDIUM";
  signalToNoise: "SURFACE" | "FILTERED";
  epistemicState: "SOURCE VERIFIED" | "CLAIM VALIDATED" | "HYPOTHESIS VALIDATED" | "OPERATOR APPROVED";
  disagreementState?: {
    agent: string;
    challenge: string;
    status: "ACTIVE_OBJECTION" | "RESOLVED" | "UNATTESTED";
  };
  steps: PipelineStep[];
  ledgerReceiptHash?: string;
  operatorSigned?: boolean;
}

export interface OctagonPredicateConjunction {
  pSource: boolean;
  pProvenance: boolean;
  pPhysics: boolean;
  pSafety: boolean;
  pAuthority: boolean;
  overallPass: boolean;
  refusalCode?: string;
  refusalReason?: string;
}

// ── PARALLEL COGNITION ENGINE ──────────────────────────────────────────

export interface ParallelBranchReceipt {
  receiptId: string;
  branchId: "BRANCH_ENERGY" | "BRANCH_DYNAMICS" | "BRANCH_COUNTERFACTUAL" | "BRANCH_SIMON_REASONING" | "BRANCH_DETERMINISTIC" | "BRANCH_PROVENANCE";
  assignedAgent: string;
  hypothesisTitle: string;
  epistemicTier: "MEASURED" | "DERIVED" | "INFERRED";
  provenanceHash: string;
  executionDurationMs: number;
  physicalPredicatesSatisfied: boolean;
  findings: string[];
  numericalMetrics?: Record<string, string>;
  receiptSignature?: string;
  metricKey?: string;
  metricValue?: string | number;
  contingencyTriggered?: boolean;
  operatorActionRequired?: boolean;
}

export interface ParallelCognitionSession {
  sessionId: string;
  scenario: "NOMINAL" | "TWR_COLLAPSE" | "COLD_ELECTROCHEMICAL" | "INFERRED_LEAKAGE" | "STALE_FRAME";
  branches: ParallelBranchReceipt[];
  jemmaAuditPassed: boolean;
  jemmaAuditViolations: string[];
  aliceSynthesis: string;
  octagonConjunction: OctagonPredicateConjunction;
  operatorAuthorized: boolean;
  committedState: boolean;
  aetherLedgerReceipt?: string;
}

// ── LEARNING HELIX KERNEL ──────────────────────────────────────────────

export interface BasePair {
  id?: string;
  pairId?: string;
  pairType?: string;
  stepNumber?: string;
  learnerState?: string;
  teachingState?: string;
  prompt?: string;
  scaffoldHint?: string;
  expectedEvidenceCriterion?: string;
  learningSide?: {
    phase: string;
    description: string;
    learnerState: string;
  };
  teachingSide?: {
    phase: string;
    description: string;
    agent: string;
    adaptation: string;
  };
  bridgeType?: "ENCOUNTER" | "DIAGNOSIS" | "FEEDBACK" | "EVIDENCE" | "TRANSFER_CHALLENGE" | "FADE_SUPPORT";
  status?: "COMPLETED" | "ACTIVE" | "PENDING";
}

export type LearningBasePair = BasePair;

export interface HelixSimulationScenario {
  id?: string;
  scenarioId?: string;
  conceptTitle?: string;
  domain: string;
  learnerProfile?: string;
  targetCompetency?: string;
  pedagogicalObjective?: string;
  currentTurnIndex?: number;
  currentCycle?: number;
  currentStageIndex?: number;
  scaffoldingLevel?: string;
  learnerHistory?: any[];
  activeBasePair?: BasePair;
  masteryCriteria?: {
    recognisePattern: boolean;
    explainOwnWords: boolean;
    applyWithoutCopying: boolean;
    transferChangedContext: boolean;
    identifyBoundaryBreak: boolean;
  };
  basePairs?: BasePair[];
}

// ── DOCTRINE & VOCABULARY CANON ────────────────────────────────────────

export interface DoctrineFieldDefinition {
  id: string;
  name: string;
  role: string;
  question: string;
  doctrine: string;
  color: string;
  iconName: string;
}

export interface GeometricSyntaxShape {
  shape: string;
  symbolicAspect: string;
  coreInquiry: string;
  visualOutput: string;
  polygonSides: number;
}

export interface VocabularyTermDefinition {
  term: string;
  meaning: string;
  physicalContext: string;
  pillar: string;
}
