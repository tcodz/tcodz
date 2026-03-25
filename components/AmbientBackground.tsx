"use client";

import { useEffect, useRef } from "react";

interface AmbientLight {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  color: { h: number; s: number; l: number };
  colorSpeed: number;
  breathSpeed: number;
  breathPhase: number;
  driftX: number;
  driftY: number;
  driftAngle: number;
  driftSpeed: number;
}

interface AmbientBackgroundProps {
  lightCount?: number;
  className?: string;
}

export default function AmbientBackground({
  lightCount = 5,
  className = "",
}: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightsRef = useRef<AmbientLight[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initLights = (width: number, height: number) => {
      const lights: AmbientLight[] = [];
      const colors = [
        { h: 280, s: 50, l: 85 }, // Purple
        { h: 200, s: 60, l: 85 }, // Cyan
        { h: 340, s: 50, l: 85 }, // Pink
        { h: 160, s: 40, l: 80 }, // Teal
        { h: 30, s: 50, l: 85 },  // Orange
      ];

      for (let i = 0; i < lightCount; i++) {
        const baseColor = colors[i % colors.length];
        lights.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.min(width, height) * (0.3 + Math.random() * 0.2),
          baseRadius: Math.min(width, height) * (0.3 + Math.random() * 0.2),
          color: { ...baseColor },
          colorSpeed: 0.1 + Math.random() * 0.2,
          breathSpeed: 0.5 + Math.random() * 0.5,
          breathPhase: Math.random() * Math.PI * 2,
          driftX: 0,
          driftY: 0,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.2 + Math.random() * 0.3,
        });
      }
      lightsRef.current = lights;
    };

    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
      initLights(width, height);
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      
      const { width, height } = canvas;
      timeRef.current += 0.016;

      // Clear with light background
      ctx.fillStyle = "#f8f9fc";
      ctx.fillRect(0, 0, width, height);

      lightsRef.current.forEach((light) => {
        // Update breath effect
        const breathScale = 0.85 + 0.15 * Math.sin(timeRef.current * light.breathSpeed + light.breathPhase);
        light.radius = light.baseRadius * breathScale;

        // Update color (slow hue shift)
        light.color.h = (light.color.h + light.colorSpeed) % 360;

        // Update drift position
        light.driftAngle += 0.005;
        light.driftX = Math.cos(light.driftAngle) * light.driftSpeed * 50;
        light.driftY = Math.sin(light.driftAngle * 0.7) * light.driftSpeed * 50;

        const x = light.x + light.driftX;
        const y = light.y + light.driftY;

        // Create radial gradient for soft glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, light.radius);
        
        const alpha = 0.4 + 0.2 * Math.sin(timeRef.current * light.breathSpeed + light.breathPhase);
        const innerColor = `hsla(${light.color.h}, ${light.color.s}%, ${light.color.l}%, ${alpha})`;
        const outerColor = `hsla(${light.color.h}, ${light.color.s}%, ${light.color.l}%, 0)`;
        
        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(0.5, `hsla(${light.color.h}, ${light.color.s}%, ${light.color.l}%, ${alpha * 0.5})`);
        gradient.addColorStop(1, outerColor);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Add subtle noise texture
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillRect(x, y, 1, 1);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [lightCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}