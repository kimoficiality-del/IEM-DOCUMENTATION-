import { motion } from "motion/react";
import { ShieldCheck, Target, Award, RefreshCw, CheckCircle2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import * as React from "react";

export default function AboutPage() {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      
      // Physically build a downloadable profile text document
      const docLines = [
        "==================================================================",
        "          INFRASTRUCTURE ENGINEERING MASTERS LTD (IEM LTD)        ",
        "                'IEM is for durability and standard'              ",
        "==================================================================",
        "Location: Mile 6, Nkwen, Bamenda, North West Region, Cameroon",
        "Contact: +237 691 005 841 | IEM@gmail.com",
        "Established: Bamenda, Cameroon",
        "",
        "SERVICES PROFILE:",
        "1. Geotechnical & Geomechanics Engineering (Soil Testing & Foundations)",
        "2. Infrastructure planning, structural modeling & 3D civil plans",
        "3. High-standard commercial digital and blueprint printing",
        "4. Academic statistical analysis using SPSS and Excel",
        "5. Thesis formatting and professional grammatical alignment",
        "",
        "MISSION STATEMENT:",
        "To provide robust, safe, and cost-efficient engineering and digital",
        "development solutions compliant with international Eurocodes and local standards.",
        "=================================================================="
      ].join("\n");

      const file = new Blob([docLines], { type: "text/plain" });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = "IEM_Ltd_Company_Profile.txt";
      document.body.appendChild(element); // Required for this to work on Firefox
      element.click();
      document.body.removeChild(element);
    }, 1800);
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-100">About IEM Ltd</Badge>
            <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 mb-8 leading-tight">
              Engineering <span className="text-blue-700">standard</span>.
            </h1>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed mb-8">
              Infrastructure Engineering Masters Ltd. (IEM) was built on the principle that "IEM is for durability and standard."
            </p>
            <p className="text-zinc-500 leading-relaxed mb-10">
              We started as a small consultancy in Bamenda and have grown into a multidisciplinary firm serving private developers, government agencies, and international partners across Cameroon. Our team combines technical calculation with creative design to solve the most complex infrastructure challenges.
            </p>
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg" 
              className="rounded-2xl px-10 py-7 bg-blue-700 hover:bg-blue-800 font-bold shadow-xl shadow-blue-700/20 cursor-pointer disabled:bg-zinc-400 gap-2"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Profile...
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Downloaded Successfully!
                </>
              ) : (
                "Download Company Profile"
              )}
            </Button>
          </motion.div>
          
          <div className="relative">
             <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] -rotate-2 -z-10" />
             <div className="rounded-[4rem] overflow-hidden border-8 border-zinc-50 shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200" 
                    alt="IEM Office"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
             </div>
             {/* Floating Badge */}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-32">
            <ValueCard 
                icon={<Target className="w-8 h-8" />} 
                title="Our Mission" 
                desc="To provide reliable, durable, and cost-effective engineering and digital solutions through innovation and strict adherence to professional standards." 
            />
            <ValueCard 
                icon={<ShieldCheck className="w-8 h-8" />} 
                title="Our Vision" 
                desc="To become the leading engineering firm in Central Africa, recognized for quality benchmarks and sustainable infrastructure development." 
            />
            <ValueCard 
                icon={<Award className="w-8 h-8" />} 
                title="Our Values" 
                desc="Integrity, Precision, Durability, and Innovation guide every structural calculation and every client interaction." 
            />
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-blue-200 transition-colors">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-sm mb-8">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">{title}</h3>
            <p className="text-zinc-600 font-medium leading-relaxed">{desc}</p>
        </div>
    )
}

