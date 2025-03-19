import React, { useState } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../types/vehicle';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleDetails } from '../components/VehicleDetails';
import { Cart } from '../components/Cart';
import { PaymentModal } from '../components/PaymentModal';
import { AuthButton } from '../components/AuthButton';
import toast from 'react-hot-toast';

const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Adder Supercar',
    type: 'new',
    price: 1000000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80'
    ],
    specs: {
      topSpeed: '220 mph',
      acceleration: '2.9s',
      handling: '9/10',
      seats: 2
    },
    features: [
      'Carbon fiber body',
      'Active aerodynamics',
      'Launch control',
      'Premium sound system',
      'Leather interior'
    ]
  },
  {
    id: '2',
    name: 'Sultan RS Classic',
    type: 'used',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80'
    ],
    specs: {
      topSpeed: '180 mph',
      acceleration: '3.5s',
      handling: '8/10',
      seats: 4
    },
    features: [
      'Turbo upgrade',
      'Sport suspension',
      'Racing seats',
      'Custom exhaust',
      'Limited slip differential'
    ]
  },
  {
    id: '3',
    name: 'Comet Safari',
    type: 'new',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&q=80'
    ],
    specs: {
      topSpeed: '190 mph',
      acceleration: '3.2s',
      handling: '7/10',
      seats: 2
    },
    features: [
      'All-wheel drive',
      'Adaptive suspension',
      'Sport chrono package',
      'Premium audio',
      'Navigation system'
    ]
  },
  {
    id: '4',
    name: 'Dominator GTX',
    type: 'used',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80'
    ],
    specs: {
      topSpeed: '175 mph',
      acceleration: '4.0s',
      handling: '7/10',
      seats: 2
    },
    features: [
      'V8 engine',
      'Manual transmission',
      'Sport exhaust',
      'Performance brakes',
      'Limited slip differential'
    ]
  }
];

function Store() {
  const [filter, setFilter] = useState<'all' | 'new' | 'used'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesFilter = filter === 'all' || vehicle.type === filter;
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePaymentSuccess = (orderId: string) => {
    setShowPayment(false);
    toast.success('Payment successful! Order confirmed.');
  };

  return (
    <div className="min-h-screen bg-[#E6F3FF]">
      {/* Navigation */}
      <div className="bg-white/90 backdrop-blur-sm shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 text-gray-700 hover:text-[#4A90E2] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-[#4A90E2]/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">VisionRP Dealership</h1>
          <p className="text-gray-600 max-w-2xl">
            Browse our exclusive collection of high-performance vehicles. 
            From luxury supercars to classic models, find your perfect ride.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-[#4A90E2]/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <button
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  filter === 'all' ? 'bg-[#4A90E2] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  filter === 'new' ? 'bg-[#4A90E2] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setFilter('new')}
              >
                New
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  filter === 'used' ? 'bg-[#4A90E2] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setFilter('used')}
              >
                Used
              </button>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onShowDetails={setSelectedVehicle}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#4A90E2]/20 py-8 bg-white/90 backdrop-blur-sm mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 VISIONRP.LT - All rights reserved</p>
        </div>
      </footer>

      {/* Floating Cart */}
      <Cart />

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default Store;