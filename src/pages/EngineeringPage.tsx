import { motion, AnimatePresence } from "motion/react";
import { HardHat, Compass, FileCheck, Layers, Eye, HelpCircle, ShieldCheck, Footprints, RefreshCw, Smartphone, ClipboardCheck, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { addTicket } from "../lib/portalState";
import * as React from "react";

export default function EngineeringPage() {
  const services = [
    { title: "Geotechnical Geomechanics", desc: "Detailed soil testing, foundation engineering, and slope stability analysis.", icon: <Layers /> },
    { title: "Infrastructure & Civil Planning", desc: "Hydraulic models, road designs, and urban engineering layouts.", icon: <Compass /> },
    { title: "Structural Assessment", desc: "Static and dynamic analysis of concrete, steel, and timber structures.", icon: <HardHat /> },
    { title: "Technical Auditing", desc: "Independent standard consulting, structural health validation, and certification.", icon: <FileCheck /> },
  ];

  // Dynamic Calculator State
  const [concreteClass, setConcreteClass] = React.useState("C25 (Structural Standard)");
  const [soilType, setSoilType] = React.useState("Gravelly Soil (High Capacity)");
  const [footingWidth, setFootingWidth] = React.useState(1.8); // 1.0m to 5.0m
  const [footingLength, setFootingLength] = React.useState(1.8);
  const [axialLoad, setAxialLoad] = React.useState(850); // kN

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedSafetyModel, setSubmittedSafetyModel] = React.useState<any | null>(null);

  const calculatorRef = React.useRef<HTMLDivElement>(null);

  // Constants mapped from variables
  const allowableSoilPressure = React.useMemo(() => {
    if (soilType.includes("Basalt")) return 600; // kPa
    if (soilType.includes("Gravelly")) return 350;
    if (soilType.includes("Sand")) return 180;
    return 75; // silt & soft clay
  }, [soilType]);

  const allowableConcreteStress = React.useMemo(() => {
    if (concreteClass.includes("C35")) return 35; // MPa
    if (concreteClass.includes("C30")) return 30;
    if (concreteClass.includes("C25")) return 25;
    return 15; // C15
  }, [concreteClass]);

  // Structural calculations
  const footingArea = React.useMemo(() => {
    return Number((footingWidth * footingLength).toFixed(2));
  }, [footingWidth, footingLength]);

  const basePressure = React.useMemo(() => {
    return Math.round(axialLoad / footingArea);
  }, [axialLoad, footingArea]);

  const factorOfSafety = React.useMemo(() => {
    const fos = allowableSoilPressure / (basePressure || 1);
    return Number(fos.toFixed(2));
  }, [allowableSoilPressure, basePressure]);

  const safetyState = React.useMemo(() => {
    if (factorOfSafety >= 3.0) return { status: "pass_high", label: "Highly Secure (FoS ≥ 3.0)", text: "Excellent. Ideal geotechnical buffer.", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
    if (factorOfSafety >= 1.5) return { status: "pass_mid", label: "Satisfactory (1.5 ≤ FoS < 3.0)", text: "Meets standard Eurocode construction safety indices.", color: "text-blue-600 bg-blue-50 border-blue-100" };
    return { status: "fail", label: "STRUCTURAL FAILURE RISK!", text: "Critical hazard! Increase footing dimensions immediately.", color: "text-rose-600 bg-rose-50 border-rose-100" };
  }, [factorOfSafety]);

  const handleEngineeringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const formattedTotal = "Geotechnical Consulting Retainer - 250,050 FCFA";
      const ticket = addTicket({
        type: "engineering",
        title: `Soil & Structure Audit: Footing B-${Math.floor(100 + Math.random() * 900)}`,
        status: "pending",
        costEstimate: formattedTotal,
        details: {
          geotechnicalClass: soilType,
          designBearingAxial: `${axialLoad} kN axial load`,
          dimensionSizingSummary: `${footingWidth}m × ${footingLength}m rectangular spread footing`,
          allowablePressureCapacity: `${allowableSoilPressure} kPa baseline limit`,
          determinedSafetyMargin: `Factor of Safety of ${factorOfSafety} (${safetyState.label})`
        }
      });
      setSubmittedSafetyModel(ticket);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <Badge className="mb-4 bg-zinc-900 text-white hover:bg-zinc-900">Engineering Division</Badge>
          <h1 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">Geotechnical & <span className="text-neutral-500 font-serif italic underline decoration-zinc-400">Civil Services</span></h1>
          <p className="text-lg text-zinc-600 font-medium">Delivering complex physical plans, concrete structural models, and soil engineering certified under local regulations.</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-900 mb-6 font-bold text-lg">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2 truncate">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <button 
                onClick={() => calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className="text-xs font-black uppercase text-zinc-900 hover:underline tracking-widest inline-flex items-center gap-1"
              >
                Model Geotech <ArrowRight className="w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Geotechnical Calculator Stage */}
        <div ref={calculatorRef} className="mt-28">
          <div className="bg-white border border-zinc-200 rounded-[3rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-blue-950/5">
            
            <AnimatePresence mode="wait">
              {submittedSafetyModel ? (
                <motion.div
                  key="engineering-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-6 max-w-2xl mx-auto"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full">
                      Foundation Design Buffered
                    </span>
                    <h2 className="text-3xl font-black text-zinc-950 mt-3 md:text-4xl">Structural Model Logged!</h2>
                    <p className="text-zinc-500 font-medium">
                      Your geotechnical load model has been mapped to our local database. One of our engineers will review the safety parameters prior to onsite soil testing.
                    </p>
                  </div>

                  <div className="bg-zinc-50 rounded-3xl p-6 text-left border border-zinc-150 text-sm divide-y divide-zinc-200/50">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Standard Soil Category:</span>
                      <span className="font-bold text-zinc-800">{submittedSafetyModel.details.geotechnicalClass}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Base Sizing Dimension:</span>
                      <span className="font-bold text-zinc-800">{submittedSafetyModel.details.dimensionSizingSummary}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Ultimate Structural Load:</span>
                      <span className="font-bold text-zinc-800">{submittedSafetyModel.details.designBearingAxial}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-zinc-400 font-bold">Determined Safety Index:</span>
                      <span className="font-black text-indigo-700">{submittedSafetyModel.details.determinedSafetyMargin}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => setSubmittedSafetyModel(null)}
                      variant="outline"
                      className="rounded-xl border-zinc-200 font-bold h-12 px-8"
                    >
                      Configure New Footing Sizing
                    </Button>
                    <a 
                      href={`https://wa.me/237691005841?text=${encodeURIComponent(
                        `Hello IEM design room, I have queued structural geotech footing calculations for reference ${submittedSafetyModel.id} under soil parameter "${submittedSafetyModel.details.geotechnicalClass}". Standard Safety index reported: ${submittedSafetyModel.details.determinedSafetyMargin}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-black text-white font-bold h-12 rounded-xl flex items-center justify-center px-8 shadow-lg shadow-zinc-900/15 gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Dispatch design to site
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Inputs Column Left */}
                  <form onSubmit={handleEngineeringSubmit} className="lg:col-span-6 space-y-6">
                    <div>
                      <Badge className="bg-zinc-100 text-zinc-850 hover:bg-zinc-100 border-zinc-200 font-semibold mb-2">Workspace Module A</Badge>
                      <h2 className="text-3xl font-black text-zinc-950">Footing Geotechnical Checker</h2>
                      <p className="text-zinc-500 text-sm mt-0.5">Determine mechanical soil tolerances and footing thickness levels under standard civil code bounds.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Class of Geotechnical Soil</label>
                        <select
                          value={soilType}
                          onChange={(e) => setSoilType(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 font-semibold text-zinc-800"
                        >
                          <option>Cameroonian Basalt Rock (600 kPa limit)</option>
                          <option>Gravelly Soil (High Capacity) (350 kPa limit)</option>
                          <option>Unconsolidated Sand (Medium) (180 kPa limit)</option>
                          <option>Silt & Soft Clay (Low Capacity) (75 kPa limit)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Concrete Strength Grade</label>
                        <select
                          value={concreteClass}
                          onChange={(e) => setConcreteClass(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 font-semibold text-zinc-800"
                        >
                          <option>C35 (High Performance Bridge spec)</option>
                          <option>C30 (Reinforced Slab / Civil)</option>
                          <option>C25 (Structural Standard)</option>
                          <option>C15 (Fill Concrete / Lintels)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-400">
                          <span>Footing Width (B)</span>
                          <span className="font-mono text-sm text-zinc-800 font-black">{footingWidth} m</span>
                        </div>
                        <input
                          type="range"
                          min={0.8}
                          max={5.0}
                          step={0.1}
                          value={footingWidth}
                          onChange={(e) => setFootingWidth(Number(e.target.value))}
                          className="w-full accent-zinc-900"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-400">
                          <span>Footing Length (L)</span>
                          <span className="font-mono text-sm text-zinc-800 font-black">{footingLength} m</span>
                        </div>
                        <input
                          type="range"
                          min={0.8}
                          max={5.0}
                          step={0.1}
                          value={footingLength}
                          onChange={(e) => setFootingLength(Number(e.target.value))}
                          className="w-full accent-zinc-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-400">
                        <span>Target Structural Axial Load (P)</span>
                        <span className="font-mono text-sm text-zinc-900 font-black bg-zinc-100 px-2.5 py-0.5 rounded-md">
                          {axialLoad} kN
                        </span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={3000}
                        step={50}
                        value={axialLoad}
                        onChange={(e) => setAxialLoad(Number(e.target.value))}
                        className="w-full accent-zinc-900"
                      />
                      <div className="flex justify-between text-[11px] text-zinc-400 font-bold">
                        <span>50 kN (Residential column)</span>
                        <span>1500 kN</span>
                        <span>3000 kN (Complex corporate framework)</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-zinc-900 hover:bg-black text-white py-6 rounded-2xl text-md font-bold uppercase group mt-4 transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Transmitting design blueprints...
                        </>
                      ) : (
                        <>
                          Submit Load parameters to Engineering Bureau
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Blueprint Graphic right side */}
                  <div className="lg:col-span-6 bg-zinc-100 rounded-[2.5rem] border border-zinc-200 p-8 space-y-6 flex flex-col justify-between min-h-[500px]">
                    <div className="flex justify-between items-center border-b pb-4 border-zinc-200">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">Live Stress Blueprint</p>
                        <h4 className="text-md font-black text-zinc-900">Concrete Footing stress envelope</h4>
                      </div>
                      <Badge className="bg-white text-zinc-800 border-zinc-250 py-1">Code Approved</Badge>
                    </div>

                    {/* Geotechnical stressors schema */}
                    <div className="relative aspect-video bg-zinc-900 rounded-3xl overflow-hidden p-6 flex flex-col justify-between">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:16px_16px]" />

                      {/* Stress animation vectors */}
                      <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
                        <svg className="w-full h-36" viewBox="0 0 100 60">
                          {/* Concrete spread Footing block */}
                          <rect
                            x={50 - footingWidth * 6}
                            y="15"
                            width={footingWidth * 12}
                            height="10"
                            fill="#52525b"
                            stroke="#cbd5e1"
                            strokeWidth="0.8"
                            rx="1"
                          />
                          {/* Column shaft above */}
                          <rect
                            x="46"
                            y="0"
                            width="8"
                            height="15"
                            fill="#3f3f46"
                            stroke="#94a3b8"
                            strokeWidth="0.8"
                          />
                          {/* Axial Load force pointer */}
                          <line
                            x1="50"
                            y1="2"
                            x2="50"
                            y2="12"
                            stroke="#ef4444"
                            strokeWidth="1.2"
                            markerEnd="url(#arrow)"
                          />

                          {/* Stress dispersion bulbs in soils under spread footing */}
                          {basePressure > 0 && (
                            <path
                              d={`M ${50 - footingWidth * 6} 25 Q 50 ${25 + (axialLoad / 80)} ${50 + footingWidth * 6} 25`}
                              fill="none"
                              stroke={safetyState.status === "fail" ? "#f43f5e" : "#10b981"}
                              strokeWidth="1.5"
                              strokeDasharray="2 1"
                              opacity="0.85"
                              className="animate-pulse"
                            />
                          )}

                          {/* Secondary stress boundary bulb */}
                          {basePressure > 0 && (
                            <path
                              d={`M ${50 - footingWidth * 5} 25 Q 50 ${25 + (axialLoad / 40)} ${50 + footingWidth * 5} 25`}
                              fill="none"
                              stroke={safetyState.status === "fail" ? "#fda4af" : "#cbd5e1"}
                              strokeWidth="0.8"
                              opacity="0.4"
                            />
                          )}

                          {/* Marker definition for structural arrow */}
                          <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                            </marker>
                          </defs>
                        </svg>

                        <div className="text-center">
                          <p className="text-[11px] text-zinc-400 font-medium">B = {footingWidth}m × L = {footingLength}m Spread base footing</p>
                          <p className="text-xs font-black text-zinc-100 mt-1">Calculated soil pressure: <span className="text-emerald-400 font-mono text-sm">{basePressure} kPa</span></p>
                        </div>
                      </div>

                      <div className="relative z-10 flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        <span>Soil capacity max: {allowableSoilPressure} kPa</span>
                        <span>axial force: {axialLoad} kN</span>
                      </div>
                    </div>

                    {/* Safety Assessment Indicator */}
                    <div className={`p-5 rounded-2xl border flex flex-col justify-center ${safetyState.color}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Safety Index Factor (FoS)</span>
                        <span className="text-2xl font-black font-mono">{factorOfSafety}</span>
                      </div>
                      <p className="font-extrabold text-sm mt-2">{safetyState.label}</p>
                      <p className="text-xs opacity-90 mt-1">{safetyState.text}</p>
                    </div>

                    {/* Concrete specification table parameters */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                      <div className="bg-white p-4 rounded-xl border border-zinc-200">
                        <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-black block">Concrete Ultimate Stress limit</span>
                        <p className="text-zinc-900 font-black mt-1">{allowableConcreteStress} MPa compressive strength</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-zinc-200">
                        <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-black block">Allowable mechanical shear</span>
                        <p className="text-zinc-900 font-black mt-1">{(allowableConcreteStress * 0.12).toFixed(2)} MPa shear threshold</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Technical Standard text below */}
        <div className="bg-zinc-900 text-white rounded-[2.5rem] p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center justify-between mt-20">
          <div className="lg:max-w-2xl">
             <h3 className="text-3xl font-black mb-4">Certified Geotechnical Inspections</h3>
             <p className="text-zinc-400 text-sm leading-relaxed">
               IEM Ltd. provides structural geomechanics stamp reports calibrated under international construction codes. Before deploying complex residential or business column plans, verify compliance using our physical test sets.
             </p>
          </div>
          <Button 
            onClick={() => calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl px-8 h-14 font-black text-sm uppercase shrink-0"
          >
             Contact Soil Assessor Office
          </Button>
        </div>
      </div>
    </div>
  );
}
