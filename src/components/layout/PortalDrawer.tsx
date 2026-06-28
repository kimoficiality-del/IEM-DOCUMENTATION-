import { motion, AnimatePresence } from "motion/react";
import { X, ClipboardCheck, Clock, FileText, CheckCircle2, Trash2, Printer, Edit3, Settings, ShieldCheck, Database, HardHat, ExternalLink, HelpCircle } from "lucide-react";
import { usePortalTickets, Ticket } from "../../lib/portalState";
import { Button } from "../ui/button";

interface PortalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortalDrawer({ isOpen, onClose }: PortalDrawerProps) {
  const { tickets, deleteTicket, updateTicketStatus } = usePortalTickets();

  const getServiceColor = (type: string) => {
    switch (type) {
      case "printing":
        return { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" };
      case "editing":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" };
      case "engineering":
        return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" };
      case "data":
        return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" };
      default:
        return { bg: "bg-zinc-50", text: "text-zinc-700", border: "border-zinc-100" };
    }
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ready / Standard Verified
          </span>
        );
      case "analyzing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 animate-pulse">
            <Settings className="w-3.5 h-3.5 animate-spin" /> Analyzing Parameters
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            <ClipboardCheck className="w-3.5 h-3.5" /> Booked & Approved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "printing":
        return <Printer className="w-5 h-5" />;
      case "editing":
        return <Edit3 className="w-5 h-5" />;
      case "engineering":
        return <HardHat className="w-5 h-5" />;
      case "data":
        return <Database className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-50 border-l border-zinc-200 flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-700/20">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-zinc-950 tracking-tight">IEM Client Portal</h2>
                  <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">Inquiries & Quotes Portal</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 flex items-center justify-center transition-all"
                aria-label="Close portal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {tickets.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-zinc-50 border border-zinc-100 rounded-[2rem] flex items-center justify-center text-zinc-400 mb-6 shadow-inner">
                    <HelpCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">No inquiry history found</h3>
                  <p className="text-zinc-400 text-sm max-w-xs font-medium">
                    Try requesting a soil calculation, print cost quote, or editing assessment to see live updates in action!
                  </p>
                </div>
              ) : (
                tickets.map((t) => {
                  const colors = getServiceColor(t.type);
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} ${colors.border} border flex items-center justify-center`}>
                            {getServiceIcon(t.type)}
                          </span>
                          <div>
                            <p className="text-xs font-black text-zinc-400 tracking-wider">TICKET ID: {t.id}</p>
                            <h4 className="font-black text-zinc-900 text-md leading-snug mt-0.5">{t.title}</h4>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTicket(t.id)}
                          className="text-zinc-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-4 text-xs font-medium">
                        <div>
                          <p className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Current Status</p>
                          <div className="mt-1">{getStatusBadge(t.status)}</div>
                        </div>
                        <div className="text-right">
                          <p className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Estimated Price</p>
                          <p className="text-sm font-black text-blue-700 mt-1">{t.costEstimate || "Pending Evaluation"}</p>
                        </div>
                      </div>

                      {/* Expandable options lists */}
                      <div className="bg-zinc-50 p-4 rounded-2xl text-[13px] text-zinc-600 font-medium space-y-1.5 border border-zinc-100">
                        {t.fileName && (
                          <div className="flex justify-between border-b border-zinc-200/50 pb-1.5 mb-1.5">
                            <span className="text-zinc-400 font-black">Attached File:</span>
                            <span className="font-bold text-zinc-800 flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5 text-blue-500" /> {t.fileName}
                            </span>
                          </div>
                        )}
                        {Object.entries(t.details).map(([key, val]) => {
                          // Format key to beautiful title case
                          const label = key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());
                          return (
                            <div key={key} className="flex justify-between gap-3">
                              <span className="text-zinc-400">{label}:</span>
                              <span className="text-zinc-800 text-right font-semibold">{String(val)}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Interactive Actions per Ticket to make it fully functional! */}
                      {t.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs font-bold rounded-xl border-zinc-200 py-4 h-auto"
                            onClick={() => updateTicketStatus(t.id, "analyzing")}
                          >
                            Simulate Technical Analysis
                          </Button>
                        </div>
                      )}

                      {t.status === "analyzing" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs font-bold rounded-xl bg-blue-50 border-blue-100 text-blue-700 py-4 h-auto hover:bg-blue-100"
                            onClick={() => updateTicketStatus(t.id, "completed")}
                          >
                            Mark As Calculation Complete
                          </Button>
                        </div>
                      )}

                      {t.status === "completed" && (
                        <div className="flex gap-2 justify-between items-center bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/50 text-xs">
                          <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            Approved under IEM standard guidelines.
                          </span>
                          <a
                            href={`https://wa.me/237676222804?text=${encodeURIComponent(
                              `Hello IEM Ltd., I would like to move forward with my query ${t.id} for "${t.title}". Estimated cost: ${t.costEstimate || "Pending"}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/10 transition-colors"
                          >
                            Get Official PDF
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer Workspace Contacts */}
            <div className="p-8 border-t border-zinc-100 bg-zinc-50 text-center space-y-4">
              <p className="text-xs text-zinc-500 font-semibold">
                This client portal stores active calculations locally on your browser.
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="mailto:IEM@gmail.com"
                  className="text-xs font-black text-blue-700 uppercase tracking-widest hover:underline"
                >
                  Email Support
                </a>
                <span className="text-zinc-300">•</span>
                <a
                  href="tel:+237691005841"
                  className="text-xs font-black text-blue-700 uppercase tracking-widest hover:underline"
                >
                  Hotline Call
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
