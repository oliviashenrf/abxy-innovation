"use client";

import React, { useRef } from "react";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { TextContent } from "@/components/ui/text-content";
import { FaceContentContainer } from "@/components/ui/face-content-container";
import { Icon } from "@/components/ui/icon";
import { motion, useInView } from "motion/react";

export default function ProductsFace() {
  const layout = controls.layout?.value ?? "Grid";
  const isGrid = layout === "Grid";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-color-7/30 w-full border-b border-color-5" ref={ref}>
      <FaceContentContainer className="py-20 @4xl:py-32">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <TextContent 
            content={blocks.sectionLabel.content} 
            className="font-mono text-sm tracking-widest uppercase text-color-3 mb-4" 
          />
          <TextContent 
            content={blocks.sectionTitle.content} 
            className="font-heading text-5xl @2xl:text-6xl font-bold mb-6" 
          />
          <TextContent 
            content={blocks.sectionDesc.content} 
            className="text-lg text-color-4" 
          />
        </motion.div>

        {/* Products */}
        <div className={`${isGrid ? "grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8" : "space-y-6 max-w-4xl mx-auto"}`}>
          {blocks.products.rows.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }} 
              key={product.id}
              className="group bg-white border border-color-5 rounded-lg overflow-hidden hover:shadow-lg hover:border-color-2/30 transition-all duration-300"
            >
              {/* Product Info */}
              <div className="p-8 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-color-2/10 rounded-lg group-hover:bg-color-2 group-hover:text-white transition-colors">
                    <Icon name={product.icon} size={24} />
                  </div>
                  <div className="bg-color-6/50 px-3 py-1 rounded-full border border-color-5">
                    <TextContent 
                      content={product.status} 
                      className="text-xs font-mono uppercase text-color-3"
                    />
                  </div>
                </div>

                <TextContent 
                  content={product.name} 
                  className="font-heading text-2xl font-bold mb-2" 
                />
                <TextContent 
                  content={product.tagline} 
                  className="text-sm text-color-4 font-mono uppercase tracking-wide mb-6" 
                />

                <TextContent 
                  content={product.description} 
                  className="text-color-4 leading-relaxed mb-6 flex-1" 
                />

                <div className="pt-4 border-t border-color-5">
                  <button className="group/btn inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wide text-color-2 hover:gap-4 transition-all">
                    Learn More
                    <Icon name="arrow-right" size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FaceContentContainer>
    </div>
  );
}
