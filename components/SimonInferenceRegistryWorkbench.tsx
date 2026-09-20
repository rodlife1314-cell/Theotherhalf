/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Frontier Substrate — SIMON Inference Layer & Semantic/Mathematical Registry Workbench
 * 
 * Formal Boundaries:
 * 1. G_t --(SIMON)--> \Psi_t (Interpretation Space, not an autonomous answer)
 * 2. State Cycle: x_t -> G_t -> \Psi_t -> (Operator Collapse) -> A_t -> x_{t+1}
 * 3. Semantic & Mathematical Registry: \mathcal{V} = \mathcal{L} \oplus \mathcal{M}
 * 4. JEMMA Verification: \mathcal{J}(\Psi_t, G_t)
 * 5. Epistemic Hierarchy:
 *    STANDARD_IDENTITY != PHENOMENOLOGICAL_ANALOG != HEURISTIC != PHYSICAL_SOLVER
 *    ACCOUNTING_CONSERVATION != PHYSICAL_CONSERVATION_VALIDATED
 *    MODEL_INTERNAL_CONSISTENCY != EMPIRICAL_VALIDATION
 */

'use client';

import React, { useState, useMemo } from 'react';
import {
  VOCABULARY_LEXICON,
  MATHEMATICAL_SYMBOL_REGISTRY,
  WORKBENCH_EPISTEMIC_AUDIT,
  SUPERCONDUCTING_RAIL_GEOMETRY,
  ORBITAL_CORRIDOR_GEOMETRY,
  VerifiedGeometryObject,
  SimonInferenceOutput,
  SimonCandidateHypothesis,
  runSimonInference,
  executeJemmaAuditOnSimon,
  EpistemicStatusCategory
} from '@/lib/simon-inference-registry';
import {
  Brain,
  BookOpen,
  Sigma,
  ShieldCheck,
  ShieldAlert,
  GitBranch,
  Network,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Database,
  Hash,
  Compass,
  Cpu,
  RefreshCw,
  Sliders,
  Layers,
  FileCode,
  Lock,
  Unlock,
  Check,
  Zap,
  Info
} from 'lucide-react';

