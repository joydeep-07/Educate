import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PreLoader = () => {
  const canvasRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const fontSize = isMobile ? 40 : 80;
      const letterSpacing = isMobile ? 30 : 65;
      const text = "DEVOPS";
      const letters = text.split("");

      const positions = letters.map((_, i) => ({
        x:
          canvas.width / 2 +
          i * letterSpacing -
          (letters.length * letterSpacing) / 2,
        y: canvas.height / 2,
      }));

      let letterObjects = letters.map((letter, i) => ({
        letter,
        x: positions[i].x,
        y: positions[i].y,
        targetX: positions[i].x,
        targetY: positions[i].y,
        alpha: i === 0 ? 1 : 0,
      }));

      letterObjects.forEach((obj, i) => {
        if (i === 0) return;

        gsap.fromTo(
          obj,
          { x: letterObjects[0].x, alpha: 0 },
          {
            x: obj.targetX,
            alpha: 1,
            duration: 0.8,
            delay: 0.1 * i,
            ease: "power2.out",
          }
        );
      });

      const draw = () => {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#87CEEB"); // Sky blue
        gradient.addColorStop(1, "#FFFFFF"); // White

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        letterObjects.forEach((obj) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${obj.alpha})`;
          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obj.letter, obj.x, obj.y);
        });

        requestAnimationFrame(draw);
      };

      draw();

      gsap.to(progressBarRef.current, {
        width: "100%",
        duration: 3,
        ease: "power2.inOut",
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div
      className="flex flex-col items-center justify-center relative w-screen h-screen"
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-1/2 mt-[50px] text-md font-medium animate-pulse text-black text-center uppercase tracking-widest">
        LOADING PLEASE WAIT...
      </div>
      {/* Progress Bar */}
      <div className="absolute top-3/5 w-3/4 bg-gray-100 h-[1.5px] rounded-full max-w-sm overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-[1.5px] w-[300px] bg-gray-700 rounded-full"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

export default PreLoader;
