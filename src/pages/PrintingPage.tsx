import { motion } from "motion/react";
import { Printer, Layers, Scan, FileText, BookOpen, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import * as React from "react";

export default function PrintingPage() {
  const prints = [
    { name: "Bulk Printing", price: "Premium Quality", icon: <Printer /> },
    { name: "Scanning & Digital Archiving", price: "High Resolution", icon: <Scan /> },
    { name: "Laminating & Protection", price: "All Sizes", icon: <Layers /> },
    { name: "Document Formatting", price: "Professional Style", icon: <FileText /> },
    { name: "Thesis Binding", price: "Hard/Soft Cover", icon: <BookOpen /> },
    { name: "Express Delivery", price: "Same Day", icon: <Clock /> },
  ];

  return (
    <div className="pt-32 pb-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 mb-6">Digital & Office</Badge>
          <h1 className="text-5xl font-black text-zinc-900 mb-6">Printing & <span className="text-indigo-600">Documentation</span></h1>
          <p className="text-lg text-zinc-600 font-medium">Professional grade printing and document finishing services for businesses, students, and government projects.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prints.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">{p.name}</h3>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-6">{p.price}</p>
              <Button variant="outline" className="w-full rounded-xl border-zinc-200 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                Book Service
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-indigo-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl font-bold mb-4">Need bulk printing for your office?</h2>
                   <p className="text-indigo-100 mb-8">We offer corporate contracts for recurring printing and document management needs with discounted rates.</p>
                   <Button className="bg-white text-indigo-700 hover:bg-zinc-100 rounded-xl px-8 py-6 font-bold shadow-lg">
                      Request Corporate Account
                   </Button>
                </div>
                <div className="flex justify-center md:justify-end">
                    <Printer className="w-48 h-48 opacity-20 rotate-12" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
