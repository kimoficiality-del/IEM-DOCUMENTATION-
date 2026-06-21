import { motion } from "motion/react";
import { Building2, Printer, LineChart, FileEdit, GraduationCap, Microscope, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

export default function Features() {
  const features = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Infrastructure Engineering",
      description: "Structural design, civil works, and architectural planning with a focus on durability and international standards.",
      color: "blue"
    },
    {
      icon: <Printer className="w-8 h-8" />,
      title: "Printing & Office Services",
      description: "High-volume printing, laminating, and document binding using professional-grade hardware.",
      color: "indigo"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Data Analysis",
      description: "Expert statistical reporting using SPSS and Excel for research, business, and academic data.",
      color: "emerald"
    },
    {
      icon: <FileEdit className="w-8 h-8" />,
      title: "Project Editing",
      description: "Professional thesis formatting, grammar correction, and academic project preparation.",
      color: "amber"
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Geotechnical Studies",
      description: "Comprehensive soil testing and site analysis to ensure foundational integrity for any structure.",
      color: "rose"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Software Training",
      description: "Specialized training in engineering software for students and active professionals.",
      color: "slate"
    }
  ];

  return (
    <section className="py-24 bg-zinc-50/50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 font-bold text-blue-700 border-blue-100 uppercase tracking-widest text-[10px]">
            Our Departments
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-6">
            Multidisciplinary <span className="italic font-serif text-blue-700">expertise</span>.
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-medium">
            Combining engineering precision with digital efficiency to provide a one-stop hub for infrastructure and professional services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 rounded-3xl border border-zinc-200 bg-white hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-700/5 transition-all cursor-default"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:-rotate-3 ${
                feature.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                feature.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                feature.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                feature.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                'bg-slate-100 text-slate-600'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">{feature.title}</h3>
              <p className="text-zinc-600 leading-relaxed font-medium">
                {feature.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-black text-blue-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Details <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
