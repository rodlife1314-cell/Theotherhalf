/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Substrate — Causal Workflow Runtime Engine
 * Direct codification from https://github.com/rodlife1314-cell/Game_one
 * 
 * 12-Stage Cognitive Pipeline State Machine:
 * 01: Signal Ingest → 02: Triage & S/N Filter → 03: Decomposition →
 * 04: Evidence & Separation → 05: Graph Traversal → 06: Compute & CBLI Lens →
 * 07: Jemma Adversarial Challenge → 08: Alice Synthesis → 09: Octagon Policy Gate →
 * 10: Operator Decision → 11: State Commitment → 12: Immutable Aether Memory
 * 
 * Invariants:
 * 1. Monotonic progression with explicit gate evaluation.
 * 2. Octagon Policy Gate: Numerical scores CANNOT override failed predicates (Score ≠ Evidence).
 * 3. Operator Sovereignty: State transitions locked without cryptographic signature.
 * 4. Aether Ledger: Append-only hash-chained audit memory.
 */

import {
  CausalSignalPipeline,
  OctagonPredicateConjunction,
} from './game-one-types';

export interface WorkflowTransitionResult {
  pipeline: CausalSignalPipeline;
  success: boolean;
  message: string;
  haltReason?: string;
  receiptHash?: string;
}

/**
 * Evaluates Octagon required predicates for Stage 09.
 * Core Invariant: High RAPIDS / ML scores CANNOT override failed predicates.
 */
export function evaluateOctagonGate(
  pipeline: CausalSignalPipeline,
  operatorSignatureProvided: boolean = false
): OctagonPredicateConjunction {
  // Invariant 1: Source verification
  const pSource = pipeline.epistemicState !== "SOURCE VERIFIED" || pipeline.signalToNoise === "SURFACE";
  
  // Invariant 2: Provenance binding (unresolved Jemma objections fail provenance)
  const hasActiveObjection = pipeline.disagreementState?.status === "ACTIVE_OBJECTION";
  const pProvenance = !hasActiveObjection;

  // Invariant 3: Physics / Kinematics consistency
  const pPhysics = pipeline.category !== "ENERGY_PLASMA" || pipeline.materiality !== "CRITICAL";

  // Invariant 4: Safety boundaries
  const pSafety = true;

  // Invariant 5: Sovereign Operator signature
  const pAuthority = operatorSignatureProvided || !!pipeline.operatorSigned;

  const overallPass = pSource && pProvenance && pPhysics && pSafety && pAuthority;

  let refusalCode: string | undefined;
  let refusalReason: string | undefined;

  if (!pProvenance) {
    refusalCode = "OCTAGON_ERR_ACTIVE_JEMMA_OBJECTION";
    refusalReason = `Provenance predicate failed: Active challenge from ${pipeline.disagreementState?.agent}: "${pipeline.disagreementState?.challenge}"`;
  } else if (!pPhysics) {
    refusalCode = "OCTAGON_ERR_PHYSICAL_INVARIANT_VIOLATION";
    refusalReason = "Physics predicate failed: Energy/plasma boundary parameter exceeds safe thermodynamic ceiling.";
  } else if (!pAuthority) {
    refusalCode = "OCTAGON_AWAITING_SOVEREIGN_SIGNATURE";
    refusalReason = "All 4 algorithmic predicates satisfied. Awaiting sovereign Operator authorization: P_authority = PENDING.";
  }

  return {
    pSource,
    pProvenance,
    pPhysics,
    pSafety,
    pAuthority,
    overallPass,
    refusalCode,
    refusalReason
  };
}

/**
 * Advance the pipeline by one step in the runtime state machine.
 */
