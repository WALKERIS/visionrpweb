import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart, Info } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onShowDetails: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onShowDetails }: VehicleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: vehicle.id,
      name: vehicle.name,
      price: vehicle.price,
      quantity: 1,
      image: vehicle.image
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
          vehicle.type === 'new' ? 'bg-green-500' : 'bg-blue-500'
        } text-white`}>
          {vehicle.type === 'new' ? 'New' : 'Used'}
        </span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{vehicle.name}</h3>
          <span className="text-lg font-bold text-[#4A90E2]">
            ${vehicle.price.toLocaleString()}
          </span>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="font-medium">Top Speed:</span>
              <p>{vehicle.specs.topSpeed}</p>
            </div>
            <div>
              <span className="font-medium">0-60:</span>
              <p>{vehicle.specs.acceleration}</p>
            </div>
            <div>
              <span className="font-medium">Handling:</span>
              <p>{vehicle.specs.handling}</p>
            </div>
            <div>
              <span className="font-medium">Seats:</span>
              <p>{vehicle.specs.seats}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <span>Specifications</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onShowDetails(vehicle)}
              className="p-2 text-gray-500 hover:text-[#4A90E2] transition-colors duration-300"
              title="View Details"
            >
              <Info size={20} />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#357ABD] transition-colors duration-300"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}