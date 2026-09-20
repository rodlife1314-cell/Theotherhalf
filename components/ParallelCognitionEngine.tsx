/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Substrate — Parallel Cognition Engine
 * Multi-Branch Specialist Reasoning & Epistemic Convergence
 * Direct codification from https://github.com/rodlife1314-cell/Game_one
 */

"use client";

import React, { useState } from "react";
import {
  Cpu,
  Shield,
  GitBranch,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Fingerprint,
  Lock,
  Terminal,
  Activity,
  Zap,
  Layers,
  Clock,
  Radio,
  Database,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Key
} from "lucide-react";
import {
  ParallelBranchReceipt,
  OctagonPredicateConjunction
} from "../lib/game-one-types";

type SimulationScenario = "NOMINAL" | "TWR_COLLAPSE" | "COLD_ELECTROCHEMICAL" | "INFERRED_LEAKAGE" | "STALE_FRAME";

export const ParallelCognitionEngine: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>("NOMINAL");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(0);
  const [operatorSigned, setOperatorSigned] = useState<boolean>(false);
  const [operatorKey, setOperatorKey] = useState<string>("OP-SOV-ALPHA-909");
  const [branches, setBranches] = useState<ParallelBranchReceipt[]>([]);
  const [jemmaViolations, setJemmaViolations] = useState<string[]>([]);
  const [aetherReceipt, setAetherReceipt] = useState<string | null>(null);

  // Generate the 5 specialist branches based on active scenario
  const generateBranches = (scenario: SimulationScenario): ParallelBranchReceipt[] => {
    const isTwrFailure = scenario === "TWR_COLLAPSE";
    const isColdFailure = scenario === "COLD_ELECTROCHEMICAL";
    const isInferredLeakage = scenario === "INFERRED_LEAKAGE";
    const isStaleFrame = scenario === "STALE_FRAME";

    return [
      {
        receiptId: "rcpt-astra-phys-01",
        branchId: "BRANCH_ENERGY",
        assignedAgent: "Astra (Physics / Field Solver)",
        hypothesisTitle: "Corridor Coupling & Boundary Power Density",
        epistemicTier: "MEASURED",
        provenanceHash: "0x4a8f912c...",
        executionDurationMs: 48,
        physicalPredicatesSatisfied: !isTwrFailure,
        findings: [
          `Poynting vector flux S = ${isTwrFailure ? "0.41 MW/m² (Collapse: TWR < 1.0)" : "1.84 MW/m² (Nominal)"}`,
          "Cavity impedance match ratio Z_load / Z_0 = 0.985",
          isTwrFailure ? "CRITICAL: Thrust-to-weight ratio fell to 0.72g; boundary containment lost." : "Boundary containment confirmed stable across all azimuths."
        ],
        numericalMetrics: {
          thrust_to_weight: isTwrFailure ? "0.72" : "1.88",
          q_factor: "45,200",
          boundary_temperature_k: "4.2"
        }
      },
      {
        receiptId: "rcpt-orion-counter-02",
        branchId: "BRANCH_COUNTERFACTUAL",
        assignedAgent: "Orion (Counterfactuals / Perturbations)",
        hypothesisTitle: "Impedance Disruption & Shear Resistance",
        epistemicTier: "DERIVED",
        provenanceHash: "0x88c2a91f...",
        executionDurationMs: 62,
        physicalPredicatesSatisfied: true,
        findings: [
          "Simulated 10% corridor plasma density perturbation",
          "Dynamic impedance recovery latency calculated at 3.8ms",
          "No catastrophic runaway detected in non-linear feedback loop"
        ],
        numericalMetrics: {
          recovery_ms: "3.8",
          damping_ratio: "0.82"
        }
      },
      {
        receiptId: "rcpt-simon-meaning-03",
        branchId: "BRANCH_SIMON_REASONING",
        assignedAgent: "Simon (Meaning Field / Crystal Bridge)",
        hypothesisTitle: "Cross-Sector Superconducting Resonance",
        epistemicTier: isInferredLeakage ? "INFERRED" : "DERIVED",
        provenanceHash: isInferredLeakage ? "0x00000000_UNBOUND" : "0x9c31b87a...",
        executionDurationMs: 34,
        physicalPredicatesSatisfied: !isInferredLeakage,
        findings: [
          isInferredLeakage
            ? "UNVERIFIED CLAIM: Hypothesized 10x cryogenic efficiency scaling without empirical lab data."
            : "Mapped HTS magnet supply chain overlap between Tokamak fusion and quantum cryochambers.",
          "Identified shared reliance on REBCO tape manufacturers."
        ],
        numericalMetrics: {
          supply_overlap: "74%",
          rebco_bottleneck_score: "88/100"
        }
      },
      {
        receiptId: "rcpt-determ-kinematics-04",
        branchId: "BRANCH_DETERMINISTIC",
        assignedAgent: "Kinematic Engine (BigInt Rational Arithmetic)",
        hypothesisTitle: "Antikythera Precision Gear Train Calibration",
        epistemicTier: "MEASURED",
        provenanceHash: "0x11749eb3...",
        executionDurationMs: 14,
        physicalPredicatesSatisfied: true,
        findings: [
          "Exact gear ratio evaluated: 254 / 19 = 13.36842105 (Metonic lunar cycle)",
          "Backlash clearance = 0.045mm across all 32 meshing teeth",
          "Zero floating-point drift: Solved using strict integer fraction math"
        ],
        numericalMetrics: {
          exact_ratio: "254/19",
          backlash_mm: "0.045",
          drift_per_century_sec: "0.0"
        }
      },
      {
        receiptId: "rcpt-hermes-provenance-05",
        branchId: "BRANCH_PROVENANCE",
        assignedAgent: "Hermes (Sensory & Evidence Ledger)",
        hypothesisTitle: "Primary Document Verification & Custody",
        epistemicTier: "MEASURED",
        provenanceHash: isColdFailure ? "0xDEAD_STALE_FRAME" : "0x55ef0192...",
        executionDurationMs: 28,
        physicalPredicatesSatisfied: !isColdFailure && !isStaleFrame,
        findings: [
          isColdFailure
            ? "CRITICAL: Cryogenic cell pressure sensor telemetry dropped out. Frame invalid."
            : isStaleFrame
            ? "FRAME EXPIRED: Telemetry timestamp is 420 seconds older than current consensus block."
            : "All 18 sensor telemetry streams corroborated against NIST calibrated standards.",
          "Unbroken SHA-256 chain from hardware ADC to memory buffer."
        ],
        numericalMetrics: {
          sensor_streams: "18",
          time_drift_ms: isStaleFrame ? "420,000" : "1.2"
        }
      }
    ];
  };

  const handleRunPipeline = () => {
    setIsRunning(true);
    setExecutionStep(1);
    setOperatorSigned(false);
    setAetherReceipt(null);
    setJemmaViolations([]);

    // Step 1: Claudia Decomposition
    setTimeout(() => {
      setExecutionStep(2);
      const generated = generateBranches(activeScenario);
      setBranches(generated);

      // Step 2: Specialist branches complete -> Step 3: Jemma Epistemic Audit
      setTimeout(() => {
        setExecutionStep(3);
        const violations: string[] = [];

        if (activeScenario === "TWR_COLLAPSE") {
          violations.push("Astra Physics Branch: Thrust-to-weight ratio fell below unity (0.72 < 1.0). Physical boundary failure.");
        }
        if (activeScenario === "COLD_ELECTROCHEMICAL") {
          violations.push("Hermes Provenance: Cryogenic pressure telemetry missing valid hardware ADC signature.");
        }
        if (activeScenario === "INFERRED_LEAKAGE") {
          violations.push("Simon Meaning Field: INFERRED hypothesis leaked into sensory tier without empirical evidence hash.");
        }
        if (activeScenario === "STALE_FRAME") {
          violations.push("Hermes Sensor Gate: Telemetry packet age exceeds maximum allowable drift (>400s old).");
        }

        setJemmaViolations(violations);

        // Step 4: Alice Synthesis
        setTimeout(() => {
          setExecutionStep(4);

          // Step 5: Octagon Conjunction
          setTimeout(() => {
            setExecutionStep(5);
            setIsRunning(false);
          }, 300);
        }, 350);
      }, 400);
    }, 350);
  };

  const handleSignAndCommit = () => {
    setOperatorSigned(true);
    setExecutionStep(6);

    setTimeout(() => {
      const hash = "0x" + Array.from({ length: 64 }, (_, i) => 
        ((i * 29 + operatorKey.charCodeAt(i % operatorKey.length)) % 16).toString(16)
      ).join("");
      setAetherReceipt(hash);
      setExecutionStep(7);
    }, 300);
  };

  const handleReset = () => {
    setExecutionStep(0);
    setBranches([]);
    setJemmaViolations([]);
    setOperatorSigned(false);
    setAetherReceipt(null);
  };

  // Evaluate Octagon Conjunction
  const pPhysics = !branches.some(b => !b.physicalPredicatesSatisfied);
  const pProvenance = jemmaViolations.length === 0;
  const pSource = true;
  const pSafety = true;
  const pAuthority = operatorSigned;
  const overallOctagonPass = pPhysics && pProvenance && pSource && pSafety && pAuthority;

  return (
    <div className="bg-[#0B0D12] p-6 rounded-2xl border border-[#1E222D] text-[#E6E4DF] space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-[#1E222D] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#14231E] border border-[#1B4332] rounded-xl flex items-center justify-center text-[#34D399] shadow-sm">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium tracking-tight text-[#E6E4DF]">
                Parallel Cognition Engine
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#10B981]/30 bg-[#10B981]/10 text-[#34D399]">
                5 SPECIALIST BRANCHES
              </span>
            </div>
            <p className="text-xs text-[#8A8F9A] mt-0.5">
              Multi-branch specialist reasoning, Jemma reality audit, Octagon gate conjunction, and Sovereign Operator collapse
            </p>
          </div>
        </div>

        {/* Scenario Selector & Run Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={activeScenario}
            onChange={(e) => {
              setActiveScenario(e.target.value as SimulationScenario);
              handleReset();
            }}
            className="bg-[#12151D] border border-[#222736] rounded-lg px-3 py-1.5 text-xs text-[#E6E4DF] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="NOMINAL">Scenario: Nominal Convergence</option>
            <option value="TWR_COLLAPSE">Scenario: TWR Boundary Collapse</option>
            <option value="COLD_ELECTROCHEMICAL">Scenario: Cold Telemetry Dropout</option>
            <option value="INFERRED_LEAKAGE">Scenario: Inferred Hypothesis Leakage</option>
            <option value="STALE_FRAME">Scenario: Stale Telemetry Frame</option>
          </select>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-[#262B3A] text-[#8A8F9A] hover:text-[#E6E4DF] hover:bg-[#151821] transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-[#C5A059] text-[#0D0E11] text-xs font-semibold hover:bg-[#D4B06A] transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Executing Specialists..." : "Dispatch Parallel Cognition"}</span>
          </button>
        </div>
      </div>

      {/* Execution Pipeline Steps Status */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {[
          { label: "1. Decomposition", step: 1 },
          { label: "2. 5 Specialists", step: 2 },
          { label: "3. Jemma Audit", step: 3 },
          { label: "4. Alice Synthesis", step: 4 },
          { label: "5. Octagon Gate", step: 5 },
          { label: "6. Operator Gate", step: 6 },
          { label: "7. Aether Ledger", step: 7 }
        ].map((item) => {
          const isActive = executionStep === item.step;
          const isDone = executionStep > item.step;

          return (
            <div
              key={item.step}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isActive
                  ? "bg-[#C5A059]/15 border-[#C5A059] text-[#C5A059]"
                  : isDone
                  ? "bg-[#101F18] border-[#1B4332] text-[#34D399]"
                  : "bg-[#10131A] border-[#1C202C] text-[#8A8F9A]"
              }`}
            >
              <div className="text-[10px] font-mono">{item.label}</div>
              <div className="text-[9px] font-mono mt-0.5">
                {isDone ? "COMPLETE" : isActive ? "ACTIVE" : "QUEUED"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Specialist Branches 5-Card Grid */}
      {branches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#8A8F9A] px-1">
            <span>PARALLEL SPECIALIST BRANCHES (DISPATCHED BY CLAUDIA)</span>
            <span>5/5 CONVERGED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {branches.map((b) => (
              <div
                key={b.receiptId}
                className={`p-4 rounded-xl border space-y-3 transition-all ${
                  b.physicalPredicatesSatisfied
                    ? "bg-[#10141D] border-[#1D2433]"
                    : "bg-[#1E1114] border-[#4A1D24]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A2030] text-[#60A5FA] border border-[#27324D]">
                      {b.assignedAgent}
                    </span>
                    <h4 className="text-xs font-semibold text-[#E6E4DF] mt-1.5">{b.hypothesisTitle}</h4>
                  </div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    b.epistemicTier === "MEASURED"
                      ? "bg-[#064E3B]/40 text-[#34D399] border border-[#059669]/30"
                      : b.epistemicTier === "DERIVED"
                      ? "bg-[#1E3A8A]/40 text-[#93C5FD] border border-[#2563EB]/30"
                      : "bg-[#78350F]/40 text-[#FBBF24] border border-[#D97706]/30"
                  }`}>
                    {b.epistemicTier}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-[#9CA3AF]">
                  {b.findings.map((f, i) => (
                    <div key={i} className="text-[11px] leading-relaxed flex items-start space-x-1.5">
                      <span className="text-[#8A8F9A] mt-0.5">›</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {b.numericalMetrics && (
                  <div className="pt-2 border-t border-[#1C212E] grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                    {Object.entries(b.numericalMetrics).map(([k, v]) => (
                      <div key={k} className="p-1.5 rounded bg-[#0A0C11] border border-[#161A24]">
                        <span className="text-[#8A8F9A] block uppercase truncate">{k.replace(/_/g, " ")}</span>
                        <span className="text-[#E6E4DF] font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-[9px] font-mono text-[#8A8F9A] truncate">
                  Hash: {b.provenanceHash} · Latency: {b.executionDurationMs}ms
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Jemma Reality Guardian Audit Result */}
      {executionStep >= 3 && (
        <div className={`p-4 rounded-xl border space-y-2 ${
          jemmaViolations.length === 0
            ? "bg-[#101F18] border-[#1B4332]"
            : "bg-[#251216] border-[#4A1D24]"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {jemmaViolations.length === 0 ? (
                <ShieldCheck className="w-5 h-5 text-[#34D399]" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-[#F87171]" />
              )}
              <h3 className="text-xs font-semibold text-[#E6E4DF]">
                Jemma Cross-Branch Epistemic Audit
              </h3>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
              jemmaViolations.length === 0
                ? "bg-[#064E3B] text-[#34D399] border border-[#059669]"
                : "bg-[#450A0A] text-[#F87171] border border-[#DC2626]"
            }`}>
              {jemmaViolations.length === 0 ? "AUDIT PASSED (0 INVARIANT VIOLATIONS)" : `${jemmaViolations.length} INVARIANT VIOLATIONS`}
            </span>
          </div>

          {jemmaViolations.length > 0 ? (
            <div className="space-y-1.5 pt-1">
              {jemmaViolations.map((v, i) => (
                <div key={i} className="text-xs font-mono text-[#FCA5A5] p-2 rounded bg-[#1B0C0E] border border-[#3A1418]">
                  {v}
                </div>
              ))}
              <p className="text-[11px] text-[#F87171] pt-1">
                Octagon Gate 09 will refuse clearance until invariant violations are resolved.
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#A7F3D0] leading-relaxed">
              Jemma verified: No ungrounded inferences leaked into sensory coordinates, all sensor frames are fresh, and thermodynamic boundary conditions hold.
            </p>
          )}
        </div>
      )}

      {/* Octagon Conjunction & Operator Authority Gate */}
      {executionStep >= 5 && (
        <div className="p-5 rounded-xl bg-[#141824] border border-[#232F4D] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E263B] gap-2">
            <div>
              <h3 className="text-sm font-semibold text-[#E6E4DF] flex items-center space-x-2">
                <Shield className="w-4 h-4 text-[#60A5FA]" />
                <span>Octagon Conjunction Gate & Sovereign Operator Clearance</span>
              </h3>
              <p className="text-xs text-[#8A8F9A] mt-0.5">
                P_source ∧ P_provenance ∧ P_physics ∧ P_safety ∧ P_authority
              </p>
            </div>

            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg ${
              overallOctagonPass
                ? "bg-[#064E3B] text-[#34D399] border border-[#059669]"
                : "bg-[#29171C] text-[#F87171] border border-[#4A1D24]"
            }`}>
              {overallOctagonPass ? "GATE 09 CLEARED" : "GATE 09 BLOCKED"}
            </span>
          </div>

          {/* Predicate Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            <div className={`p-2 rounded border text-center ${pSource ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
              <div>P_source</div>
              <div className="text-[10px] mt-0.5">{pSource ? "PASS" : "FAIL"}</div>
            </div>
            <div className={`p-2 rounded border text-center ${pProvenance ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
              <div>P_provenance</div>
              <div className="text-[10px] mt-0.5">{pProvenance ? "PASS" : "FAIL"}</div>
            </div>
            <div className={`p-2 rounded border text-center ${pPhysics ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
              <div>P_physics</div>
              <div className="text-[10px] mt-0.5">{pPhysics ? "PASS" : "FAIL"}</div>
            </div>
            <div className={`p-2 rounded border text-center ${pSafety ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
              <div>P_safety</div>
              <div className="text-[10px] mt-0.5">{pSafety ? "PASS" : "FAIL"}</div>
            </div>
            <div className={`p-2 rounded border text-center ${pAuthority ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#78350F]/40 border-[#D97706]/40 text-[#FBBF24]"}`}>
              <div>P_authority</div>
              <div className="text-[10px] mt-0.5">{pAuthority ? "SIGNED" : "PENDING"}</div>
            </div>
          </div>

          {/* Operator Decision Gate Input */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Key className="w-3.5 h-3.5 text-[#8A8F9A] absolute left-3 top-2.5" />
              <input
                type="text"
                value={operatorKey}
                onChange={(e) => setOperatorKey(e.target.value)}
                placeholder="OP-SOV-KEY"
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0C0E14] border border-[#262D3F] text-xs text-[#E6E4DF] font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <button
              onClick={handleSignAndCommit}
              disabled={operatorSigned || !pPhysics || !pProvenance}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#C5A059] text-[#0D0E11] text-xs font-bold hover:bg-[#D4B06A] transition disabled:opacity-40 shrink-0 flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{operatorSigned ? "Sovereign Signature Registered" : "Sign & Authorize Commitment"}</span>
            </button>
          </div>

          {/* Immutable Aether Receipt */}
          {aetherReceipt && (
            <div className="p-3.5 rounded-xl bg-[#0F131C] border border-[#21293B] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2 text-[#A5B4FC]">
                <Database className="w-4 h-4" />
                <span>Aether Ledger Block Committed:</span>
                <span className="text-[#E6E4DF]">{aetherReceipt.substring(0, 24)}...</span>
              </div>
              <span className="text-[10px] text-[#34D399] px-2 py-0.5 rounded bg-[#064E3B]/40 border border-[#059669]/40">
                STATE PERSISTED
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
