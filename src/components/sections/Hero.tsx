import { motion } from "motion/react";
import { ArrowRight, Phone, CheckCircle, Construction, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-100 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
                🏗️ Professional Engineering & Standards
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-900 mb-8 leading-[0.9]"
            >
              Building durable <span className="text-blue-700 italic font-serif">standard</span> infrastructure.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-600 max-w-xl mb-10 leading-relaxed font-medium"
            >
              Infrastructure Engineering Masters Ltd. (IEM) delivers architectural excellence, structural integrity, and professional digital services with international standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/engineering" className="w-full sm:w-auto">
                <Button size="lg" className="rounded-2xl px-10 py-8 text-lg bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-2xl shadow-blue-700/20 group w-full">
                  Our Services
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="rounded-2xl px-10 py-8 text-lg w-full font-bold border-zinc-200 hover:bg-zinc-50 gap-2 text-zinc-700">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-wrap gap-x-8 gap-y-4"
            >
              {[
                { icon: <Construction className="w-4 h-4" />, text: "Expert Engineers" },
                { icon: <ShieldCheck className="w-4 h-4" />, text: "Quality Guaranteed" },
                { icon: <Zap className="w-4 h-4" />, text: "Modern Tech" }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400">
                  <div className="text-blue-600">{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden border-[12px] border-zinc-100 shadow-2xl shadow-blue-700/10 bg-zinc-50 aspect-[4/5] relative">
               <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" 
                alt="Engineering Project"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
               <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-blue-200">Current Project</p>
                      <h3 className="text-2xl font-bold">Standard Structural Analysis</h3>
                      <div className="mt-4 flex items-center justify-between">
                         <div className="h-1 bg-white/20 rounded-full flex-1 mr-4">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "85%" }}
                              transition={{ duration: 2, delay: 1 }}
                              className="h-full bg-blue-400 rounded-full"
                            />
                         </div>
                         <span className="text-sm font-bold">85% Done</span>
                      </div>
                  </div>
               </div>
            </div>
            
            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                  <Construction className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Durability</p>
                  <p className="text-xl font-black text-zinc-900 leading-none">100% Standard</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
