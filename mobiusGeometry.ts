import * as THREE from 'three';
import { MobiusStripParams } from '../types';

export function generateMobiusGeometry(params: MobiusStripParams): THREE.BufferGeometry {
  const { radius, width, resolution } = params;
  
  // Create a buffer geometry
  const geometry = new THREE.BufferGeometry();
  
  // Calculate vertices and faces
  const vertices: number[] = [];
  const indices: number[] = [];
  const colors: number[] = [];
  
  // Number of points around the strip (u parameter) and across the width (v parameter)
  const uSegments = resolution;
  const vSegments = Math.max(10, Math.floor(resolution / 5));
  
  // Create vertices
  for (let i = 0; i <= uSegments; i++) {
    const u = (i / uSegments) * Math.PI * 2;
    
    for (let j = 0; j <= vSegments; j++) {
      const v = ((j / vSegments) - 0.5) * width;
      
      // Parametric equations for Mobius strip
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      
      // Add vertex
      vertices.push(x, y, z);
      
      // Add color (gradient based on position)
      const colorFactor = Math.abs(v) / (width / 2);
      colors.push(0.2 + 0.3 * colorFactor, 0.8 - 0.2 * colorFactor, 0.6 + 0.2 * colorFactor);
    }
  }
  
  // Create faces (triangles)
  for (let i = 0; i < uSegments; i++) {
    for (let j = 0; j < vSegments; j++) {
      const a = i * (vSegments + 1) + j;
      const b = a + 1;
      const c = a + (vSegments + 1);
      const d = c + 1;
      
      // Create two triangles for each grid cell
      indices.push(a, b, d);
      indices.push(a, d, c);
    }
  }
  
  // Set geometry attributes
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  
  // Compute vertex normals
  geometry.computeVertexNormals();
  
  return geometry;
}