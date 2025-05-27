"""
Mobius Strip Modeling Script

This script defines a MobiusStrip class that models a Mobius strip using
parametric equations and computes key geometric properties.
"""

import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

class MobiusStrip:
    """
    A class representing a Mobius strip.
    
    Parameters:
    -----------
    R : float
        Radius (distance from the center to the strip)
    w : float
        Width of the strip
    n : int
        Resolution (number of points in the mesh)
    """
    
    def __init__(self, R=2, w=1, n=50):
        """Initialize the Mobius strip with given parameters."""
        self.R = R
        self.w = w
        self.n = n
        
        # Generate the mesh
        self.u_values = np.linspace(0, 2*np.pi, self.n)
        self.v_values = np.linspace(-self.w/2, self.w/2, self.n//5)
        
        # Create empty arrays to store mesh points
        self.x = np.zeros((len(self.u_values), len(self.v_values)))
        self.y = np.zeros((len(self.u_values), len(self.v_values)))
        self.z = np.zeros((len(self.u_values), len(self.v_values)))
        
        # Generate the mesh points
        self._generate_mesh()
        
    def _generate_mesh(self):
        """Generate the 3D mesh of points on the Mobius strip."""
        for i, u in enumerate(self.u_values):
            for j, v in enumerate(self.v_values):
                # Parametric equations for the Mobius strip
                self.x[i, j] = (self.R + v * np.cos(u/2)) * np.cos(u)
                self.y[i, j] = (self.R + v * np.cos(u/2)) * np.sin(u)
                self.z[i, j] = v * np.sin(u/2)
    
    def _get_du_derivatives(self, u, v):
        """
        Calculate the partial derivatives with respect to u.
        
        Parameters:
        -----------
        u : float
            The u parameter
        v : float
            The v parameter
            
        Returns:
        --------
        numpy.ndarray
            The partial derivatives (dx/du, dy/du, dz/du)
        """
        dx_du = -(self.R + v * np.cos(u/2)) * np.sin(u) - (v/2) * np.sin(u/2) * np.cos(u)
        dy_du = (self.R + v * np.cos(u/2)) * np.cos(u) - (v/2) * np.sin(u/2) * np.sin(u)
        dz_du = (v/2) * np.cos(u/2)
        
        return np.array([dx_du, dy_du, dz_du])
    
    def _get_dv_derivatives(self, u, v):
        """
        Calculate the partial derivatives with respect to v.
        
        Parameters:
        -----------
        u : float
            The u parameter
        v : float
            The v parameter
            
        Returns:
        --------
        numpy.ndarray
            The partial derivatives (dx/dv, dy/dv, dz/dv)
        """
        dx_dv = np.cos(u/2) * np.cos(u)
        dy_dv = np.cos(u/2) * np.sin(u)
        dz_dv = np.sin(u/2)
        
        return np.array([dx_dv, dy_dv, dz_dv])
    
    def compute_surface_area(self):
        """
        Compute the surface area of the Mobius strip numerically.
        
        Returns:
        --------
        float
            The surface area
        """
        area = 0.0
        
        # Step sizes for numerical integration
        du = 2 * np.pi / self.n
        dv = self.w / (self.n//5)
        
        for i in range(self.n):
            u = i * du
            for j in range(self.n//5):
                v = -self.w/2 + j * dv
                
                # Get partial derivatives
                du_vector = self._get_du_derivatives(u, v)
                dv_vector = self._get_dv_derivatives(u, v)
                
                # Cross product gives the area element
                cross_product = np.cross(du_vector, dv_vector)
                
                # Add contribution to the surface area
                area += np.linalg.norm(cross_product) * du * dv
                
        return area
    
    def compute_edge_length(self):
        """
        Compute the edge length of the Mobius strip numerically.
        
        Returns:
        --------
        float
            The edge length
        """
        length = 0.0
        
        # Step size for numerical integration
        du = 2 * np.pi / self.n
        
        # Calculate the edge length (v = w/2)
        points = []
        for i in range(self.n + 1):
            u = i * du
            v = self.w/2
            
            # Calculate point on the edge
            x = (self.R + v * np.cos(u/2)) * np.cos(u)
            y = (self.R + v * np.cos(u/2)) * np.sin(u)
            z = v * np.sin(u/2)
            
            points.append(np.array([x, y, z]))
        
        # Sum the distances between consecutive points
        for i in range(self.n):
            length += np.linalg.norm(points[i+1] - points[i])
            
        return length
    
    def plot(self, ax=None, color='teal', alpha=0.7, wireframe=False):
        """
        Plot the Mobius strip.
        
        Parameters:
        -----------
        ax : matplotlib.axes.Axes, optional
            The axes to plot on. If None, a new figure is created.
        color : str, optional
            The color of the surface.
        alpha : float, optional
            The transparency of the surface.
        wireframe : bool, optional
            Whether to plot as a wireframe.
            
        Returns:
        --------
        matplotlib.axes.Axes
            The axes containing the plot.
        """
        if ax is None:
            fig = plt.figure(figsize=(10, 8))
            ax = fig.add_subplot(111, projection='3d')
        
        if wireframe:
            ax.plot_wireframe(self.x, self.y, self.z, color=color, alpha=alpha)
        else:
            ax.plot_surface(self.x, self.y, self.z, color=color, alpha=alpha, 
                           edgecolor='black', linewidth=0.3)
        
        # Plot the edge
        edge_u = np.linspace(0, 2*np.pi, 100)
        edge_v = self.w/2
        edge_x = [(self.R + edge_v * np.cos(u/2)) * np.cos(u) for u in edge_u]
        edge_y = [(self.R + edge_v * np.cos(u/2)) * np.sin(u) for u in edge_u]
        edge_z = [edge_v * np.sin(u/2) for u in edge_u]
        
        ax.plot(edge_x, edge_y, edge_z, 'r-', linewidth=2, label='Edge')
        
        # Set plot properties
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')
        ax.set_title('Mobius Strip')
        
        # Make the plot more visually appealing
        ax.set_box_aspect([1, 1, 1])
        ax.view_init(elev=30, azim=45)
        
        return ax
    
    def summary(self):
        """
        Print a summary of the Mobius strip properties.
        """
        surface_area = self.compute_surface_area()
        edge_length = self.compute_edge_length()
        
        print("Mobius Strip Properties:")
        print("-----------------------")
        print(f"Radius (R): {self.R}")
        print(f"Width (w): {self.w}")
        print(f"Resolution (n): {self.n}")
        print(f"Surface Area: {surface_area:.4f} square units")
        print(f"Edge Length: {edge_length:.4f} units")
        
        return {
            "surface_area": surface_area,
            "edge_length": edge_length
        }


if __name__ == "__main__":
    # Create a Mobius strip with default parameters
    mobius = MobiusStrip(R=2, w=1, n=100)
    
    # Compute and print properties
    properties = mobius.summary()
    
    # Create a figure and plot the Mobius strip
    fig = plt.figure(figsize=(12, 10))
    
    # Surface plot
    ax1 = fig.add_subplot(121, projection='3d')
    mobius.plot(ax=ax1, color='teal', alpha=0.7)
    
    # Wireframe plot
    ax2 = fig.add_subplot(122, projection='3d')
    mobius.plot(ax=ax2, wireframe=True)
    ax2.set_title('Mobius Strip (Wireframe)')
    
    plt.tight_layout()
    plt.savefig('mobius_strip.png', dpi=300)
    plt.show()