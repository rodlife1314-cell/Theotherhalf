/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Substrate — Canonical Doctrine, Geometric Syntax & Vocabulary Canon
 * Direct codification from https://github.com/rodlife1314-cell/Game_one
 */

import {
  DoctrineFieldDefinition,
  GeometricSyntaxShape,
  VocabularyTermDefinition,
  DailyCheckpointAuditReceipt
} from "./game-one-types";

/**
 * The Eight Superposed Fields of Pathfinder Doctrine (Doctrine.md)
 */
export const DOCTRINE_EIGHT_FIELDS: DoctrineFieldDefinition[] = [
  {
    id: "rapids",
    name: "RAPIDS",
    role: "Extraction at the Kernel Level",
    question: "Where is the velocity?",
    doctrine: "FastAPI / Rapids Substrate extracts raw data and computes velocity. Operates directly on the hardware metal, calculating Row-based Attributes Portfolio and Influence Decisive Scores across the 7 Core Pillars (CF, EP, CI, GC, AI, SC, SL).",
    color: "#3B82F6", // Blue
    iconName: "Zap"
  },
  {
    id: "aether",
    name: "AETHER",
    role: "Selective Variable Suspension",
    question: "What are we holding back?",
    doctrine: "Suspends variables, manages the vacuum boundary, and maintains the immutable historical ledger. Serves as the bedrock repository for regulatory filings, official registers, and peer-reviewed technical logs.",
    color: "#8B5CF6", // Purple
    iconName: "Database"
  },
  {
    id: "hermes",
    name: "HERMES",
    role: "Sensory Traversal & Evidence Retrieval",
    question: "Where does this link back to?",
    doctrine: "Traverses structured nodes and edges in the evidence graph, discovering new connections and binding every observation to an immutable source_id and hash. Zero inference allowed into the sensory tier.",
    color: "#06B6D4", // Cyan
    iconName: "Network"
  },
  {
    id: "simon",
    name: "SIMON",
    role: "Pattern Detection in the Meaning Field",
    question: "What does this mean?",
    doctrine: "Pattern detection and resonance mapping across heterogeneous technology providers, uncovering latent industrial dependencies, structural bottlenecks, and cross-sector crystal bridges.",
    color: "#10B981", // Emerald
    iconName: "Cpu"
  },
  {
    id: "digital_twin",
    name: "DIGITAL TWIN",
    role: "Interacting State Coordinates",
    question: "How does the system move?",
    doctrine: "Real-time state representations capturing physical boundaries, permeability rules, entities, and empirical observations across both mechanical (Antikythera, Cryochambers) and electromagnetic (CCV-01) regimes.",
    color: "#F59E0B", // Amber
    iconName: "Activity"
  },
  {
    id: "jemma",
    name: "JEMMA",
    role: "Reality Guardian & Invariant Enforcement",
    question: "What are the limits?",
    doctrine: "Enforces physical invariants, detects INFERRED leakage, challenges unproven assumptions, and enforces the boundary: 'If it cannot survive an adversarial challenge, it cannot become conviction.'",
    color: "#EF4444", // Red
    iconName: "ShieldAlert"
  },
  {
    id: "octagon",
    name: "OCTAGON",
    role: "Action Governance & Safety Overrides",
    question: "Is this permitted to cross?",
    doctrine: "Evaluates the Boolean conjunction of required predicates: P_source ∧ P_provenance ∧ P_physics ∧ P_safety ∧ P_authority. Enforces fails-closed security: numerical scores can never override a failed predicate.",
    color: "#EC4899", // Pink
    iconName: "ShieldCheck"
  },
  {
    id: "operator",
    name: "OPERATOR",
    role: "Sovereign Collapse & Authority",
    question: "What is the command?",
    doctrine: "The sovereign human decision-maker. Conversation ≠ Authority. No model, agent, or algorithmic score can mutate production state without explicit, cryptographically verifiable Operator authorization.",
    color: "#F97316", // Orange
    iconName: "UserCheck"
  }
];

/**
 * The Geometric Syntax of Pathfinder (Doctrine.md)
 */