export const SimonInferenceRegistryWorkbench: React.FC = () => {
  // Top-level Navigation: Registry vs SIMON Inference vs Epistemic Audit
  const [activeSubView, setActiveSubView] = useState<'inference' | 'registry' | 'epistemic_audit'>('inference');

  // SIMON Inference State
  const [selectedGeometryId, setSelectedGeometryId] = useState<'RAIL' | 'ORBITAL'>('RAIL');
  const [inferenceResult, setInferenceResult] = useState<SimonInferenceOutput>(() => {
    return runSimonInference(SUPERCONDUCTING_RAIL_GEOMETRY);
  });
  const [selectedHypothesisId, setSelectedHypothesisId] = useState<string>('H1');
  const [operatorActionSelected, setOperatorActionSelected] = useState<string | null>(null);

  // Registry Filter State
  const [registryTab, setRegistryTab] = useState<'lexicon' | 'math_symbols'>('lexicon');
  const [lexiconSearch, setLexiconSearch] = useState<string>('');
  const [symbolNamespaceFilter, setSymbolNamespaceFilter] = useState<string>('all');

  // Active geometry object
  const activeGeometry: VerifiedGeometryObject = useMemo(() => {
    return selectedGeometryId === 'RAIL' ? SUPERCONDUCTING_RAIL_GEOMETRY : ORBITAL_CORRIDOR_GEOMETRY;
  }, [selectedGeometryId]);

  // Handle switching geometry
  const handleSwitchGeometry = (geom: 'RAIL' | 'ORBITAL') => {
    setSelectedGeometryId(geom);
    const targetGeom = geom === 'RAIL' ? SUPERCONDUCTING_RAIL_GEOMETRY : ORBITAL_CORRIDOR_GEOMETRY;
    const output = runSimonInference(targetGeom);
    setInferenceResult(output);
    setSelectedHypothesisId('H1');
    setOperatorActionSelected(null);
  };

  // Run or re-run JEMMA Audit
  const handleTriggerJemmaAudit = () => {
    const audited = executeJemmaAuditOnSimon(inferenceResult, activeGeometry);
    setInferenceResult(audited);
  };

  // Selected hypothesis detail
  const activeHypothesis: SimonCandidateHypothesis | undefined = useMemo(() => {
    return inferenceResult.hypotheses.find(h => h.id === selectedHypothesisId);
  }, [inferenceResult, selectedHypothesisId]);

  // Filtered Lexicon
  const filteredLexicon = useMemo(() => {
    const list = Object.entries(VOCABULARY_LEXICON);
    if (!lexiconSearch.trim()) return list;
    const q = lexiconSearch.toLowerCase();
    return list.filter(([key, item]) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.symbol.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.domain.toLowerCase().includes(q)
      );
    });
  }, [lexiconSearch]);

  // Filtered Math Symbols
  const filteredMathSymbols = useMemo(() => {
    if (symbolNamespaceFilter === 'all') return MATHEMATICAL_SYMBOL_REGISTRY;
    return MATHEMATICAL_SYMBOL_REGISTRY.filter(s => s.namespace === symbolNamespaceFilter);
  }, [symbolNamespaceFilter]);

  // Epistemic badge helper
  const getEpistemicBadge = (cat: EpistemicStatusCategory) => {
    switch (cat) {
      case 'STANDARD_IDENTITY':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">STANDARD IDENTITY</span>;
      case 'PHENOMENOLOGICAL_ANALOG':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold">PHENOMENOLOGICAL ANALOG</span>;
      case 'HEURISTIC':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">HEURISTIC PROXY</span>;
      case 'PHYSICAL_SOLVER':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold">PHYSICAL SOLVER</span>;
      case 'ACCOUNTING_CONSISTENCY':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold">ACCOUNTING CONSISTENCY</span>;
      case 'PHYSICAL_CONSERVATION':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">PHYSICAL CONSERVATION</span>;
      case 'MODEL_INTERNAL_CONSISTENCY':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">MODEL-INTERNAL TEST</span>;
      default:
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">{cat}</span>;
    }
  };

  return (
    <div className="w-full space-y-6 text-slate-100 font-sans">
      {/* HEADER WITH ARCHITECTURAL INVARIANT BANNER */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  SIMON Inference Layer &amp; Semantic Registry
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  G_t → Ψ_t BOUNDED MEANING ENGINE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  V = L ⊕ M CANON
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Structure is the mathematical pattern resolved from telemetry (RAPIDS); Intelligence is the interpretation of verified structure into bounded alternatives (SIMON). Final authority rests exclusively with the sovereign Operator.
              </p>
            </div>
          </div>

          {/* Sub-navigation tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveSubView('inference')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeSubView === 'inference'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>SIMON Inference (G_t → Ψ_t)</span>
            </button>
            <button
              onClick={() => setActiveSubView('registry')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeSubView === 'registry'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Registry (V = L ⊕ M)</span>
            </button>
            <button
              onClick={() => setActiveSubView('epistemic_audit')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeSubView === 'epistemic_audit'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Epistemic Matrix (Audit)</span>
            </button>
          </div>
        </div>

        {/* STATE CYCLE FORMAL BANNER */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">STATE EQUATION:</span>
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-300">
              x_t → G_t → Ψ_t → (Operator Collapse) → A_t → x_{'{t+1}'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">
              <strong className="text-slate-200 font-semibold">Actual:</strong> x_t
            </span>
            <span className="text-slate-400">
              <strong className="text-indigo-300 font-semibold">Potential:</strong> Ψ_t
            </span>
            <span className="text-slate-400">
              <strong className="text-emerald-300 font-semibold">Boundary:</strong> ∂Ω
            </span>
            <span className="text-slate-400">
              <strong className="text-rose-300 font-semibold">Constraint:</strong> C(x,u) ≤ 0
            </span>
            <span className="text-slate-400">
              <strong className="text-sky-300 font-semibold">Action:</strong> A_t
            </span>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SUBVIEW 1: SIMON INFERENCE ENGINE (G_t -> \Psi_t)                   */}
      {/* =================================================================== */}
      {activeSubView === 'inference' && (
        <div className="space-y-6">
          {/* GEOMETRY INPUT BOUNDARY PANEL */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Network className="w-5 h-5 text-indigo-400" />
                <div>
                  <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Step 1: Mandatory Input Boundary — Verified Geometry Object (G_t)
                  </h2>
                  <p className="text-xs text-slate-400">
                    SIMON never receives raw, unvetted telemetry. It only accepts the assembled, custody-signed geometry object.
                  </p>
                </div>
              </div>

              {/* Geometry Selector Switch */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Target Universe:</span>
                <button
                  onClick={() => handleSwitchGeometry('RAIL')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                    selectedGeometryId === 'RAIL'
                      ? 'bg-indigo-600 text-white border border-indigo-400'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  HTS Rail Corridor (GEOM_RAIL_HTS_01)
                </button>
                <button
                  onClick={() => handleSwitchGeometry('ORBITAL')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                    selectedGeometryId === 'ORBITAL'
                      ? 'bg-indigo-600 text-white border border-indigo-400'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  Orbital Phased GEO Grid (GEOM_ORBITAL_GEO_01)
                </button>
              </div>
            </div>

            {/* Geometry Data Inspection Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Target of Inquiry (T)</span>
                <p className="text-slate-200 font-sans font-medium text-xs truncate" title={activeGeometry.targetInquiry}>
                  {activeGeometry.targetInquiry}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Authority Custodian (A)</span>
                <p className="text-emerald-400 font-medium text-xs">
                  {activeGeometry.authorityCustodian}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Cryptographic Custody Hash</span>
                <p className="text-slate-300 font-mono text-[11px] truncate" title={activeGeometry.stateHash}>
                  {activeGeometry.stateHash}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Uncertainty Score (U)</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${activeGeometry.uncertaintyScore * 100}%` }}
                    />
                  </div>
                  <span className="text-indigo-300 font-bold">
                    {(activeGeometry.uncertaintyScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Nodes and Relations Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-2">
              {/* Nodes N */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="font-mono">NODES N = ({activeGeometry.nodes.length})</span>
                  <span className="text-[10px] text-slate-500">Typed State Points</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {activeGeometry.nodes.map((node) => (
                    <div
                      key={node.nodeId}
                      className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px]"
                    >
                      <div>
                        <span className="font-mono font-bold text-slate-200">{node.name}</span>
                        <span className="text-slate-400 ml-2">({node.role})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {node.powerKw && (
                          <span className="text-amber-300 font-mono text-[10px]">
                            {node.powerKw} kW
                          </span>
                        )}
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                          node.epistemicTier === 'MEASURED'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : node.epistemicTier === 'DERIVED'
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {node.epistemicTier}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relations R */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="font-mono">RELATIONS R = ({activeGeometry.relations.length})</span>
                  <span className="text-[10px] text-slate-500">Coupling Edges</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {activeGeometry.relations.map((rel) => (
                    <div
                      key={rel.edgeId}
                      className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-slate-300 text-[10px]">{rel.fromNode}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-300 text-[10px]">{rel.toNode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[10px]">{rel.relationType}</span>
                        {rel.verified ? (
                          <span className="text-emerald-400 text-[9px] font-mono font-semibold">VERIFIED</span>
                        ) : (
                          <span className="text-rose-400 text-[9px] font-mono font-semibold">UNVERIFIED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SIMON INFERENCE OUTPUT: BOUNDED INTERPRETATION FIELD (\Psi_t) */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <GitBranch className="w-5 h-5 text-indigo-400" />
                <div>
                  <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Step 2: SIMON Interpretation Space (Ψ_t = {'{H_1, ..., H_n}'})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Produced strictly under the 7-point inference contract: multi-hypothesis, evidence-linked, equation-aware, counterfactual-aware.
                  </p>
                </div>
              </div>

              {/* JEMMA Cross-Audit Action */}
              <button
                onClick={handleTriggerJemmaAudit}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  inferenceResult.jemmaCrossAudited
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {inferenceResult.jemmaCrossAudited ? 'JEMMA Audit Verified ✓' : 'Run JEMMA Audit J(Ψ_t, G_t)'}
                </span>
              </button>
            </div>

            {/* Contract Invariants Badges */}
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                1. GEOMETRY-BOUND: {activeGeometry.geometryId}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                2. EVIDENCE-LINKED: Nodes Assigned
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                3. EQUATION-AWARE: Formally Registered
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                4. EPISTEMICALLY INHERITED: Max {inferenceResult.epistemicStatusSummary.inheritedEpistemicCeiling}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                5. MULTI-HYPOTHESIS ({inferenceResult.hypotheses.length} Branches)
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                6. COUNTERFACTUAL-AWARE
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/40 font-bold">
                7. NON-AUTHORITATIVE (Awaiting Operator)
              </span>
            </div>

            {/* Hypothesis Selection Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {inferenceResult.hypotheses.map((h) => {
                const isSelected = h.id === selectedHypothesisId;
                return (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHypothesisId(h.id)}
                    className={`text-left p-3.5 rounded-lg border transition-all space-y-2 ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500/40'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                        {h.id}
                      </span>
                      {h.jemmaAuditVerdict && (
                        <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                          h.jemmaAuditVerdict === 'GROUNDED_IN_TOPOLOGY'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {h.jemmaAuditVerdict === 'GROUNDED_IN_TOPOLOGY' ? 'PASS' : 'WARN'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-semibold text-slate-200 line-clamp-2 leading-snug">
                      {h.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Variance: {(h.uncertaintyMetrics.epistemicVariance * 100).toFixed(0)}%</span>
                      <span className="text-indigo-400">{h.epistemicTier}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Hypothesis Deep Dive Panel */}
            {activeHypothesis && (
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/90 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                        BRANCH {activeHypothesis.id}
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        {activeHypothesis.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {activeHypothesis.claim}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400">Drift Risk:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      activeHypothesis.uncertaintyMetrics.sensorDriftRisk === 'LOW'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : activeHypothesis.uncertaintyMetrics.sensorDriftRisk === 'MEDIUM'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {activeHypothesis.uncertaintyMetrics.sensorDriftRisk}
                    </span>
                  </div>
                </div>

                {/* Evidence Nodes & Registered Equations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Evidence Nodes */}
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                      Evidence Grounding in G_t
                    </span>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold shrink-0">Supporting:</span>
                        <span className="text-slate-300 font-mono">
                          {activeHypothesis.supportNodeIds.length > 0
                            ? activeHypothesis.supportNodeIds.join(', ')
                            : 'None (Pure inference)'}
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold shrink-0">Contradicting:</span>
                        <span className="text-slate-300 font-mono">
                          {activeHypothesis.contradictionNodeIds.length > 0
                            ? activeHypothesis.contradictionNodeIds.join(', ')
                            : 'None'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registered Equations */}
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                      Equation Awareness (V = M)
                    </span>
                    <div className="space-y-1 font-mono text-[11px] text-amber-300">
                      {activeHypothesis.formalEquations.map((eq, idx) => (
                        <div key={idx} className="p-1 rounded bg-slate-950 border border-slate-800">
                          {eq}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Counterfactual Awareness (Rules 6 & 7) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Observation that would strengthen this hypothesis:</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {activeHypothesis.counterfactualStrengthen}
                    </p>
                  </div>

                  <div className="p-3 rounded bg-rose-950/20 border border-rose-900/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Observation that would falsify/weaken this hypothesis:</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {activeHypothesis.counterfactualWeaken}
                    </p>
                  </div>
                </div>

                {/* JEMMA Cross-Audit Verdict on this Hypothesis */}
                {activeHypothesis.jemmaAuditVerdict && (
                  <div className="p-3 rounded bg-slate-900/90 border border-indigo-500/30 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-200">JEMMA Reality Check Verdict: </span>
                      <span className="font-mono font-bold text-emerald-400">
                        {activeHypothesis.jemmaAuditVerdict}
                      </span>
                      <p className="text-slate-400 mt-0.5">
                        {activeHypothesis.jemmaAuditNotes}
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 3: OPERATOR SOVEREIGN COLLAPSE (\Psi_t -> A_t) */}
                <div className="p-4 rounded-lg bg-indigo-950/30 border border-indigo-500/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                        Step 3: Operator Sovereign Collapse (Ψ_t → A_t)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Operator Decision Sovereign Standard
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Recommended Candidate Trajectory: <strong className="text-white">{activeHypothesis.recommendedTrajectory}</strong>
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setOperatorActionSelected(activeHypothesis.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        operatorActionSelected === activeHypothesis.id
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        {operatorActionSelected === activeHypothesis.id
                          ? `Action A_t Collapsed & Signed (${activeHypothesis.id})`
                          : `Authorize & Collapse Trajectory (${activeHypothesis.id})`}
                      </span>
                    </button>

                    {operatorActionSelected === activeHypothesis.id && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Ready for State Transition F(x_t, A_t, C_t) → x_{'{t+1}'}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUBVIEW 2: PATHFINDER REGISTRY (\mathcal{V} = \mathcal{L} \oplus \mathcal{M}) */}
      {/* =================================================================== */}
      {activeSubView === 'registry' && (
        <div className="space-y-6">
          {/* Registry Mode Tabs & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRegistryTab('lexicon')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  registryTab === 'lexicon'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lexicon Canon (L) — ({Object.keys(VOCABULARY_LEXICON).length} Terms)</span>
              </button>
              <button
                onClick={() => setRegistryTab('math_symbols')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  registryTab === 'math_symbols'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sigma className="w-3.5 h-3.5" />
                <span>Mathematical Registry (M) — ({MATHEMATICAL_SYMBOL_REGISTRY.length} Symbols)</span>
              </button>
            </div>

            {registryTab === 'lexicon' ? (
              <input
                type="text"
                placeholder="Search vocabulary lexicon..."
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full md:w-64"
              />
            ) : (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-mono">Namespace:</span>
                <select
                  value={symbolNamespaceFilter}
                  onChange={(e) => setSymbolNamespaceFilter(e.target.value)}
                  className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="all">All Namespaces</option>
                  <option value="cognition">cognition::</option>
                  <option value="vessel">vessel::</option>
                  <option value="rail">rail::</option>
                  <option value="geometry">geometry::</option>
                  <option value="field">field::</option>
                  <option value="transmission">transmission::</option>
                  <option value="force">force::</option>
                </select>
              </div>
            )}
          </div>

          {/* Lexicon Cards Grid */}
          {registryTab === 'lexicon' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLexicon.map(([key, item]) => (
                <div
                  key={key}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-amber-300">
                          {item.symbol}
                        </span>
                        <h3 className="text-sm font-bold text-white">{item.name}</h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 mt-1 inline-block">
                        {item.type} • {item.domain}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      {item.units}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.meaning}
                  </p>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1 font-mono text-[11px]">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Relations:</div>
                    <div className="text-emerald-400">{item.relations.join(' | ')}</div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold pt-1">Allowed Ops:</div>
                    <div className="text-sky-300">{item.allowedOperations.join(', ')}</div>
                  </div>

                  <p className="text-[11px] italic text-slate-400 border-l-2 border-indigo-500 pl-2">
                    &ldquo;{item.canonicalQuote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Mathematical Symbol Registry Table */}
          {registryTab === 'math_symbols' && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="pb-3 pr-4">Namespace &amp; Symbol</th>
                    <th className="pb-3 px-4">LaTeX Identity</th>
                    <th className="pb-3 px-4">Formal Definition</th>
                    <th className="pb-3 px-4">Epistemic Status</th>
                    <th className="pb-3 px-4">Dimensions / Units</th>
                    <th className="pb-3 pl-4">Invariant Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 font-mono text-[11px]">
                  {filteredMathSymbols.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3 pr-4 font-bold text-white whitespace-nowrap">
                        <span className="text-slate-500 font-normal">{s.namespace}::</span>
                        <span className="text-amber-300 font-mono">{s.symbol}</span>
                      </td>
                      <td className="py-3 px-4 text-indigo-300 whitespace-nowrap">
                        {s.latex}
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-xs font-sans">
                        {s.formalDefinition}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getEpistemicBadge(s.epistemicCategory)}
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {s.dimensions}
                      </td>
                      <td className="py-3 pl-4 text-slate-400 font-sans text-xs max-w-sm">
                        {s.invariantRule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* SUBVIEW 3: WORKBENCH EPISTEMIC AUDIT MATRIX                        */}
      {/* =================================================================== */}
      {activeSubView === 'epistemic_audit' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                  The 7 Subsystem Epistemic Classifications (Audit Invariants)
                </h2>
                <p className="text-xs text-slate-400">
                  STANDARD IDENTITY ≠ PHENOMENOLOGICAL ANALOG ≠ HEURISTIC ≠ PHYSICAL SOLVER. Machine-readable classifications prevent model self-deception.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">STANDARD IDENTITY</span>
                <p className="text-xs text-slate-300">Exact closed-form mathematical theorem (e.g. regular polygon chord length).</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">PHENOMENOLOGICAL ANALOG</span>
                <p className="text-xs text-slate-300">Valid transmission/wave analogies whose parameters are assigned rather than solved.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">HEURISTIC PROXY</span>
                <p className="text-xs text-slate-300">Empirical rule-of-thumb or scaling factor (e.g. preallocated 68% capture; pseudo-thrust).</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">ACCOUNTING CONSERVATION</span>
                <p className="text-xs text-slate-300">Bookkeeping consistency (P_loss = P_in - sum P_i), not independent physical conservation.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">PHYSICAL SOLVER</span>
                <p className="text-xs text-slate-300">Boundary surface integrals: Poynting flux ∫ S·n dA and Maxwell stress ∮ T·n dA.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">MODEL-INTERNAL TEST</span>
                <p className="text-xs text-slate-300">Tests that re-discover baked-in model assumptions rather than empirical ground truth.</p>
              </div>
            </div>
          </div>

          {/* Detailed Audit Table */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="pb-3 pr-4">Subsystem &amp; Label</th>
                  <th className="pb-3 px-4">Classification</th>
                  <th className="pb-3 px-4">Governing Formula</th>
                  <th className="pb-3 px-4">Audit Verdict</th>
                  <th className="pb-3 pl-4">Audit Findings &amp; Next Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 font-mono text-[11px]">
                {WORKBENCH_EPISTEMIC_AUDIT.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 pr-4 font-bold text-white">
                      <div className="font-sans text-xs text-slate-200">{item.label}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.subsystem}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getEpistemicBadge(item.category)}
                    </td>
                    <td className="py-3 px-4 text-amber-300 max-w-xs">
                      {item.formalEquation}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.auditVerdict === 'VERIFIED_MATHEMATICAL'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.auditVerdict === 'NOT_PHYSICALLY_DERIVED'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {item.auditVerdict}
                      </span>
                    </td>
                    <td className="py-3 pl-4 font-sans text-xs text-slate-300 max-w-sm leading-relaxed">
                      {item.auditNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
