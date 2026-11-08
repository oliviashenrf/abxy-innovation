"use client";

import React, { useRef } from "react";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { TextContent } from "@/components/ui/text-content";
import { FaceContentContainer } from "@/components/ui/face-content-container";
import { Icon } from "@/components/ui/icon";
import { motion, useInView } from "motion/react";

export default function HeroFace() {
  const showGrid = controls.showGrid?.value ?? true;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-white w-full border-b border-color-5 overflow-hidden" ref={ref}>
      <FaceContentContainer className="min-h-[75vh] flex flex-col px-0">
        {/* Header Strip */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className={`flex justify-between items-center gap-6 px-4 @4xl:px-8 py-4 border-b border-color-5 ${showGrid ? "bg-color-7/10" : ""}`}
        >
          <div className="flex items-center">
            <img 
              src={blocks.brandLogo.src} 
              alt="ABXY Innovation Logo - AI and Technology Solutions" 
              className="h-8 @2xl:h-9 w-auto"
              loading="eager"
            />
          </div>
          <nav aria-label="Primary" className="flex items-center gap-6">
            {[
              { id: "services", label: "Services" },
              { id: "products", label: "MVP" },
              { id: "scaler", label: "Growth Model" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  const t = document.querySelector(`[data-face-id="${item.id}"]`);
                  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
                }}
                className="hidden @2xl:inline font-mono text-xs tracking-widest uppercase text-color-4 hover:text-color-2 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                const t = document.querySelector('[data-face-id="contact"]');
                if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
              }}
              className="font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg border border-color-2 text-color-2 hover:bg-color-2 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 @4xl:grid-cols-12">
          
          {/* Left: Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="@4xl:col-span-7 p-8 @4xl:p-16 flex flex-col justify-center border-b @4xl:border-b-0 @4xl:border-r border-color-5 relative bg-color-7/5"
          >
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
                   style={{ backgroundImage: "linear-gradient(var(--color-5) 1px, transparent 1px), linear-gradient(90deg, var(--color-5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
              />
            )}
            
            <TextContent 
              content={blocks.pretitle.content} 
              className="font-mono text-sm tracking-widest uppercase text-color-3 mb-8" 
            />
            
            <h1 className="mb-8">
              <TextContent 
                as="span"
                content={blocks.titleLine1.content} 
                className="block font-heading text-5xl @sm:text-6xl @2xl:text-8xl @5xl:text-9xl font-bold leading-[0.85] tracking-tighter text-color-1" 
              />
              <TextContent 
                as="span"
                content={blocks.titleLine2.content} 
                className="block font-heading text-5xl @sm:text-6xl @2xl:text-8xl @5xl:text-9xl font-bold leading-[0.85] tracking-tighter text-color-2" 
              />
            </h1>

            <TextContent 
              content={blocks.description.content} 
              className="text-lg @2xl:text-xl text-color-4 max-w-lg leading-relaxed border-l-2 border-color-3 pl-6" 
            />
            
            <div className="mt-12 flex flex-wrap gap-3">
               {blocks.badges.rows.map((badge, i) => (
                 <span key={i} className="inline-flex items-center px-3 py-1 border border-color-5 rounded-full text-xs font-mono uppercase tracking-wider text-color-4">
                   {badge.text}
                 </span>
               ))}
            </div>
            
            {/* CTA Button */}
            <div className="mt-8">
              <a 
                href="#services"
                onClick={(e) => {
                  const target = document.querySelector('[data-face-id="services"]');
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-color-2 text-white font-mono text-sm uppercase tracking-wider rounded-lg hover:bg-color-2/90 transition-all hover:gap-3 group"
              >
                <TextContent content={blocks.ctaButton.content} />
                <Icon name="arrow-down" size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right: Abstract Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="@4xl:col-span-5 relative min-h-[400px] bg-white"
          >
             <img 
               src={blocks.heroImage.src} 
               alt="ABXY Innovation - AI and intelligent systems design visualization" 
               className="absolute inset-0 w-full h-full object-cover"
               loading="eager"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
             
             {/* Overlay Text */}
             <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-sm border border-color-5 rounded-sm shadow-sm">
                <TextContent content={blocks.imageCaption.content} className="font-mono text-xs leading-relaxed text-color-4" />
             </div>
          </motion.div>
        </div>
      </FaceContentContainer>
    </div>
  );
}
