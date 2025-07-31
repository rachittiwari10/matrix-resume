import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const handleKeyPress = () => {
      setShowIntro(true);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("touchstart", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("touchstart", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const canvas = document.getElementById("matrixCanvas");
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;

      const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops = Array(Math.floor(columns)).fill(1);

      const draw = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      setInterval(draw, 33);
    }
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <canvas id="matrixCanvas" className="absolute top-0 left-0 w-full h-full z-0" />

      {!showIntro && (
        <motion.div
          className="z-10 relative flex flex-col items-center justify-center h-full text-green-500 font-mono text-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.p
            className="text-md sm:text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            _ Initializing...
          </motion.p>
          <motion.h1
            className="text-2xl sm:text-5xl font-bold tracking-wide mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            WELCOME TO THE MATRIX OF
          </motion.h1>
          <motion.h2
            className="text-xl sm:text-4xl font-extrabold mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            RACHIT TIWARI
          </motion.h2>
          <motion.p
            className="text-sm sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ░░░ PRESS ANY KEY TO DECRYPT RÉSUMÉ ░░░
          </motion.p>
        </motion.div>
      )}

      {showIntro && (
        <motion.div
          className="z-10 relative flex items-center justify-center h-full bg-black text-green-400 text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.05 }}
            transition={{ yoyo: Infinity, duration: 0.8 }}
          >
            Decrypting Résumé...
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
