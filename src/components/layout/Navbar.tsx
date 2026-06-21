import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, HardHat, ClipboardCheck } from "lucide-react";
import { Button } from "../ui/button";
import { usePortalTickets } from "../../lib/portalState";
import PortalDrawer from "./PortalDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { tickets } = usePortalTickets();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleTogglePortal = () => {
      setIsPortalOpen(true);
    };
    window.addEventListener("toggle-iem-portal", handleTogglePortal);
    return () => window.removeEventListener("toggle-iem-portal", handleTogglePortal);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Engineering", href: "/engineering" },
    { name: "Printing", href: "/printing" },
    { name: "Data", href: "/data-analysis" },
    { name: "Editing", href: "/project-editing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-200 py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 shadow-lg shadow-blue-700/20">
              <HardHat className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-zinc-900 leading-none">IEM LTD.</span>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mt-1">Infrastructure Masters</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3.5 py-2 text-sm font-semibold transition-all rounded-full hover:bg-zinc-100 ${
                    location.pathname === link.href ? "text-blue-700 bg-blue-50" : "text-zinc-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="h-6 w-px bg-zinc-200 mx-1" />
            
            <Button 
              onClick={() => setIsPortalOpen(true)}
              variant="outline"
              className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 relative flex items-center gap-2 font-bold px-5 py-2 text-xs"
            >
              <ClipboardCheck className="w-4 h-4" />
              My Portal
              {tickets.length > 0 && (
                <span className="absolute -top-2 -right-1 bg-rose-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {tickets.length}
                </span>
              )}
            </Button>

            <Button 
              onClick={() => setIsPortalOpen(true)}
              className="rounded-full bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 text-xs font-bold shadow-md shadow-blue-700/10 gap-2 group"
            >
              Consult an Expert
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsPortalOpen(true)}
              className="relative p-2 text-blue-700 hover:text-blue-800 transition-colors"
              title="Open portal"
            >
              <ClipboardCheck className="w-7 h-7" />
              {tickets.length > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {tickets.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-2xl overflow-hidden p-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold p-4 rounded-2xl transition-colors ${
                    location.pathname === link.href ? "bg-blue-50 text-blue-700" : "text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-6 border-t border-zinc-100 flex flex-col gap-3">
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    setIsPortalOpen(true);
                  }}
                  variant="outline"
                  className="w-full border-blue-200 text-blue-700 rounded-2xl py-6 text-md font-bold"
                >
                  Open Client Portal ({tickets.length} active)
                </Button>
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    setIsPortalOpen(true);
                  }}
                  className="w-full bg-blue-700 text-white rounded-2xl py-6 text-md font-bold shadow-xl shadow-blue-700/20"
                >
                  Book a Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PortalDrawer isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </nav>
  );
}
