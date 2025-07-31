
import { useEffect, useState } from "react";

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

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Matrix Code Rain Background */}
      <canvas id="matrixCanvas" className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Central Text */}
      {!showIntro && (
        <div className="z-10 relative flex flex-col items-center justify-center h-full text-green-500 font-mono text-center p-4">
          <p className="text-md sm:text-xl mb-2 animate-pulse">_ Initializing...</p>
          <h1 className="text-2xl sm:text-5xl font-bold tracking-wide mb-4">
            WELCOME TO THE MATRIX OF
          </h1>
          <h2 className="text-xl sm:text-4xl font-extrabold mb-6">
            RACHIT TIWARI
          </h2>
          <p className="text-sm sm:text-lg animate-pulse">
            ░░░ PRESS ANY KEY TO DECRYPT RÉSUMÉ ░░░
          </p>
        </div>
      )}

      {/* Next Screen Placeholder */}
      {showIntro && (
        <div className="z-10 relative flex items-center justify-center h-full bg-black text-green-400 text-2xl animate-fade-in">
          <p>Decrypting Résumé...</p>
        </div>
      )}
    </div>
  );
}

// Matrix Canvas Animation (you can put this in useEffect or external JS)
if (typeof window !== "undefined") {
  window.onload = () => {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

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
  };
}
