import { motion } from "motion/react";
import { FileEdit, SpellCheck, Layout, Type, Highlighter, Search, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import * as React from "react";

export default function ProjectEditingPage() {
  const services = [
    { title: "Thesis Formatting", desc: "Alignment with university standards for PhD, Masters, and Bachelors degrees.", icon: <Layout /> },
    { title: "Grammar Correction", desc: "Rigorous linguistic check for clarity, flow, and academic integrity.", icon: <SpellCheck /> },
    { title: "Plagiarism Check", desc: "Deep scans to ensure original work and proper citation styles.", icon: <Search /> },
    { title: "Professional CVs", desc: "Modern document design for high-impact professional applications.", icon: <Type /> },
  ];

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
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl px-10 py-7 font-bold shadow-xl shadow-amber-600/20 gap-2">
                Get an Editing Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
           </div>
           
           <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-all">
                   <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                      {s.icon}
                   </div>
                   <h3 className="text-xl font-bold text-zinc-900 mb-3">{s.title}</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-zinc-900 rounded-[3rem] p-12 lg:p-20 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #f59e0b 25%, transparent 25%, transparent 50%, #f59e0b 50%, #f59e0b 75%, transparent 75%, transparent)' , backgroundSize: '100px 100px' }} />
            <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">Final Year Project Support</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 relative z-10">We provide specialized support for students, ensuring documentation is perfectly formatted and ready for defense.</p>
            <div className="flex justify-center gap-4 relative z-10">
                <div className="px-6 py-2 bg-zinc-800 rounded-full border border-zinc-700 text-xs font-black uppercase tracking-widest">APA Style</div>
                <div className="px-6 py-2 bg-zinc-800 rounded-full border border-zinc-700 text-xs font-black uppercase tracking-widest">MLA Style</div>
                <div className="px-6 py-2 bg-zinc-800 rounded-full border border-zinc-700 text-xs font-black uppercase tracking-widest">Harvard</div>
            </div>
        </div>
      </div>
    </div>
  );
}
