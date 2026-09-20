/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Substrate — Causal Workflow Engine (12-Stage Cognitive Pipeline)
 * Direct codification from https://github.com/rodlife1314-cell/Game_one
 */

"use client";

import React, { useState } from "react";
import {
  Workflow,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  Eye,
  Network,
  Gauge,
  Sparkles,
  Scale,
  UserCheck,
  Check,
  Database,
  RefreshCw,
  FileText,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  Zap,
  Play,
  RotateCcw,
  Key,
  Lock,
  CornerDownRight,
  SkipForward
} from "lucide-react";
import { CausalSignalPipeline, PipelineStep } from "../lib/game-one-types";
import {
  SAMPLE_CAUSAL_PIPELINES,
  stepForwardWorkflow,
  stepBackwardWorkflow,
  recordOperatorDecision,
  evaluateOctagonGate
} from "../lib/causalWorkflowRuntime";

export const CausalWorkflowEngine: React.FC = () => {
  const [pipelines, setPipelines] = useState<CausalSignalPipeline[]>(SAMPLE_CAUSAL_PIPELINES);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>(SAMPLE_CAUSAL_PIPELINES[0].id);
  const [operatorKey, setOperatorKey] = useState<string>("OP-SOV-ALPHA-909");
  const [runtimeStatusMessage, setRuntimeStatusMessage] = useState<string | null>(null);

  const activePipeline = pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];
  const currentStep = activePipeline.steps[activePipeline.currentStepIndex] || activePipeline.steps[0];
  const octagonEvaluation = evaluateOctagonGate(activePipeline, !!activePipeline.operatorSigned);

  const updatePipeline = (updated: CausalSignalPipeline) => {
    setPipelines(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleStepForward = () => {
    const result = stepForwardWorkflow(activePipeline, operatorKey);
    updatePipeline(result.pipeline);
    setRuntimeStatusMessage(result.message);
  };

  const handleStepBackward = () => {
    const updated = stepBackwardWorkflow(activePipeline);
    updatePipeline(updated);
    setRuntimeStatusMessage(`Stepped back to Stage ${updated.steps[updated.currentStepIndex].stepNumber}`);
  };

  const handleOperatorDecision = (decision: "APPROVE" | "HOLD" | "REJECT") => {
    const result = recordOperatorDecision(activePipeline, decision, operatorKey);
    updatePipeline(result.pipeline);
    setRuntimeStatusMessage(result.message);
  };

  const handleResolveJemmaObjection = () => {
    const updated: CausalSignalPipeline = {
      ...activePipeline,
      disagreementState: {
        agent: "Jemma",
        challenge: "Domestic strategic reserve claims updated: Verified via official customs audit to 6 months. Resolved.",
        status: "RESOLVED"
      }
    };
    updatePipeline(updated);
    setRuntimeStatusMessage("Jemma challenge resolved with empirical customs registry corroboration.");
  };

  return (
    <div className="bg-[#0B0D12] p-6 rounded-2xl border border-[#1E222D] text-[#E6E4DF] space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-[#1E222D] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#162238] border border-[#1E3A8A] rounded-xl flex items-center justify-center text-[#60A5FA] shadow-sm">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium tracking-tight text-[#E6E4DF]">
                Causal Workflow Engine
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA]">
                12-STAGE RUNTIME PIPELINE
              </span>
            </div>
            <p className="text-xs text-[#8A8F9A] mt-0.5">
              Monotonic state machine enforcing separation, Jemma friction, Octagon boolean gates, and Operator sovereignty
            </p>
          </div>
        </div>

        {/* Pipeline Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#8A8F9A] font-mono">Active Pipeline:</span>
          <select
            value={selectedPipelineId}
            onChange={(e) => {
              setSelectedPipelineId(e.target.value);
              setRuntimeStatusMessage(null);
            }}
            className="bg-[#12151D] border border-[#222736] rounded-lg px-3 py-1.5 text-xs text-[#E6E4DF] focus:outline-none focus:border-[#C5A059]"
          >
            {pipelines.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Runtime Status Notice */}
      {runtimeStatusMessage && (
        <div className="p-3 rounded-xl bg-[#141824] border border-[#222B3D] text-xs font-mono text-[#93C5FD] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>{runtimeStatusMessage}</span>
          </div>
          <button
            onClick={() => setRuntimeStatusMessage(null)}
            className="text-[10px] text-[#8A8F9A] hover:text-[#E6E4DF]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 12-Stage Visual Progress Bar */}
      <div className="p-4 rounded-xl bg-[#10131A] border border-[#1C202C]">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8F9A] mb-2">
          <span>PIPELINE PROGRESS: STAGE {currentStep.stepNumber} OF 12</span>
          <span className="text-[#C5A059] font-bold">{currentStep.name}</span>
        </div>
        <div className="grid grid-cols-12 gap-1.5">
          {activePipeline.steps.map((step, idx) => {
            const isCurrent = idx === activePipeline.currentStepIndex;
            const isPassed = idx < activePipeline.currentStepIndex;
            const isHalted = step.status === "HALTED";

            return (
              <div
                key={step.stepNumber}
                title={`Stage ${step.stepNumber}: ${step.name}`}
                className={`h-2 rounded transition-all ${
                  isHalted
                    ? "bg-[#EF4444]"
                    : isCurrent
                    ? "bg-[#C5A059] ring-2 ring-[#C5A059]/50"
                    : isPassed
                    ? "bg-[#34D399]"
                    : "bg-[#1E222D]"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="p-5 rounded-xl bg-[#12151E] border border-[#222736] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#1E222D]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30">
                STAGE {currentStep.stepNumber}
              </span>
              <h3 className="text-base font-semibold text-[#E6E4DF]">{currentStep.name}</h3>
            </div>
            <div className="text-xs text-[#8A8F9A] mt-1">
              Actor: <span className="text-[#60A5FA] font-mono">{currentStep.actor}</span> · Role: {currentStep.role}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleStepBackward}
              disabled={activePipeline.currentStepIndex === 0}
              className="px-3 py-1.5 rounded-lg border border-[#262B3A] text-xs text-[#8A8F9A] hover:text-[#E6E4DF] hover:bg-[#1A1E29] transition disabled:opacity-40"
            >
              Previous Stage
            </button>
            <button
              onClick={handleStepForward}
              disabled={activePipeline.currentStepIndex >= 11}
              className="px-4 py-1.5 rounded-lg bg-[#C5A059] text-[#0D0E11] text-xs font-semibold hover:bg-[#D4B06A] transition disabled:opacity-40 flex items-center space-x-1.5"
            >
              <span>Advance Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Summary & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-[#0C0E14] border border-[#1A1D27] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Operational Summary</div>
            <p className="text-[#D1D5DB] leading-relaxed">{currentStep.actionSummary}</p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#0C0E14] border border-[#1A1D27] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Execution Details</div>
            <p className="text-[#9CA3AF] leading-relaxed font-mono text-[11px]">{currentStep.details}</p>
          </div>
        </div>

        {/* Jemma Active Objection Panel (When at Stage 07) */}
        {activePipeline.disagreementState?.status === "ACTIVE_OBJECTION" && (
          <div className="p-4 rounded-xl bg-[#2A1417] border border-[#521C22] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#F87171] font-semibold text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>Jemma Adversarial Objection Active</span>
              </div>
              <span className="text-[10px] font-mono text-[#FCA5A5] px-2 py-0.5 rounded bg-[#450A0A] border border-[#7F1D1D]">
                FRICTION REQUIRED
              </span>
            </div>
            <p className="text-xs text-[#E6E4DF] font-mono bg-[#1E0D0F] p-2.5 rounded-lg border border-[#3D1418]">
              {activePipeline.disagreementState.challenge}
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#F87171]">
                Gate 09 Octagon evaluation will FAIL until provenance challenge is resolved.
              </span>
              <button
                onClick={handleResolveJemmaObjection}
                className="px-3 py-1 bg-[#10B981] text-[#062419] text-xs font-semibold rounded-lg hover:bg-[#34D399] transition"
              >
                Resolve with Customs Audit
              </button>
            </div>
          </div>
        )}

        {/* Gate 09: Octagon Policy Conjunction Gate */}
        {currentStep.stepNumber === "09" && (
          <div className="p-4 rounded-xl bg-[#141926] border border-[#232F4D] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#60A5FA] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Gate 09: Octagon Invariant Boolean Conjunction</span>
              </span>
              <span className="text-[10px] font-mono text-[#8A8F9A]">
                P_source ∧ P_provenance ∧ P_physics ∧ P_safety ∧ P_authority
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs font-mono">
              <div className={`p-2 rounded border ${octagonEvaluation.pSource ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
                <div>P_source</div>
                <div className="text-[10px]">{octagonEvaluation.pSource ? "PASS" : "FAIL"}</div>
              </div>
              <div className={`p-2 rounded border ${octagonEvaluation.pProvenance ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
                <div>P_provenance</div>
                <div className="text-[10px]">{octagonEvaluation.pProvenance ? "PASS" : "FAIL"}</div>
              </div>
              <div className={`p-2 rounded border ${octagonEvaluation.pPhysics ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
                <div>P_physics</div>
                <div className="text-[10px]">{octagonEvaluation.pPhysics ? "PASS" : "FAIL"}</div>
              </div>
              <div className={`p-2 rounded border ${octagonEvaluation.pSafety ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#450A0A]/40 border-[#DC2626]/40 text-[#F87171]"}`}>
                <div>P_safety</div>
                <div className="text-[10px]">{octagonEvaluation.pSafety ? "PASS" : "FAIL"}</div>
              </div>
              <div className={`p-2 rounded border ${octagonEvaluation.pAuthority ? "bg-[#064E3B]/30 border-[#059669]/40 text-[#34D399]" : "bg-[#78350F]/40 border-[#D97706]/40 text-[#FBBF24]"}`}>
                <div>P_authority</div>
                <div className="text-[10px]">{octagonEvaluation.pAuthority ? "SIGNED" : "PENDING"}</div>
              </div>
            </div>

            {octagonEvaluation.refusalReason && (
              <div className="p-2.5 rounded bg-[#2A1417] text-[#F87171] text-xs font-mono border border-[#451A1D]">
                Refusal: {octagonEvaluation.refusalReason}
              </div>
            )}
          </div>
        )}

        {/* Stage 10: Sovereign Operator Authority Gate */}
        {currentStep.stepNumber === "10" && (
          <div className="p-4 rounded-xl bg-[#1C160E] border border-[#452D17] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#FBBF24] flex items-center space-x-2">
                <UserCheck className="w-4 h-4" />
                <span>Stage 10: Sovereign Operator Action Required</span>
              </span>
              <span className="text-[10px] font-mono text-[#C5A059] px-2 py-0.5 rounded bg-[#2B1E12] border border-[#452D17]">
                HUMAN-IN-THE-LOOP MANDATORY
              </span>
            </div>

            <p className="text-xs text-[#D1D5DB] leading-relaxed">
              Pathfinder doctrine dictates that no state mutation may execute autonomously. Enter your sovereign Ed25519 signing key to authorize state transition into Stage 11:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Key className="w-3.5 h-3.5 text-[#8A8F9A] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={operatorKey}
                  onChange={(e) => setOperatorKey(e.target.value)}
                  placeholder="OP-SOV-KEY-ED25519"
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0C0E14] border border-[#332213] text-xs text-[#E6E4DF] font-mono focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => handleOperatorDecision("APPROVE")}
                  className="flex-1 sm:flex-initial px-4 py-1.5 rounded-lg bg-[#C5A059] text-[#0D0E11] text-xs font-bold hover:bg-[#D4B06A] transition"
                >
                  Sign & Approve
                </button>
                <button
                  onClick={() => handleOperatorDecision("HOLD")}
                  className="px-3 py-1.5 rounded-lg border border-[#332213] bg-[#12151D] text-xs text-[#8A8F9A] hover:text-[#E6E4DF]"
                >
                  Hold
                </button>
                <button
                  onClick={() => handleOperatorDecision("REJECT")}
                  className="px-3 py-1.5 rounded-lg border border-[#451A1D] bg-[#221013] text-xs text-[#F87171] hover:bg-[#331418]"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 12: Permanent Aether Ledger Receipt */}
        {activePipeline.ledgerReceiptHash && (
          <div className="p-3.5 rounded-xl bg-[#141520] border border-[#25283D] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-[#A5B4FC]">
              <Database className="w-4 h-4" />
              <span>Aether Immutable Ledger Receipt:</span>
              <span className="text-[#E6E4DF]">{activePipeline.ledgerReceiptHash.substring(0, 24)}...</span>
            </div>
            <span className="text-[10px] text-[#34D399] px-2 py-0.5 rounded bg-[#064E3B]/40 border border-[#059669]/40">
              APPEND-ONLY VERIFIED
            </span>
          </div>
        )}
      </div>

      {/* 12-Stage Complete Ledger Table */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase text-[#8A8F9A] px-1">
          Full Pipeline Stage Sequence
        </div>
        <div className="rounded-xl border border-[#1E222D] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#12151E] border-b border-[#1E222D] text-[#8A8F9A] font-mono text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Stage</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Actor / Rail</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Action Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B24] font-mono text-[11px]">
              {activePipeline.steps.map((s, i) => (
                <tr
                  key={s.stepNumber}
                  className={`hover:bg-[#141722] transition ${
                    i === activePipeline.currentStepIndex ? "bg-[#181C28]" : ""
                  }`}
                >
                  <td className="py-2.5 px-3 text-[#8A8F9A]">{s.stepNumber}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#E6E4DF]">{s.name}</td>
                  <td className="py-2.5 px-3 text-[#60A5FA]">{s.actor}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      s.status === "COMPLETED"
                        ? "bg-[#064E3B]/40 text-[#34D399] border border-[#059669]/30"
                        : s.status === "ACTIVE"
                        ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40"
                        : s.status === "HALTED"
                        ? "bg-[#450A0A]/40 text-[#F87171] border border-[#DC2626]/40"
                        : "text-[#8A8F9A]"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#9CA3AF] font-sans truncate max-w-xs">{s.actionSummary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
