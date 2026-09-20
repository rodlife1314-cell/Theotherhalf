/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Substrate — Crucible Defense Auditor
 * The Dirty Dozen Adversarial Test Suite
 * Codified from https://github.com/rodlife1314-cell/Game_one
 */

"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Terminal,
  Fingerprint,
  FileCode,
  Layers,
  ChevronDown,
  ChevronRight,
  Database,
  Key,
  Shield,
  Clock
} from "lucide-react";
import { CrucibleAttackTest, AttackExecutionResult } from "../lib/game-one-types";
import {
  DIRTY_DOZEN_SPECIFICATIONS,
  executeAdversarialDefenseAudit
} from "../lib/dirtyDozenSecurity";

export const CrucibleDefenseAuditor: React.FC = () => {
  const [results, setResults] = useState<AttackExecutionResult[]>([]);
  const [expandedTestId, setExpandedTestId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [filter, setFilter] = useState<"ALL" | "BLOCKED" | "UNTESTED">("ALL");

  const handleRunAllAttacks = () => {
    setIsRunning(true);
    setTimeout(() => {
      const executed = DIRTY_DOZEN_SPECIFICATIONS.map(test => executeAdversarialDefenseAudit(test));
      setResults(executed);
      setIsRunning(false);
    }, 350);
  };

  const handleRunSingleAttack = (test: CrucibleAttackTest) => {
    const res = executeAdversarialDefenseAudit(test);
    setResults(prev => {
      const filtered = prev.filter(r => r.testId !== test.id);
      return [...filtered, res];
    });
  };

  const handleReset = () => {
    setResults([]);
    setExpandedTestId(null);
  };

  const totalExecuted = results.length;
  const totalBlocked = results.filter(r => r.blocked && r.actualRefusalCode === r.expectedRefusalCode).length;
  const hasLeaks = results.some(r => !r.blocked);

  const getResultForTest = (testId: string) => results.find(r => r.testId === testId);

  return (
    <div className="bg-[#0B0D12] p-6 rounded-2xl border border-[#1E222D] text-[#E6E4DF] space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-[#1E222D] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#251214] border border-[#451A1D] rounded-xl flex items-center justify-center text-[#F87171] shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium tracking-tight text-[#E6E4DF]">
                Crucible Defense Auditor
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#EF4444]/30 bg-[#EF4444]/10 text-[#F87171]">
                DIRTY DOZEN SUITE
              </span>
            </div>
            <p className="text-xs text-[#8A8F9A] mt-0.5">
              Deterministic verification of 12 critical sovereign security invariants from security_spec.md
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#2A2E3B] text-xs text-[#8A8F9A] hover:text-[#E6E4DF] hover:bg-[#161821] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Audit</span>
          </button>
          <button
            onClick={handleRunAllAttacks}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-[#C5A059] text-[#0D0E11] text-xs font-semibold hover:bg-[#D4B06A] transition disabled:opacity-50 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Executing Test Harness..." : "Run All 12 Invariant Attacks"}</span>
          </button>
        </div>
      </div>

      {/* Security Status Bar & Counters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#12151D] border border-[#1E222D] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Attack Vectors</div>
            <div className="text-xl font-semibold text-[#E6E4DF]">12 Invariants</div>
          </div>
          <Layers className="w-5 h-5 text-[#8A8F9A]" />
        </div>

        <div className="p-3.5 rounded-xl bg-[#12151D] border border-[#1E222D] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Attacks Tested</div>
            <div className="text-xl font-semibold text-[#60A5FA]">
              {totalExecuted} <span className="text-xs text-[#8A8F9A] font-normal">/ 12</span>
            </div>
          </div>
          <Clock className="w-5 h-5 text-[#60A5FA]" />
        </div>

        <div className="p-3.5 rounded-xl bg-[#12151D] border border-[#1E222D] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Attacks Refused (Pass)</div>
            <div className="text-xl font-semibold text-[#34D399]">
              {totalBlocked} <span className="text-xs text-[#8A8F9A] font-normal">/ 12</span>
            </div>
          </div>
          <ShieldCheck className="w-5 h-5 text-[#34D399]" />
        </div>

        <div className="p-3.5 rounded-xl bg-[#12151D] border border-[#1E222D] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Sovereign Integrity</div>
            <div className="text-base font-semibold text-[#C5A059]">
              {totalExecuted === 0 ? "IDLE" : hasLeaks ? "VULNERABILITY" : "100% FAILS-CLOSED"}
            </div>
          </div>
          <Lock className="w-5 h-5 text-[#C5A059]" />
        </div>
      </div>

      {/* Core Invariant Highlight Banner */}
      <div className="p-4 rounded-xl bg-[#151821] border border-[#262B3A] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-[#8A8F9A]">
        <div className="flex items-center space-x-2.5">
          <Fingerprint className="w-4 h-4 text-[#C5A059]" />
          <span>
            <strong className="text-[#E6E4DF]">Doctrine Mandates:</strong> Score ≠ Evidence · Conversation ≠ Authority · Immutable Genesis · Fails Closed
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono text-[#8A8F9A]">Filter:</span>
          {(["ALL", "BLOCKED", "UNTESTED"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                filter === f
                  ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40"
                  : "bg-[#11131A] text-[#8A8F9A] border border-[#1E222D] hover:text-[#E6E4DF]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Adversarial Attacks Grid */}
      <div className="space-y-3">
        {DIRTY_DOZEN_SPECIFICATIONS.filter(test => {
          const res = getResultForTest(test.id);
          if (filter === "BLOCKED") return res && res.blocked;
          if (filter === "UNTESTED") return !res;
          return true;
        }).map((test, index) => {
          const result = getResultForTest(test.id);
          const isExpanded = expandedTestId === test.id;
          const status = result
            ? result.blocked && result.actualRefusalCode === result.expectedRefusalCode
              ? "BLOCKED_AS_EXPECTED"
              : "FAILED_LEAK"
            : "UNTESTED";

          return (
            <div
              key={test.id}
              className={`rounded-xl border transition-all ${
                status === "BLOCKED_AS_EXPECTED"
                  ? "bg-[#11151A] border-[#1A3326]"
                  : status === "FAILED_LEAK"
                  ? "bg-[#1A1113] border-[#4A1D24]"
                  : "bg-[#10131A] border-[#1E222D] hover:border-[#2A3040]"
              }`}
            >
              {/* Header Row */}
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <span className="text-xs font-mono font-bold text-[#8A8F9A] bg-[#161922] w-6 h-6 rounded-md flex items-center justify-center border border-[#222736] shrink-0 mt-0.5">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-[#E6E4DF]">{test.attackName}</h3>
                      {status === "BLOCKED_AS_EXPECTED" && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#064E3B]/40 text-[#34D399] border border-[#059669]/40 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>REFUSED AS EXPECTED</span>
                        </span>
                      )}
                      {status === "FAILED_LEAK" && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#450A0A]/60 text-[#F87171] border border-[#DC2626]/40 flex items-center space-x-1">
                          <XCircle className="w-3 h-3" />
                          <span>CRITICAL LEAK</span>
                        </span>
                      )}
                      {status === "UNTESTED" && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C1F2B] text-[#8A8F9A] border border-[#2B3042]">
                          READY TO AUDIT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8A8F9A] mt-1 font-mono">
                      Target: {test.targetInvariant}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleRunSingleAttack(test)}
                    className="px-3 py-1 text-xs rounded-lg border border-[#2A2E3D] bg-[#161821] text-[#E6E4DF] hover:bg-[#1E2230] transition flex items-center space-x-1.5"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run Attack</span>
                  </button>
                  <button
                    onClick={() => setExpandedTestId(isExpanded ? null : test.id)}
                    className="p-1 text-[#8A8F9A] hover:text-[#E6E4DF] transition"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#1C202B] space-y-3 text-xs">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-[#8A8F9A] mb-1">
                      Adversarial Attack Vector
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0C0E14] border border-[#1A1D27] text-[#D1D5DB] font-mono text-[11px]">
                      {test.attackVector}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#8A8F9A] mb-1">
                        Expected Refusal Code
                      </div>
                      <div className="p-2 rounded-lg bg-[#0C0E14] border border-[#1A1D27] font-mono text-[11px] text-[#F87171]">
                        {test.expectedRefusalCode}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#8A8F9A] mb-1">
                        Actual Refusal Code
                      </div>
                      <div className={`p-2 rounded-lg font-mono text-[11px] border ${
                        result?.actualRefusalCode === test.expectedRefusalCode
                          ? "bg-[#064E3B]/20 text-[#34D399] border-[#059669]/40"
                          : result?.actualRefusalCode
                          ? "bg-[#450A0A]/30 text-[#F87171] border-[#DC2626]/40"
                          : "bg-[#0C0E14] text-[#8A8F9A] border-[#1A1D27]"
                      }`}>
                        {result ? result.actualRefusalCode : "UNTESTED"}
                      </div>
                    </div>
                  </div>

                  {result && (
                    <div className="p-3 rounded-lg bg-[#0C0E14] border border-[#1A1D27] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#34D399] flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Audit Proof Receipt</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#8A8F9A]">
                          Receipt Hash: {result.receiptHash.substring(0, 16)}...
                        </span>
                      </div>
                      <p className="text-[#9CA3AF] text-xs font-mono">{result.auditProof}</p>
                    </div>
                  )}

                  <div>
                    <div className="text-[10px] font-mono uppercase text-[#8A8F9A] mb-1">
                      Simulated Malicious Payload
                    </div>
                    <pre className="p-2.5 rounded-lg bg-[#090A0E] border border-[#161822] text-[#A5B4FC] font-mono text-[10px] overflow-x-auto max-h-36">
                      {JSON.stringify(test.simulatedPayload, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
