import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import { Button } from "../components/ui/button";
import { ArrowRight, MessageCircle, Star, ShieldCheck, Clock, Users2 } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";

export default function LandingPage() {
  return (
    <div className="pt-20">
      <Hero />
      
      {/* Trust Stats Bar */}
      <div className="py-12 border-y border-zinc-100 bg-white/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <TrustStat icon={<ShieldCheck className="w-5 h-5" />} label="Engineering Standard" val="Verified" />
                <TrustStat icon={<Users2 className="w-5 h-5" />} label="Happy Clients" val="1.5k+" />
                <TrustStat icon={<Clock className="w-5 h-5" />} label="Uptime Service" val="Mon - Sat" />
                <TrustStat icon={<Star className="w-5 h-5" />} label="Avg Rating" val="4.9/5" />
            </div>
        </div>
      </div>

      <Features />

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] rotate-3 scale-105 -z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=1200" 
                    alt="Standard Engineering"
                    className="rounded-[3rem] shadow-2xl border border-zinc-100"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -right-10 bg-zinc-900 p-8 rounded-[2rem] text-white hidden md:block">
                    <p className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Our Promise</p>
                    <p className="text-2xl font-bold leading-tight">Durability & Standards <br/>for Infrastructure.</p>
                </div>
            </div>
            <div>
              <p className="text-blue-700 font-black uppercase tracking-[0.3em] text-xs mb-6">Quality First</p>
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-8 leading-tight">
                Why infrastructure <span className="italic font-serif">leaders</span> choose IEM.
              </h2>
              <div className="space-y-8">
                <BenefitItem 
                    title="International Engineering Standards"
                    desc="We adhere to global blueprints and professional practices to ensure every project stands the test of time."
                />
                <BenefitItem 
                    title="Registered Architects & Engineers"
                    desc="All our personnel are licensed experts with decades of combined experience in civil works."
                />
                <BenefitItem 
                    title="Modern High-End Technology"
                    desc="We use the latest software and machinery for structural analysis, data reporting, and digital printing."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="py-24 bg-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">Ready to build your <br/><span className="text-blue-200">standard</span> project?</h2>
            <p className="text-blue-100 text-xl font-medium mb-12 max-w-2xl mx-auto">
                Join the hundreds of companies and thousands of individuals who trust IEM for durability, precision, and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 rounded-2xl px-12 py-8 text-xl font-black shadow-2xl">
                    Get a Quote Now
                </Button>
                <Button size="lg" variant="outline" className="border-blue-400 text-white hover:bg-white/10 rounded-2xl px-12 py-8 text-xl font-bold">
                    Talk to an Expert
                </Button>
            </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/237691005841" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[100] bg-emerald-500 text-white p-5 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        <span className="absolute right-full mr-4 bg-white text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-100">
            Chat with IEM Expert
        </span>
      </a>
    </div>
  );
}

function TrustStat({ icon, label, val }: { icon: React.ReactNode, label: string, val: string }) {
    return (
        <div className="flex items-center gap-4 border-r border-zinc-100 last:border-0 px-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-black text-zinc-900 leading-none">{val}</p>
            </div>
        </div>
    )
}

function BenefitItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-6">
            <div className="w-2 h-2 mt-3 bg-blue-600 rounded-full shrink-0" />
            <div>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">{title}</h4>
                <p className="text-zinc-600 font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
