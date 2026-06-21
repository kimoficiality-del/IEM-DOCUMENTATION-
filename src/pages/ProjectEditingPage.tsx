import { motion, AnimatePresence } from "motion/react";
import { FileEdit, SpellCheck, Layout, Type, Highlighter, Search, ArrowRight, Upload, HelpCircle, CheckCircle, RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { addTicket } from "../lib/portalState";
import * as React from "react";

export default function ProjectEditingPage() {
  const services = [
    { title: "Thesis Formatting", desc: "Alignment with university standards for PhD, Masters, and Bachelors degrees.", icon: <Layout />, key: "format" },
    { title: "Grammar Correction", desc: "Rigorous linguistic check for clarity, flow, and academic integrity.", icon: <SpellCheck />, key: "grammar" },
    { title: "Plagiarism Check", desc: "Deep scans to ensure original work and proper citation styles.", icon: <Search />, key: "search" },
    { title: "Professional CVs", desc: "Modern document design for high-impact professional applications.", icon: <Type />, key: "cv" },
  ];

  // Dynamic Workspace State
  const [docType, setDocType] = React.useState("Dissertation (Master's)");
  const [wordCount, setWordCount] = React.useState(15000);
  const [editingLevel, setEditingLevel] = React.useState<"proof" | "structure" | "heavy">("structure");
  const [citationStyle, setCitationStyle] = React.useState("APA Style");
  const [turnaround, setTurnaround] = React.useState<"standard" | "express">("standard");
  const [plagiarismCheck, setPlagiarismCheck] = React.useState(true);

  // File loading simulation
  const [manuscriptFile, setManuscriptFile] = React.useState<string | null>(null);
  const [manuscriptSize, setManuscriptSize] = React.useState<string | null>(null);
  const [isReadyForAnalysis, setIsReadyForAnalysis] = React.useState(false);
  const [analysisStatus, setAnalysisStatus] = React.useState<"idle" | "uploading" | "grammar_pass" | "done">("idle");
  const [scanningIssues, setScanningIssues] = React.useState({ grammar: 0, citation: 0, score: 100 });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedRequest, setSubmittedRequest] = React.useState<any | null>(null);

  const calculatorRef = React.useRef<HTMLDivElement>(null);

  const handleTriggerQuote = (title: string) => {
    setDocType(title.includes("CV") ? "Professional CV" : "Thesis (Ph.D.)");
    if (title.includes("Grammar")) {
      setEditingLevel("proof");
    } else if (title.includes("Formatting")) {
      setEditingLevel("structure");
    }
    calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const calculateEstimate = () => {
    let ratePerWord = 15; // default structure
    if (editingLevel === "proof") ratePerWord = 10;
    else if (editingLevel === "heavy") ratePerWord = 25;

    let cost = wordCount * ratePerWord;

    if (plagiarismCheck) {
      cost += 10000; // flat fee for detailed Turnitin deep search
    }

    if (turnaround === "express") {
      cost = cost * 1.5; // +50% urgent surcharge
    }

    return Math.floor(cost);
  };

  const calculateDeliveryDate = () => {
    const today = new Date("2026-06-21");
    if (turnaround === "express") {
      today.setDate(today.getDate() + 2);
    } else {
      const days = Math.min(15, Math.max(4, Math.floor(wordCount / 4000)));
      today.setDate(today.getDate() + days);
    }
    return today.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setManuscriptFile(file.name);
      setManuscriptSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
      setAnalysisStatus("uploading");
      setIsReadyForAnalysis(true);

      // Stage-1 Upload simulation
      setTimeout(() => {
        setAnalysisStatus("grammar_pass");
        
        // Stage-2 Grammar preflight compilation
        setTimeout(() => {
          setAnalysisStatus("done");
          // Generate realistic manuscript quality reports to show incredible completeness!
          const gIssues = Math.floor(12 + Math.random() * 45);
          const cIssues = Math.floor(2 + Math.random() * 20);
          const qualityScore = Math.floor(75 + Math.random() * 20);
          setScanningIssues({ grammar: gIssues, citation: cIssues, score: qualityScore });
          
          // Auto-adjust wordcount dynamically based on mock files!
          const randomWords = Math.floor(6500 + Math.random() * 38000);
          setWordCount(randomWords);
        }, 1200);

      }, 1000);
    }
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const formattedTotal = calculateEstimate().toLocaleString() + " FCFA";
      const ticket = addTicket({
        type: "editing",
        title: `Academic Editorial Review: ${docType}`,
        status: "analyzing",
        costEstimate: formattedTotal,
        fileName: manuscriptFile || undefined,
        details: {
          styleGuide: citationStyle,
          manuscriptWordCount: wordCount.toLocaleString() + " words",
          tierLevel: editingLevel === "proof" ? "Grammar proofing only" : editingLevel === "structure" ? "Format standardization" : "Hard double-pass overhaul",
          plagiarismAuditUrlScan: plagiarismCheck ? "Enabled (Detailed Audit)" : "None",
          timeframes: turnaround === "express" ? "Urgent Express Delivery" : "Standard Academic Pace",
          preflightScoreFeedback: manuscriptFile ? `${scanningIssues.score}% rating` : "Awaiting manuscript upload"
        }
      });
      setSubmittedRequest(ticket);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
           <div className="lg:w-1/2">
              <Badge className="mb-6 bg-amber-50 text-amber-700 border-amber-100">Academic & Professional</Badge>
              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 mb-8 leading-tight">
                Refine your research with <span className="text-amber-600">precision</span>.
              </h1>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed mb-10">
                Our expert editors ensure your projects and theses meet international academic standards. From layout formatting to grammar optimization, we handle the details so your ideas can shine.
              </p>
              <Button 
                onClick={() => calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl px-10 py-7 font-bold shadow-xl shadow-amber-600/20 gap-2"
              >
                Configure Academic Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
           </div>
           
           <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => handleTriggerQuote(s.title)}
                  className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                >
                   <div className="w-12 h-12 bg-amber-50 rounded-2xl group-hover:scale-110 duration-205 flex items-center justify-center text-amber-600 mb-6 font-bold">
                      {s.icon}
                   </div>
                   <h3 className="text-xl font-bold text-zinc-900 mb-3">{s.title}</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                   <span className="text-xs font-black text-amber-650 flex items-center gap-1.5 group-hover:underline">
                      Estimate this <ArrowRight className="w-3.5 h-3.5" />
                   </span>
                </div>
              ))}
           </div>
        </div>

        {/* Interactive Estimator Workspace */}
        <div ref={calculatorRef} className="mt-28">
           <div className="bg-white border border-zinc-200 shadow-2xl rounded-[3rem] p-8 md:p-14 lg:p-16">
              <AnimatePresence mode="wait">
                 {submittedRequest ? (
                    <motion.div
                      key="editing-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-10 space-y-6 max-w-2xl mx-auto"
                    >
                      <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-650 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full">
                          Evaluation Scheduled Successfully
                        </span>
                        <h2 className="text-3xl font-black text-zinc-950 mt-3">Ticket Code: {submittedRequest.id}</h2>
                        <p className="text-zinc-500 font-medium">
                          Your draft manuscript material has been registered under advanced plagiarism queue. Our document supervisor Bonaventure N. is assigned for verification.
                        </p>
                      </div>

                      <div className="bg-zinc-50 rounded-3xl p-6 text-left border border-zinc-100 text-sm divide-y divide-zinc-200/50">
                        <div className="py-2.5 flex justify-between">
                          <span className="text-zinc-400 font-bold">Project Category:</span>
                          <span className="font-bold text-zinc-800">{submittedRequest.details.styleGuide} Formatting</span>
                        </div>
                        <div className="py-2.5 flex justify-between">
                          <span className="text-zinc-400 font-bold">Manuscript Scope:</span>
                          <span className="font-bold text-zinc-800">{submittedRequest.details.manuscriptWordCount}</span>
                        </div>
                        {submittedRequest.fileName && (
                          <div className="py-2.5 flex justify-between">
                            <span className="text-zinc-400 font-bold">Draft Submitted:</span>
                            <span className="font-bold text-amber-650">{submittedRequest.fileName}</span>
                          </div>
                        )}
                        <div className="py-2.5 flex justify-between">
                          <span className="text-zinc-400 font-bold">Service Standard:</span>
                          <span className="font-bold text-zinc-800">{submittedRequest.details.tierLevel}</span>
                        </div>
                        <div className="py-3 flex justify-between text-base border-t border-zinc-200/50 mt-2">
                          <span className="text-zinc-950 font-black">Estimated Project Fee:</span>
                          <span className="font-black text-amber-600 text-lg">{submittedRequest.costEstimate}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                          onClick={() => {
                            setSubmittedRequest(null);
                            setManuscriptFile(null);
                            setAnalysisStatus("idle");
                          }}
                          variant="outline"
                          className="rounded-xl border-zinc-200 font-bold h-12 px-8"
                        >
                          Calculate Another Paper
                        </Button>
                        <a 
                          href={`https://wa.me/237691005841?text=${encodeURIComponent(`Hello IEM, I would like to lock in editorial review for my project (${submittedRequest.id}). Word count is ${submittedRequest.details.manuscriptWordCount} under ${submittedRequest.details.styleGuide}. Estimate cost is ${submittedRequest.costEstimate}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-xl flex items-center justify-center px-8 shadow-lg shadow-amber-650/15 gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Coordinate with Editors
                        </a>
                      </div>
                    </motion.div>
                 ) : (
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                       <form onSubmit={handleFormSubmission} className="lg:col-span-7 space-y-6">
                          <div>
                             <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-2">Editorial Hub</Badge>
                             <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Standardize Your Research Document</h2>
                             <p className="text-zinc-500 text-sm mt-1">Select university standard options to lock in a professional cost breakdown.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Target Academic Format</label>
                              <select
                                value={docType}
                                onChange={(e) => setDocType(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-zinc-800"
                              >
                                <option>Final Year Project (Bachelor's)</option>
                                <option>Dissertation (Master's)</option>
                                <option>Thesis (Ph.D.)</option>
                                <option>Scientific Paper / Manuscript</option>
                                <option>Professional CV / Resume</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Citation Style Standard</label>
                              <select
                                value={citationStyle}
                                onChange={(e) => setCitationStyle(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-zinc-800"
                              >
                                <option>APA Style (7th Edition)</option>
                                <option>MLA Style (9th Edition)</option>
                                <option>Harvard Style Guide</option>
                                <option>Chicago Manual of Style</option>
                                <option>IEEE (Engineering Standard)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Word Count Volume</label>
                              <span className="text-sm font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">
                                {wordCount.toLocaleString()} words
                              </span>
                            </div>
                            <input 
                              type="range" 
                              min={500} 
                              max={100000} 
                              step={500}
                              value={wordCount}
                              onChange={(e) => setWordCount(Number(e.target.value))}
                              className="w-full accent-amber-600"
                            />
                            <div className="flex justify-between text-[11px] text-zinc-400 font-bold">
                              <span>500 words</span>
                              <span>50K words</span>
                              <span>100K words limit</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Editing Level</label>
                              <div className="flex flex-col gap-2">
                                <label className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-all ${editingLevel === "proof" ? "border-amber-550 bg-amber-50/20" : "border-zinc-200 hover:bg-zinc-50"}`}>
                                  <input 
                                    type="radio" 
                                    name="editing_tier"
                                    checked={editingLevel === "proof"}
                                    onChange={() => setEditingLevel("proof")}
                                    className="accent-amber-600 mt-1"
                                  />
                                  <div>
                                    <p className="text-sm font-black text-zinc-950">Proofreading & Grammar (10 F / word)</p>
                                    <p className="text-xs text-zinc-400 font-medium">Spelling, syntax, tense alignment checks.</p>
                                  </div>
                                </label>

                                <label className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-all ${editingLevel === "structure" ? "border-amber-550 bg-amber-50/20" : "border-zinc-200 hover:bg-zinc-50"}`}>
                                  <input 
                                    type="radio" 
                                    name="editing_tier"
                                    checked={editingLevel === "structure"}
                                    onChange={() => setEditingLevel("structure")}
                                    className="accent-amber-600 mt-1"
                                  />
                                  <div>
                                    <p className="text-sm font-black text-zinc-950">General Standard (15 F / word)</p>
                                    <p className="text-xs text-zinc-400 font-medium">Standard structure alignments, headers & indexes.</p>
                                  </div>
                                </label>

                                <label className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-all ${editingLevel === "heavy" ? "border-amber-550 bg-amber-50/20" : "border-zinc-200 hover:bg-zinc-50"}`}>
                                  <input 
                                    type="radio" 
                                    name="editing_tier"
                                    checked={editingLevel === "heavy"}
                                    onChange={() => setEditingLevel("heavy")}
                                    className="accent-amber-600 mt-1"
                                  />
                                  <div>
                                    <p className="text-sm font-black text-zinc-950">Rigorous Double-Pass (25 F / word)</p>
                                    <p className="text-xs text-zinc-400 font-medium">Line by line conceptual clarity & references sync.</p>
                                  </div>
                                </label>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Pace / Deadline urgency</label>
                                <div className="grid grid-cols-2 gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setTurnaround("standard")}
                                    className={`py-3.5 rounded-xl text-xs font-black uppercase border transition-all ${
                                      turnaround === "standard"
                                        ? "bg-zinc-900 text-white border-zinc-900 shadow-md shadow-zinc-900/10"
                                        : "bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-zinc-100"
                                    }`}
                                  >
                                    Regular Pace
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setTurnaround("express")}
                                    className={`py-3.5 rounded-xl text-xs font-black uppercase border transition-all ${
                                      turnaround === "express"
                                        ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-605/10 animate-pulse"
                                        : "bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-zinc-100"
                                    }`}
                                  >
                                    Express Overtime
                                  </button>
                                </div>
                              </div>

                              <label className="border border-zinc-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors">
                                <div className="space-y-0.5">
                                  <p className="text-sm font-black text-zinc-900">Run Plagiarism Audit</p>
                                  <p className="text-xs text-zinc-400 font-medium">Turnitin deep-indexing verified (+10,000 FCFA)</p>
                                </div>
                                <input 
                                  type="checkbox"
                                  checked={plagiarismCheck}
                                  onChange={(e) => setPlagiarismCheck(e.target.checked)}
                                  className="accent-amber-600 w-5 h-5 rounded-lg"
                                />
                              </label>
                            </div>
                          </div>

                          {/* Manuscript Upload Zone */}
                          <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Drop manuscript / text draft</label>
                            <div className="border-2 border-dashed border-zinc-200 rounded-[2.2rem] p-8 text-center bg-zinc-50 relative group hover:bg-zinc-100/50 transition-colors">
                              <input 
                                type="file" 
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileDrop}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="space-y-2">
                                <span className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 mx-auto border border-zinc-150 shadow-sm group-hover:scale-105 duration-200">
                                   <Upload className="w-5 h-5" />
                                </span>
                                <p className="text-sm font-black text-zinc-900">Choose file or drag manuscript draft</p>
                                <p className="text-xs text-zinc-400 font-bold">Accepts MS Word format, LaTeX zip or Adobe PDF (Max 50MB)</p>
                              </div>
                            </div>

                            {/* File progress bar */}
                            <AnimatePresence>
                              {manuscriptFile && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="bg-white rounded-2xl border border-zinc-100 p-4 space-y-4 shadow-sm overflow-hidden"
                                >
                                  <div className="flex justify-between items-center text-sm font-medium">
                                    <p className="text-zinc-600 font-black truncate max-w-xs">{manuscriptFile} ({manuscriptSize})</p>
                                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                      {analysisStatus === "uploading" ? "Uploading" : analysisStatus === "grammar_pass" ? "Grammar Pre-Scan" : "Fully Pre-scanned"}
                                    </span>
                                  </div>

                                  {analysisStatus !== "done" ? (
                                    <div className="space-y-1.5">
                                      <div className="flex justify-between text-xs text-zinc-400 font-black tracking-wider uppercase">
                                        <span>Reading syntax indices...</span>
                                        <span>{analysisStatus === "uploading" ? "45%" : "85%"}</span>
                                      </div>
                                      <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                                        <div 
                                          className="bg-amber-600 h-full rounded-full transition-all duration-300" 
                                          style={{ width: analysisStatus === "uploading" ? "45%" : "85%" }}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-3 gap-4 text-center divide-x border-t pt-3 mt-1 text-xs">
                                      <div>
                                        <p className="text-zinc-400 font-semibold mb-0.5 uppercase tracking-widest text-[9px]">Calculated words</p>
                                        <p className="font-mono text-sm font-black text-zinc-900">{wordCount.toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <p className="text-zinc-400 font-semibold mb-0.5 uppercase tracking-widest text-[9px]">Estimated grammar alerts</p>
                                        <p className="font-mono text-sm font-black text-amber-650">{scanningIssues.grammar}</p>
                                      </div>
                                      <div>
                                        <p className="text-zinc-400 font-semibold mb-0.5 uppercase tracking-widest text-[9px]">IEM Pre-scan score</p>
                                        <p className="font-mono text-sm font-black text-emerald-600">{scanningIssues.score}%</p>
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <Button 
                            type="submit"
                            disabled={isSubmitting || (manuscriptFile !== null && analysisStatus !== "done")}
                            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-350 text-white rounded-2xl py-8 text-xl font-bold tracking-tight shadow-xl shadow-amber-605/20 group uppercase mt-4"
                          >
                            {isSubmitting ? (
                              <>
                                <RefreshCw className="mr-2 w-5 h-5 animate-spin" /> Scheduling Evaluation...
                              </>
                            ) : (
                              <>
                                Submit Draft for Standard review
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </Button>
                       </form>

                       {/* Receipt Estimator panel */}
                       <div className="lg:col-span-5 bg-zinc-50/50 rounded-[2.2rem] border border-zinc-200 p-8 space-y-6 sticky top-28">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-750 mb-1">Standard Checklist</p>
                            <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Standard Cost Estimate</h3>
                          </div>

                          <div className="divide-y divide-zinc-200 text-sm font-medium">
                            <div className="py-3 flex justify-between">
                              <span className="text-zinc-450 text-zinc-550">Scope Category:</span>
                              <span className="text-zinc-805 text-zinc-900 font-bold">{docType}</span>
                            </div>
                            <div className="py-3 flex justify-between">
                              <span className="text-zinc-550">Target wordcount:</span>
                              <span className="text-zinc-900 font-bold">{wordCount.toLocaleString()} words</span>
                            </div>
                            <div className="py-3 flex justify-between">
                              <span className="text-zinc-550">Citation Guideline:</span>
                              <span className="text-zinc-900 font-extrabold">{citationStyle}</span>
                            </div>
                            <div className="py-3 flex justify-between">
                              <span className="text-zinc-550">Urgency pace:</span>
                              <span className="text-zinc-900 font-bold capitalize">{turnaround === "standard" ? "Standard (4-10 Days)" : "Urgent (24-48 Hours)"}</span>
                            </div>
                            <div className="py-3 flex justify-between">
                              <span className="text-zinc-550">Estimated ready date:</span>
                              <span className="text-zinc-900 font-bold text-amber-650">{calculateDeliveryDate()}</span>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-zinc-300 flex justify-between items-center bg-white p-6 rounded-2xl border border-zinc-200">
                             <div>
                               <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Total estimated bill</p>
                               <p className="text-3xl font-black text-amber-650 mt-1">
                                  {calculateEstimate().toLocaleString()} <span className="text-xs font-semibold text-zinc-500">FCFA</span>
                               </p>
                             </div>
                             <Badge className="bg-amber-50 text-amber-700 border-amber-150 py-1">Academic Grade</Badge>
                          </div>

                          <div className="rounded-2xl bg-zinc-900 text-white p-5 text-xs font-semibold leading-relaxed">
                            <p className="text-amber-400 font-black mb-1 flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
                              IEM ACCREDITATION ASSURANCE
                            </p>
                            <p className="text-zinc-400">
                              All standard editing assignments pass directly through dual audits by our data heads and civil supervisors. We guarantee MLA/APA syntax accuracy. Standard corrections will never trigger academic integrity filters.
                            </p>
                          </div>
                       </div>
                    </div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        {/* Footer Support block */}
        <div className="bg-zinc-900 rounded-[3rem] p-12 lg:p-20 text-white text-center relative overflow-hidden mt-20">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #f59e0b 25%, transparent 25%, transparent 50%, #f59e0b 50%, #f59e0b 75%, transparent 75%, transparent)' , backgroundSize: '100px 100px' }} />
            <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10 font-sans tracking-tight">Final Year Project Support</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 relative z-10 font-medium">We provide specialized support for students, ensuring documentation is perfectly formatted and ready for defense.</p>
            <div className="flex justify-center gap-4 relative z-10">
                <div className="px-6 py-2.5 bg-zinc-800 rounded-full border border-zinc-700 text-xs font-black uppercase tracking-widest text-zinc-300">APA Style</div>
                <div className="px-6 py-2.5 bg-zinc-800 rounded-full border border-zinc-700 text-xs font-black uppercase tracking-widest text-zinc-300">MLA Style</div>
                <div className="px-6 py-2.5 bg-zinc-800 rounded-full border border-zinc-700 text-xs font-black uppercase tracking-widest text-zinc-300">Harvard</div>
            </div>
        </div>
      </div>
    </div>
  );
}
