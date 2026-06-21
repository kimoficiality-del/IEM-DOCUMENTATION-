import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import * as React from "react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-100">Contact Us</Badge>
          <h1 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">Let's build something <span className="text-blue-700 italic font-serif underline decoration-blue-200 underline-offset-8">extraordinary</span> together.</h1>
          <p className="text-lg text-zinc-600 font-medium">Have a project in mind? Reach out to our experts for a detailed consultation and quote.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <ContactCard 
                icon={<Phone className="w-6 h-6" />}
                title="Phone"
                content={["+237 691 005 841", "+237 676 222 804"]}
            />
            <ContactCard 
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                content={["IEM@gmail.com"]}
            />
            <ContactCard 
                icon={<MapPin className="w-6 h-6" />}
                title="Office"
                content={["Mile Six, Nkwen, Bamenda, Cameroon"]}
            />
            <ContactCard 
                icon={<Clock className="w-6 h-6" />}
                title="Working Hours"
                content={["Mon - Sat: 7:30 AM - 5:00 PM", "Sunday: Closed"]}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-zinc-200 shadow-xl shadow-blue-900/5">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                    <Input placeholder="John Doe" className="rounded-xl border-zinc-100 bg-zinc-50/50 py-6" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="rounded-xl border-zinc-100 bg-zinc-50/50 py-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Service Category</label>
                  <select className="w-full rounded-xl border border-zinc-100 bg-zinc-50/50 py-4 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Infrastructure Engineering</option>
                    <option>Structural Analysis</option>
                    <option>Architecture & Design</option>
                    <option>Printing & Digital Services</option>
                    <option>Data Analysis</option>
                    <option>Project Editing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Message</label>
                  <Textarea placeholder="Tell us about your project..." className="rounded-xl border-zinc-100 bg-zinc-50/50 min-h-[150px]" />
                </div>
                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-2xl py-8 text-xl font-black shadow-xl shadow-blue-700/20 group">
                  Send Message
                  <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
              
              <div className="mt-12 pt-12 border-t border-zinc-50 text-center">
                 <p className="text-zinc-500 font-medium mb-6">Preferred quick response?</p>
                 <Button variant="outline" className="rounded-2xl border-emerald-100 bg-emerald-50 text-emerald-700 font-bold px-10 py-6 hover:bg-emerald-100 gap-2">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us Now
                 </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="mt-32 w-full h-[500px] bg-zinc-200 rounded-[3rem] overflow-hidden grayscale relative border border-zinc-100">
             <div className="absolute inset-0 bg-blue-600/5 z-10 pointer-events-none" />
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15886.73641320499!2d10.1581!3d5.9631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f16279f18e957%3A0xe8b8c18742bb959!2sMile%206%2C%20Nkwen%2C%20Bamenda!5e0!3m2!1sen!2scm!4v1713500000000!5m2!1sen!2scm" 
                className="w-full h-full border-0" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
             />
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: string[] }) {
    return (
        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 mb-6">
                {icon}
            </div>
            <h3 className="text-lg font-black text-zinc-900 mb-3">{title}</h3>
            {content.map((c, i) => (
                <p key={i} className="text-zinc-500 font-medium">{c}</p>
            ))}
        </div>
    )
}
