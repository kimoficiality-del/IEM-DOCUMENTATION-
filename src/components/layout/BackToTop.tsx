import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          type="button"
          className="fixed bottom-28 right-10 z-50 bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-2xl shadow-blue-700/30 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
          <span className="absolute right-full mr-4 bg-white text-zinc-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-100 pointer-events-none">
            Back to Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
