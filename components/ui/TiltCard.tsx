 "use client";

 import type { HTMLAttributes, ReactNode, MouseEvent } from "react";
 import { useEffect, useState, useRef } from "react";

 interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
   children: ReactNode;
   maxTilt?: number;
   scale?: number;
 }

 export function TiltCard({
   children,
   className = "",
   maxTilt = 16,
   scale = 1.03,
   ...rest
 }: TiltCardProps) {
   const cardRef = useRef<HTMLDivElement | null>(null);
   const [style, setStyle] = useState<React.CSSProperties>({
     transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
   });
   const [reduceMotion, setReduceMotion] = useState(false);

   useEffect(() => {
     if (typeof window === "undefined") return;

     const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

     setReduceMotion(mediaQuery.matches);

     const handler = (event: MediaQueryListEvent) => {
       setReduceMotion(event.matches);
     };

     mediaQuery.addEventListener("change", handler);
     return () => {
       mediaQuery.removeEventListener("change", handler);
     };
   }, []);

   const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
     if (reduceMotion) return;
     const card = cardRef.current;
     if (!card) return;

     const rect = card.getBoundingClientRect();
     const x = event.clientX - rect.left;
     const y = event.clientY - rect.top;

     const percentX = x / rect.width - 0.5;
     const percentY = y / rect.height - 0.5;

     const rotateX = (-percentY * maxTilt).toFixed(2);
     const rotateY = (percentX * maxTilt).toFixed(2);

     setStyle({
       transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
     });
   };

   const handleMouseLeave = () => {
     if (reduceMotion) return;
     setStyle({
       transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
     });
   };

   return (
     <div
       ref={cardRef}
       className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
       style={style}
       onMouseMove={handleMouseMove}
       onMouseLeave={handleMouseLeave}
       {...rest}
     >
       {children}
     </div>
   );
 }

