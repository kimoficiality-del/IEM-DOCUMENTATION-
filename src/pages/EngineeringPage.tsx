import { motion } from "motion/react";
import { Building2, Route, Shovel, Ruler, Microscope, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import * as React from "react";

export default function EngineeringPage() {
  const services = [
    {
      title: "Structural Engineering",
      icon: <Building2 className="w-8 h-8" />,
      desc: "Analysis and design of durable skeletons for residential and commercial complexes."
    },
    {
      title: "Road Construction",
      icon: <Route className="w-8 h-8" />,
      desc: "Planning and execution of high-standard road infrastructure and drainage systems."
    },
    {
      title: "Geotechnical testing",
      icon: <Microscope className="w-8 h-8" />,
      desc: "Comprehensive soil testing and site analysis to ensure foundational stability."
    },
    {
      title: "Project Supervision",
      icon: <ShieldCheck className="w-8 h-8" />,
      desc: "On-site management to ensure execution follows architectural and structural plans."
    },
    {
      title: "Architectural Design",
      icon: <Ruler className="w-8 h-8" />,
      desc: "Modern and functional designs that combine aesthetics with structural efficiency."
    },
    {
      title: "Civil Works",
      icon: <Shovel className="w-8 h-8" />,
      desc: "General infrastructure development, from public works to private landscaping."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-24">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-100">Engineering Excellence</Badge>
          <h1 className="text-4xl md:text-7xl font-black text-zinc-900 mb-8 leading-tight">
            Infrastructure development with <span className="text-blue-700 italic font-serif">zero</span> compromise.
          </h1>
          <p className="text-xl text-zinc-600 leading-relaxed font-medium">
            Our engineering department works with registered architects and structural experts to bring your visions to life with durability as the core foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-blue-200 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-blue-500/5 flex items-center justify-center text-blue-700 mb-8 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">{s.title}</h3>
              <p className="text-zinc-600 font-medium leading-relaxed mb-8">{s.desc}</p>
              <Button variant="ghost" className="p-0 text-blue-700 font-bold hover:bg-transparent hover:text-blue-800 gap-2">
                Request Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 p-12 lg:p-20 bg-blue-700 rounded-[3rem] text-white flex flex-wrap justify-between gap-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <StatItem label="Projects Done" val="250+" />
             <StatItem label="Expert Engineers" val="18" />
             <StatItem label="Years Experience" val="12" />
             <StatItem label="Standard Index" val="100%" />
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, val }: { label: string, val: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-5xl md:text-7xl font-black mb-2">{val}</p>
      <p className="text-sm font-bold uppercase tracking-widest text-blue-200">{label}</p>
    </div>
  )
}