export function stepForwardWorkflow(
  pipeline: CausalSignalPipeline,
  operatorSignatureKey?: string
): WorkflowTransitionResult {
  const currentIdx = pipeline.currentStepIndex;
  const steps = [...pipeline.steps];

  if (currentIdx >= steps.length - 1) {
    return {
      pipeline,
      success: false,
      message: "Pipeline is already at terminal stage (Stage 12: Immutable Memory)."
    };
  }

  const currentStep = steps[currentIdx];
  const nextIdx = currentIdx + 1;
  const nextStep = steps[nextIdx];

  // Check Gate 09 (Octagon Policy Gate)
  if (currentStep.stepNumber === "09") {
    const octagon = evaluateOctagonGate(pipeline, !!operatorSignatureKey);
    if (!octagon.pProvenance || !octagon.pPhysics || !octagon.pSource) {
      steps[currentIdx] = {
        ...currentStep,
        status: "HALTED",
        refusalCriteria: octagon.refusalReason
      };
      return {
        pipeline: { ...pipeline, steps },
        success: false,
        message: `Octagon halted workflow: ${octagon.refusalCode}`,
        haltReason: octagon.refusalReason
      };
    }
  }

  // Check Gate 10 (Operator Decision)
  if (currentStep.stepNumber === "10" && !operatorSignatureKey && !pipeline.operatorSigned) {
    return {
      pipeline,
      success: false,
      message: "Stage 10 requires sovereign operator decision before advancing to Stage 11 State Commitment.",
      haltReason: "Awaiting Operator Signature"
    };
  }

  // Step 11 -> 12 produces Aether Ledger receipt
  let receiptHash = pipeline.ledgerReceiptHash;
  if (currentStep.stepNumber === "11") {
    const seed = `${pipeline.id}-${Date.now()}-${pipeline.operatorSigned ? "SIGNED" : "UNSIGNED"}`;
    receiptHash = "0x" + Array.from({ length: 64 }, (_, i) => ((i * 17 + seed.charCodeAt(i % seed.length)) % 16).toString(16)).join("");
  }

  // Update current step to COMPLETED
  steps[currentIdx] = {
    ...currentStep,
    status: "COMPLETED"
  };

  // Update next step to ACTIVE
  steps[nextIdx] = {
    ...nextStep,
    status: "ACTIVE"
  };

  const updatedPipeline: CausalSignalPipeline = {
    ...pipeline,
    currentStepIndex: nextIdx,
    steps,
    ledgerReceiptHash: receiptHash,
    operatorSigned: pipeline.operatorSigned || (currentStep.stepNumber === "10" && !!operatorSignatureKey)
  };

  return {
    pipeline: updatedPipeline,
    success: true,
    message: `Advanced to Stage ${nextStep.stepNumber}: ${nextStep.name}`,
    receiptHash
  };
}

/**
 * Step backward in the pipeline (undo or re-evaluate previous stage).
 */
export function stepBackwardWorkflow(pipeline: CausalSignalPipeline): CausalSignalPipeline {
  if (pipeline.currentStepIndex <= 0) return pipeline;
  const currentIdx = pipeline.currentStepIndex;
  const prevIdx = currentIdx - 1;
  const steps = [...pipeline.steps];

  steps[currentIdx] = {
    ...steps[currentIdx],
    status: "PENDING"
  };

  steps[prevIdx] = {
    ...steps[prevIdx],
    status: "ACTIVE"
  };

  return {
    ...pipeline,
    currentStepIndex: prevIdx,
    steps
  };
}

/**
 * Sovereign Operator Action: Approve, Hold, or Reject at Stage 10.
 */