export const GEOMETRIC_SYNTAX_CANON: GeometricSyntaxShape[] = [
  {
    shape: "Circle",
    polygonSides: 32,
    symbolicAspect: "State",
    coreInquiry: "What is currently true?",
    visualOutput: "Continuous, boundary-preserving enclosure representing operational state, isolated nodes, or active equilibrium."
  },
  {
    shape: "Square",
    polygonSides: 4,
    symbolicAspect: "Structure",
    coreInquiry: "What holds it together?",
    visualOutput: "Orthogonal frame, boundary rules, database schemas, and mechanical fixtures defining containment."
  },
  {
    shape: "Triangle",
    polygonSides: 3,
    symbolicAspect: "Direction / Vector",
    coreInquiry: "Where is it going?",
    visualOutput: "Gradient vector, Poynting flux vector S = E × H, drift trajectory, and directional dependency edges."
  },
  {
    shape: "Pentagon",
    polygonSides: 5,
    symbolicAspect: "Adaptation",
    coreInquiry: "How does it adjust?",
    visualOutput: "Dynamic feedback loops, impedance matching networks, and adaptive learning helix iterations."
  },
  {
    shape: "Hexagon",
    polygonSides: 6,
    symbolicAspect: "Relationships / Lattice",
    coreInquiry: "What is it connected to?",
    visualOutput: "Crystal bridge lattices, spatial tiling, close-packing tessellations, and multi-sector dependency graphs."
  },
  {
    shape: "Heptagon",
    polygonSides: 7,
    symbolicAspect: "Time / Cycles",
    coreInquiry: "When does it happen?",
    visualOutput: "Temporal timelines, gear ratio revolutions (Antikythera lunar/solar periods), and epoch milestones."
  },
  {
    shape: "Octagon",
    polygonSides: 8,
    symbolicAspect: "Governance",
    coreInquiry: "What governs it?",
    visualOutput: "Eight-sided safety boundary perimeter enforcing fails-closed access control and predicate conjunctions."
  },
  {
    shape: "Star",
    polygonSides: 10,
    symbolicAspect: "Purpose / Synthesis",
    coreInquiry: "Why does it exist?",
    visualOutput: "Sovereign operator mission convergence, strategic horizon alignment, and epistemic synthesis."
  }
];

/**
 * The 16 Canonical Vocabulary Terms (Vocabulary.md)
 */
export const VOCABULARY_16_CANON: VocabularyTermDefinition[] = [
  {
    term: "Coupling",
    meaning: "The quantified transfer of energy, momentum, or information between two discrete physical or computational domains.",
    physicalContext: "In CCV-01, the electromagnetic impedance match between the internal cavity and the external corridor medium (Z_0 = 377Ω).",
    pillar: "RAPIDS / TWIN"
  },
  {
    term: "Telemetry",
    meaning: "High-frequency, empirical state measurements streamed directly from sensors without synthetic interpolation.",
    physicalContext: "Cryostat thermal readings, RF cavity power sensors, and phase detectors sampled at deterministic time intervals.",
    pillar: "HERMES / AETHER"
  },
  {
    term: "Provenance",
    meaning: "The unbroken, cryptographically bound chain of custody linking an analytical assertion back to its primary source document or instrument.",
    physicalContext: "Every node in the graph is assigned an SHA-256 hash derived from SEC filings, patents, or hardware calibration logs.",
    pillar: "HERMES / JEMMA"
  },
  {
    term: "Doctrine",
    meaning: "The immutable structural principles that govern how data is separated, audited, and cleared before decision-making.",
    physicalContext: "Enforces that numerical optimization cannot override qualitative physics limits or regulatory restrictions.",
    pillar: "OCTAGON"
  },
  {
    term: "Drift",
    meaning: "The gradual, cumulative divergence of physical or algorithmic state from nominal calibration over time or operating cycles.",
    physicalContext: "Thermal expansion in Antikythera gear teeth causing lunar pointer desynchronization; phase error accumulation in RF waveguides.",
    pillar: "JEMMA / TWIN"
  },
  {
    term: "Aperture",
    meaning: "The defined physical or logical boundary through which energy, fields, or queries enter and exit a closed system.",
    physicalContext: "The wave-guide iris in a microwave cavity; the API gateway filter enforcing authentication before data ingress.",
    pillar: "OCTAGON / STRUCTURE"
  },
  {
    term: "Twin",
    meaning: "A mathematically rigorous, real-time computational twin mirroring the physical boundary conditions and state coordinates of an asset.",
    physicalContext: "State vectors [x_t, v_t, T_t, P_t] updated via streaming telemetry to predict failure modes and simulate counterfactuals.",
    pillar: "DIGITAL TWIN"
  },
  {
    term: "Substrate",
    meaning: "The underlying physical or software execution layer that provides the mechanical or computational foundation for operations.",
    physicalContext: "The physical vacuum chamber, cryogenic rail, or low-latency Node/FastAPI runtime upon which algorithms execute.",
    pillar: "RAPIDS / AETHER"
  },
  {
    term: "Signal",
    meaning: "An observed physical or informational change that conveys actionable data distinct from environmental background noise.",
    physicalContext: "A detected regulatory export-control decree, or a sharp drop in RF cavity reflection coefficient indicating resonance.",
    pillar: "CLAUDIA / FILTER"
  },
  {
    term: "State",
    meaning: "The complete set of variables required to specify the exact instantaneous condition of a physical or computational system.",
    physicalContext: "The coordinates {ψ_R, ψ_V, m̂, Z_v, σ_φ, C, E, P, v} describing CCV-01 corridor configuration.",
    pillar: "DIGITAL TWIN / STATE"
  },
  {
    term: "Topology",
    meaning: "The geometric and relational configuration of entities, independent of their absolute physical scale or distance.",
    physicalContext: "The graph structure of the semiconductor lithography supply chain or the multi-rail gear network of the Antikythera mechanism.",
    pillar: "HERMES / SIMON"
  },
  {
    term: "Observer",
    meaning: "An independent sensory or computational agent that measures system state without modifying the observed coordinates.",
    physicalContext: "Jemma monitoring data streams for ungrounded claims without participating in hypothesis generation.",
    pillar: "JEMMA / HERMES"
  },
  {
    term: "Constraint",
    meaning: "A non-negotiable physical, mathematical, or legal boundary condition that circumscribes permissible states.",
    physicalContext: "Thermodynamic Carnot efficiency, maximum allowable stress before material shear, or SEC non-disclosure mandates.",
    pillar: "JEMMA / OCTAGON"
  },
  {
    term: "Evidence",
    meaning: "Empirically documented, verifiable historical fact or sensor measurement with verifiable provenance.",
    physicalContext: "Customs import receipts, spectrometer transmission curves, or signed third-party audit reports.",
    pillar: "AETHER / HERMES"
  },
  {
    term: "Inference",
    meaning: "A model-derived projection, statistical extrapolation, or hypothetical conjecture based on evidence.",
    physicalContext: "A market projection of qubit scaling or an estimated component lifespan calculated via Monte Carlo simulation.",
    pillar: "SIMON / ORION"
  },
  {
    term: "Authority",
    meaning: "The sovereign, legally binding right to approve state mutations, execute financial commitments, or issue mission commands.",
    physicalContext: "Held exclusively by the human Operator; non-sovereign agents possess strictly consultative and exploratory capabilities.",
    pillar: "OPERATOR"
  }
];

