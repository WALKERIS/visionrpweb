import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

export function PaymentModal({ onClose, onSuccess }: PaymentModalProps) {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = React.useState(false);

  const handlePaymentSuccess = async (details: any) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total(),
          status: 'completed',
          payment_id: details.id
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        vehicle_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      onSuccess(order.id);
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <PayPalScriptProvider options={{
            clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || ''
          }}>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: total().toString()
                    }
                  }]
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order?.capture();
                await handlePaymentSuccess(details);
              }}
            />
          </PayPalScriptProvider>

          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A90E2]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}