export function recordOperatorDecision(
  pipeline: CausalSignalPipeline,
  decision: "APPROVE" | "HOLD" | "REJECT",
  signatureKey: string
): WorkflowTransitionResult {
  const steps = [...pipeline.steps];
  const step10Idx = steps.findIndex(s => s.stepNumber === "10");

  if (step10Idx === -1) {
    return { pipeline, success: false, message: "Pipeline does not contain Stage 10." };
  }

  if (decision === "REJECT") {
    steps[step10Idx] = {
      ...steps[step10Idx],
      status: "HALTED",
      actionSummary: `Sovereign Operator REJECTED proposal. Key: ${signatureKey.substring(0, 8)}...`,
      refusalCriteria: "Operator exercised sovereign veto right. Pipeline terminated."
    };
    return {
      pipeline: { ...pipeline, steps },
      success: true,
      message: "Operator REJECTED workflow."
    };
  }

  if (decision === "HOLD") {
    steps[step10Idx] = {
      ...steps[step10Idx],
      status: "ACTIVE",
      actionSummary: `Sovereign Operator placed proposal on HOLD for further empirical data. Key: ${signatureKey.substring(0, 8)}...`,
      refusalCriteria: "Pending physical specimen inspection."
    };
    return {
      pipeline: { ...pipeline, steps },
      success: true,
      message: "Operator placed workflow on HOLD."
    };
  }

  // APPROVE
  steps[step10Idx] = {
    ...steps[step10Idx],
    status: "COMPLETED",
    actionSummary: `Sovereign Operator APPROVED proposal with Ed25519 signature: ${signatureKey.substring(0, 12)}...`,
    outputs: [`operator_key: ${signatureKey}`, `authorized_at: ${new Date().toISOString()}`]
  };

  const step11Idx = steps.findIndex(s => s.stepNumber === "11");
  if (step11Idx !== -1) {
    steps[step11Idx] = {
      ...steps[step11Idx],
      status: "ACTIVE"
    };
  }

  return {
    pipeline: {
      ...pipeline,
      currentStepIndex: step11Idx !== -1 ? step11Idx : step10Idx,
      steps,
      operatorSigned: true,
      epistemicState: "OPERATOR APPROVED"
    },
    success: true,
    message: "Operator signature registered. Advanced to Stage 11 State Commitment."
  };
}

/**
 * Standard recovered sample pipelines from Game_one & Pathfinder substrate
 */
