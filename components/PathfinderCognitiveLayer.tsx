'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  CollapseState,
  CollapseEvaluation,
  evaluateGeometricCollapse,
  getAetherUncertaintyLedger,
  getHermesProvenanceRegistry,
  generateRapidsTelemetryWindow,
  getSimonTrajectoryLedger,
  evaluateJemmaChallenges,
  evaluateOctagonEnvelope,
  generateCrystalBridgePayload,
  TrajectoryPosture,
  ProvenanceRecord,
  RapidsReducedMetrics,
  RapidsTelemetryStreamPoint,
  DEFAULT_COLLAPSE_THRESHOLDS,
} from '@/lib/pathfinder-cognition-engine';
import { CCVTelemetry, CCVPilotCommands } from '@/lib/ccv01-vehicle-engine';
import {
  Compass,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Activity,
  AlertTriangle,
  FileCheck,
  Flame,
  Radio,
  Sliders,
  CheckCircle2,
  XCircle,
  Eye,
  KeyRound,
  RefreshCw,
  GitBranch,
  Lock,
  Unlock,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Fingerprint,
} from 'lucide-react';

interface PathfinderCognitiveLayerProps {
  telemetry: CCVTelemetry;
  commands?: CCVPilotCommands;
  onCommitTrajectoryToVehicle?: (posture: TrajectoryPosture) => void;
}

