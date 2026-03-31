"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!(canHover && !reducedMotion)) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      return;
    }

    document.body.dataset.customCursor = "enabled";

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let rafId = 0;

    const hide = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const show = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      show();
    };

    const setHoverState = (event: Event, hovering: boolean) => {
      const target = event.target as HTMLElement | null;
      const onTextInput = target?.closest("input, textarea, select, [contenteditable='true']");
      if (onTextInput) {
        hide();
        return;
      }

      if (target?.closest("a, button, [data-cursor-hover]")) {
        dot.classList.toggle("is-hovering", hovering);
        ring.classList.toggle("is-hovering", hovering);
      }
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = window.requestAnimationFrame(animate);
    };

    const handleMouseOver = (event: Event) => setHoverState(event, true);
    const handleMouseOut = (event: Event) => setHoverState(event, false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      delete document.body.dataset.customCursor;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
