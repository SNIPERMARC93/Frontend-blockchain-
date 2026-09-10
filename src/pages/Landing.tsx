import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line, Instance, Instances, Ring } from '@react-three/drei'

import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import * as THREE from 'three'

import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

// ─── Camera Proxy ──────────────────────────────────────────────────────────────
const cameraProxy = { z: 15, y: 0 }

// ─── 3D Network Scene ──────────────────────────────────────────────────────────
function Network() {
  const group = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const nodeCount = 150

  const nodes = useMemo(() => {
    const temp = []
    for (let i = 0; i < nodeCount; i++) {
      temp.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
        ),
      )
    }
    return temp
  }, [])

  const connections = useMemo(() => {
    const lines = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 6) {
          lines.push([nodes[i], nodes[j]])
        }
      }
    }
    return lines
  }, [nodes])

  const particlePositions = useMemo(
    () => new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 80),
    [],
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.05
      group.current.rotation.z = t * 0.02
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.02
    }
  })

  return (
    <>
      <group ref={group}>
        <Instances limit={nodeCount} range={nodeCount}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          {nodes.map((pos, i) => (
            <Instance key={i} position={pos} />
          ))}
        </Instances>

        {connections.map((c, i) => (
          <Line
            key={i}
            points={c as THREE.Vector3[]}
            color="#ffffff"
            transparent
            opacity={0.15}
            lineWidth={0.5}
          />
        ))}

        <Ring args={[2, 2.05, 64]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#4ade80" transparent opacity={0.4} side={THREE.DoubleSide} />
        </Ring>
        <Ring args={[3, 3.02, 64]} position={[0, 0, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} />
        </Ring>
        <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </Sphere>
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#88aa88" transparent opacity={0.4} sizeAttenuation />
      </points>
    </>
  )
}

// ─── Camera Animator (R3F component) ────────────────────────────────────────────
function CameraAnimator() {
  useFrame((state) => {
    state.camera.position.z = cameraProxy.z
    state.camera.position.y = cameraProxy.y
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

// ─── Portal Overlay ──────────────────────────────────────────────────────────────
function PortalOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 h-full w-full">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Identity, Organisation, Network">
        <defs>
          <g id="portalWords">
            {['IDENTITY', 'ORGANISATION', 'NETWORK'].map((word, index) => (
              <text
                key={word}
                x="50%"
                y={`${35 + index * 15}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12vw"
                fontWeight="800"
                letterSpacing="-0.02em"
              >
                {word}
              </text>
            ))}
          </g>
          <mask id="textMask">
            <rect width="100%" height="100%" fill="white" />
            <use href="#portalWords" className="text-group" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#020617" mask="url(#textMask)" />
        {/* The scene and mask share a dark background, so the cutouts need visible lettering. */}
        <use href="#portalWords" className="text-group portal-lettering" fill="white" opacity={0.9} />
      </svg>
    </div>
  )
}

// ─── App Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    let animationFrame = 0
    function raf(time: number) {
      lenis.raf(time)
      animationFrame = requestAnimationFrame(raf)
    }
    animationFrame = requestAnimationFrame(raf)

    // GSAP Portal transition
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 1,
          pin: true,
        },
      })

      // Scale up the SVG text mask so letters "expand" into a portal
      tl.to('.text-group', { scale: 40, transformOrigin: '50% 50%', ease: 'power2.inOut' }, 0)
      tl.to('.portal-lettering', { opacity: 0, duration: 0.35, ease: 'power2.in' }, 0)

      // Push camera forward into the 3D network simultaneously
      tl.to(cameraProxy, { z: 2, y: -2, ease: 'power2.inOut' }, 0)

      // Reveal the login content directly over the circle after the portal opens.
      tl.fromTo(contentRef.current, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, ease: 'power2.out' }, 0.6)
    }, containerRef)

    return () => {
      cancelAnimationFrame(animationFrame)
      lenis.destroy()
      ctx.revert()
    }
  }, [])

  return (
    <main className="relative bg-[#020617] text-white">
      {/* ── Pinned 3D Portal Section ── */}
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden">

        {/* Layer 1 + 2: Three.js Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <color attach="background" args={['#020617']} />
            <ambientLight intensity={0.5} />
            <Network />
            {/* Unlit materials need no external environment map. */}
            <CameraAnimator />
          </Canvas>
        </div>

        {/* Layer 3: SVG Typography Mask Portal */}
        <PortalOverlay />

        {/* Top minimal navigation */}
        <nav
          className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 pointer-events-none mix-blend-difference"
          aria-label="Main navigation"
        >
          <span className="text-sm font-bold tracking-widest">NEXUS ID</span>
          <div className="flex gap-6 text-sm tracking-widest">
            <button onClick={() => navigate('/login')} className="pointer-events-auto hover:opacity-70 transition-opacity">LOGIN</button>
            <button onClick={() => navigate('/dashboard')} className="pointer-events-auto hover:opacity-70 transition-opacity">MENU</button>
          </div>
        </nav>

        {/* Layer 4: App content revealed after portal */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0"
        >
          <div className="relative text-slate-900 w-full max-w-md mx-4 p-8 pointer-events-auto">

            <div className="text-center space-y-3 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome Back
              </h1>
              <p className="text-slate-700 text-sm">
                Connect your wallet or use Google to continue
              </p>
            </div>

            <div className="space-y-4">
              {/* MetaMask */}
              <motion.button
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 bg-[#F6851B]/10 hover:bg-[#F6851B]/20 border border-[#F6851B]/50 text-slate-900 flex items-center justify-center gap-3 rounded-lg transition-colors duration-300 font-medium"
              >
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M29.505 1.547L16.29 11.233L2.616 1.705L1.082 11.393L12.44 19.349L3.082 25.101L15.908 30.297L28.847 24.896L19.467 19.31L31.023 11.164L29.505 1.547Z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Continue with MetaMask
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-900/15" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-slate-600">Or</span>
                </div>
              </div>

              {/* Google */}
              <motion.button
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 bg-white/5 hover:bg-white/10 border border-slate-900/25 text-slate-900 flex items-center justify-center gap-3 rounded-lg transition-colors duration-300 font-medium"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </motion.button>
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">
              By connecting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Spacer to allow GSAP scroll trigger to work */}
      <div className="h-[3000px] w-full" />
    </main>
  )
}