/**
 * The 4 Immutable Laws of Pathfinder Architecture
 */
export const PATHFINDER_FOUR_LAWS = [
  {
    number: "I",
    title: "Evidence Before Conviction",
    doctrine: "We do not assume relationships. Every entity is isolated until physical evidence (customs filings, contracts, physical shipments, calibrations) establishes a hard dependency edge."
  },
  {
    number: "II",
    title: "Score ≠ Evidence",
    doctrine: "A high numerical score (e.g. 99/100) or ML confidence rating can never override a failed provenance predicate or violated physical invariant."
  },
  {
    number: "III",
    title: "Conversation ≠ Authority",
    doctrine: "Conversational agents, chat models, and background scripts have zero authority to mutate state. Only the sovereign human Operator can collapse possibilities into commitments."
  },
  {
    number: "IV",
    title: "Immutable Append-Only Ledger",
    doctrine: "Production databases store current state coordinates, while the Aether ledger permanently records all state transitions as append-only cryptographic hashes. History cannot be rewritten."
  }
];

/**
 * Daily Checkpoint Audit 0 Record (DAILY_CHECKPOINT_AUDIT.md)
 */
export const DAILY_CHECKPOINT_AUDIT_RECORD: DailyCheckpointAuditReceipt = {
  timestamp: "2026-09-14T09:40:00Z",
  checkpoint: "CHECKPOINT-001 (Game_one Convergence)",
  auditorModel: "Pathfinder Sovereignty Auditor v2.4",
  buildStatus: "SUCCESS",
  executiveVerdict: "PASS",
  verifiedClaims: [
    "Eight superposed fields codified with strict boundaries",
    "Dirty Dozen security suite actively enforces fails-closed invariants",
    "12-stage causal workflow runtime prevents autonomous state mutations",
    "Double helix learning kernel establishes 6 inter-strand base pairs",
    "Operator signature required for all Stage 11 state commitments"
  ],
  unverifiedClaims: [],
  criticalFindings: [],
  securityFindings: [
    {
      id: "SEC-FINDING-01",
      title: "Score Compensation Vector Neutralized",
      severity: "P1",
      description: "Previous architecture allowed high RAPIDS scores to bypass Gate 09. Resolved via strict Octagon boolean conjunction.",
      correctionOrMitigation: "Enforce P_source ∧ P_provenance ∧ P_physics ∧ P_safety ∧ P_authority at Gate 09."
    },
    {
      id: "SEC-FINDING-02",
      title: "Client-Side Timestamp Forgery Neutralized",
      severity: "P2",
      description: "Pre-genesis date spoofing prevented by establishing 2024-01-01 system floor.",
      correctionOrMitigation: "Deterministic timestamp validation rejects dates earlier than system genesis."
    }
  ],
  transactionalIntegrityAudit: {
    getBeforeWrite: true,
    idempotentRetries: true,
    runTransactionWrapped: true
  },
  realtimeSubscriptionAudit: {
    subscriptionsChecked: 8,
    unmountCleanupsVerified: 8
  }
};
