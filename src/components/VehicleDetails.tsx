import React from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function VehicleDetails({ vehicle, onClose }: VehicleDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [purchasing, setPurchasing] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const images = [vehicle.image, ...vehicle.gallery || []];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please sign in to purchase vehicles');
        return;
      }

      // Add to cart and show success message
      addItem({
        id: vehicle.id,
        name: vehicle.name,
        price: vehicle.price,
        quantity: 1,
        image: vehicle.image
      });
      
      toast.success('Vehicle added to cart!');
      onClose();
    } catch (error) {
      toast.error('Error adding vehicle to cart. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{vehicle.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="relative h-96">
          <img
            src={images[currentImageIndex]}
            alt={`${vehicle.name} view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Top Speed:</span>
                  <p className="text-gray-600">{vehicle.specs.topSpeed}</p>
                </div>
                <div>
                  <span className="font-medium">Acceleration (0-60):</span>
                  <p className="text-gray-600">{vehicle.specs.acceleration}</p>
                </div>
                <div>
                  <span className="font-medium">Handling Rating:</span>
                  <p className="text-gray-600">{vehicle.specs.handling}</p>
                </div>
                <div>
                  <span className="font-medium">Seating Capacity:</span>
                  <p className="text-gray-600">{vehicle.specs.seats}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {vehicle.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-[#4A90E2]">
                  ${vehicle.price.toLocaleString()}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {vehicle.type === 'new' ? 'Brand New' : 'Pre-owned'}
                </p>
              </div>
              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className={`bg-[#4A90E2] text-white px-8 py-3 rounded-lg hover:bg-[#357ABD] transition-all duration-300 flex items-center space-x-2 ${
                  purchasing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {purchasing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Add to Cart</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}