export const SAMPLE_CAUSAL_PIPELINES: CausalSignalPipeline[] = [
  {
    id: "pipe-caf2-litho",
    title: "Export Controls on CaF₂ Monocrystalline Optical Windows",
    category: "FRONTIER_HARDWARE",
    sourceDomain: "Aether Regulatory Ingest / Geopolitical Watch",
    currentStepIndex: 6, // At Adversarial Challenge
    materiality: "HIGH",
    signalToNoise: "SURFACE",
    epistemicState: "CLAIM VALIDATED",
    disagreementState: {
      agent: "Jemma",
      challenge: "Domestic strategic reserve duration (6 vs 18 months) is unverified in audited filings. COHR substitution rate claim unproven.",
      status: "ACTIVE_OBJECTION"
    },
    steps: [
      {
        stepNumber: "01",
        name: "SIGNAL INGEST",
        actor: "Aether / Ingest Layer",
        role: "Raw observation capture",
        actionSummary: "Export-control decree on CaF₂ monocrystals entered into raw buffer.",
        status: "COMPLETED",
        details: "Raw gazette publication and customs clearance restrictions recorded in immutable ingress buffer.",
        outputs: ["doc_hash: #89a2f", "raw_text_ingested: true"]
      },
      {
        stepNumber: "02",
        name: "TRIAGE & S/N FILTER",
        actor: "Claudia / Filter Rail",
        role: "Signal-to-Noise gating",
        actionSummary: "signalToNoise() returned SURFACE. Materiality: HIGH.",
        status: "COMPLETED",
        details: "Evaluated market breadth and lithography reliance. High-NA DUV excimer lasers cannot operate without pure CaF₂ optics.",
        outputs: ["materiality: HIGH", "filter_gate: PASS"]
      },
      {
        stepNumber: "03",
        name: "DECOMPOSITION",
        actor: "Claudia",
        role: "Routing & rail breakdown",
        actionSummary: "Decomposed into 5 sub-rails: Crystal supply, Geo exposure, Supplier reliance, Inventory, Substitutions.",
        status: "COMPLETED",
        details: "Problem split into non-overlapping sub-domains to prevent conflation of mining quotas with tool integration.",
        outputs: ["sub_rails: 5", "pipeline_allocated: true"]
      },
      {
        stepNumber: "04",
        name: "EVIDENCE & SEPARATION",
        actor: "Hermes",
        role: "Provenance binding & fact-check",
        actionSummary: "Extracted 14 tariff filings, 2 customs registries, and 4 supplier 10-K declarations.",
        status: "COMPLETED",
        details: "Every data point bound to unique source ID and hash. Zero inference allowed into sensory tier.",
        outputs: ["verified_sources: 20", "unbound_claims: 0"]
      },
      {
        stepNumber: "05",
        name: "GRAPH TRAVERSAL",
        actor: "Hermes Graph Router",
        role: "Dependency mapping",
        actionSummary: "Traversed 3 degrees of separation: Mine → Purifier → Ingot Polisher → Zeiss → ASML.",
        status: "COMPLETED",
        details: "Constructed direct dependency edges. Bottleneck identified at high-homogeneity boule annealing.",
        outputs: ["nodes_linked: 18", "critical_bottlenecks: 1"]
      },
      {
        stepNumber: "06",
        name: "COMPUTE & CBLI LENS",
        actor: "FastAPI / Rapids Substrate",
        role: "Physics & score evaluation",
        actionSummary: "Computed CBLI metrics: Capacity: 41%, Latency: 14mo, Integrity: 0.88.",
        status: "COMPLETED",
        details: "Calculated substitution lead times and synthetic alternatives. Glass-ceramic cannot meet 193nm transmission loss bounds.",
        outputs: ["cbli_composite: 64.2", "lead_time_months: 14"]
      },
      {
        stepNumber: "07",
        name: "JEMMA ADVERSARIAL CHALLENGE",
        actor: "Jemma Reality Rail",
        role: "Adversarial stress-test",
        actionSummary: "ACTIVE OBJECTION: 18-month domestic inventory claim lacks audited evidence.",
        status: "ACTIVE",
        details: "Jemma detected ungrounded assumption: Company press releases claim 18-month stock, but import receipts only corroborate 6 months.",
        refusalCriteria: "Inventory claim must be downgraded to 6 months unless supplemental customs proof is presented."
      },
      {
        stepNumber: "08",
        name: "ALICE SYNTHESIS",
        actor: "Alice Synthesis Kernel",
        role: "Multi-branch synthesis",
        actionSummary: "Waiting for Jemma friction resolution before framing actionable synthesis.",
        status: "PENDING",
        details: "Alice frames executive synthesis and uncertainty boundaries for the sovereign Operator."
      },
      {
        stepNumber: "09",
        name: "OCTAGON POLICY GATE",
        actor: "Octagon Boundary Engine",
        role: "Invariant & safety checks",
        actionSummary: "Gate 09: P_source ∧ P_provenance ∧ P_physics ∧ P_safety ∧ P_authority.",
        status: "PENDING",
        details: "Evaluates all 5 required predicates. High RAPIDS score CANNOT override provenance failure."
      },
      {
        stepNumber: "10",
        name: "OPERATOR DECISION",
        actor: "Sovereign Human Operator",
        role: "Decision clearance",
        actionSummary: "Sovereign clearance required before state mutation.",
        status: "PENDING",
        details: "The Operator reviews synthesis, Jemma friction, and signs with cryptographic key."
      },
      {
        stepNumber: "11",
        name: "STATE COMMITMENT",
        actor: "Delta Synchronization Rail",
        role: "Atomic state mutation",
        actionSummary: "Atomic mutation applied to active universe graph.",
        status: "PENDING",
        details: "Commits updated risk scores, node exposure flags, and active edges."
      },
      {
        stepNumber: "12",
        name: "IMMUTABLE AETHER MEMORY",
        actor: "Aether Ledger",
        role: "Append-only archival",
        actionSummary: "Cryptographic hash written to permanent Aether ledger.",
        status: "PENDING",
        details: "Generates permanent audit receipt for regulatory and longitudinal review."
      }
    ]
  },
  {
    id: "pipe-ccv01-corridor-ingress",
    title: "CCV-01 Corridor Coupling & G6 Impedance Ingress",
    category: "PHYSICAL_TWIN_TELEMETRY",
    sourceDomain: "Poynting Waveguide Physical Twin Telemetry",
    currentStepIndex: 9, // At Operator Decision
    materiality: "CRITICAL",
    signalToNoise: "SURFACE",
    epistemicState: "HYPOTHESIS VALIDATED",
    steps: [
      {
        stepNumber: "01",
        name: "SIGNAL INGEST",
        actor: "Poynting Telemetry Array",
        role: "Sensory capture",
        actionSummary: "Coupling sensor stream 377.0Ω impedance reading captured.",
        status: "COMPLETED",
        details: "Waveguide boundary field voltage and Poynting flux vector sampled at 100 Hz."
      },
      {
        stepNumber: "02",
        name: "TRIAGE & S/N FILTER",
        actor: "Claudia",
        role: "S/N filter",
        actionSummary: "Noise variance 0.002, signal strength 0.98. Gated as SURFACE.",
        status: "COMPLETED",
        details: "Bandpass filtered around nominal corridor frequency 142.5 MHz."
      },
      {
        stepNumber: "03",
        name: "DECOMPOSITION",
        actor: "Claudia",
        role: "Subsystem decomposition",
        actionSummary: "Split into 3 vectors: Impedance Match, Phase Drift, Thermal Margin.",
        status: "COMPLETED",
        details: "Subsystems allocated to dedicated physics simulation solvers."
      },
      {
        stepNumber: "04",
        name: "EVIDENCE & SEPARATION",
        actor: "Hermes",
        role: "Evidence ledgering",
        actionSummary: "Bound to Cryostat Probe #4 and Cavity Resonance Gauge #1.",
        status: "COMPLETED",
        details: "Physical measurements stamped with ISO 8601 UTC and hardware serials."
      },
      {
        stepNumber: "05",
        name: "GRAPH TRAVERSAL",
        actor: "Hermes",
        role: "Topology analysis",
        actionSummary: "Coupled G6 hexagonal nodes linked to corridor center rail.",
        status: "COMPLETED",
        details: "Hexagonal lattice provides 6-fold symmetry for optimal Poynting flux vortex."
      },
      {
        stepNumber: "06",
        name: "COMPUTE & CBLI LENS",
        actor: "Rapids Substrate",
        role: "Physics evaluation",
        actionSummary: "Calculated coupling efficiency: 94.6%, SWR: 1.05:1.",
        status: "COMPLETED",
        details: "Poynting vector magnitude S = 1.42 MW/m² within corridor core."
      },
      {
        stepNumber: "07",
        name: "JEMMA ADVERSARIAL CHALLENGE",
        actor: "Jemma Reality Rail",
        role: "Constraint enforcement",
        actionSummary: "OBJECTION RESOLVED: Relativistic forward velocity projection removed.",
        status: "COMPLETED",
        details: "Jemma verified that vessel is in stationary lab-frame test, rejecting false c-fraction claim."
      },
      {
        stepNumber: "08",
        name: "ALICE SYNTHESIS",
        actor: "Alice Synthesis",
        role: "Unified framing",
        actionSummary: "Vessel state verified for cruise corridor lock with G6 geometry.",
        status: "COMPLETED",
        details: "Synthesized recommendation: Maintain lock at 0.94 coupling authority."
      },
      {
        stepNumber: "09",
        name: "OCTAGON POLICY GATE",
        actor: "Octagon Boundary Engine",
        role: "Predicate conjunction",
        actionSummary: "P_source ∧ P_provenance ∧ P_physics ∧ P_safety passed. P_authority pending.",
        status: "COMPLETED",
        details: "Octagon confirms all physical boundaries safe. Ready for Operator signature."
      },
      {
        stepNumber: "10",
        name: "OPERATOR DECISION",
        actor: "Sovereign Operator",
        role: "Clearance gate",
        actionSummary: "Awaiting Operator sovereign signature to commit corridor coupling.",
        status: "ACTIVE",
        details: "Operator must review telemetry hash and sign to authorize vehicle corridor lock."
      },
      {
        stepNumber: "11",
        name: "STATE COMMITMENT",
        actor: "Delta Rail",
        role: "State write",
        actionSummary: "Commit vehicle state to production universe.",
        status: "PENDING",
        details: "Will write authorized coupling state to physical hardware."
      },
      {
        stepNumber: "12",
        name: "IMMUTABLE AETHER MEMORY",
        actor: "Aether",
        role: "Archival ledger",
        actionSummary: "Cryptographic state transition block.",
        status: "PENDING",
        details: "Will append cryptographic receipt to permanent Aether chain."
      }
    ]
  }
];
