import React from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export function Cart() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-[#4A90E2] text-white p-4 rounded-full shadow-lg hover:bg-[#357ABD] transition-colors duration-300"
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-[#4A90E2]">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(0, item.quantity - 1))
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="text-lg font-bold">
                    ${total().toLocaleString()}
                  </span>
                </div>
                <button className="w-full bg-[#4A90E2] text-white py-2 rounded-lg hover:bg-[#357ABD] transition-colors duration-300">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}