import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathematicalDetailsProps {
  onClose: () => void;
}

const MathematicalDetails: React.FC<MathematicalDetailsProps> = ({ onClose }) => {
  useEffect(() => {
    // Render all KaTeX elements
    const elements = document.querySelectorAll('.katex-formula');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        katex.render(el.dataset.formula || '', el, {
          throwOnError: false,
          displayMode: el.dataset.display === 'true'
        });
      }
    });
    
    // Add event listener to close on escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-xl">
        <div className="sticky top-0 bg-gray-800 p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Mathematical Details</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <section>
            <h3 className="text-lg font-bold mb-3 text-teal-400">Parametric Equation of Mobius Strip</h3>
            <p className="mb-4">
              The Mobius strip is parameterized by the following equations:
            </p>
            <div className="bg-gray-900 p-4 rounded-lg mb-4">
              <div 
                className="katex-formula mb-2" 
                data-formula="x(u,v) = (R + v \cos(\frac{u}{2})) \cos(u)" 
                data-display="true"
              ></div>
              <div 
                className="katex-formula mb-2" 
                data-formula="y(u,v) = (R + v \cos(\frac{u}{2})) \sin(u)" 
                data-display="true"
              ></div>
              <div 
                className="katex-formula" 
                data-formula="z(u,v) = v \sin(\frac{u}{2})" 
                data-display="true"
              ></div>
            </div>
            <p>
              Where <span className="katex-formula" data-formula="u \in [0, 2\pi]"></span> and <span className="katex-formula" data-formula="v \in [-\frac{w}{2}, \frac{w}{2}]"></span>. 
              The parameter <span className="katex-formula" data-formula="u"></span> goes around the strip, while <span className="katex-formula" data-formula="v"></span> goes across its width.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold mb-3 text-teal-400">Surface Area Calculation</h3>
            <p className="mb-4">
              The surface area is computed numerically using the following integral:
            </p>
            <div className="bg-gray-900 p-4 rounded-lg mb-4">
              <div 
                className="katex-formula" 
                data-formula="A = \iint_D \left| \frac{\partial \vec{r}}{\partial u} \times \frac{\partial \vec{r}}{\partial v} \right| \, du \, dv" 
                data-display="true"
              ></div>
            </div>
            <p>
              Where <span className="katex-formula" data-formula="\vec{r}(u,v) = (x(u,v), y(u,v), z(u,v))"></span> is the position vector and 
              <span className="katex-formula" data-formula="D"></span> is the parameter domain. This is approximated numerically 
              using a discrete summation over the mesh points.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold mb-3 text-teal-400">Edge Length Calculation</h3>
            <p className="mb-4">
              The edge length is computed by integrating along the boundary where <span className="katex-formula" data-formula="v = \pm \frac{w}{2}"></span>:
            </p>
            <div className="bg-gray-900 p-4 rounded-lg mb-4">
              <div 
                className="katex-formula" 
                data-formula="L = \int_0^{2\pi} \left| \frac{d\vec{r}(u, \frac{w}{2})}{du} \right| \, du" 
                data-display="true"
              ></div>
            </div>
            <p>
              This is also approximated numerically by summing the distances between adjacent points along the edge.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold mb-3 text-teal-400">Topological Properties</h3>
            <p className="mb-4">
              The Mobius strip has several interesting properties:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>It is a non-orientable surface</li>
              <li>It has only one side (you can trace a path that returns to the starting point but on the "opposite" side)</li>
              <li>It has only one edge (the boundary is a single closed curve)</li>
              <li>If cut along the center line, it results in a single twisted strip, not two separate pieces</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-bold mb-3 text-teal-400">Python Implementation</h3>
            <p>
              The implementation uses numerical methods to compute the surface area and edge length. 
              The mesh is generated with a specified resolution, and numerical integration is performed 
              over the discrete points.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MathematicalDetails;