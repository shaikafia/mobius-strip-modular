import React from 'react';
import { MobiusStripProperties } from '../types';

interface PropertiesDisplayProps {
  properties: MobiusStripProperties;
}

const PropertiesDisplay: React.FC<PropertiesDisplayProps> = ({ properties }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <span className="mr-2 inline-block w-3 h-3 bg-purple-500 rounded-full"></span>
        Geometric Properties
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Surface Area</h3>
          <p className="text-2xl font-bold">{properties.surfaceArea.toFixed(4)} units²</p>
          <p className="text-xs text-gray-500 mt-1">
            Numerically computed using parametric integration
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400">Edge Length</h3>
          <p className="text-2xl font-bold">{properties.edgeLength.toFixed(4)} units</p>
          <p className="text-xs text-gray-500 mt-1">
            Computed along the boundary of the strip
          </p>
        </div>
        
        <div className="pt-2 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            The Mobius strip is a non-orientable surface with only one side and one edge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertiesDisplay;