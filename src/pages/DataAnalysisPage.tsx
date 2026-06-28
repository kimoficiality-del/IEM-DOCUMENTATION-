import { motion, AnimatePresence } from "motion/react";
import { LineChart, BarChart3, PieChart, FileSpreadsheet, Binary, Microscope, Upload, Database, RefreshCw, Check, MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { addTicket } from "../lib/portalState";
import * as React from "react";

interface DataPoint {
  x: number;
  y: number;
}

export default function DataAnalysisPage() {
  const steps = [
    { title: "Data Cleaning", desc: "Removing outliers and fixing missing values for accurate results." },
    { title: "Statistical Analysis", desc: "Applying SPSS or Excel models to find correlations and significance." },
    { title: "Visualization", desc: "Transforming raw numbers into professional charts and dashboards." },
    { title: "Reporting", desc: "Written interpretation of findings for academic or business use." },
  ];

  // Dynamic Simulator State
  const [testType, setTestType] = React.useState<"correlation" | "descriptives">("correlation");
  const [sampleName, setSampleName] = React.useState("Cameroon Infrastructure Durability SPSS Study");
  const [sampleSize, setSampleSize] = React.useState(80);
  const [correlationStrength, setCorrelationStrength] = React.useState(0.72); // -1 to 1
  const [controlMean, setControlMean] = React.useState(68);
  const [experimentalMean, setExperimentalMean] = React.useState(84);
  const [yAxisLabel, setYAxisLabel] = React.useState("Concrete Durability Index (MPa)");
  const [xAxisLabel, setXAxisLabel] = React.useState("Curing Time Duration (Days)");

  // File loading state
  const [uploadedFile, setUploadedFile] = React.useState<string | null>(null);
  const [uploadedSize, setUploadedSize] = React.useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [rowsCount, setRowsCount] = React.useState(0);
  const [detectedColumns, setDetectedColumns] = React.useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedAnalytic, setSubmittedAnalytic] = React.useState<any | null>(null);

  const workspaceRef = React.useRef<HTMLDivElement>(null);

  // Generate simulated coordinate points based on correlation coefficient
  const computedPoints = React.useMemo<DataPoint[]>(() => {
    const points: DataPoint[] = [];
    const seed = 12345;
    let currentSeed = seed;

    const pseudoRandom = () => {
      const x = Math.sin(currentSeed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < sampleSize; i++) {
      // Normal-like random variables using Box-Muller
      const u1 = pseudoRandom();
      const u2 = pseudoRandom();
      const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
      const z1 = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.sin(2.0 * Math.PI * u2);

      // Map to correlation: Y = r * X + sqrt(1 - r^2) * Error
      const xVal = z0 * 15 + 50; 
      const error = z1 * 15 + 50;
      const yVal = correlationStrength * xVal + Math.sqrt(1 - correlationStrength * correlationStrength) * error;

      // Bound within 10 to 90
      const scaledX = Math.min(95, Math.max(5, xVal));
      const scaledY = Math.min(95, Math.max(5, yVal));

      points.push({ x: scaledX, y: scaledY });
    }
    return points;
  }, [sampleSize, correlationStrength]);

  // Calculations for SPSS Statistics Card
  const rSquared = React.useMemo(() => {
    return (correlationStrength * correlationStrength).toFixed(3);
  }, [correlationStrength]);

  const pValue = React.useMemo(() => {
    const absR = Math.abs(correlationStrength);
    let score = (1 - absR) * (200 / sampleSize);
    if (score < 0.001) return "P < 0.001 (Highly Significant)";
    if (score < 0.01) return "P < 0.01 (Very Significant)";
    if (score < 0.05) return "P < 0.05 (Statistically Significant)";
    return `P = ${score.toFixed(3)} (Not Significant)`;
  }, [correlationStrength, sampleSize]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setUploadedSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
      setIsAnalyzing(true);

      setTimeout(() => {
        setIsAnalyzing(false);
        const rowsNum = Math.floor(250 + Math.random() * 8500);
        setRowsCount(rowsNum);
        setSampleSize(Math.min(200, Math.floor(rowsNum / 10)));
        setDetectedColumns(["Material_Density", "Moisture_Weight", "Standard_Safety_Margin_FCFA", "Load_Bearing_Index"]);
        // Trigger a random high correlation indexing
        setCorrelationStrength(0.45 + Math.random() * 0.45);
        setSampleName(`Standardized SPSS dataset: ${file.name}`);
      }, 1505);
    }
  };

  const handleDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const estimateText = "150,000 FCFA";
      const ticket = addTicket({
        type: "data",
        title: `SPSS Statistical Model: ${sampleName}`,
        status: "completed",
        fileName: uploadedFile || undefined,
        costEstimate: estimateText,
        details: {
          statisticalMethod: testType === "correlation" ? "Bivariate Pearson Correlation Test" : "Standard Variance T-Test / ANOVA model",
          sampleVolume: `${sampleSize} target parameters model`,
          regressionCoefModel: testType === "correlation" ? `R² = ${rSquared} coefficient` : `Standard Mean standard deviation: ${controlMean} vs ${experimentalMean}`,
          pValAccuracy: pValue,
          analyzingParametersLabel: yAxisLabel
        }
      });
      setSubmittedAnalytic(ticket);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 mb-6">Expert Analytics</Badge>
            <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 mb-8 leading-tight">
              Data driven <span className="text-emerald-600">decisions</span>.
            </h1>
            <p className="text-lg text-zinc-600 font-medium leading-relaxed mb-10">
              We specialize in SPSS and advanced Excel analysis for research projects, business intelligence, and developmental data. Turn your raw data into actionable insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-8 py-6 font-bold shadow-xl shadow-emerald-600/20 cursor-pointer"
              >
                Launch SPSS Analytics Studio
              </Button>
              <Button 
                onClick={() => workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                size="lg" 
                variant="outline" 
                className="rounded-2xl px-8 py-6 font-bold border-zinc-200"
              >
                Simulate Plot Data
              </Button>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-[3rem] p-10 grid grid-cols-2 gap-6 relative">
             <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
             <AnalyticsBox icon={<LineChart />} label="Trending" val="+24%" color="emerald" />
             <AnalyticsBox icon={<Binary />} label="Accuracy" val="99.9%" color="blue" />
             <AnalyticsBox icon={<FileSpreadsheet />} label="Rows" val="1.2M" color="amber" />
             <AnalyticsBox icon={<Microscope />} label="Confidence" val="P < 0.05" color="rose" />
          </div>
        </div>

        {/* Dynamic SPSS Analytics Studio Container */}
        <div ref={workspaceRef} className="mt-20 scroll-mt-24">
          <div className="bg-zinc-50 border border-zinc-200/90 rounded-[3.5rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-emerald-950/5">
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200/60 pb-8">
              <div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-250 mb-2">SPSS Workspace Pro</Badge>
                <h2 className="text-4xl font-black text-zinc-950 tracking-tight">Interactive Analytics Studio</h2>
                <p className="text-zinc-500 text-sm mt-0.5">Adjust empirical sample sliders or upload datasets to model structural correlations instantly.</p>
              </div>

              {/* Toggle Selector */}
              <div className="bg-zinc-200/60 border border-zinc-350 p-1.5 rounded-2xl flex gap-1 h-auto self-start">
                <button
                  type="button"
                  onClick={() => setTestType("correlation")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
                    testType === "correlation" ? "bg-white text-emerald-700 shadow-md" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <LineChart className="w-4 h-4 inline mr-2" /> Bivariate Scatter
                </button>
                <button
                  type="button"
                  onClick={() => setTestType("descriptives")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
                    testType === "descriptives" ? "bg-white text-emerald-700 shadow-md" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 inline mr-2" /> T-Test Mean Bars
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submittedAnalytic ? (
                <motion.div
                  key="analytic-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 space-y-6 max-w-2xl mx-auto"
                >
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                    <Check className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-105 px-3 py-1 rounded-full">
                      Statistical Parameters Recorded
                    </span>
                    <h2 className="text-3xl font-black text-zinc-950 mt-3 md:text-3xl">Analytical Draft Generated!</h2>
                    <p className="text-zinc-500 font-medium">
                      Your statistical metrics have been logged securely. Our core analyst lead Dr. Emmanuel K. is preparing your SPSS formal dissertation appendix report.
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 text-left border border-zinc-250/70 text-sm divide-y divide-zinc-250/50">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Standard Model Name:</span>
                      <span className="font-bold text-zinc-800">{submittedAnalytic.title}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Mathematical Method:</span>
                      <span className="font-bold text-zinc-800">{submittedAnalytic.details.statisticalMethod}</span>
                    </div>
                    {submittedAnalytic.fileName ? (
                      <div className="py-2.5 flex justify-between">
                        <span className="text-zinc-400 font-bold">Source File:</span>
                        <span className="font-bold text-emerald-600">{submittedAnalytic.fileName}</span>
                      </div>
                    ) : (
                      <div className="py-2.5 flex justify-between">
                        <span className="text-zinc-400 font-bold">Data Type:</span>
                        <span className="font-semibold text-zinc-800">Visual Simulated Parameter Space</span>
                      </div>
                    )}
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Regression Outcome:</span>
                      <span className="font-mono font-black text-zinc-900">{submittedAnalytic.details.regressionCoefModel}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Significance (P-Value):</span>
                      <span className="font-bold text-emerald-600">{submittedAnalytic.details.pValAccuracy}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => {
                        setSubmittedAnalytic(null);
                        setUploadedFile(null);
                        setSampleName("Cameroon Infrastructure Durability SPSS Study");
                      }}
                      variant="outline"
                      className="rounded-xl border-zinc-200 font-bold h-12 px-8"
                    >
                      Reset Workspace Tools
                    </Button>
                    <a 
                      href={`https://wa.me/237676222804?text=${encodeURIComponent(
                        `Hello Dr. Emmanuel, I would like to move forward on compilation of my SPSS/Excel dataset report (${submittedAnalytic.id}) for model "${submittedAnalytic.title}". Outcome values: ${submittedAnalytic.details.regressionCoefModel}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl flex items-center justify-center px-8 shadow-lg shadow-emerald-605/15 gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Submit to Dr. Emmanuel K.
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Parameter Controls */}
                  <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-[2.5rem] border border-zinc-200">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Step 1: Configure Metrics</p>
                      <h3 className="text-xl font-black text-zinc-950 mt-1">Experimental Parameters</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block">Study / Dataset Title</label>
                        <input 
                          type="text"
                          value={sampleName}
                          onChange={(e) => setSampleName(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-3.5 px-3.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-800"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block">X-Axis Variable</label>
                          <input 
                            type="text"
                            value={xAxisLabel}
                            onChange={(e) => setXAxisLabel(e.target.value)}
                            className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-3 px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-805"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block">Y-Axis Variable</label>
                          <input 
                            type="text"
                            value={yAxisLabel}
                            onChange={(e) => setYAxisLabel(e.target.value)}
                            className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-3 px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-805"
                          />
                        </div>
                      </div>

                      {testType === "correlation" ? (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-400">
                              <span>Pearson Correlation Coefficient (r)</span>
                              <span className="font-mono text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                {correlationStrength >= 0 ? "+" : ""}{correlationStrength.toFixed(2)}
                              </span>
                            </div>
                            <input 
                              type="range" 
                              min={-0.95} 
                              max={0.95} 
                              step={0.05}
                              value={correlationStrength}
                              onChange={(e) => setCorrelationStrength(Number(e.target.value))}
                              className="w-full accent-emerald-600 mt-2"
                            />
                            <div className="flex justify-between text-[11px] text-zinc-450 font-bold">
                              <span className="text-rose-500">Strong Inverse (-0.95)</span>
                              <span>Zero</span>
                              <span className="text-emerald-500">Strong positive (+0.95)</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-400">
                              <span>Model Group Size (N)</span>
                              <span className="font-mono text-sm font-black text-zinc-800">
                                {sampleSize} targets
                              </span>
                            </div>
                            <input 
                              type="range" 
                              min={10} 
                              max={200} 
                              value={sampleSize}
                              onChange={(e) => setSampleSize(Number(e.target.value))}
                              className="w-full accent-emerald-600 mt-2"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-400">
                              <span>Control Group Mean Mean</span>
                              <span className="font-mono text-sm font-black text-zinc-700 bg-zinc-100 px-2 rounded-md">
                                {controlMean}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min={20}
                              max={100}
                              value={controlMean}
                              onChange={(e) => setControlMean(Number(e.target.value))}
                              className="w-full accent-emerald-600 mt-2"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-400">
                              <span>Experimental Group Mean Mean</span>
                              <span className="font-mono text-sm font-black text-emerald-600 bg-emerald-50 px-2 rounded-md">
                                {experimentalMean}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min={20}
                              max={100}
                              value={experimentalMean}
                              onChange={(e) => setExperimentalMean(Number(e.target.value))}
                              className="w-full accent-emerald-600 mt-2"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Integrated pre-scan CSV drag block */}
                    <div className="pt-4 border-t border-zinc-100">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-450 block mb-2 text-zinc-400">Attach Custom CSV / SAV Spreadsheet</label>
                      <div className="border-2 border-dashed border-zinc-200 rounded-[2.2rem] p-5 text-center bg-zinc-50 hover:bg-zinc-100/50 cursor-pointer relative group transition-colors">
                        <input
                          type="file"
                          accept=".csv,.xlsx,.sav"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center gap-3 justify-center text-xs font-bold text-zinc-500">
                          <Upload className="w-4 h-4 text-emerald-600 transition-transform group-hover:-translate-y-0.5" />
                          <span>Load SPSS matrix file</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {uploadedFile && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white rounded-2xl border border-zinc-200 p-4 mt-3 space-y-3 shadow-inner"
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-black text-zinc-900 truncate max-w-[150px]">{uploadedFile}</span>
                              {isAnalyzing ? (
                                <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
                                  <RefreshCw className="w-3 h-3 animate-spin" /> Analyzing rows...
                                </span>
                              ) : (
                                <span className="text-emerald-700 font-black flex items-center gap-1 bg-emerald-50 px-2 rounded border border-emerald-100">
                                  <Check className="w-3 h-3" /> Parser OK
                                </span>
                              )}
                            </div>
                            {detectedColumns.length > 0 && (
                              <div className="text-[10px] space-y-1 bg-zinc-50 p-2.5 rounded-lg border border-zinc-105">
                                <p className="text-zinc-400 font-black">SPSS INDICES EXTREME MAPPED:</p>
                                <div className="flex flex-wrap gap-1">
                                  {detectedColumns.map((col, i) => (
                                    <span key={i} className="bg-white border border-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-mono font-semibold">
                                      {col}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <form onSubmit={handleDataSubmit}>
                      <Button 
                        type="submit"
                        disabled={isSubmitting || isAnalyzing}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-350 text-white rounded-2xl py-6 text-md font-bold tracking-tight shadow-xl shadow-emerald-600/15 group"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Packaging statistical indices...
                          </>
                        ) : (
                          <>
                            Request Professional SPSS Export
                          </>
                        )}
                      </Button>
                    </form>
                  </div>

                  {/* Right Custom Vector SVG Chart Area */}
                  <div className="lg:col-span-7 bg-white rounded-[2.8rem] border border-zinc-205 shadow-sm p-8 space-y-8 flex flex-col justify-between min-h-[500px]">
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b pb-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Step 2: Interactive Plot</p>
                        <h4 className="text-lg font-black text-zinc-950 truncate max-w-md">{sampleName}</h4>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 font-black uppercase">Sample Scope</span>
                        <p className="text-md font-black text-zinc-900">{sampleSize} data nodes</p>
                      </div>
                    </div>

                    {/* Vector Plot Area */}
                    <div className="relative w-full aspect-video bg-zinc-50 border border-zinc-100 rounded-3xl p-6 overflow-hidden flex flex-col justify-between">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 pointer-events-none opacity-20">
                        {Array.from({ length: 60 }).map((_, i) => (
                          <div key={i} className="border-r border-b border-zinc-300" />
                        ))}
                      </div>

                      {/* SVG Canvas Workspace */}
                      <div className="w-full h-full relative z-10 flex items-center justify-center">
                        <svg className="w-full h-full origin-bottom" viewBox="0 0 100 100" preserveAspectRatio="none">
                          {testType === "correlation" ? (
                            <>
                              {/* Glowing data nodes calculated on Fly */}
                              {computedPoints.map((pt, i) => (
                                <circle
                                  key={i}
                                  cx={pt.x}
                                  cy={100 - pt.y} // Invert viewport Y
                                  r="1.4"
                                  className="fill-emerald-500 stroke-white stroke-[0.3]"
                                  opacity="0.8"
                                />
                              ))}

                              {/* Regression Trend Line: y = mx + c */}
                              {/* For correlation, line starts from (10, 10 + slopeOffset) to (90, 90 + slopeOffset) depending on R */}
                              <line
                                x1="5"
                                y1={100 - (correlationStrength * 5 + 50 - correlationStrength * 50)}
                                x2="95"
                                y2={100 - (correlationStrength * 95 + 50 - correlationStrength * 50)}
                                stroke="#10b981"
                                strokeWidth="0.8"
                                strokeDasharray="1.5 1"
                                className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]"
                              />
                            </>
                          ) : (
                            <>
                              {/* Mean group bar representation */}
                              {/* Control Bar */}
                              <rect
                                x="20"
                                y={100 - controlMean}
                                width="18"
                                height={controlMean}
                                className="fill-zinc-300 stroke-zinc-400/50 stroke-[0.3] hover:fill-zinc-400/80 transition-colors"
                                rx="1.5"
                              />
                              <text x="29" y={95 - controlMean} fontSize="5" fontWeight="900" fill="#71717a" textAnchor="middle">
                                {controlMean}%
                              </text>

                              {/* Experimental Bar */}
                              <rect
                                x="60"
                                y={100 - experimentalMean}
                                width="18"
                                height={experimentalMean}
                                className="fill-emerald-500 stroke-emerald-600/40 stroke-[0.3] hover:fill-emerald-600/80 transition-colors"
                                rx="1.5"
                              />
                              <text x="69" y={95 - experimentalMean} fontSize="5" fontWeight="900" fill="#10b981" textAnchor="middle">
                                {experimentalMean}%
                              </text>
                            </>
                          )}
                        </svg>

                        {/* Custom Axes labels */}
                        {testType === "correlation" && (
                          <div className="absolute bottom-1 right-2 bg-white/80 backdrop-blur-sm shadow border border-zinc-100 rounded px-2 py-0.5 text-[9px] font-black uppercase text-emerald-700 tracking-wider">
                            Regression Slope Trend
                          </div>
                        )}
                      </div>

                      {/* Axis label strings */}
                      <div className="flex justify-between items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest pt-2 relative z-10 border-t border-zinc-200/50">
                        <span>{xAxisLabel} (Low → High)</span>
                        <span>Scope range: 0 - 100 max</span>
                      </div>
                    </div>

                    {/* SPM Statistics report metrics footer */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-100">
                      <div className="bg-zinc-50 p-4 rounded-2xl text-center border border-zinc-150 shadow-inner">
                        <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider block">Coeff Determination</span>
                        <p className="font-mono text-lg font-black text-zinc-900 mt-1">R² = {testType === "correlation" ? rSquared : "Variable"}</p>
                      </div>

                      <div className="bg-zinc-50 p-4 rounded-2xl text-center border border-zinc-150 shadow-inner">
                        <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider block">Variance Indicator</span>
                        <p className="font-mono text-lg font-black text-zinc-900 mt-1">SD = {testType === "correlation" ? "14.8" : "15.2 vs 11.4"}</p>
                      </div>

                      <div className="bg-zinc-50 p-4 rounded-2xl text-center border border-zinc-150 shadow-inner col-span-2">
                        <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider block">Academic Probability</span>
                        <p className="font-mono text-[13px] font-black text-emerald-600 mt-1.5 truncate">{pValue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Process Steps */}
        <div className="text-center mb-16 mt-32">
            <h2 className="text-3xl font-black mb-4">Our Analysis Process</h2>
            <p className="text-zinc-500 font-medium">Standardized workflows for guaranteed statistical accuracy.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="relative group text-center md:text-left">
              <div className="text-6xl font-black text-zinc-100 group-hover:text-emerald-50 transition-colors mb-4">{i + 1}</div>
              <h4 className="text-xl font-bold text-zinc-900 mb-2 truncate">{s.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsBox({ icon, label, val, color }: { icon: React.ReactNode, label: string, val: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-zinc-100 relative z-10 hover:translate-y-[-5px] transition-transform">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
        color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
        color === 'blue' ? 'bg-blue-50 text-blue-600' :
        color === 'amber' ? 'bg-amber-50 text-amber-600' :
        'bg-rose-50 text-rose-600'
      }`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-zinc-900">{val}</p>
    </div>
  );
}
