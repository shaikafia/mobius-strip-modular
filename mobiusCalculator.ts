import { MobiusStripData, MobiusStripParams, MobiusStripProperties, Point3D } from '../types';

// Calculate a point on the Mobius strip for given parameters
function calculateMobiusPoint(u: number, v: number, R: number): Point3D {
  return {
    x: (R + v * Math.cos(u / 2)) * Math.cos(u),
    y: (R + v * Math.cos(u / 2)) * Math.sin(u),
    z: v * Math.sin(u / 2)
  };
}

// Calculate the partial derivatives at a point
function calculatePartialDerivatives(u: number, v: number, R: number): [Point3D, Point3D] {
  // Partial derivative with respect to u
  const du: Point3D = {
    x: -(R + v * Math.cos(u / 2)) * Math.sin(u) - (v / 2) * Math.sin(u / 2) * Math.cos(u),
    y: (R + v * Math.cos(u / 2)) * Math.cos(u) - (v / 2) * Math.sin(u / 2) * Math.sin(u),
    z: (v / 2) * Math.cos(u / 2)
  };
  
  // Partial derivative with respect to v
  const dv: Point3D = {
    x: Math.cos(u / 2) * Math.cos(u),
    y: Math.cos(u / 2) * Math.sin(u),
    z: Math.sin(u / 2)
  };
  
  return [du, dv];
}

// Calculate the cross product of two vectors
function crossProduct(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

// Calculate the magnitude of a vector
function magnitude(v: Point3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

// Calculate the distance between two points
function distance(a: Point3D, b: Point3D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Calculate the surface area numerically
function calculateSurfaceArea(params: MobiusStripParams): number {
  const { radius, width, resolution } = params;
  
  const uStep = (2 * Math.PI) / resolution;
  const vStep = width / Math.max(10, Math.floor(resolution / 5));
  
  let area = 0;
  
  for (let i = 0; i < resolution; i++) {
    const u = i * uStep;
    
    for (let j = 0; j < Math.max(10, Math.floor(resolution / 5)); j++) {
      const v = ((j / Math.max(10, Math.floor(resolution / 5))) - 0.5) * width;
      
      // Calculate partial derivatives
      const [du, dv] = calculatePartialDerivatives(u, v, radius);
      
      // Cross product to get area element
      const normal = crossProduct(du, dv);
      
      // Add contribution to surface area
      area += magnitude(normal) * uStep * vStep;
    }
  }
  
  return area;
}

// Calculate the edge length numerically
function calculateEdgeLength(params: MobiusStripParams): number {
  const { radius, width, resolution } = params;
  
  const uStep = (2 * Math.PI) / resolution;
  let length = 0;
  
  // Calculate length along the edge (v = width/2)
  let prevPoint = calculateMobiusPoint(0, width / 2, radius);
  
  for (let i = 1; i <= resolution; i++) {
    const u = i * uStep;
    const currentPoint = calculateMobiusPoint(u, width / 2, radius);
    
    length += distance(prevPoint, currentPoint);
    prevPoint = currentPoint;
  }
  
  return length;
}

// Calculate Mobius strip data
export function calculateMobiusStripData(params: MobiusStripParams): MobiusStripData {
  const { radius, width, resolution } = params;
  
  // Generate points for visualization
  const uStep = (2 * Math.PI) / resolution;
  const vStep = width / Math.max(10, Math.floor(resolution / 5));
  
  const points: Point3D[][][] = [];
  
  for (let i = 0; i <= resolution; i++) {
    const u = i * uStep;
    points[i] = [];
    
    for (let j = 0; j <= Math.max(10, Math.floor(resolution / 5)); j++) {
      const v = ((j / Math.max(10, Math.floor(resolution / 5))) - 0.5) * width;
      points[i][j] = calculateMobiusPoint(u, v, radius);
    }
  }
  
  // Calculate properties
  const properties: MobiusStripProperties = {
    surfaceArea: calculateSurfaceArea(params),
    edgeLength: calculateEdgeLength(params)
  };
  
  return { points, properties };
}