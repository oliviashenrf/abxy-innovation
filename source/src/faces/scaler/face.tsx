import React, { useState, useEffect, useRef } from "react";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { TextContent } from "@/components/ui/text-content";
import { FaceContentContainer } from "@/components/ui/face-content-container";
import { Icon } from "@/components/ui/icon";
import { motion, useInView } from "motion/react";

// Interactive Network/Growth Visualization Component
const GrowthVisualizer = ({ stage }: { stage: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speed = (controls.animationSpeed?.value ?? 10) / 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Scale canvas for retina
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Nodes logic
    const baseNodes = 5;
    const maxNodes = 50;
    const nodeCount = baseNodes + Math.floor((stage / 100) * (maxNodes - baseNodes));
    
    const nodes: {x: number, y: number, vx: number, vy: number, r: number}[] = [];
    
    // Create nodes based on stage
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * (0.5 + stage/50) * speed, // Faster at higher stages
        vy: (Math.random() - 0.5) * (0.5 + stage/50) * speed,
        r: Math.random() * 2 + 1 + (stage/50) // Larger at higher stages
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw connections
      ctx.strokeStyle = "rgba(0,0,0,0.1)"; // Theme adaptive ideally, hardcoded for B&W
      const connectDistance = 100 + (stage); // Connect further at higher stages

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce
        if (node.x < 0 || node.x > rect.width) node.vx *= -1;
        if (node.y < 0 || node.y > rect.height) node.vy *= -1;

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = "#000"; // Foreground
        ctx.fill();

        // Connect
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0,0,0,${1 - dist / connectDistance})`;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [stage]);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ width: '100%', height: '100%' }} />;
};

export default function ScalerFace() {
  const [stage, setStage] = useState(20); // 0 to 100
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Determine label based on stage
  const getStageLabel = (val: number) => {
    if (val < 25) return blocks.stage1.content;
    if (val < 50) return blocks.stage2.content;
    if (val < 75) return blocks.stage3.content;
    return blocks.stage4.content;
  };
  
  const getStageDesc = (val: number) => {
    if (val < 25) return blocks.desc1.content;
    if (val < 50) return blocks.desc2.content;
    if (val < 75) return blocks.desc3.content;
    return blocks.desc4.content;
  };

  return (
    <div className="bg-white w-full border-b border-color-5" ref={ref}>
      <FaceContentContainer className="min-h-[700px] grid grid-cols-1 @4xl:grid-cols-12 px-0">
        
        {/* Left Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7 }}
          className="@4xl:col-span-5 p-8 @4xl:p-16 border-b @4xl:border-b-0 @4xl:border-r border-color-5 flex flex-col justify-center bg-color-7/5"
        >
          <TextContent content={blocks.title.content} className="font-mono text-sm tracking-widest uppercase text-color-3 mb-6" />
          <h2 className="mb-8">
            <TextContent content={blocks.heading.content} className="font-heading text-4xl @2xl:text-5xl font-bold leading-tight" />
          </h2>

          <div className="my-12">
             <div className="flex justify-between items-center mb-4">
                <TextContent content={blocks.stageLabel.content} className="font-mono text-xs uppercase text-color-4" />
                <span className="font-mono text-xl font-bold">{Math.round(stage)}%</span>
             </div>
             
             <input
                type="range"
                min="0"
                max="100"
                value={stage}
                onChange={(e) => setStage(Number(e.target.value))}
                className="w-full h-2 bg-color-6 rounded-full appearance-none cursor-pointer accent-color-1"
             />
             <div className="flex justify-between mt-2 text-[10px] font-mono text-color-4 uppercase">
               <TextContent content={blocks.ideaLabel.content} />
               <TextContent content={blocks.ipoLabel.content} />
             </div>
          </div>

          <div className="bg-white p-6 border border-color-5 rounded-lg shadow-sm transition-all duration-300">
             <TextContent content={blocks.focusLabel.content} className="text-xs font-mono uppercase text-color-3 mb-2" />
             <TextContent content={getStageLabel(stage)} className="text-2xl font-bold mb-2" />
             <TextContent content={getStageDesc(stage)} className="text-color-4 text-sm leading-relaxed" />
          </div>
        </motion.div>

        {/* Right Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="@4xl:col-span-7 relative bg-color-6/10 overflow-hidden min-h-[400px]"
        >
           <div className="absolute top-4 right-4 z-10">
              <div className="font-mono text-[10px] uppercase text-color-4 bg-white/50 px-2 py-1 rounded border border-color-5 flex gap-1">
                <TextContent content={blocks.densityLabel.content} /> {Math.floor(stage * 1.5)} <TextContent content={blocks.nodesLabel.content} />
              </div>
           </div>
           <GrowthVisualizer stage={stage} />
           
           {/* Overlay Stats */}
           <div className="absolute bottom-0 left-0 w-full p-8 grid grid-cols-3 gap-4 border-t border-color-5 bg-white/80 backdrop-blur-sm">
              <div>
                <TextContent content={blocks.riskLabel.content} className="text-[10px] font-mono uppercase text-color-4 mb-1" />
                <div className="text-xl font-bold">{Math.max(10, 100 - stage)}%</div>
              </div>
              <div>
                <TextContent content={blocks.velocityLabel.content} className="text-[10px] font-mono uppercase text-color-4 mb-1" />
                <div className="text-xl font-bold">{Math.floor(stage / 10 + 1)}x</div>
              </div>
              <div>
                <TextContent content={blocks.teamLabel.content} className="text-[10px] font-mono uppercase text-color-4 mb-1" />
                <div className="text-xl font-bold">{Math.floor(2 + (stage/100) * 50)}</div>
              </div>
           </div>
        </motion.div>

      </FaceContentContainer>
    </div>
  );
}