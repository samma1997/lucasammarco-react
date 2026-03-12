"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const circle = circleRef.current;
    const dot = dotRef.current;
    if (!circle || !dot) return;

    const xTo = gsap.quickTo(circle, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(circle, "y", { duration: 0.5, ease: "power3.out" });
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        ref={circleRef}
        className="custom-cursor hidden lg:block"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot hidden lg:block"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
