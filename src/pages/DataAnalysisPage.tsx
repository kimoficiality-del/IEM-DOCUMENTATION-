import { motion } from "motion/react";
import { LineChart, BarChart3, PieChart, FileSpreadsheet, Binary, Microscope } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import * as React from "react";

export default function DataAnalysisPage() {
  const steps = [
    { title: "Data Cleaning", desc: "Removing outliers and fixing missing values for accurate results." },
    { title: "Statistical Analysis", desc: "Applying SPSS or Excel models to find correlations and significance." },
    { title: "Visualization", desc: "Transforming raw numbers into professional charts and dashboards." },
    { title: "Reporting", desc: "Written interpretation of findings for academic or business use." },
  ];

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 mb-6">Expert Analytics</Badge>
            <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 mb-8 leading-tight">
              Data driven <span className="text-emerald-600">decisions</span>.
            </h1>
            <p className="text-lg text-zinc-600 font-medium leading-relaxed mb-10">
              We specialize in SPSS and advanced Excel analysis for research projects, business intelligence, and developmental data. Turn your raw data into actionable insights.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-8 py-6 font-bold shadow-xl shadow-emerald-600/20">
                Upload Data File
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl px-8 py-6 font-bold">
                View Sample Reports
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

        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Analysis Process</h2>
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
