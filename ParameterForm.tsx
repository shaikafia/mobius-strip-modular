import React from 'react';
import { MobiusStripParams } from '../types';

interface ParameterFormProps {
  params: MobiusStripParams;
  onChange: (params: MobiusStripParams) => void;
}

const ParameterForm: React.FC<ParameterFormProps> = ({ params, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    // Ensure resolution is an integer
    const processedValue = name === 'resolution' 
      ? Math.max(10, Math.round(numValue)) 
      : numValue;
    
    onChange({
      ...params,
      [name]: processedValue,
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <span className="mr-2 inline-block w-3 h-3 bg-teal-400 rounded-full"></span>
        Parameters
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Radius (R)
          </label>
          <div className="flex items-center">
            <input
              type="range"
              name="radius"
              min="0.5"
              max="5"
              step="0.1"
              value={params.radius}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              name="radius"
              min="0.5"
              max="5"
              step="0.1"
              value={params.radius}
              onChange={handleInputChange}
              className="ml-3 w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Width (w)
          </label>
          <div className="flex items-center">
            <input
              type="range"
              name="width"
              min="0.1"
              max="2"
              step="0.1"
              value={params.width}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              name="width"
              min="0.1"
              max="2"
              step="0.1"
              value={params.width}
              onChange={handleInputChange}
              className="ml-3 w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Resolution (n)
          </label>
          <div className="flex items-center">
            <input
              type="range"
              name="resolution"
              min="10"
              max="200"
              step="1"
              value={params.resolution}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              name="resolution"
              min="10"
              max="200"
              step="1"
              value={params.resolution}
              onChange={handleInputChange}
              className="ml-3 w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Higher values increase model accuracy but may affect performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParameterForm;