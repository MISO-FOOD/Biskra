import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function FloatingTelegram() {
  return (
    <motion.a
      href="https://t.me/+213793149538"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="telegram-fab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 20 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 left-4 z-50"
      style={{ width: 52, height: 52 }}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="w-full h-full rounded-full bg-[#229ED9] shadow-[0_4px_20px_rgba(34,158,217,0.45)] flex items-center justify-center"
      >
        <Send size={22} className="text-white -rotate-12" strokeWidth={2.5} />
      </motion.div>
    </motion.a>
  );
}
