"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { Network } from "@/components/canvas/Network";
import { PortalOverlay } from "@/components/canvas/PortalOverlay";

// Import existing login components from the previous page
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { BorderBeam } from "@/components/ui/border-beam";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        },
      });

      // 1. Scale up the typography portal to pass through it
      tl.to(
        ".text-group",
        {
          scale: 40,
          transformOrigin: "50% 50%",
          ease: "power2.inOut",
        },
        0
      );

      // 1.5 Move camera forward into the network
      tl.to(
        cameraProxy,
        {
          z: 2, // Move close to center
          y: -2,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Fade in the actual application content
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.6 // Starts fading in towards the end of the text scale
      );
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const { login, isLoading, session } = useAuth();

  if (isLoading || session?.user) {
    return <main className="bg-[#020617] h-screen w-full" />;
  }

  return (
    <main className="relative bg-[#020617] text-white">
      {/* Pinned Section for the 3D Portal Transition */}
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <color attach="background" args={["#020617"]} />
            <ambientLight intensity={0.5} />
            <Network />
            <Environment preset="city" />
            <CameraAnimator />
          </Canvas>
        </div>

        {/* SVG Typography Mask Overlay */}
        <PortalOverlay ref={portalRef} text1="IDENTITY" text2="ORGANISATION" text3="NETWORK" />

        {/* Top Minimal Navigation */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 pointer-events-none mix-blend-difference">
          <div className="text-sm font-bold tracking-widest">NEXUS ID</div>
          <div className="flex gap-6 text-sm tracking-widest">
            <span>LOGIN</span>
            <span>MENU</span>
          </div>
        </div>

        {/* The Application Content that appears after passing through the portal */}
        <div 
          ref={contentRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto opacity-0"
        >
          <Card className="relative overflow-hidden bg-slate-900/60 backdrop-blur-2xl border-white/10 shadow-2xl text-white w-full max-w-md p-4">
            <BorderBeam size={250} duration={12} colorFrom="#4ade80" colorTo="#2dd4bf" delay={0} />
            <CardHeader className="space-y-3 pb-6 text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center p-3 mb-2"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-400 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
                </svg>
              </motion.div>
              <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                Access Network
              </CardTitle>
              <CardDescription className="text-slate-300">
                Authenticate to enter the nexus.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full h-12 bg-white/5 hover:bg-white/10 border-white/20 text-white flex items-center gap-3 transition-colors duration-300"
                onClick={() => login({ id: "g1", name: "Google User", email: "user@gmail.com" })}
              >
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 bg-white/5 hover:bg-white/10 border-white/20 text-white flex items-center gap-3 transition-colors duration-300"
                onClick={() => login({ id: "m1", name: "MetaMask User", email: "0x123...abc" })}
              >
                Connect MetaMask
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-4">
              <div className="flex justify-between w-full text-xs text-slate-400">
                <span>Status: <span className="text-amber-400">Unauthenticated</span></span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-[3000px] w-full" />
    </main>
  );
}

const cameraProxy = { z: 15, y: 0 };

function CameraAnimator() {
  useFrame((state: any) => {
    state.camera.position.z = cameraProxy.z;
    state.camera.position.y = cameraProxy.y;
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
}
