import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { MobiusStripParams } from '../types';
import { generateMobiusGeometry } from '../utils/mobiusGeometry';

interface MobiusVisualizationProps {
  params: MobiusStripParams;
}

const MobiusStrip: React.FC<{ params: MobiusStripParams }> = ({ params }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  
  // Generate geometry based on parameters
  useEffect(() => {
    if (meshRef.current) {
      // Clean up old geometry
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
      
      // Generate new geometry
      geometryRef.current = generateMobiusGeometry(params);
      meshRef.current.geometry = geometryRef.current;
    }
  }, [params]);
  
  // Subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <meshStandardMaterial 
        color="#2ec27e" 
        wireframe={false} 
        side={2} // DoubleSide
        flatShading={true}
      />
    </mesh>
  );
};

const MobiusVisualization: React.FC<MobiusVisualizationProps> = ({ params }) => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <MobiusStrip params={params} />
        
        <OrbitControls 
          enableDamping={true}
          dampingFactor={0.05}
        />
        
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport labelColor="white" axisColors={['#f73a3a', '#7dfa4e', '#4e7dfa']} />
        </GizmoHelper>
        
        <gridHelper args={[20, 20, '#444444', '#222222']} />
      </Canvas>
    </div>
  );
};

export default MobiusVisualization;