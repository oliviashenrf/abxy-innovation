"use client";

import React from "react";
import { blocks } from "./face.content.json";
import { TextContent } from "@/components/ui/text-content";
import { FaceContentContainer } from "@/components/ui/face-content-container";
import { Icon } from "@/components/ui/icon";
import { motion } from "motion/react";
import { useInView } from "motion/react";

export default function StatsFace() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-color-2 text-white w-full border-b border-white/10">
      <FaceContentContainer className="py-16 @4xl:py-20">
        <div ref={ref}>
          {/* Section Label */}
          <div className="text-center mb-12">
            <TextContent 
              content={blocks.sectionLabel.content} 
              className="font-mono text-sm tracking-widest uppercase text-white/70" 
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-8 @4xl:gap-12">
            {blocks.stats.rows.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Icon name={stat.icon} size={24} className="text-white" />
                  </div>
                </div>
                <TextContent 
                  content={stat.value} 
                  className="font-heading text-3xl @sm:text-4xl @2xl:text-5xl font-bold mb-2" 
                />
                <TextContent 
                  content={stat.label} 
                  className="text-sm @2xl:text-base text-white/80 font-medium" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </FaceContentContainer>
    </div>
  );
}
