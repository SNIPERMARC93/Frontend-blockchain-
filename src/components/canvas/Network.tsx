"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere, Line, Instance, Instances, Ring } from '@react-three/drei';

export function Network() {
  const group = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate network nodes
  const nodeCount = 150;
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [nodeCount]);

  // Generate connections based on distance
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 6) {
          lines.push([nodes[i], nodes[j]]);
        }
      }
    }
    return lines;
  }, [nodes, nodeCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.05;
      group.current.rotation.z = t * 0.02;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.02;
    }
  });

  return (
    <>
      <group ref={group}>
        {/* Nodes */}
        <Instances limit={nodeCount} range={nodeCount}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          {nodes.map((pos, i) => (
            <Instance key={i} position={pos} />
          ))}
        </Instances>

        {/* Lines */}
        {connections.map((c, i) => (
          <Line
            key={i}
            points={c}
            color="#ffffff"
            transparent
            opacity={0.15}
            lineWidth={0.5}
          />
        ))}

        {/* Verification Rings around central nodes */}
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

      {/* Floating data particles (Background) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 80), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#88aa88" transparent opacity={0.4} sizeAttenuation />
      </points>
    </>
  );
}
