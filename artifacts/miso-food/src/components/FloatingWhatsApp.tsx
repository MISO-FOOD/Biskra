import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/213793149538"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-fab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 20 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 left-4 z-50 w-13 h-13 flex items-center justify-center"
      style={{ width: 52, height: 52 }}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="w-full h-full rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] flex items-center justify-center"
      >
        <MessageCircle size={24} className="text-white" fill="white" />
      </motion.div>
    </motion.a>
  );
}
