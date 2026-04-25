'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

/** Hero 3D scene. TODO: load Trampoline model + lights + postprocessing. */
export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 1.2, 4], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <mesh rotation={[0, 0.6, 0]}>
          <torusGeometry args={[1, 0.3, 32, 64]} />
          <meshStandardMaterial color="#FF3D7F" roughness={0.3} metalness={0.1} />
        </mesh>
      </Suspense>
    </Canvas>
  );
}
