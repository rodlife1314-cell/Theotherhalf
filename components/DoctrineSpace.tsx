/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Substrate — Doctrine, Geometric Syntax & Vocabulary Canon
 * Direct codification from https://github.com/rodlife1314-cell/Game_one
 */

"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Database,
  Network,
  Cpu,
  Activity,
  UserCheck,
  Shapes,
  FileCheck,
  Search,
  Hash,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Lock,
  Compass,
  Layers
} from "lucide-react";
import {
  DOCTRINE_EIGHT_FIELDS,
  GEOMETRIC_SYNTAX_CANON,
  VOCABULARY_16_CANON,
  PATHFINDER_FOUR_LAWS,
  DAILY_CHECKPOINT_AUDIT_RECORD
} from "../lib/pathfinder-doctrine-data";

export const DoctrineSpace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"fields" | "geometry" | "vocabulary" | "laws" | "audit">("fields");
  const [vocabSearch, setVocabSearch] = useState<string>("");
  const [selectedFieldId, setSelectedFieldId] = useState<string>("rapids");

  const filteredVocab = VOCABULARY_16_CANON.filter(
    v => v.term.toLowerCase().includes(vocabSearch.toLowerCase()) ||
         v.meaning.toLowerCase().includes(vocabSearch.toLowerCase()) ||
         v.physicalContext.toLowerCase().includes(vocabSearch.toLowerCase())
  );

  const selectedField = DOCTRINE_EIGHT_FIELDS.find(f => f.id === selectedFieldId) || DOCTRINE_EIGHT_FIELDS[0];

  return (
    <div className="bg-[#0B0D12] p-6 rounded-2xl border border-[#1E222D] text-[#E6E4DF] space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-[#1E222D] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1E192B] border border-[#372A52] rounded-xl flex items-center justify-center text-[#A78BFA] shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium tracking-tight text-[#E6E4DF]">
                Pathfinder Doctrine & Canon
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#C4B5FD]">
                GAME_ONE CODIFIED
              </span>
            </div>
            <p className="text-xs text-[#8A8F9A] mt-0.5">
              The 8 Superposed Fields, Geometric Syntax, 16 Canonical Terms, and 4 Immutable Laws
            </p>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-[#12151D] border border-[#1E222D] text-xs font-mono">
          {[
            { id: "fields", label: "8 Fields" },
            { id: "geometry", label: "Geometric Syntax" },
            { id: "vocabulary", label: "16 Vocab" },
            { id: "laws", label: "4 Laws" },
            { id: "audit", label: "Audit-0" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === tab.id
                  ? "bg-[#C5A059] text-[#0D0E11] font-bold shadow-sm"
                  : "text-[#8A8F9A] hover:text-[#E6E4DF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: EIGHT SUPERPOSED FIELDS */}
      {activeTab === "fields" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {DOCTRINE_EIGHT_FIELDS.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFieldId(f.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedFieldId === f.id
                    ? "bg-[#181C28] border-[#C5A059] ring-1 ring-[#C5A059]"
                    : "bg-[#10131A] border-[#1C202C] hover:border-[#2A3040]"
                }`}
              >
                <div className="text-[10px] font-mono font-bold" style={{ color: f.color }}>
                  {f.name}
                </div>
                <div className="text-[9px] text-[#8A8F9A] truncate mt-0.5">{f.role}</div>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-[#12151E] border border-[#1F2536] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2233]">
              <div>
                <span className="text-[10px] font-mono uppercase" style={{ color: selectedField.color }}>
                  Superposed Field #{DOCTRINE_EIGHT_FIELDS.findIndex(f => f.id === selectedField.id) + 1}
                </span>
                <h3 className="text-lg font-semibold text-[#E6E4DF] mt-0.5">{selectedField.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#8A8F9A]">Core Inquiry:</span>
                <div className="text-sm font-semibold text-[#C5A059] font-mono">{selectedField.question}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[#0C0E14] border border-[#1A1D27] space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Functional Role</div>
                <p className="text-[#E6E4DF] font-medium leading-relaxed">{selectedField.role}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0C0E14] border border-[#1A1D27] space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Doctrine Principle</div>
                <p className="text-[#9CA3AF] leading-relaxed">{selectedField.doctrine}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: GEOMETRIC SYNTAX */}
      {activeTab === "geometry" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#12151D] border border-[#1E222D] text-xs text-[#8A8F9A]">
            Pathfinder defines a geometric ontology where geometric polygons map directly to systems thinking inquiries:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GEOMETRIC_SYNTAX_CANON.map((g, i) => (
              <div key={g.shape} className="p-4 rounded-xl bg-[#11141D] border border-[#1E2433] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C5A059]">
                    {`G_${g.polygonSides} · ${g.shape}`}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181D2A] text-[#93C5FD]">
                    {g.symbolicAspect}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Inquiry</div>
                  <div className="text-xs font-semibold text-[#E6E4DF] mt-0.5">{g.coreInquiry}</div>
                </div>

                <div className="pt-2 border-t border-[#1A1F2D] text-[11px] text-[#9CA3AF] leading-relaxed">
                  {g.visualOutput}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: VOCABULARY 16 CANON */}
      {activeTab === "vocabulary" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#8A8F9A] absolute left-3 top-2.5" />
              <input
                type="text"
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                placeholder="Search canonical alignment vocabulary..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#12151D] border border-[#222736] text-xs text-[#E6E4DF] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <span className="text-xs text-[#8A8F9A] font-mono shrink-0">
              Showing {filteredVocab.length} of 16 terms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredVocab.map((v) => (
              <div key={v.term} className="p-4 rounded-xl bg-[#11141D] border border-[#1E2433] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#E6E4DF]">{v.term}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181D2A] text-[#C5A059] border border-[#2E374D]">
                    {v.pillar}
                  </span>
                </div>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">{v.meaning}</p>
                <div className="pt-2 border-t border-[#1B202D] text-[11px] text-[#8A8F9A] font-mono">
                  <span className="text-[#60A5FA]">Physical / Engineering Context: </span>
                  {v.physicalContext}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: THE FOUR IMMUTABLE LAWS */}
      {activeTab === "laws" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PATHFINDER_FOUR_LAWS.map((law) => (
              <div key={law.number} className="p-5 rounded-xl bg-[#11141D] border border-[#1E2433] space-y-2.5">
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-mono font-bold text-[#0D0E11] bg-[#C5A059] w-6 h-6 rounded-full flex items-center justify-center">
                    {law.number}
                  </span>
                  <h3 className="text-sm font-bold text-[#E6E4DF]">{law.title}</h3>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">{law.doctrine}</p>
                <div className="pt-3 border-t border-[#1C202C] flex items-center justify-between text-[10px] font-mono text-[#34D399]">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>FAILS-CLOSED ENFORCEMENT</span>
                  </span>
                  <span className="text-[#8A8F9A]">STATUS: ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: DAILY CHECKPOINT AUDIT */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#11141D] border border-[#1E2433] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">Checkpoint</div>
              <div className="text-base font-bold text-[#E6E4DF]">{DAILY_CHECKPOINT_AUDIT_RECORD.checkpoint}</div>
              <div className="text-[11px] font-mono text-[#8A8F9A]">
                Auditor: {DAILY_CHECKPOINT_AUDIT_RECORD.auditorModel} · Stamped: {DAILY_CHECKPOINT_AUDIT_RECORD.timestamp}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-[#064E3B] text-[#34D399] border border-[#059669]">
                VERDICT: {DAILY_CHECKPOINT_AUDIT_RECORD.executiveVerdict}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#10131A] border border-[#1C202C] space-y-2">
              <div className="text-xs font-semibold text-[#34D399] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Claims</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#9CA3AF] list-disc list-inside">
                {DAILY_CHECKPOINT_AUDIT_RECORD.verifiedClaims.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#10131A] border border-[#1C202C] space-y-2">
              <div className="text-xs font-semibold text-[#60A5FA] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Security Findings & Mitigations</span>
              </div>
              <div className="space-y-2">
                {DAILY_CHECKPOINT_AUDIT_RECORD.securityFindings.map(f => (
                  <div key={f.id} className="p-2 rounded bg-[#0C0E14] border border-[#1A1D27] text-[11px]">
                    <div className="font-semibold text-[#E6E4DF]">{f.title} ({f.severity})</div>
                    <p className="text-[#8A8F9A] mt-0.5">{f.correctionOrMitigation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