export default function PathfinderCognitiveLayer({
  telemetry,
  commands,
  onCommitTrajectoryToVehicle,
}: PathfinderCognitiveLayerProps) {
  // Active Sub-Lens / Navigation
  const [activeLens, setActiveLens] = useState<
    'overview' | 'aether' | 'hermes' | 'rapids' | 'simon' | 'jemma' | 'octagon_bridge'
  >('overview');

  // Interactive Disturbance Injection (For Operator Simulation & Testing)
  const [injectedPhaseDrift, setInjectedPhaseDrift] = useState<number>(0);
  const [injectedCouplingFactor, setInjectedCouplingFactor] = useState<number>(1.0);
  const [injectedImpedanceOffset, setInjectedImpedanceOffset] = useState<number>(0);
  const [injectedPowerBoost, setInjectedPowerBoost] = useState<number>(0);

  // Operator Mitigations for JEMMA Friction
  const [mitigatedChallengeIds, setMitigatedChallengeIds] = useState<string[]>([]);

  // Selected Trajectory from SIMON
  const [selectedTrajectory, setSelectedTrajectory] = useState<TrajectoryPosture>('maintain_lock');

  // Crystal Bridge Operator Signature State
  const [operatorCallsign, setOperatorCallsign] = useState<string>('OPERATOR-PRIME-01');
  const [dispatchConfirmed, setDispatchConfirmed] = useState<boolean>(false);
  const [signedAuthPayload, setSignedAuthPayload] = useState<any | null>(null);

  // Effective Telemetry combining live vehicle twin with any simulated disturbance
  const effectiveTelemetry = useMemo<CCVTelemetry>(() => {
    const rawPhase = telemetry.axes.angleFieldToCorridorDeg + injectedPhaseDrift;
    const rawCoupling = Math.max(0.05, Math.min(0.99, telemetry.couplingCoeff * injectedCouplingFactor));
    const rawVesselZ = telemetry.vesselImpedanceOhm + injectedImpedanceOffset;
    const rawPower = telemetry.poyntingPowerFluxMw + injectedPowerBoost;

    return {
      ...telemetry,
      couplingCoeff: Number(rawCoupling.toFixed(3)),
      vesselImpedanceOhm: Number(rawVesselZ.toFixed(1)),
      poyntingPowerFluxMw: Number(rawPower.toFixed(1)),
      axes: {
        ...telemetry.axes,
        angleFieldToCorridorDeg: Number(rawPhase.toFixed(2)),
      },
    };
  }, [
    telemetry,
    injectedPhaseDrift,
    injectedCouplingFactor,
    injectedImpedanceOffset,
    injectedPowerBoost,
  ]);

  // Evaluate Geometric Collapse State
  const collapseEvaluation = useMemo<CollapseEvaluation>(() => {
    return evaluateGeometricCollapse(effectiveTelemetry, DEFAULT_COLLAPSE_THRESHOLDS);
  }, [effectiveTelemetry]);

  // Evaluate AETHER uncertainty ledger & jurisdictional laws
  const { uncertainties, jurisdiction } = useMemo(() => {
    return getAetherUncertaintyLedger(effectiveTelemetry);
  }, [effectiveTelemetry]);

  // Evaluate HERMES provenance registry
  const hermesRegistry = useMemo<ProvenanceRecord[]>(() => {
    return getHermesProvenanceRegistry(effectiveTelemetry);
  }, [effectiveTelemetry]);

  // Evaluate RAPIDS telemetry reduction window
  const { stream: rapidsStream, reduction: rapidsReduction } = useMemo(() => {
    return generateRapidsTelemetryWindow(effectiveTelemetry);
  }, [effectiveTelemetry]);

  // Evaluate SIMON trajectory options
  const simonTrajectories = useMemo(() => {
    return getSimonTrajectoryLedger(effectiveTelemetry, collapseEvaluation.currentState);
  }, [effectiveTelemetry, collapseEvaluation.currentState]);

  // Evaluate JEMMA challenges & friction ledger
  const { challenges: jemmaChallenges, summary: jemmaSummary } = useMemo(() => {
    return evaluateJemmaChallenges(effectiveTelemetry, mitigatedChallengeIds);
  }, [effectiveTelemetry, mitigatedChallengeIds]);

  // Evaluate OCTAGON flight/control safety envelope
  const octagonReport = useMemo(() => {
    return evaluateOctagonEnvelope(effectiveTelemetry, jemmaSummary);
  }, [effectiveTelemetry, jemmaSummary]);

  // Generate Crystal Bridge Authorization Payload
  const crystalBridgePayload = useMemo(() => {
    return generateCrystalBridgePayload(
      selectedTrajectory,
      effectiveTelemetry,
      octagonReport,
      jemmaSummary,
      dispatchConfirmed ? `SHA256:OP_${operatorCallsign}_DISPATCHED` : null
    );
  }, [
    selectedTrajectory,
    effectiveTelemetry,
    octagonReport,
    jemmaSummary,
    dispatchConfirmed,
    operatorCallsign,
  ]);

  // Handle toggle mitigation
  const toggleMitigation = (id: string) => {
    setMitigatedChallengeIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Handle final authorization dispatch
  const handleOperatorSignAndDispatch = () => {
    if (!octagonReport.canProceedToOperator) return;
    const now = Date.now();
    const finalizedPayload = generateCrystalBridgePayload(
      selectedTrajectory,
      effectiveTelemetry,
      octagonReport,
      jemmaSummary,
      `SHA256:OP_${operatorCallsign}_${now}`,
      now
    );
    setDispatchConfirmed(true);
    setSignedAuthPayload(finalizedPayload);
    if (onCommitTrajectoryToVehicle) {
      onCommitTrajectoryToVehicle(selectedTrajectory);
    }
  };

  // Reset disturbances
  const resetDisturbances = () => {
    setInjectedPhaseDrift(0);
    setInjectedCouplingFactor(1.0);
    setInjectedImpedanceOffset(0);
    setInjectedPowerBoost(0);
    setDispatchConfirmed(false);
    setSignedAuthPayload(null);
  };

  // Color mapping for Collapse State
  const collapseBadgeConfig: Record<CollapseState, { bg: string; text: string; border: string; desc: string }> = {
    NORMAL: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-300',
      border: 'border-emerald-500/40',
      desc: 'Nominal Coherent Resonant Lock',
    },
    DEGRADED: {
      bg: 'bg-amber-500/20',
      text: 'text-amber-300',
      border: 'border-amber-500/40',
      desc: 'Sub-Optimal Coupling or Minor Phase Noise',
    },
    MISMATCH: {
      bg: 'bg-orange-500/20',
      text: 'text-orange-300',
      border: 'border-orange-500/40',
      desc: 'Impedance Gap or Critical Coupling Deficit',
    },
    DECOUPLE: {
      bg: 'bg-rose-500/20',
      text: 'text-rose-300',
      border: 'border-rose-500/40',
      desc: 'Critical Phase Slip Breach (|Δφ| > 30°)',
    },
    SAFE: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-300',
      border: 'border-blue-500/40',
      desc: 'Emergency Thermal/Spine Quench Protection',
    },
  };

  const collapseInfo = collapseBadgeConfig[collapseEvaluation.currentState];

  return (
    <div id="pathfinder-cortex-container" className="flex flex-col gap-4 w-full">
      {/* 1. TOP SUPERVISORY HEADER & SOVEREIGN KERNEL STRIP */}
      <div
        id="pathfinder-supervisory-banner"
        className="bg-slate-900/95 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col gap-3 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <Compass className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-bold font-mono tracking-tight text-white">
                  PATHFINDER SUPERVISORY CORTEX
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  COGNITIVE NERVOUS SYSTEM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Sits above the CCV-01 Physics Twin: <span className="text-amber-300">Pathfinder asks what the state means</span> • <span className="text-sky-300">CCV determines what the state is</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
            {/* Geometric Collapse State */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold ${collapseInfo.bg} ${collapseInfo.text} ${collapseInfo.border}`}
              title={collapseEvaluation.reason}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>COLLAPSE STATE: {collapseEvaluation.currentState}</span>
            </div>

            {/* Sovereignty Compliance Index */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold ${
                octagonReport.overallStatus === 'APPROVED'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : octagonReport.overallStatus === 'WATCHDOG_ENFORCED'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>COMPLIANCE: {octagonReport.sovereigntyComplianceIndex}%</span>
            </div>

            {/* Jemma Friction Count */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono ${
                jemmaSummary.unmitigatedContradictions === 0
                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>FRICTION: {jemmaSummary.unmitigatedContradictions} EVENTS</span>
            </div>
          </div>
        </div>

        {/* 6-Stage Sovereign Execution Kernel */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="font-bold tracking-wider text-slate-300">
              SOVEREIGN KERNEL DECISION FLOW:
            </span>
            <span>
              Final dispatch requires Operator authorization (Auto-dispatch prohibited)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 font-mono text-[11px]">
            {/* 1. OBSERVE */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                1
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400">STATE OBSERVER</span>
                <span className="font-bold text-slate-200 truncate">CCV Twin (x_t)</span>
              </div>
            </div>

            {/* 2. PROPOSE */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                2
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400">SIMON PROPOSES</span>
                <span className="font-bold text-purple-300 truncate">5 Trajectories</span>
              </div>
            </div>

            {/* 3. CHALLENGE */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                3
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400">JEMMA CHALLENGES</span>
                <span className="font-bold text-amber-300 truncate">Attacks Claims</span>
              </div>
            </div>

            {/* 4. PERMIT */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                4
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400">OCTAGON PERMITS</span>
                <span className="font-bold text-emerald-300 truncate">Policy Envelope</span>
              </div>
            </div>

            {/* 5. AUTHORIZE */}
            <div className={`flex items-center gap-2 p-2 rounded-lg border ${
              dispatchConfirmed
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
            }`}>
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                5
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400">OPERATOR AUTHS</span>
                <span className="font-bold truncate">
                  {dispatchConfirmed ? 'Authorized' : 'Pending Custody'}
                </span>
              </div>
            </div>

            {/* 6. COMMIT */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                6
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400">VEHICLE COMMITS</span>
                <span className="font-bold text-indigo-300 truncate">Physical Rail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. OPERATOR DISTURBANCE INJECTION & STRESS BENCH */}
      <div
        id="cortex-disturbance-bench"
        className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 font-mono text-xs"
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-200">COGNITIVE STRESS BENCH:</span>
            <span className="text-slate-400 text-[11px]">
              Inject perturbations into CCV-01 to observe how the cognitive layers react, collapse, and govern:
            </span>
          </div>
          <button
            id="btn-reset-disturbances"
            onClick={resetDisturbances}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Disturbances</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          {/* Disturbance 1: Phase Drift */}
          <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Phase Drift (|Δφ|):</span>
              <span className={`font-bold ${injectedPhaseDrift !== 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                +{injectedPhaseDrift.toFixed(1)}°
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setInjectedPhaseDrift(0)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300"
              >
                0°
              </button>
              <button
                onClick={() => setInjectedPhaseDrift(12)}
                className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px]"
              >
                +12° (Warn)
              </button>
              <button
                onClick={() => setInjectedPhaseDrift(35)}
                className="px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px]"
              >
                +35° (Decouple)
              </button>
            </div>
          </div>

          {/* Disturbance 2: Coupling Decay */}
          <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Coupling Scaler:</span>
              <span className={`font-bold ${injectedCouplingFactor !== 1.0 ? 'text-amber-400' : 'text-slate-300'}`}>
                {(injectedCouplingFactor * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setInjectedCouplingFactor(1.0)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300"
              >
                100%
              </button>
              <button
                onClick={() => setInjectedCouplingFactor(0.75)}
                className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px]"
              >
                75% (Degrade)
              </button>
              <button
                onClick={() => setInjectedCouplingFactor(0.45)}
                className="px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px]"
              >
                45% (Mismatch)
              </button>
            </div>
          </div>

          {/* Disturbance 3: Impedance Offset */}
          <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Impedance Gap (|ΔZ|):</span>
              <span className={`font-bold ${injectedImpedanceOffset !== 0 ? 'text-orange-400' : 'text-slate-300'}`}>
                +{injectedImpedanceOffset} Ω
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setInjectedImpedanceOffset(0)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300"
              >
                0 Ω
              </button>
              <button
                onClick={() => setInjectedImpedanceOffset(80)}
                className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px]"
              >
                +80 Ω
              </button>
              <button
                onClick={() => setInjectedImpedanceOffset(180)}
                className="px-2 py-0.5 rounded bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-[10px]"
              >
                +180 Ω (Mismatch)
              </button>
            </div>
          </div>

          {/* Disturbance 4: Thermal & Power Surge */}
          <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Power Surge:</span>
              <span className={`font-bold ${injectedPowerBoost !== 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                +{injectedPowerBoost} MW
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setInjectedPowerBoost(0)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300"
              >
                0 MW
              </button>
              <button
                onClick={() => setInjectedPowerBoost(300)}
                className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px]"
              >
                +300 MW (Thermal)
              </button>
              <button
                onClick={() => setInjectedPowerBoost(700)}
                className="px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px]"
              >
                +700 MW (Quench Safe)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-LENS NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono border-b border-slate-800">
        <button
          id="lens-tab-overview"
          onClick={() => setActiveLens('overview')}
          className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all ${
            activeLens === 'overview'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Supervisory Deck</span>
        </button>

        <button
          id="lens-tab-aether"
          onClick={() => setActiveLens('aether')}
          className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all ${
            activeLens === 'aether'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Database className="w-4 h-4 text-purple-400" />
          <span>AETHER: Uncertainty & Laws</span>
        </button>

        <button
          id="lens-tab-hermes"
          onClick={() => setActiveLens('hermes')}
          className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all ${
            activeLens === 'hermes'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <FileCheck className="w-4 h-4 text-sky-400" />
          <span>HERMES: Provenance</span>
        </button>

        <button
          id="lens-tab-rapids"
          onClick={() => setActiveLens('rapids')}
          className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all ${
            activeLens === 'rapids'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Radio className="w-4 h-4 text-cyan-400" />
          <span>RAPIDS: Telemetry Reduction</span>
        </button>

        <button
          id="lens-tab-simon"
          onClick={() => setActiveLens('simon')}
          className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all ${
            activeLens === 'simon'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <GitBranch className="w-4 h-4 text-amber-400" />
          <span>SIMON: Trajectory Listener</span>
        </button>

        <button
          id="lens-tab-jemma"
          onClick={() => setActiveLens('jemma')}
          className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all ${
            activeLens === 'jemma'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Flame className="w-4 h-4 text-rose-400" />
          <span>JEMMA: Adversarial Auditor</span>
          {jemmaSummary.unmitigatedContradictions > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        <button
          id="lens-tab-octagon"
          onClick={() => setActiveLens('octagon_bridge')}
          className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all ${
            activeLens === 'octagon_bridge'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <KeyRound className="w-4 h-4 text-emerald-400" />
          <span>OCTAGON & CRYSTAL BRIDGE</span>
        </button>
      </div>

      {/* 4. SUB-LENS CONTENT PANELS */}

      {/* LENS 0: OVERVIEW SUPERVISORY DECK */}
      {activeLens === 'overview' && (
        <div id="panel-cortex-overview" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column: Geometric Collapse & Physical State Summary */}
          <div className="flex flex-col gap-4">
            {/* Geometric Collapse Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                  GEOMETRIC COLLAPSE MONITOR
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${collapseInfo.bg} ${collapseInfo.text} border ${collapseInfo.border}`}>
                  {collapseEvaluation.currentState}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col gap-2 font-mono text-xs">
                <div className="text-slate-200 font-semibold leading-relaxed">
                  {collapseEvaluation.reason}
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-850">
                  <span>Trigger Metric: <span className="text-amber-300 font-bold">{collapseEvaluation.triggerMetric}</span></span>
                  <span>Value: <span className="text-white">{collapseEvaluation.triggerValue}</span> (Threshold: {collapseEvaluation.thresholdValue})</span>
                </div>
              </div>

              {/* State Machine Boundary Path */}
              <div className="flex flex-col gap-1.5 font-mono text-[10px]">
                <span className="text-slate-400">STATE-TRANSITION COLLAPSE PATHWAY:</span>
                <div className="flex items-center justify-between text-center gap-1">
                  {(['NORMAL', 'DEGRADED', 'MISMATCH', 'DECOUPLE', 'SAFE'] as CollapseState[]).map((st, i) => (
                    <div
                      key={st}
                      className={`flex-1 py-1 px-0.5 rounded text-[9px] border font-bold transition-all ${
                        collapseEvaluation.currentState === st
                          ? 'bg-amber-500/30 text-amber-200 border-amber-500 shadow-sm'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CCV-01 Physics State Mirror */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3 font-mono text-xs">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                PHYSICS TWIN TELEMETRY (x_t)
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Coupling (C_pair):</span>
                  <div className="text-base font-bold text-emerald-400">
                    {(effectiveTelemetry.couplingCoeff * 100).toFixed(1)}%
                  </div>
                  <span className="text-[9px] text-slate-500">Threshold &gt; 65%</span>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Phase Slip (|Δφ|):</span>
                  <div className="text-base font-bold text-sky-400">
                    {Math.abs(effectiveTelemetry.axes.angleFieldToCorridorDeg).toFixed(1)}°
                  </div>
                  <span className="text-[9px] text-slate-500">Envelope &lt; 15°</span>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Vessel Impedance (Z_V):</span>
                  <div className="text-base font-bold text-amber-400">
                    {effectiveTelemetry.vesselImpedanceOhm.toFixed(0)} Ω
                  </div>
                  <span className="text-[9px] text-slate-500">Corridor Z_R: {effectiveTelemetry.corridorImpedanceOhm.toFixed(0)} Ω</span>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Poynting Flux (P):</span>
                  <div className="text-base font-bold text-purple-400">
                    {effectiveTelemetry.poyntingPowerFluxMw.toFixed(0)} MW
                  </div>
                  <span className="text-[9px] text-slate-500">Coil Temp: {(4.2 + (effectiveTelemetry.poyntingPowerFluxMw / 500) * 45).toFixed(1)} K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: SIMON Trajectory Proposal & JEMMA Friction */}
          <div className="flex flex-col gap-4">
            {/* SIMON Active Listening & Trajectory Recommendation */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  SIMON PATTERN LISTENER
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Pervasive Listener
                </span>
              </div>

              <div className="text-slate-300 text-xs leading-relaxed">
                SIMON is interpreting physical trajectories from real-time telemetry:
              </div>

              <div className="flex flex-col gap-2">
                {simonTrajectories.slice(0, 3).map(traj => (
                  <div
                    key={traj.id}
                    onClick={() => setSelectedTrajectory(traj.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      selectedTrajectory === traj.id
                        ? 'bg-amber-500/20 border-amber-500/60 text-white shadow-sm'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-amber-300">{traj.title}</span>
                      {traj.recommendedBySimon && (
                        <span className="px-1.5 py-0.2 text-[9px] rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {traj.description}
                    </p>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 mt-1.5 pt-1 border-t border-slate-850">
                      <span>Expected ΔC: <span className="text-emerald-400 font-bold">{traj.expectedCouplingDelta}</span></span>
                      <span>Thermal Risk: <span className={traj.thermalRisk === 'High' ? 'text-rose-400' : 'text-slate-300'}>{traj.thermalRisk}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* JEMMA Adversarial Auditor Alert */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  JEMMA ADVERSARIAL AUDIT
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  jemmaSummary.unmitigatedContradictions === 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                }`}>
                  {jemmaSummary.overallAuditorVerdict}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col gap-1.5">
                <span className="text-slate-300 font-bold text-[11px]">Primary Active Challenge:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {jemmaChallenges[0]?.challengeQuestion}
                </p>
                <div className="text-[10px] text-amber-400/90 bg-amber-500/10 p-1.5 rounded border border-amber-500/20 mt-1">
                  Physical Attack: {jemmaChallenges[0]?.physicalBasisOfAttack}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: OCTAGON Governance & Crystal Bridge Dispatch */}
          <div className="flex flex-col gap-4">
            {/* OCTAGON Envelope Checks */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  OCTAGON FLIGHT ENVELOPE
                </span>
                <span className="text-slate-400 text-[10px]">
                  Predicate Gate
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {octagonReport.predicates.map(pred => (
                  <div
                    key={pred.id}
                    className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-850 text-[11px]"
                  >
                    <div className="flex items-center gap-2">
                      {pred.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                      <span className="text-slate-300">{pred.name}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className={pred.passed ? 'text-slate-400' : 'text-rose-400 font-bold'}>
                        {pred.currentValue}
                      </span>
                      <span className="text-[9px] text-slate-500">[{pred.condition}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CRYSTAL BRIDGE Operator Custody Deck */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  CRYSTAL BRIDGE DISPATCH
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Sovereign Gate
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Active Posture:</span>
                  <span className="text-amber-300 font-bold uppercase">{selectedTrajectory}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Operator Callsign:</span>
                  <input
                    type="text"
                    value={operatorCallsign}
                    onChange={e => setOperatorCallsign(e.target.value)}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white text-[11px] font-mono text-right w-36 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                id="btn-crystal-bridge-sign"
                onClick={handleOperatorSignAndDispatch}
                disabled={!octagonReport.canProceedToOperator}
                className={`w-full min-h-[44px] py-2.5 px-4 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  octagonReport.canProceedToOperator
                    ? 'bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white shadow-md cursor-pointer'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>
                  {dispatchConfirmed ? 'DISPATCH SIGNED & COMMITTED' : 'AUTHORIZE & COMMIT COMMAND'}
                </span>
              </button>

              {dispatchConfirmed && signedAuthPayload && (
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 flex flex-col gap-1">
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>SOVEREIGN DISPATCH TOKEN GENERATED</span>
                  </div>
                  <span className="text-slate-400 truncate">Token: {signedAuthPayload.authorizationId}</span>
                  <span className="text-slate-400 truncate">Signature: {signedAuthPayload.operatorSignature}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LENS 1: AETHER UNCERTAINTY & JURISDICTIONAL INQUEST */}
      {activeLens === 'aether' && (
        <div id="panel-aether-uncertainty" className="flex flex-col gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AETHER: UNCERTAINTY MAPPING & JURISDICTIONAL DOCTRINE
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              &ldquo;What don&apos;t we know about the current vessel state?&rdquo; AETHER holds uncertainty, missing energy accounting, and unverified boundary conditions before premature conclusions are allowed.
            </p>
          </div>

          {/* Two Laws of Jurisdictional Inquest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Law 1 */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300 text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                  LAW 1: WRONG-CHAIN SILENCE
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  &ldquo;I am looking in the wrong place&rdquo;
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Retrieval without correct jurisdiction is system noise. An inquiry target must be queried only under its legal authority chain, or the node must remain silent.
              </p>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-850 text-[10px] text-slate-300">
                {jurisdiction.law1Violations[0]?.statement}
              </div>
            </div>

            {/* Law 2 */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  LAW 2: EMPTY EVIDENCE POOL
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  &ldquo;I have no absolute evidence&rdquo;
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Retrieval without physical documentary assets is fabrication. If HERMES contains no verified records, all derived conclusions are flagged permanently as assumed risk.
              </p>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-850 text-[10px] text-slate-300">
                {jurisdiction.law2Assumptions[0]?.statement}
              </div>
            </div>
          </div>

          {/* Active Uncertainty Inventory */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              ACTIVE VESSEL UNCERTAINTY INVENTORY ({uncertainties.length} ITEMS)
            </span>

            <div className="flex flex-col gap-2">
              {uncertainties.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 text-xs">{item.parameter}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      item.severity === 'critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.severity === 'high'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.severity.toUpperCase()} UNCERTAINTY
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{item.description}</p>
                  <div className="text-[10px] text-indigo-300/90 pt-1 border-t border-slate-850">
                    Mitigation Required: {item.mitigationRequired}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LENS 2: HERMES PROVENANCE ENGINE */}
      {activeLens === 'hermes' && (
        <div id="panel-hermes-provenance" className="flex flex-col gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                HERMES: PROVENANCE & GROUNDING LEDGER
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              &ldquo;What evidence actually supports this state?&rdquo; Hermes attaches provenance to sensor data, simulation outputs, equations, and reference papers. A metric such as 43.42%c cannot simply exist without provenance attribution.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">PARAMETER</th>
                  <th className="p-3">VALUE</th>
                  <th className="p-3">PROVENANCE</th>
                  <th className="p-3">GROUNDING SOURCE / INSTRUMENT</th>
                  <th className="p-3 text-right">CONFIDENCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {hermesRegistry.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-850/50">
                    <td className="p-3 font-bold text-white">
                      {rec.parameterName}
                    </td>
                    <td className="p-3 text-slate-300 font-bold">
                      {rec.currentValue}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rec.provenance === 'MEASURED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : rec.provenance === 'DERIVED'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          : rec.provenance === 'SIMULATED'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      }`}>
                        {rec.provenance}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 max-w-xs">
                      <div>{rec.groundingSource}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{rec.equationOrInstrument}</div>
                    </td>
                    <td className="p-3 text-right font-bold">
                      <span className={rec.confidenceScore >= 80 ? 'text-emerald-400' : rec.confidenceScore >= 60 ? 'text-amber-400' : 'text-rose-400'}>
                        {rec.confidenceScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LENS 3: RAPIDS HIGH-RATE TELEMETRY REDUCTION */}
      {activeLens === 'rapids' && (
        <div id="panel-rapids-telemetry" className="flex flex-col gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                RAPIDS: HIGH-RATE TELEMETRY REDUCTION & TOPOLOGY
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              RAPIDS performs structural resolution rather than reasoning. It compresses real-time streams [B(t), Z(t), Δφ(t), C(t), T_coil(t), I_lattice(t), V(t)] into topological coherence patterns without pretending the patterns themselves explain the underlying physics.
            </p>
          </div>

          {/* Reduced Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400">Coherence Index:</span>
              <div className="text-xl font-bold text-cyan-300">
                {rapidsReduction.coherenceIndex}%
              </div>
              <span className="text-[9px] text-slate-500">Spectral alignment</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400">Departure Rate:</span>
              <div className="text-xl font-bold text-amber-300">
                {rapidsReduction.topologicalDepartureRate}°/s
              </div>
              <span className="text-[9px] text-slate-500">Phase variance rate</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400">Phase Covariance:</span>
              <div className="text-xl font-bold text-purple-300">
                {rapidsReduction.phaseCovariance}
              </div>
              <span className="text-[9px] text-slate-500">Cov(Δφ, C_pair)</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400">Thermal Margin:</span>
              <div className="text-xl font-bold text-emerald-300">
                +{rapidsReduction.thermalStabilityMargin} K
              </div>
              <span className="text-[9px] text-slate-500">Headroom to quench</span>
            </div>
          </div>

          {/* Recent Window Table */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              RECENT TELEMETRY WINDOW (SAMPLE RATE: 2 Hz)
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead className="bg-slate-950 text-slate-500 border-b border-slate-800">
                  <tr>
                    <th className="p-2">TIME</th>
                    <th className="p-2">B (T)</th>
                    <th className="p-2">Z (Ω)</th>
                    <th className="p-2">Δφ (°)</th>
                    <th className="p-2">C</th>
                    <th className="p-2">T_coil (K)</th>
                    <th className="p-2">I_lattice (kA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {rapidsStream.slice(-6).map((pt, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/40">
                      <td className="p-2 text-slate-400 font-mono">T-{pt.timestamp % 10000}ms</td>
                      <td className="p-2 text-sky-400">{pt.B_flux.toFixed(2)}</td>
                      <td className="p-2 text-amber-400">{pt.Z_impedance.toFixed(1)}</td>
                      <td className="p-2 text-slate-300">{pt.deltaPhi_deg.toFixed(2)}</td>
                      <td className="p-2 text-emerald-400 font-bold">{pt.C_coupling.toFixed(2)}</td>
                      <td className="p-2 text-purple-400">{pt.T_coil_K.toFixed(1)}</td>
                      <td className="p-2 text-cyan-400">{pt.I_lattice_kA.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* LENS 4: SIMON PERVASIVE TRAJECTORY LISTENER */}
      {activeLens === 'simon' && (
        <div id="panel-simon-trajectories" className="flex flex-col gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                SIMON: PERVASIVE TRAJECTORY INTERPRETATION
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              SIMON does not operate the craft. It sits across the architecture, listens to state transitions, and interprets the 5 possible control trajectories to explain what each pathway physically implies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {simonTrajectories.map(traj => (
              <div
                key={traj.id}
                onClick={() => setSelectedTrajectory(traj.id)}
                className={`p-4 rounded-xl border flex flex-col gap-2.5 cursor-pointer transition-all ${
                  selectedTrajectory === traj.id
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-amber-300">{traj.title}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-950 border border-slate-800 text-slate-400">
                      {traj.postureType}
                    </span>
                    {traj.recommendedBySimon && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        SIMON RECS
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  Anchor: {traj.governingRuleAnchor}
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {traj.description}
                </p>

                <div className="flex flex-col gap-1 p-2 rounded bg-slate-950/80 border border-slate-850 text-[10px]">
                  <span className="font-bold text-slate-400">Physical Implications:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    {traj.physicalImplications.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                  <span>Coupling Impact: <span className="text-emerald-400 font-bold">{traj.expectedCouplingDelta}</span></span>
                  <span>Thermal Risk: <span className={traj.thermalRisk === 'High' ? 'text-rose-400 font-bold' : 'text-slate-300'}>{traj.thermalRisk}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LENS 5: JEMMA ADVERSARIAL AUDITOR & FRICTION */}
      {activeLens === 'jemma' && (
        <div id="panel-jemma-auditor" className="flex flex-col gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                JEMMA: ADVERSARIAL STATE AUDITOR & FRICTION ENGINE
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              &ldquo;Her job is not: fly the craft. Her job is: attack the claimed state.&rdquo; Jemma challenges ungrounded assumptions, demands equations for hyper-velocity, detects contradictions, and preserves friction rather than hiding it.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {jemmaChallenges.map(challenge => (
              <div
                key={challenge.id}
                className={`p-4 rounded-xl border flex flex-col gap-2.5 transition-all ${
                  challenge.isMitigated
                    ? 'bg-slate-900/40 border-slate-800/80 text-slate-400 opacity-75'
                    : challenge.frictionSeverity === 'critical'
                    ? 'bg-rose-950/20 border-rose-500/40 text-rose-100'
                    : 'bg-slate-900/90 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">
                      TARGET: {challenge.targetMetric}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-amber-300 border border-slate-800">
                      Claimed: {challenge.claimedValue}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      challenge.frictionSeverity === 'critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {challenge.frictionSeverity} FRICTION
                    </span>

                    <button
                      onClick={() => toggleMitigation(challenge.id)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                        challenge.isMitigated
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40'
                      }`}
                    >
                      {challenge.isMitigated ? 'Mitigated (Click to Reopen)' : 'Mitigate Challenge'}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 flex flex-col gap-1.5">
                  <div className="text-amber-300 font-bold text-xs">
                    Question: {challenge.challengeQuestion}
                  </div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">
                    Physical Basis of Attack: {challenge.physicalBasisOfAttack}
                  </div>
                </div>

                {challenge.mitigationNotes && (
                  <div className="text-[10px] text-slate-500 italic">
                    Resolution note: {challenge.mitigationNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LENS 6: OCTAGON & CRYSTAL BRIDGE */}
      {activeLens === 'octagon_bridge' && (
        <div id="panel-octagon-bridge" className="flex flex-col gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                OCTAGON SAFETY ENVELOPE & CRYSTAL BRIDGE AUTHORIZATION
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Octagon checks whether proposed control laws satisfy safety predicates before dispatch. Crystal Bridge enforces the sovereign kernel: final command execution requires explicit Operator authorization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Octagon Predicate Table */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <span className="font-bold text-slate-200 text-xs uppercase tracking-wider">
                SAFETY PREDICATES (u_t ∈ U_allowed)
              </span>

              <div className="flex flex-col gap-2">
                {octagonReport.predicates.map(pred => (
                  <div
                    key={pred.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 flex justify-between items-center text-[11px]"
                  >
                    <div className="flex items-center gap-2">
                      {pred.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <div>
                        <div className="text-white font-bold">{pred.name}</div>
                        <div className="text-[10px] text-slate-500">Condition: {pred.condition}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${pred.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pred.currentValue}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crystal Bridge Sign-Off */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <span className="font-bold text-indigo-300 text-xs uppercase tracking-wider">
                CRYSTAL BRIDGE DISPATCH CONSOLE
              </span>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 flex flex-col gap-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Trajectory:</span>
                  <span className="text-amber-300 font-bold uppercase">{selectedTrajectory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Octagon Status:</span>
                  <span className={`font-bold ${
                    octagonReport.overallStatus === 'APPROVED' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {octagonReport.overallStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jemma Friction:</span>
                  <span className="text-slate-300">
                    {jemmaSummary.unmitigatedContradictions === 0 ? 'All Friction Mitigated' : `${jemmaSummary.unmitigatedContradictions} Active Contradictions`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sovereignty Compliance:</span>
                  <span className="text-emerald-400 font-bold">{octagonReport.sovereigntyComplianceIndex}%</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-[10px] text-slate-400">Operator Callsign Signature:</label>
                <input
                  type="text"
                  value={operatorCallsign}
                  onChange={e => setOperatorCallsign(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                id="btn-crystal-bridge-full-sign"
                onClick={handleOperatorSignAndDispatch}
                disabled={!octagonReport.canProceedToOperator}
                className={`w-full min-h-[44px] py-2.5 px-4 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  octagonReport.canProceedToOperator
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 hover:opacity-90 text-white shadow-md cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>
                  {dispatchConfirmed ? 'DISPATCH EXECUTED VIA CRYSTAL BRIDGE' : 'SOVEREIGN OPERATOR SIGN-OFF & DISPATCH'}
                </span>
              </button>

              {dispatchConfirmed && signedAuthPayload && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1 text-[10px]">
                  <div className="font-bold text-emerald-300">AUTHORIZATION PAYLOAD COMMITTED:</div>
                  <pre className="text-[9px] text-slate-400 overflow-x-auto p-1.5 bg-slate-950 rounded">
                    {JSON.stringify(signedAuthPayload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
