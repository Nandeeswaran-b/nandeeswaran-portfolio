'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Cpu, RefreshCw, BarChart2, ShieldAlert, ShieldCheck, Sparkles, Binary } from 'lucide-react';

type ModelType = 'churn' | 'loan';

export default function ModelPlayground() {
  const [model, setModel] = useState<ModelType>('churn');
  const [isInferenceRunning, setIsInferenceRunning] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{
    score: number;
    label: string;
    description: string;
    details: string;
  } | null>(null);

  // Churn State Variables
  const [creditScore, setCreditScore] = useState(650);
  const [age, setAge] = useState(38);
  const [balance, setBalance] = useState(45000);
  const [numProducts, setNumProducts] = useState(2);
  const [isActiveMember, setIsActiveMember] = useState(true);

  // Loan State Variables
  const [income, setIncome] = useState(5500);
  const [coIncome, setCoIncome] = useState(1500);
  const [loanAmount, setLoanAmount] = useState(120000);
  const [creditHistory, setCreditHistory] = useState(true);
  const [isGraduate, setIsGraduate] = useState(true);

  const resetParams = () => {
    setCreditScore(650);
    setAge(38);
    setBalance(45000);
    setNumProducts(2);
    setIsActiveMember(true);

    setIncome(5500);
    setCoIncome(1500);
    setLoanAmount(120000);
    setCreditHistory(true);
    setIsGraduate(true);

    setPredictionResult(null);
  };

  const handleInference = () => {
    setIsInferenceRunning(true);
    setPredictionResult(null);

    // Simulate model inference time
    setTimeout(() => {
      if (model === 'churn') {
        // Simple mock Random Forest math formula for customer churn simulation
        // Low credit score, higher age, high balance, lower active membership, extreme products -> high churn
        let scoreVal = 0.3; // base rate
        
        if (creditScore < 600) scoreVal += 0.2;
        if (creditScore > 750) scoreVal -= 0.15;
        
        if (age > 45) scoreVal += 0.25;
        if (age < 30) scoreVal -= 0.1;
        
        if (balance > 100000) scoreVal += 0.15;
        if (balance < 10000) scoreVal -= 0.05;
        
        if (numProducts === 1) scoreVal += 0.1;
        if (numProducts >= 3) scoreVal += 0.35;
        if (numProducts === 2) scoreVal -= 0.15;
        
        if (!isActiveMember) scoreVal += 0.2;
        else scoreVal -= 0.15;

        // Clip between 0 and 1
        scoreVal = Math.max(0.02, Math.min(0.98, scoreVal));
        const scorePercentage = Math.round(scoreVal * 100);

        let label = 'Low Risk';
        let description = 'Customer is highly likely to remain active and loyal. Keep engagement strategies normal.';
        if (scorePercentage > 70) {
          label = 'Critical Risk';
          description = 'High probability of customer attrition. Proactive retention campaign recommended.';
        } else if (scorePercentage > 40) {
          label = 'Moderate Risk';
          description = 'Moderate attrition indicators. Suggest check-in offer or tailored product suggestions.';
        }

        setPredictionResult({
          score: scorePercentage,
          label,
          description,
          details: `Processed feature array: [Credit: ${creditScore}, Age: ${age}, Bal: $${balance.toLocaleString()}, Prods: ${numProducts}, Active: ${isActiveMember ? 1 : 0}]`
        });
      } else {
        // Simple mock Logistic Regression math formula for credit score risk
        // Good credit history, high combined income relative to loan amount -> approved
        let scoreVal = 0.5; // base rate
        
        if (creditHistory) scoreVal += 0.35;
        else scoreVal -= 0.45;
        
        const totalIncome = income + coIncome;
        const ratio = loanAmount / (totalIncome * 12 || 1); // loan ratio to annual income
        
        if (ratio > 3) scoreVal -= 0.25;
        if (ratio < 1.5) scoreVal += 0.15;
        
        if (isGraduate) scoreVal += 0.05;
        else scoreVal -= 0.05;

        scoreVal = Math.max(0.01, Math.min(0.99, scoreVal));
        const scorePercentage = Math.round(scoreVal * 100);

        let label = 'Approved';
        let description = 'Applicant meets creditworthiness standards. Recommended for standard processing rates.';
        if (scorePercentage < 40) {
          label = 'Denied';
          description = 'Applicant debt-to-income or credit history indicates high risk. Rejected for approval.';
        } else if (scorePercentage < 60) {
          label = 'Manual Review Required';
          description = 'Borderline score. Suggest verifying secondary income streams and asset collateral.';
        }

        setPredictionResult({
          score: scorePercentage,
          label,
          description,
          details: `Computed log-odds vector: [Ratio: ${ratio.toFixed(2)}, CredHist: ${creditHistory ? 1 : 0}, Grad: ${isGraduate ? 1 : 0}, CombinedInc: $${totalIncome}]`
        });
      }
      setIsInferenceRunning(false);
    }, 1800);
  };

  return (
    <section id="playground" className="py-24 space-y-16 scroll-mt-20 relative">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/3 -z-20 w-80 h-80 rounded-full bg-electric/5 filter blur-[100px] pointer-events-none"></div>

      {/* Title Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Interactive Sandbox</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          AI Model <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">Playground</span>
        </motion.h2>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-sm">
          Run real-time client-side predictive inference. Adjust variables and execute classifications simulating real Data Science project algorithms.
        </p>
      </div>

      {/* Model Selection Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => { setModel('churn'); setPredictionResult(null); }}
          className={`px-6 py-3 rounded-full font-bold border transition-all text-sm flex items-center gap-2 ${
            model === 'churn'
              ? 'bg-electric/10 border-electric text-electric dark:text-white shadow-lg'
              : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Churn Prediction Model
        </button>
        <button
          onClick={() => { setModel('loan'); setPredictionResult(null); }}
          className={`px-6 py-3 rounded-full font-bold border transition-all text-sm flex items-center gap-2 ${
            model === 'loan'
              ? 'bg-electric/10 border-electric text-electric dark:text-white shadow-lg'
              : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          <Binary className="w-4 h-4" />
          Loan Risk Estimator
        </button>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
        
        {/* Left Parameter Panel (7 cols) */}
        <div className="lg:col-span-7 premium-card p-8 rounded-2xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/5">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-electric animate-pulse" />
                Hyperparameter Inputs
              </h3>
              <button
                onClick={resetParams}
                className="text-xs text-slate-500 hover:text-electric flex items-center gap-1.5 font-semibold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>

            {/* Render conditional inputs */}
            {model === 'churn' ? (
              <div className="space-y-6">
                {/* Credit Score Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Credit Score</span>
                    <span className="text-electric">{creditScore}</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="850"
                    value={creditScore}
                    onChange={(e) => setCreditScore(parseInt(e.target.value))}
                    className="w-full accent-electric bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>300 (Poor)</span>
                    <span>850 (Excellent)</span>
                  </div>
                </div>

                {/* Age Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Customer Age</span>
                    <span className="text-electric">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="90"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full accent-electric bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>18 yrs</span>
                    <span>90 yrs</span>
                  </div>
                </div>

                {/* Account Balance Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Account Balance</span>
                    <span className="text-electric">${balance.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={balance}
                    onChange={(e) => setBalance(parseInt(e.target.value))}
                    className="w-full accent-electric bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$0</span>
                    <span>$200,000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Number of Products */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Bank Products Utilized
                    </label>
                    <select
                      value={numProducts}
                      onChange={(e) => setNumProducts(parseInt(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-white font-semibold text-sm outline-none focus:border-electric"
                    >
                      <option value="1">1 Product (High Risk)</option>
                      <option value="2">2 Products (Optimal)</option>
                      <option value="3">3 Products (High Engagement)</option>
                      <option value="4">4 Products (Overload Risk)</option>
                    </select>
                  </div>

                  {/* Active Membership Toggle */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Membership Status
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsActiveMember(true)}
                        className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                          isActiveMember
                            ? 'bg-electric text-white border-electric shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Active Member
                      </button>
                      <button
                        onClick={() => setIsActiveMember(false)}
                        className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                          !isActiveMember
                            ? 'bg-electric text-white border-electric shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Income Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Applicant Monthly Income</span>
                    <span className="text-electric">${income.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="15000"
                    step="250"
                    value={income}
                    onChange={(e) => setIncome(parseInt(e.target.value))}
                    className="w-full accent-electric bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$1,000</span>
                    <span>$15,000</span>
                  </div>
                </div>

                {/* Co-applicant Income Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Co-Applicant Monthly Income</span>
                    <span className="text-electric">${coIncome.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="250"
                    value={coIncome}
                    onChange={(e) => setCoIncome(parseInt(e.target.value))}
                    className="w-full accent-electric bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$0</span>
                    <span>$10,000</span>
                  </div>
                </div>

                {/* Loan Amount Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Requested Loan Amount</span>
                    <span className="text-electric">${loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="400000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full accent-electric bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$10,000</span>
                    <span>$400,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Credit History */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Credit History Record
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCreditHistory(true)}
                        className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                          creditHistory
                            ? 'bg-electric text-white border-electric shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Good Standing
                      </button>
                      <button
                        onClick={() => setCreditHistory(false)}
                        className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                          !creditHistory
                            ? 'bg-electric text-white border-electric shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Bad Standing
                      </button>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Education Status
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsGraduate(true)}
                        className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                          isGraduate
                            ? 'bg-electric text-white border-electric shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Graduate
                      </button>
                      <button
                        onClick={() => setIsGraduate(false)}
                        className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                          !isGraduate
                            ? 'bg-electric text-white border-electric shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Not Graduate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleInference}
            disabled={isInferenceRunning}
            className="w-full mt-8 py-4 px-6 rounded-xl bg-gradient-to-r from-electric to-neon-blue text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 hover:shadow-electric/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isInferenceRunning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Executing Client Inference Pipeline...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                Run Model Inference
              </>
            )}
          </button>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 premium-card p-8 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden bg-slate-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full filter blur-2xl pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {isInferenceRunning ? (
              <motion.div
                key="running"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 p-4 flex flex-col items-center"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-white/5"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-electric border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  <Cpu className="w-8 h-8 text-electric" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Calculating Weights</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg max-w-[280px]">
                    sigmoid(w^T * X + b)...
                  </p>
                </div>
              </motion.div>
            ) : predictionResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 w-full"
              >
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-ping"></span>
                  <span>Pipeline Success</span>
                </div>

                {/* Score gauge ring */}
                <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      strokeWidth="10"
                      stroke="currentColor"
                      className="text-slate-100 dark:text-white/5"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="65"
                      strokeWidth="10"
                      strokeDasharray={408.4}
                      initial={{ strokeDashoffset: 408.4 }}
                      animate={{ strokeDashoffset: 408.4 - (408.4 * predictionResult.score) / 100 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      stroke="url(#gaugeGradient)"
                      fill="transparent"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a75ff" />
                        <stop offset="100%" stopColor="#00d2ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Inside metrics */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
                    <span className="text-3xl font-black text-slate-800 dark:text-white">
                      {predictionResult.score}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {model === 'churn' ? 'Attrition Prob' : 'Approval Score'}
                    </span>
                  </div>
                </div>

                {/* Verdict Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {predictionResult.label.includes('Approved') || predictionResult.label === 'Low Risk' ? (
                      <ShieldCheck className="w-5 h-5 text-neon-emerald" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-pink-500" />
                    )}
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                      {predictionResult.label}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                    {predictionResult.description}
                  </p>
                </div>

                {/* Features details logs */}
                <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-left max-w-sm mx-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Mathematical Details:
                  </span>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-300 break-words leading-relaxed">
                    {predictionResult.details}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-electric/10 border border-electric/20 flex items-center justify-center text-electric mx-auto">
                  <Cpu className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Awaiting Parameters</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] mx-auto">
                    Adjust inputs in the parameters panel and click run to analyze outcomes.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
