import { motion, AnimatePresence } from "motion/react";
import { Printer, Layers, Scan, FileText, BookOpen, Clock, Upload, Check, AlertCircle, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { addTicket } from "../lib/portalState";
import * as React from "react";

export default function PrintingPage() {
  const prints = [
    { name: "Bulk Printing", price: "20-25F Grayscale | 100-1000F Color", icon: <Printer />, key: "bulk" },
    { name: "Scanning & Digital Archiving", price: "100 FCFA / page high-res", icon: <Scan />, key: "scan" },
    { name: "Laminating & Protection", price: "500 FCFA onwards", icon: <Layers />, key: "laminate" },
    { name: "Document Formatting", price: "Professional markup", icon: <FileText />, key: "format" },
    { name: "Thesis Binding", price: "Depends on work to be bound", icon: <BookOpen />, key: "bind" },
    { name: "Express Delivery", price: "Same day dispatch", icon: <Clock />, key: "delivery" },
  ];

  // Live Calculator State
  const [selectedService, setSelectedService] = React.useState("Bulk Printing");
  const [pagesCount, setPagesCount] = React.useState(10);
  const [copiesCount, setCopiesCount] = React.useState(1);
  const [colorMode, setColorMode] = React.useState<"grayscale" | "color">("grayscale");
  const [grayscaleQuality, setGrayscaleQuality] = React.useState<20 | 25>(25);
  const [colorQuality, setColorQuality] = React.useState<100 | 250 | 500 | 1000>(100);
  const [bindingType, setBindingType] = React.useState<"none" | "spiral" | "soft" | "hard">("none");
  const [paperWeight, setPaperWeight] = React.useState<"70g" | "80g">("70g");
  
  // File upload simulation state
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [fileSize, setFileSize] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadStatus, setUploadStatus] = React.useState<"idle" | "reading" | "scanned" | "done">("idle");
  const [detectedPages, setDetectedPages] = React.useState(0);
  
  const [isOrdering, setIsOrdering] = React.useState(false);
  const [submittedOrder, setSubmittedOrder] = React.useState<any | null>(null);

  const calculatorRef = React.useRef<HTMLDivElement>(null);

  const handleBookService = (name: string) => {
    setSelectedService(name);
    // Autofill logical settings based on picked service card
    if (name.includes("Thesis") || name.includes("Binding")) {
      setBindingType("hard");
      setPaperWeight("80g");
    } else if (name.includes("Scanning")) {
      setBindingType("none");
    }
    // Smooth scroll to the interactive calculator
    calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Cost Calculator Logic
  const calculateTotalCost = () => {
    let pricePerPage = colorMode === "color" ? colorQuality : grayscaleQuality;
    if (selectedService.includes("Scanning")) pricePerPage = 100;
    else if (selectedService.includes("Formatting")) pricePerPage = 15;

    let base = pagesCount * pricePerPage;

    let bindingFee = 0;

    let paperPremium = paperWeight === "80g" ? 10 * pagesCount : 0;

    let total = (base + bindingFee + paperPremium) * copiesCount;
    if (selectedService.includes("Laminating")) {
      total = 500 * copiesCount;
    }
    return total;
  };

  // Mock File Drag/Drop / Browse
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateFileUpload(file.name, file.size);
    }
  };

  const simulateFileUpload = (name: string, sizeInBytes: number) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("reading");
    setFileName(name);
    setFileSize((sizeInBytes / (1024 * 1024)).toFixed(2) + " MB");

    const interval = setInterval(() => {
      setUploadProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStatus("done");
          // Random mock pages extractor to make it highly organic!
          const randomPages = Math.floor(8 + Math.random() * 85);
          setDetectedPages(randomPages);
          setPagesCount(randomPages); // Sync extracted page count automatically!
          return 100;
        }
        return old + 20;
      });
    }, 300);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);

    setTimeout(() => {
      const estimateFCFA = selectedService === "Thesis Binding"
        ? "Depends on work to be bound"
        : calculateTotalCost().toLocaleString() + " FCFA";
      const ticket = addTicket({
        type: "printing",
        title: `Office Print Order: ${selectedService}`,
        status: "pending",
        fileName: fileName || undefined,
        costEstimate: estimateFCFA,
        details: {
          serviceType: selectedService,
          documentPages: pagesCount,
          copiesRequired: copiesCount,
          colorMode: `${colorMode.toUpperCase()} (${colorMode === "color" ? colorQuality : grayscaleQuality} FCFA/page)`,
          binding: bindingType === "none" ? "None" : bindingType === "spiral" ? "Spiral Binding" : bindingType === "soft" ? "Softbook" : "Hardcover Premium",
          paperThickness: paperWeight,
          digitalArchiveFile: fileName || "No file uploaded"
        }
      });
      setSubmittedOrder(ticket);
      setIsOrdering(false);
    }, 1500);
  };

  const resetAll = () => {
    setSubmittedOrder(null);
    setFileName(null);
    setFileSize(null);
    setUploadStatus("idle");
    setDetectedPages(0);
  };

  return (
    <div className="pt-32 pb-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 mb-6">Digital & Office</Badge>
          <h1 className="text-5xl font-black text-zinc-900 mb-6">Printing & <span className="text-indigo-600">Documentation</span></h1>
          <p className="text-lg text-zinc-600 font-medium">Professional grade printing and document finishing services for businesses, students, and government projects.</p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prints.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 font-bold">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{p.name}</h3>
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-6">{p.price}</p>
              </div>
              <Button 
                onClick={() => handleBookService(p.name)}
                variant="outline" 
                className="w-full rounded-xl border-zinc-200 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                Configure & Estimate
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Cost Estimator and Digital Workspace */}
        <div ref={calculatorRef} className="mt-28 min-h-[500px]">
          <div className="bg-white border border-zinc-200/90 rounded-[3rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-indigo-900/5">
            <AnimatePresence mode="wait">
              {submittedOrder ? (
                <motion.div
                  key="order-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-6 max-w-2xl mx-auto"
                >
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                    <Check className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full">
                      Print Job Registered
                    </span>
                    <h2 className="text-3xl font-black text-zinc-950 mt-3">Order Code: {submittedOrder.id}</h2>
                    <p className="text-zinc-500 font-medium mt-1">
                      Your files have been securely buffered inside our local printing portal. Bring your order to Mile 6, Nkwen for immediate processing.
                    </p>
                  </div>

                  <div className="bg-zinc-50 rounded-3xl p-6 text-left border border-zinc-100 text-sm divide-y divide-zinc-200/50">
                    <div className="py-2 flex justify-between">
                      <span className="text-zinc-400 font-bold">Service Type:</span>
                      <span className="font-bold text-zinc-800">{submittedOrder.details.serviceType}</span>
                    </div>
                    {submittedOrder.fileName && (
                      <div className="py-2 flex justify-between">
                        <span className="text-zinc-400 font-bold">Attached Document:</span>
                        <span className="font-semibold text-indigo-600">{submittedOrder.fileName}</span>
                      </div>
                    )}
                    <div className="py-2 flex justify-between">
                      <span className="text-zinc-400 font-bold">Configuration:</span>
                      <span className="font-semibold text-zinc-800">
                        {submittedOrder.details.documentPages} pages × {submittedOrder.details.copiesRequired} copies ({submittedOrder.details.colorMode})
                      </span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-zinc-400 font-bold">Finishing:</span>
                      <span className="font-semibold text-zinc-800">{submittedOrder.details.binding}</span>
                    </div>
                    <div className="py-3 flex justify-between text-base border-t border-zinc-200/50 mt-2">
                      <span className="text-zinc-900 font-black">Estimated Bill:</span>
                      <span className="font-black text-indigo-600 text-lg">{submittedOrder.costEstimate}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={resetAll}
                      variant="outline"
                      className="rounded-xl border-zinc-200 font-bold px-8 h-12"
                    >
                      New Print Job Calculation
                    </Button>
                    <a 
                      href={`https://wa.me/237676222804?text=${encodeURIComponent(`Hello IEM Masters, I have queued a printing job (${submittedOrder.id}) for "${submittedOrder.details.serviceType}". Pages: ${submittedOrder.details.documentPages}. Total is ${submittedOrder.costEstimate}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-650 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl flex items-center justify-center px-8 shadow-lg shadow-indigo-600/15 gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Dispatch to Printing Team
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  {/* Form inputs */}
                  <form onSubmit={handleOrderSubmit} className="lg:col-span-7 space-y-6">
                    <div>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 mb-2">Workspace Step 1</Badge>
                      <h2 className="text-3xl font-black text-zinc-900">Configure Paper & Blueprint specs</h2>
                      <p className="text-zinc-500 text-sm mt-1">Calibrated for Bamenda campus theses formats & standard administrative bounds.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Select Document Category</label>
                        <select 
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                        >
                          <option>Bulk Printing</option>
                          <option>Scanning & Digital Archiving</option>
                          <option>Laminating & Protection</option>
                          <option>Document Formatting</option>
                          <option>Thesis Binding</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Total Pages</label>
                          <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                            {pagesCount} pages
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min={1} 
                          max={500} 
                          value={pagesCount}
                          onChange={(e) => setPagesCount(Number(e.target.value))}
                          className="w-full accent-indigo-650"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Color Spectrum</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setColorMode("grayscale")}
                            className={`py-3 rounded-xl text-xs font-black border uppercase tracking-wider transition-all ${
                              colorMode === "grayscale"
                                ? "bg-zinc-900 border-zinc-900 text-white shadow-md shadow-zinc-900/10"
                                : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-650"
                            }`}
                          >
                            Grayscale
                          </button>
                          <button
                            type="button"
                            disabled={selectedService.includes("Scanning")}
                            onClick={() => setColorMode("color")}
                            className={`py-3 rounded-xl text-xs font-black border uppercase tracking-wider transition-all disabled:opacity-40 ${
                              colorMode === "color"
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10"
                                : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-650"
                            }`}
                          >
                            Full Color
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Thesis Binding Grade</label>
                        <select 
                          value={bindingType}
                          onChange={(e: any) => setBindingType(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                        >
                          <option value="none">None (Loose Sheets)</option>
                          <option value="spiral">Spiral Binding</option>
                          <option value="soft">Soft Binding</option>
                          <option value="hard">Hard Backcover</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Copies Count</label>
                        <div className="flex items-center gap-3 bg-zinc-50 rounded-xl border border-zinc-200/80 p-1.5 justify-between">
                          <button
                            type="button"
                            onClick={() => setCopiesCount(Math.max(1, copiesCount - 1))}
                            className="w-10 h-10 rounded-lg hover:bg-zinc-200 flex items-center justify-center font-black text-lg transition-colors border"
                          >
                            -
                          </button>
                          <span className="font-mono text-md font-black text-zinc-900">{copiesCount}</span>
                          <button
                            type="button"
                            onClick={() => setCopiesCount(copiesCount + 1)}
                            className="w-10 h-10 rounded-lg hover:bg-zinc-200 flex items-center justify-center font-black text-lg transition-colors border"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Print Density & Cost Tier Selector */}
                    <div className="bg-zinc-105 bg-indigo-50/10 p-6 rounded-2xl border border-zinc-200 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                            {colorMode === "color" ? "Color Print Quality & Price Tier" : "Grayscale Print Density & Price Tier"}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-semibold mt-0.5">Adjust coverage to match required formatting standard.</p>
                        </div>
                        <Badge className="bg-indigo-50 border-indigo-100 text-indigo-750 text-[10px] py-1 px-2.5 font-bold uppercase rounded-md shadow-xs">
                          {colorMode === "color" ? `${colorQuality} F/page` : `${grayscaleQuality} F/page`}
                        </Badge>
                      </div>
                      
                      {colorMode === "grayscale" ? (
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setGrayscaleQuality(20)}
                            className={`p-4 rounded-2xl text-left border cursor-pointer transition-all ${
                              grayscaleQuality === 20
                                ? "bg-white border-zinc-900 ring-2 ring-zinc-900/10 shadow-sm"
                                : "bg-white/40 hover:bg-white border-zinc-200 text-zinc-600"
                            }`}
                          >
                            <span className="text-xs font-black text-zinc-900 block">Eco / Draft Density</span>
                            <span className="text-[10px] text-zinc-500 font-bold mt-1 block">20 FCFA / page</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setGrayscaleQuality(25)}
                            className={`p-4 rounded-2xl text-left border cursor-pointer transition-all ${
                              grayscaleQuality === 25
                                ? "bg-white border-zinc-900 ring-2 ring-zinc-900/10 shadow-sm"
                                : "bg-white/40 hover:bg-white border-zinc-200 text-zinc-650"
                            }`}
                          >
                            <span className="text-xs font-black text-zinc-900 block">Document Standard</span>
                            <span className="text-[10px] text-indigo-650 font-black mt-1 block">25 FCFA / page</span>
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { value: 100, label: "Eco Standard", desc: "100 FCFA" },
                            { value: 250, label: "Medium Rich", desc: "250 FCFA" },
                            { value: 500, label: "High Gloss", desc: "500 FCFA" },
                            { value: 1000, label: "Premium Poster", desc: "1,000 FCFA" }
                          ].map((tier) => (
                            <button
                              type="button"
                              key={tier.value}
                              onClick={() => setColorQuality(tier.value as any)}
                              className={`p-3.5 rounded-2xl text-left border cursor-pointer transition-all ${
                                colorQuality === tier.value
                                  ? "bg-white border-indigo-650 ring-2 ring-indigo-650/10 shadow-sm"
                                  : "bg-white/40 hover:bg-white border-zinc-200 text-zinc-600"
                              }`}
                            >
                              <span className="text-[11px] font-black text-zinc-800 leading-tight block truncate">{tier.label}</span>
                              <span className="text-[10px] text-indigo-600 font-extrabold mt-1 block">{tier.desc}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Paper Standard Quality</label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className={`border rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all ${paperWeight === "70g" ? "border-indigo-600 bg-indigo-50/20" : "border-zinc-200/80 hover:bg-zinc-50"}`}>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="paper_standard"
                              checked={paperWeight === "70g"} 
                              onChange={() => setPaperWeight("70g")}
                              className="accent-indigo-650"
                            />
                            <div>
                              <p className="text-sm font-black">70g Standard Office</p>
                              <p className="text-[11px] text-zinc-500">Perfect for general handouts and roughs</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-zinc-400">Regular</span>
                        </label>

                        <label className={`border rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all ${paperWeight === "80g" ? "border-indigo-600 bg-indigo-50/20" : "border-zinc-200/80 hover:bg-zinc-50"}`}>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="paper_standard"
                              checked={paperWeight === "80g"} 
                              onChange={() => setPaperWeight("80g")}
                              className="accent-indigo-650"
                            />
                            <div>
                              <p className="text-sm font-black">80g Premium Gloss</p>
                              <p className="text-[11px] text-zinc-500">Thick paper suited for formal reports (+10F/page)</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-indigo-600">Thick</span>
                        </label>
                      </div>
                    </div>

                    {/* Preflight file upload workspace */}
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block">Preflight Document File Link</label>
                      <div className="border-2 border-dashed border-zinc-200 rounded-[2rem] p-8 text-center bg-zinc-50 hover:bg-zinc-100/50 transition-colors relative group">
                        <input 
                          type="file" 
                          id="printingFileUploader"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.xlsx"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-3">
                          <div className="w-12 h-12 bg-white rounded-2xl border border-zinc-100 flex items-center justify-center text-zinc-400 mx-auto group-hover:scale-105 transition-transform shadow-sm">
                            <Upload className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-zinc-950">Drag & Drop or browse academic draft</p>
                            <p className="text-xs text-zinc-405 mt-1 font-semibold text-zinc-400">PDF, Word, or Spreadsheet files acceptable (Max size: 64MB)</p>
                          </div>
                        </div>
                      </div>

                      {/* File upload status bar */}
                      <AnimatePresence>
                        {fileName && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-2xl border border-zinc-100 bg-white shadow-sm flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-black text-zinc-900 truncate">{fileName}</p>
                                <p className="text-xs text-zinc-400 font-medium">{fileSize} {isUploading ? "• Uploading..." : "• Scanned successfully"}</p>
                              </div>
                            </div>
                            <div className="text-right flex items-center gap-4 min-w-[120px] justify-end">
                              {isUploading ? (
                                <div className="flex items-center gap-2">
                                  <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
                                  <span className="text-xs font-black text-indigo-650">{uploadProgress}%</span>
                                </div>
                              ) : (
                                <div className="text-right">
                                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-black px-2.5 py-1 rounded-md border border-emerald-100">
                                    <Check className="w-3.5 h-3.5" /> Checked
                                  </span>
                                  {detectedPages > 0 && (
                                    <p className="text-[10px] text-zinc-400 font-extrabold mt-0.5">ESTIMATED {detectedPages} PAGES</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isOrdering || isUploading}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-350 text-white rounded-2xl py-8 text-xl font-bold tracking-tight shadow-xl shadow-indigo-600/20 group uppercase mt-4"
                    >
                      {isOrdering ? (
                        <>
                          <RefreshCw className="mr-2 w-5 h-5 animate-spin" /> Sending to print queue...
                        </>
                      ) : (
                        <>
                          Send to printing queue
                          <Printer className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Summary card right hand */}
                  <div className="lg:col-span-5 bg-zinc-50/50 rounded-[2.2rem] border border-zinc-200/80 p-8 space-y-6 sticky top-28">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-650 mb-1">Quote Summary</p>
                      <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Standard Cost Estimate</h3>
                    </div>

                    <div className="divide-y divide-zinc-200/80 text-sm font-medium">
                      <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Config:</span>
                        <span className="text-zinc-800 font-bold">{selectedService}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Dimension specs:</span>
                        <span className="text-zinc-800 font-semibold">{pagesCount} Pages × {copiesCount} copies</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Color option:</span>
                        <span className="text-zinc-800 font-bold capitalize">
                          {colorMode} ({colorMode === "color" ? `${colorQuality} FCFA` : `${grayscaleQuality} FCFA`}/page)
                        </span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Binding Finish:</span>
                        <span className="text-zinc-800 font-bold">
                          {bindingType === "none" ? "None" : bindingType === "spiral" ? "Spiral" : bindingType === "soft" ? "Soft Cover" : "Thesis Hardcover"}
                        </span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Paper weight:</span>
                        <span className="text-zinc-800 font-extrabold">{paperWeight === "70g" ? "70g standard" : "80g glossy (+10 F/page)"}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-350 flex justify-between items-center bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Estimated cost</p>
                        {selectedService === "Thesis Binding" ? (
                          <p className="text-xl font-black text-indigo-650 mt-1 leading-tight">
                            Depends on work
                            <span className="text-[10px] block text-zinc-400 font-semibold mt-0.5">Custom quote on evaluation</span>
                          </p>
                        ) : (
                          <p className="text-3xl font-black text-indigo-650 mt-1">
                            {calculateTotalCost().toLocaleString()} <span className="text-xs text-zinc-550">FCFA</span>
                          </p>
                        )}
                      </div>
                      <Badge className="bg-indigo-50 text-indigo-700 border-indigo-150 py-1 px-3">IEM Calibrated</Badge>
                    </div>

                    <div className="rounded-2xl bg-zinc-900 text-white p-5 text-xs font-semibold leading-relaxed relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full translate-x-4 -translate-y-4" />
                      <p className="text-zinc-300 font-black mb-1 flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
                        <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
                        Cameroon Standard Guidelines
                      </p>
                      <p className="text-zinc-400">
                        In accordance with infrastructure & university formatting regulations, thesis binding orders will automatically apply standard margins (Top: 2.5cm, Bottom: 2.5cm, Left: 3.5cm, Right: 2.5cm) unless specified in notes block.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Corporate card below */}
        <div className="mt-20 bg-indigo-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl font-bold mb-4">Need bulk printing for your office?</h2>
                   <p className="text-indigo-100 mb-8">We offer corporate contracts for recurring printing and document management needs with discounted rates.</p>
                   <Button 
                      onClick={() => handleBookService("Corporate Contract printing")}
                      className="bg-white text-indigo-700 hover:bg-zinc-100 rounded-xl px-8 py-6 font-bold shadow-lg"
                   >
                      Request Corporate Account
                   </Button>
                </div>
                <div className="flex justify-center md:justify-end font-bold">
                    <Printer className="w-48 h-48 opacity-20 rotate-12" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
