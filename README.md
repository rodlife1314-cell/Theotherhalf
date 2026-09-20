# Alice-Vessel / Pathfinder Frontier Substrate

> **A sovereign evidence architecture for mapping frontier technology through physical dependencies.**
>
> *"What must physically exist, function, and scale before this technology can become real?"*

---

## 1. Project Overview

**Alice-Vessel** (the *Pathfinder Frontier Substrate*) is not an ordinary speculative analytics application or standard portfolio dashboard. It is an operator-governed, sovereign evidence architecture designed to see beneath the ticker symbol.

Where conventional finance tracks marketing promises and company tickers, Pathfinder works backwards from technological destinations into the physical, industrial, and institutional rails required to deliver them:

$$\text{Destination} \longrightarrow \text{System Architecture} \longrightarrow \text{Manufacturing} \longrightarrow \text{Instrumentation} \longrightarrow \text{Materials} \longrightarrow \text{Energy} \longrightarrow \text{Laboratories} \longrightarrow \text{Evidence}$$

---

### Key Architectural Pillars

#### 1. The Seven Connected Operating Spaces
1. **Doctrine & Store**: Enforces epistemic rules — *evidence before conviction, observation separated from inference, confidence separated from importance, and final authority retained by the Operator*.
2. **Mobile Workspace**: Converts doctrine into a rigorous, responsive daily operational environment.
3. **RAPIDS Lens**: Evaluates entities across cash flow, ecosystem position, capital intensity, government exposure, AI integration, supply-chain criticality, and scientific leadership.
4. **Crystal Bridge**: Uncovers cross-cutting industrial bottlenecks across semiconductor fabrication, photonics, ultra-high vacuum, cryogenic infrastructure, power grids, and advanced materials.
5. **Daily Workflow**: Guides research through an invariant-tested pipeline of investigation, adversarial challenge, decision, and commitment.
6. **Alice Chat**: Provides an interpretive synthesis layer without ever assuming operator authority.
7. **Quantum Universe**: Maintains an evidence-grounded industrial graph mapping companies, physical modalities, dependency edges, bottlenecks, and topological centrality.

#### 2. Governed Multi-Agent Hierarchy
To prevent cognitive capture and hallucinated consensus, no single agent is permitted to collapse evidence, interpretation, and authority into one voice:
* **Operator**: Retains sole, non-delegable decision and commitment authority.
* **Octagon**: Governs authorization boundaries, cryptographic keys, and state transitions.
* **Claudia**: Handles problem decomposition, task routing, and verification scheduling.
* **Hermes**: Conducts supply-chain graph traversals and physical edge discovery.
* **Aether**: Guarantees immutable provenance, telemetry archiving, and evidence storage.
* **Jemma**: Executes continuous adversarial audits, stress tests, and invariant verification.
* **Delta**: Enforces state synchronization and consensus across distributed execution branches.
* **Simon**: Validates schemas, mathematical identities, and bounds cognitive inference:
  $$G_t \overset{\text{SIMON}}{\longrightarrow} \Psi_t$$

#### 3. Physical & Electromagnetic Simulation Engines
* **Orbital Corridor Energy Network**: Physical microwave/RF power beaming and resonant coupling simulator ($S_{\text{orbital}} \rightarrow B_{\text{beam}} \rightarrow R_{\text{ground/orbital}} \rightarrow C_{\text{natural}}$) enforcing Poynting vector flux conservation ($\mathbf{S} = \mathbf{E} \times \mathbf{H}$) and strict anti-free-lunch constraints.
* **CCV-01 Corridor Coupling Vehicle**: Tri-axial vehicle dynamics engine balancing the mass axis ($\hat{m}$), field axis ($\hat{\Psi}_V$), and corridor axis ($\hat{\Psi}_R$).
* **Crucible Defense Auditor**: Automated defense suite subjecting models to the "Dirty Dozen" failure audits (e.g., free-lunch heuristics, static field confusion, phase incoherence, ungrounded resonance).
* **Volumetric Cavity Transformer ($\Omega_G$)**: 3D electromagnetic cavity solver analyzing mode structures ($\text{TE}_{mnp} / \text{TM}_{mnp}$), dielectric boundaries, and internal reflections.
* **SIMON Epistemic Registry ($\mathcal{V} = \mathcal{L} \oplus \mathcal{M}$)**: Formal mathematical and linguistic registry classifying every equation and operational term into strict epistemic tiers.

---

## 2. Installation Instructions

### Prerequisites
* **Node.js**: `v20.x` or higher (Node 20+ recommended)
* **npm**: `v10.x` or higher
* **Git**: Installed and accessible on your PATH

### Step 1: Clone the Repository
```bash
git clone https://github.com/1314productions/alice-vessel.git
cd alice-vessel
```

