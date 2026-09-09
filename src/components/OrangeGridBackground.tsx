"use client";

import { motion } from "framer-motion";

export function OrangeGridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] h-full w-full bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ea580c15_1px,transparent_1px),linear-gradient(to_bottom,#ea580c15_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      
      {/* Orange Glow Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-orange-600/30 blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-orange-500/20 blur-[150px]"
      />
    </div>
  );
}
