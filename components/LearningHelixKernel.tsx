/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pathfinder Substrate — Learning Helix Kernel
 * Double-Helix Epistemic Architecture (Learner Strand ↔ Teaching Strand)
 * Direct codification from https://github.com/rodlife1314-cell/Game_one
 */

"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
  Cpu,
  Compass,
  MessageSquare,
  Award,
  ChevronRight
} from "lucide-react";
import { HelixSimulationScenario, BasePair } from "../lib/game-one-types";

export const LearningHelixKernel: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [activeBasePairIndex, setActiveBasePairIndex] = useState<number>(0);
  const [learnerInput, setLearnerInput] = useState<string>("");
  const [learnerReflection, setLearnerReflection] = useState<string>("");
  const [feedbackState, setFeedbackState] = useState<{
    submitted: boolean;
    diagnosed: boolean;
    feedbackText: string;
    isPass: boolean;
  }>({
    submitted: false,
    diagnosed: false,
    feedbackText: "",
    isPass: false
  });

  const SCENARIOS: HelixSimulationScenario[] = [
    {
      scenarioId: "helix-antikythera-mechanics",
      domain: "Deterministic Kinematics & Gear Train Precision",
      targetCompetency: "Distinguishing exact rational ratios from floating-point approximations in clockwork trains",
      pedagogicalObjective: "Demonstrate why a 39T perturbation against nominal 38T causes catastrophic +2.63% tooth interference and lunar pointer desynchronization.",
      currentStageIndex: activeBasePairIndex,
      scaffoldingLevel: "MEDIUM",
      learnerHistory: [],
      basePairs: [
        {
          pairId: "pair-1-encounter",
          pairType: "ENCOUNTER",
          learnerState: "Observe",
          teachingState: "Elicit",
          prompt: "Examine Fragment B radiography: Sector tooth count shows 39 teeth on gear e1, but nominal historical template specifies 38 teeth. What physical consequence occurs at the axle center distance if 39 teeth are fitted without altering module m=0.35mm?",
          expectedEvidenceCriterion: "Pitch circle diameter increases by m = 0.35mm, exceeding backlash clearance and producing mechanical interference/binding.",
          scaffoldHint: "Recall: d = m · z, center distance a = (d1 + d2) / 2. If z increases from 38 to 39, what happens to d1?"
        },
        {
          pairId: "pair-2-diagnosis",
          pairType: "DIAGNOSIS",
          learnerState: "Attempt",
          teachingState: "Model",
          prompt: "Calculate the exact rational gear ratio of the 254-tooth Metonic train driven by a 19-tooth pinion. Why is 254/19 structurally superior to using 13.368421 in simulation?",
          expectedEvidenceCriterion: "254/19 preserves zero floating-point accumulation drift across multiple centuries.",
          scaffoldHint: "Think about cumulative truncation error when integrating 100,000 angular steps."
        },
        {
          pairId: "pair-3-feedback",
          pairType: "FEEDBACK",
          learnerState: "Error Analysis",
          teachingState: "Diagnose",
          prompt: "If tooth binding occurs, will the mechanism slip, stall, or strip bronze gear teeth under water-clock drive torque?",
          expectedEvidenceCriterion: "Under finite drive torque, high friction at tooth flank causes stall rather than slip in positive engagement trains.",
          scaffoldHint: "Involute gear teeth do not slip like friction belts; they lock."
        },
        {
          pairId: "pair-4-evidence",
          pairType: "EVIDENCE",
          learnerState: "Reflect",
          teachingState: "Scaffold",
          prompt: "Cite the physical artifact evidence (radiography layer vs historical inscription) that validates the 38-tooth count over the 39-tooth reconstruction.",
          expectedEvidenceCriterion: "Microfocus CT slice 142 reveals 38 tooth roots evenly spaced at 9.47° intervals.",
          scaffoldHint: "Look at the angular pitch interval: 360° / 38 = 9.4736° vs 360° / 39 = 9.2307°."
        },
        {
          pairId: "pair-5-transfer",
          pairType: "TRANSFER_CHALLENGE",
          learnerState: "Integrate",
          teachingState: "Validate",
          prompt: "Transfer Challenge: Apply this rational constraint to an optical encoder with 1024 CPR versus 1000 CPR in a satellite pointing gimbal.",
          expectedEvidenceCriterion: "Power-of-two division avoids remainder fractions in binary registers, preventing periodic bit wander.",
          scaffoldHint: "Binary register truncation mirrors analog gear ratio truncation."
        },
        {
          pairId: "pair-6-fade",
          pairType: "FADE_SUPPORT",
          learnerState: "Transfer",
          teachingState: "Fade Support",
          prompt: "State the overarching invariant for all deterministic mechanical twins in one sentence.",
          expectedEvidenceCriterion: "Physical geometry determines kinematic truth, and discrete tooth geometry cannot be approximated with continuous floats.",
          scaffoldHint: "Geometry > Approximation."
        }
      ]
    },
    {
      scenarioId: "helix-ccv01-waveguide",
      domain: "Poynting Waveguide & Electromagnetic Corridor Coupling",
      targetCompetency: "Mastering impedance boundary matching between internal cavity and free-space medium",
      pedagogicalObjective: "Understand why corridor coupling fails when characteristic impedance departs from 377Ω vacuum impedance.",
      currentStageIndex: activeBasePairIndex,
      scaffoldingLevel: "HIGH",
      learnerHistory: [],
      basePairs: [
        {
          pairId: "pair-1-encounter",
          pairType: "ENCOUNTER",
          learnerState: "Observe",
          teachingState: "Elicit",
          prompt: "Observe the Poynting vector flux S = E × H at the cavity boundary. When the load impedance Z_load = 50Ω while free space Z_0 = 377Ω, what happens to the reflected wave?",
          expectedEvidenceCriterion: "Reflection coefficient Γ = (50 - 377)/(50 + 377) = -0.765, reflecting 58.6% of incident power back into the cavity.",
          scaffoldHint: "Compute the reflection coefficient Γ = (Z_L - Z_0) / (Z_L + Z_0)."
        },
        {
          pairId: "pair-2-diagnosis",
          pairType: "DIAGNOSIS",
          learnerState: "Attempt",
          teachingState: "Model",
          prompt: "How does a quarter-wave impedance transformer restore matching at 142.5 MHz?",
          expectedEvidenceCriterion: "Z_match = sqrt(Z_in * Z_load) = sqrt(377 * 50) = 137.3Ω at quarter wavelength.",
          scaffoldHint: "Geometric mean of source and load impedances."
        },
        {
          pairId: "pair-3-feedback",
          pairType: "FEEDBACK",
          learnerState: "Error Analysis",
          teachingState: "Diagnose",
          prompt: "Why does high SWR (> 3.0:1) risk breakdown in the superconducting corridor rail?",
          expectedEvidenceCriterion: "Standing wave voltage peaks double the peak electric field, exceeding dielectric breakdown threshold.",
          scaffoldHint: "Standing waves produce voltage antinodes."
        },
        {
          pairId: "pair-4-evidence",
          pairType: "EVIDENCE",
          learnerState: "Reflect",
          teachingState: "Scaffold",
          prompt: "What sensor telemetry validates that corridor coupling has entered resonance?",
          expectedEvidenceCriterion: "Return loss S11 drops below -20 dB and phase angle approaches 0°.",
          scaffoldHint: "Minimal reflected power corresponds to deep dip in S11."
        },
        {
          pairId: "pair-5-transfer",
          pairType: "TRANSFER_CHALLENGE",
          learnerState: "Integrate",
          teachingState: "Validate",
          prompt: "Transfer: Explain how plasma density drift alters corridor characteristic impedance.",
          expectedEvidenceCriterion: "Plasma dielectric permittivity ε_p = 1 - (ω_p/ω)², altering phase velocity and effective impedance.",
          scaffoldHint: "Drude model permittivity changes wave propagation speed."
        },
        {
          pairId: "pair-6-fade",
          pairType: "FADE_SUPPORT",
          learnerState: "Transfer",
          teachingState: "Fade Support",
          prompt: "State the impedance matching doctrine for all propulsion twins.",
          expectedEvidenceCriterion: "Energy transfer is maximized and reflection minimized only when boundary impedances are conjugate matched.",
          scaffoldHint: "Conjugate matching ensures zero reactive reflection."
        }
      ]
    }
  ];

  const currentScenario = SCENARIOS[selectedScenarioIndex];
  const activePair = currentScenario.basePairs?.[activeBasePairIndex] || currentScenario.basePairs![0];

  const handleSubmitLearnerInput = () => {
    if (!learnerInput.trim()) return;

    // Evaluate input against expected criterion
    const inputLower = learnerInput.toLowerCase();
    const criterionWords = activePair.expectedEvidenceCriterion?.toLowerCase().split(" ") || [];
    const matchedCount = criterionWords.filter(w => w.length > 3 && inputLower.includes(w)).length;
    const isPass = matchedCount >= 2 || learnerInput.length > 25;

    setFeedbackState({
      submitted: true,
      diagnosed: true,
      feedbackText: isPass
        ? `Criterion Met: Your analysis correctly addresses the physical boundary condition (${activePair.expectedEvidenceCriterion}).`
        : `Partial Understanding: Re-examine the scaffold hint. Key consideration: ${activePair.expectedEvidenceCriterion}`,
      isPass
    });
  };

  const handleNextBasePair = () => {
    if (activeBasePairIndex < (currentScenario.basePairs?.length || 1) - 1) {
      setActiveBasePairIndex(prev => prev + 1);
      setLearnerInput("");
      setLearnerReflection("");
      setFeedbackState({ submitted: false, diagnosed: false, feedbackText: "", isPass: false });
    }
  };

  const handleResetScenario = () => {
    setActiveBasePairIndex(0);
    setLearnerInput("");
    setLearnerReflection("");
    setFeedbackState({ submitted: false, diagnosed: false, feedbackText: "", isPass: false });
  };

  return (
    <div className="bg-[#0B0D12] p-6 rounded-2xl border border-[#1E222D] text-[#E6E4DF] space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-[#1E222D] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#261E14] border border-[#453317] rounded-xl flex items-center justify-center text-[#F59E0B] shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium tracking-tight text-[#E6E4DF]">
                Learning Helix Kernel
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#FBBF24]">
                DOUBLE-HELIX PEDAGOGY
              </span>
            </div>
            <p className="text-xs text-[#8A8F9A] mt-0.5">
              Learner Strand (Observe ↔ Attempt ↔ Reflect) coupled to Teaching Strand (Elicit ↔ Model ↔ Scaffold ↔ Validate)
            </p>
          </div>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#8A8F9A] font-mono">Curriculum:</span>
          <select
            value={selectedScenarioIndex}
            onChange={(e) => {
              setSelectedScenarioIndex(Number(e.target.value));
              handleResetScenario();
            }}
            className="bg-[#12151D] border border-[#222736] rounded-lg px-3 py-1.5 text-xs text-[#E6E4DF] focus:outline-none focus:border-[#C5A059]"
          >
            {SCENARIOS.map((sc, i) => (
              <option key={sc.scenarioId} value={i}>{sc.domain}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scenario Overview */}
      <div className="p-4 rounded-xl bg-[#12151E] border border-[#1E2433] space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between text-xs gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#F59E0B]">Target Competency</span>
            <div className="text-sm font-semibold text-[#E6E4DF]">{currentScenario.targetCompetency}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-[#8A8F9A]">Pedagogical Goal</span>
            <div className="text-xs text-[#9CA3AF] max-w-md">{currentScenario.pedagogicalObjective}</div>
          </div>
        </div>
      </div>

      {/* 6 Inter-Strand Base Pairs Stepper */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#8A8F9A] px-1">
          <span>INTER-STRAND BASE PAIRS (6 COGNITIVE STEPS)</span>
          <span>STEP {activeBasePairIndex + 1} OF 6</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {currentScenario.basePairs?.map((pair, idx) => {
            const isCurrent = idx === activeBasePairIndex;
            const isCompleted = idx < activeBasePairIndex;

            return (
              <button
                key={pair.pairId}
                onClick={() => {
                  setActiveBasePairIndex(idx);
                  setFeedbackState({ submitted: false, diagnosed: false, feedbackText: "", isPass: false });
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? "bg-[#C5A059]/15 border-[#C5A059] text-[#C5A059]"
                    : isCompleted
                    ? "bg-[#101F18] border-[#1B4332] text-[#34D399]"
                    : "bg-[#10131A] border-[#1C202C] text-[#8A8F9A] hover:border-[#2A3040]"
                }`}
              >
                <div className="text-[10px] font-mono font-bold">
                  {`0${idx + 1}: ${pair.pairType?.replace(/_/g, " ")}`}
                </div>
                <div className="text-[9px] font-mono mt-1 text-[#8A8F9A]">
                  {pair.learnerState} ↔ {pair.teachingState}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Base Pair Interaction Zone */}
      <div className="p-5 rounded-xl bg-[#12151E] border border-[#222736] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2433]">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
              {activePair.pairType}
            </span>
            <span className="text-xs text-[#8A8F9A] font-mono">
              Learner Strand: <strong className="text-[#E6E4DF]">{activePair.learnerState}</strong> · Teaching Strand: <strong className="text-[#60A5FA]">{activePair.teachingState}</strong>
            </span>
          </div>

          <button
            onClick={handleResetScenario}
            className="text-xs text-[#8A8F9A] hover:text-[#E6E4DF] flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restart Helix</span>
          </button>
        </div>

        {/* Prompt from Teaching Strand */}
        <div className="p-4 rounded-lg bg-[#0C0E14] border border-[#1A1D27] space-y-2">
          <div className="text-[10px] font-mono uppercase text-[#F59E0B] flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Teaching Strand Inquiry</span>
          </div>
          <p className="text-xs text-[#E6E4DF] leading-relaxed font-mono">
            {activePair.prompt}
          </p>
        </div>

        {/* Scaffolding Hint */}
        {activePair.scaffoldHint && (
          <div className="p-3 rounded-lg bg-[#181A24] border border-[#272C3D] flex items-start space-x-2 text-xs">
            <Lightbulb className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
            <div className="text-[#9CA3AF] font-mono text-[11px]">
              <span className="text-[#E6E4DF] font-semibold">Scaffold Hint: </span>
              {activePair.scaffoldHint}
            </div>
          </div>
        )}

        {/* Learner Input Area */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase text-[#8A8F9A]">
            Learner Formulation & Evidence Response
          </div>
          <textarea
            rows={3}
            value={learnerInput}
            onChange={(e) => setLearnerInput(e.target.value)}
            placeholder="Formulate your empirical calculation or boundary explanation..."
            className="w-full p-3 rounded-lg bg-[#0A0C11] border border-[#202533] text-xs text-[#E6E4DF] font-mono focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Submit & Diagnose Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleSubmitLearnerInput}
            disabled={!learnerInput.trim()}
            className="px-4 py-1.5 rounded-lg bg-[#C5A059] text-[#0D0E11] text-xs font-semibold hover:bg-[#D4B06A] transition disabled:opacity-40 flex items-center space-x-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Submit for Diagnostic Evaluation</span>
          </button>

          {feedbackState.submitted && (
            <button
              onClick={handleNextBasePair}
              disabled={activeBasePairIndex >= (currentScenario.basePairs?.length || 1) - 1}
              className="px-4 py-1.5 rounded-lg bg-[#1E2638] text-[#93C5FD] hover:bg-[#28334A] text-xs font-semibold transition disabled:opacity-40 flex items-center space-x-1.5"
            >
              <span>Next Base Pair</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Feedback State Output */}
        {feedbackState.diagnosed && (
          <div className={`p-4 rounded-xl border space-y-2 ${
            feedbackState.isPass ? "bg-[#101F18] border-[#1B4332]" : "bg-[#251216] border-[#4A1D24]"
          }`}>
            <div className="flex items-center space-x-2">
              {feedbackState.isPass ? (
                <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#F87171]" />
              )}
              <span className="text-xs font-semibold text-[#E6E4DF]">
                {feedbackState.isPass ? "Diagnostic Validation Passed" : "Refinement Recommended"}
              </span>
            </div>
            <p className="text-xs text-[#D1D5DB] font-mono leading-relaxed">
              {feedbackState.feedbackText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