### Step 2: Install Dependencies
Install all required Node.js packages using npm:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a local environment configuration file:
```bash
cp .env.example .env.local
```

Edit `.env.local` to configure your API keys:
```env
# Server-side Gemini API key for interpretive intelligence & audit routines
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Security Notice**: All Gemini API queries and LLM invocations occur server-side through Next.js API Routes (`/api/*`). The `GEMINI_API_KEY` is never exposed to the client bundle.

---

## 3. Basic Usage

### Running the Development Server
Start the local Next.js development server:
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production
To generate a production-ready optimized build:
```bash
npm run build
```

To run the production server:
```bash
npm run start
```

### Running Static Analysis & Linting
Execute ESLint across the codebase:
```bash
npm run lint
```

---

## 4. Operating Guide & Feature Walkthrough

The platform presents a unified, tab-based sovereign command cockpit. The key workspaces include:

### 1. Orbital Energy Grid (`nav-tab-orbital-energy`)
* **Orbital Selection**: Toggle between Geostationary Orbit (**GEO**, $d\theta/dt \approx 0$, invariant pointing lock) and Low Earth Orbit (**LEO**, dynamic slew, high Doppler shift).
* **Carrier Frequency Tuning**: Test 2.45 GHz (deep rain penetration), 5.8 GHz (balanced aperture), 35.0 GHz (Ka-band), and 94.0 GHz (millimeter-wave atmospheric window).
* **Phase Coherence Simulation**: Simulate constructive phased-array alignment vs. stochastic phase jitter to observe wavefront collapse.
* **JEMMA Audit Invariants**: Verify the 6 core physical laws (ambient flux bounds, Poynting vector flux verification, path loss attenuation, relativistic light delay, and total energy conservation).

### 2. SIMON & Epistemic Registry (`nav-tab-simon-registry`)
* **Lexicon ($\mathcal{L}$)**: Inspect canonical definitions for sovereign entities (Operator, Octagon, Jemma, Simon, Rail, Destination, Corridor).
* **Mathematical Symbols ($\mathcal{M}$)**: Review strict formal definitions, SI base units, and allowed operations for symbols like $\mathbf{S}$, $G_t$, $\Psi_t$, and $\Omega_G$.
* **Epistemic Classification Matrix**: Audit whether terms are marked as `STANDARD_IDENTITY`, `PHYSICAL_SOLVER`, `PHENOMENOLOGICAL_ANALOG`, or `HEURISTIC_PROXY`.
* **Bounded Inference Engine ($G_t \rightarrow \Psi_t$)**: Execute the 7-point SIMON inference contract against verified geometries and trigger adversarial JEMMA cross-audits.

### 3. Crucible Defense Auditor (`nav-tab-crucible`)
* Run automated stress tests against the **Dirty Dozen** intellectual failure modes:
  1. *Free-Lunch Fallacy* ($P_{\text{out}} > P_{\text{in}}$)
  2. *Static Field Confusion* (treating static $V/m$ as power flux)
  3. *Zero-Loss Propagation*
  4. *Unphysical Phase Delays*
  5. *Ungrounded Resonance Claims*
  6. *Symmetry Conflated with Resonance*
  7. *Dimensionless Force Heuristics*
  8. *Missing Return Path*
  9. *Ignored Thermal Degradation*
  10. *Boundary Condition Collapse*
  11. *Authority-Interpretation Collapse*
  12. *Unverified External Dependency Claims*

### 4. Causal Workflow & Parallel Cognition (`nav-tab-causal-workflow`, `nav-tab-parallel-cognition`)
* **12-Stage Causal Pipeline**: Track observations from raw telemetry ingestion, boundary definition, and invariant tests through counterfactual simulation, risk scoring, and Operator commitment.
* **5-Branch Parallel Cognition**: Simultaneously review the *Energy Branch*, *Dynamics Branch*, *Counterfactual Branch*, *SIMON Reasoning Branch*, and *Immutable Provenance Branch*.

### 5. CCV-01 Vehicle Studio (`nav-tab-ccv01`)
* Monitor the Corridor Coupling Vehicle state:
  * Mass axis ($\hat{m}$), field axis ($\hat{\Psi}_V$), and corridor coupling axis ($\hat{\Psi}_R$).
  * Real-time Poynting flux intake ($\mathbf{S}$), thermal margin, and stability envelope.
  * Flight modes: *Stationary*, *Corridor Ingestion*, *Cruise*, *Slew Maneuver*, and *Decoupled Gliding*.

### 6. Field Workbench & 3D Volumetric Cavity (`nav-tab-workbench`, `nav-tab-volumetric-cavity`)
* Interactive 2D Poynting field simulation with customizable regular polygon boundary modes ($G_3 \dots G_\infty$).
* Interactive 3D cavity modal structure visualizer with standing TE/TM waves and field concentration contours.

---

## 5. Epistemic Classification Taxonomy

Every formulation, parameter, and inference in Alice-Vessel is categorized into one of eight sovereign epistemic tiers:

| Tier | Classification | Description | Example |
| :--- | :--- | :--- | :--- |
| **01** | `STANDARD_IDENTITY` | Derived directly from foundational physics or exact mathematics | $\mathbf{S} = \mathbf{E} \times \mathbf{H}$, $c = \frac{1}{\sqrt{\epsilon_0 \mu_0}}$ |
| **02** | `PHYSICAL_SOLVER` | Numerical integration of established field equations | FDTD wave propagation, Poynting aperture integrals |
| **03** | `PHENOMENOLOGICAL_ANALOG` | Valid mathematical analogy mapped from another physical domain | Acoustic-EM cavity analogies, equivalent circuit models |
| **04** | `HEURISTIC_PROXY` | Empirical approximation or rule-of-thumb; must never masquerade as exact law | 68% capture rules, dimensionless thrust scores ($\Pi_{\text{proxy}}$) |
| **05** | `PHYSICAL_CONSERVATION` | Conservation of energy, momentum, or charge | $\Delta E = 0$, $\nabla \cdot \mathbf{B} = 0$ |
| **06** | `ACCOUNTING_CONSISTENCY` | Internal financial, resource, or state-vector balance | Portfolio sum balance, cash flow allocation |
| **07** | `MODEL_INTERNAL_CONSISTENCY` | Consistency within an abstract state machine | State transition graph invariance |
| **08** | `EMPIRICAL_VALIDATION` | Grounded by experimental or real-world instrumented data | Laboratory telemetry, measured S-parameters |

---

## 6. Directory Structure

```
├── app/
│   ├── api/gemini/generate/    # Server-side Gemini API inference routes
│   ├── globals.css             # Tailwind v4 styles & animation utilities
│   ├── layout.tsx              # Root HTML layout with typography & metadata
│   └── page.tsx                # Master cockpit view & interactive tab router
├── components/
│   ├── CCV01VehicleStudio.tsx                # CCV-01 flight telemetry & controls
│   ├── CausalWorkflowEngine.tsx              # 12-stage epistemic causal pipeline
│   ├── CrucibleDefenseAuditor.tsx            # Dirty Dozen adversarial stress suite
│   ├── DoctrineSpace.tsx                     # 8-field canon & sovereign doctrine
│   ├── LearningHelixKernel.tsx               # Pedagogical base-pair learning kernel
│   ├── OperatorDashboard.tsx                 # Manual operator control console
│   ├── OrbitalCorridorEnergySandbox.tsx      # Resonant coupling & Poynting network
│   ├── ParallelCognitionEngine.tsx           # 5-branch concurrent reasoning engine
│   ├── PathfinderCognitiveLayer.tsx          # Supervisory cognition & risk postures
│   ├── SimonInferenceRegistryWorkbench.tsx   # Simon registry & inference engine
│   ├── TransportMediumView.tsx               # Rail medium & physical infrastructure
│   ├── VesselEngineArchitecture.tsx          # CCV-01 core architecture cockpit
│   └── VolumetricCavityTransformer.tsx       # 3D cavity mode (Ω_G) visualizer
├── lib/
│   ├── ccv01-vehicle-engine.ts         # Vehicle kinematics & Poynting dynamics
│   ├── pathfinder-cognition-engine.ts  # Multi-agent cognitive decision engine
│   ├── physics-engine.ts               # Electromagnetic & Poynting vector math
│   ├── simon-inference-registry.ts     # Epistemic registry & Simon inference
│   └── utils.ts                        # Tailwind class utilities (cn)
├── metadata.json                       # Application metadata & frame permissions
├── package.json                        # Dependencies and build scripts
└── tsconfig.json                       # TypeScript compiler configuration
```

---

## 7. Development & Contribution Doctrine

All changes to the codebase must adhere to the **Pathfinder Invariant Protocol**:
1. **Never conflate observation with inference**: State telemetry plainly before drawing qualitative conclusions.
2. **Never violate energy conservation**: No model may create power without identifying the external physical source ($P_{\text{out}} \le \sum P_{\text{in}}$).
3. **Keep agents bounded**: Jemma audits, Simon interprets and validates schemas, Claudia coordinates, and only the Human Operator authorizes actions.
4. **Preserve full type safety**: Run `npm run lint` and `npm run build` prior to committing changes.

---

## 8. License

This project is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.

*Built for sovereign technological analysis. Seeing beneath the ticker.* 🦾🐾
