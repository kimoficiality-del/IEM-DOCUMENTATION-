import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { addTicket } from "../lib/portalState";
import * as React from "react";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    category: "Infrastructure Engineering",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedTicket, setSubmittedTicket] = React.useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Please fill in all requested fields to submit under IEM standard.");
      return;
    }

    setIsSubmitting(true);

    // Simulate standard server latency
    setTimeout(() => {
      const ticket = addTicket({
        type: "contact",
        title: `Contact Inquiry: ${formData.category}`,
        status: "pending",
        details: {
          clientName: formData.fullName,
          clientEmail: formData.email,
          targetDepartment: formData.category,
          briefSummary: formData.message.slice(0, 80) + (formData.message.length > 80 ? "..." : ""),
        },
      });
      setSubmittedTicket(ticket);
      setIsSubmitting(false);
      
      // Clear form
      setFormData({
        fullName: "",
        email: "",
        category: "Infrastructure Engineering",
        message: "",
      });
    }, 1500);
  };

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
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-zinc-200 shadow-xl shadow-blue-900/5 min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {submittedTicket ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full">
                        Secure Transmission Successful
                      </span>
                      <h2 className="text-3xl font-black text-zinc-900 mt-3 md:text-4xl">Request Registered!</h2>
                      <p className="text-zinc-500 font-medium max-w-md mx-auto mt-2">
                        Your consultation ticket has been securely broadcasted to the IEM Masters department.
                      </p>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-3xl max-w-md mx-auto text-left divide-y divide-zinc-200/50 text-sm">
                      <div className="py-2.5 flex justify-between">
                        <span className="text-zinc-400 font-bold">Ticket ID:</span>
                        <span className="font-mono font-black text-blue-700">{submittedTicket.id}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-zinc-400 font-bold">Category:</span>
                        <span className="font-bold text-zinc-800">{submittedTicket.details.targetDepartment}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-zinc-400 font-bold">Registered email:</span>
                        <span className="font-bold text-zinc-800">{submittedTicket.details.clientEmail}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-zinc-400 font-bold">Status:</span>
                        <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-600 font-black px-2.5 py-0.5 rounded-md text-[11px] border border-zinc-200">
                          <Clock className="w-3 h-3 animate-pulse" /> Pending Evaluation
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
                      <Button 
                        onClick={() => setSubmittedTicket(null)}
                        variant="outline"
                        className="rounded-xl border-zinc-200 font-bold h-12 w-full"
                      >
                        Send Another message
                      </Button>
                      <a 
                        href={`https://wa.me/237691005841?text=${encodeURIComponent(`Hello IEM Ltd., I just submitted diagnostic ticket ${submittedTicket.id} on your website for ${submittedTicket.details.targetDepartment}. Can you please review?`)}`}
                        target="_blank"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 w-full transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                        <Input 
                          placeholder="John Doe" 
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="rounded-xl border-zinc-100 bg-zinc-50/50 py-6" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                        <Input 
                          type="email" 
                          required
                          placeholder="john@example.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="rounded-xl border-zinc-100 bg-zinc-50/50 py-6" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Service Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-xl border border-zinc-100 bg-zinc-50/50 py-4 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
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
                      <Textarea 
                        placeholder="Tell us about your project..." 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-xl border-zinc-100 bg-zinc-50/50 min-h-[150px]" 
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-zinc-300 text-white rounded-2xl py-8 text-xl font-black shadow-xl shadow-blue-700/20 group"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 w-5 h-5 animate-spin" />
                          Transmitting Securely...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
              
              <div className="mt-12 pt-12 border-t border-zinc-50 text-center">
                 <p className="text-zinc-500 font-medium mb-6">Preferred quick response?</p>
                 <a 
                    href="https://wa.me/237691005841?text=Hello%20IEM%20Ltd!%20I'd%20like%20to%20consult%20an%20infrastructure%20expert%20regarding%20my%20building%20project."
                    target="_blank"
                    rel="no-referrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 font-bold px-10 py-4 hover:bg-emerald-100 gap-2 transition-colors"
                 >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us Now
                 </a>
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
