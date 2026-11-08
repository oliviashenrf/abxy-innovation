"use client";

import React, { useRef } from "react";
import { blocks } from "./face.content.json";
import { TextContent } from "@/components/ui/text-content";
import { FaceContentContainer } from "@/components/ui/face-content-container";
import { Icon } from "@/components/ui/icon";
import { motion, useInView } from "motion/react";

export default function CaseStudiesFace() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-white w-full border-b border-color-5" ref={ref}>
      <FaceContentContainer className="py-20 @4xl:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-12 @4xl:mb-16"
        >
          <TextContent content={blocks.sectionLabel.content} className="font-mono text-sm tracking-widest uppercase text-color-3 mb-4" />
          <TextContent content={blocks.sectionTitle.content} className="font-heading text-4xl @2xl:text-5xl font-bold mb-6" />
          <TextContent content={blocks.sectionDesc.content} className="text-color-4 text-lg max-w-2xl" />
        </motion.div>

        <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-6 @4xl:gap-8 max-w-6xl mx-auto">
          {blocks.cases.rows.map((c, index) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
              className="flex flex-col bg-white border border-color-5 rounded-lg p-6 @2xl:p-8 hover:shadow-lg hover:border-color-2/30 transition-all duration-300"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-color-3 mb-6">{c.sector}</div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-heading text-4xl font-bold text-color-2 leading-none">{c.metric}</span>
                <span className="text-sm text-color-4">{c.metricLabel}</span>
              </div>

              <h3 className="font-heading text-xl @2xl:text-2xl font-bold mb-3 leading-snug">{c.title}</h3>
              <p className="text-color-4 leading-relaxed mb-6">{c.challenge}</p>

              <div className="font-mono text-xs uppercase tracking-widest text-color-1 mb-3">What we did</div>
              <ul className="space-y-2 mb-6">
                {c.work.map((w, i) => (
                  <li key={i} className="flex gap-3 text-sm text-color-4 leading-relaxed">
                    <Icon name="check" size={16} className="text-color-2 mt-0.5 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-lg bg-color-7 border border-color-6 p-4 mb-6">
                <div className="font-mono text-xs uppercase tracking-widest text-color-1 mb-2">Outcome</div>
                <p className="text-sm text-color-1 leading-relaxed">{c.outcome}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {c.tags.split(",").map((t, i) => (
                  <span key={i} className="text-xs font-mono uppercase text-color-4 bg-color-7 px-2 py-1 rounded-sm">{t.trim()}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </FaceContentContainer>
    </div>
  );
}
