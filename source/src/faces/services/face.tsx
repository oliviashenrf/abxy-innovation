"use client";

import React, { useState, useRef } from "react";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { TextContent } from "@/components/ui/text-content";
import { FaceContentContainer } from "@/components/ui/face-content-container";
import { Icon } from "@/components/ui/icon";
import { motion, useInView } from "motion/react";

export default function ServicesFace() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-white w-full border-b border-color-5" ref={ref}>
      <FaceContentContainer className="px-0">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="p-8 @4xl:p-16 border-b border-color-5"
        >
          <TextContent content={blocks.coreLabel.content} className="font-mono text-sm tracking-widest uppercase text-color-3 mb-4" />
          <TextContent content={blocks.sectionTitle.content} className="font-heading text-4xl @2xl:text-5xl font-bold mb-6" />
          <TextContent content={blocks.sectionDesc.content} className="text-color-4 text-lg max-w-2xl" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 @2xl:grid-cols-2">
          {blocks.services.rows.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }} 
              key={service.id}
              className={`
                group relative p-8 @4xl:p-12 border-b @2xl:border-b-0 border-color-5 transition-all duration-500
                ${index % 2 === 0 ? "@2xl:border-r" : ""}
                ${index < 2 ? "@2xl:border-b" : ""}
                hover:bg-gradient-to-br hover:from-color-7/30 hover:to-color-7/10
                hover:shadow-lg
              `}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-color-6 rounded-lg group-hover:bg-color-2 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon name={service.icon} size={24} />
                </div>
                <span className="font-mono text-xs text-color-4 group-hover:text-color-2 transition-colors">0{index + 1}</span>
              </div>

              <h3 className="mb-4">
                <TextContent content={service.title} className="font-heading text-2xl font-bold" />
              </h3>
              
              <TextContent 
                content={service.description} 
                className="text-color-4 leading-relaxed mb-8 min-h-[3rem]" 
              />

              <div className="space-y-2">
                 <div className="h-px w-full bg-color-5 group-hover:bg-color-2/20 transition-colors" />
                 <div className="pt-4 flex flex-wrap gap-2">
                   {/* We simulate tags since nested tables aren't standard in this schema yet, 
                       or we can use a comma separated string handled by the user */}
                   {service.tags.split(',').map((tag, i) => (
                     <span key={i} className="text-xs font-mono uppercase text-color-4 bg-color-7 px-2 py-1 rounded-sm">
                       {tag.trim()}
                     </span>
                   ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FaceContentContainer>
    </div>
  );
}