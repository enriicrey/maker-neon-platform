
import React from 'react';
import { ShoppingCart } from 'lucide-react';
// import { useCart } from '@/contexts/CartContext'; // Temporarily disabled

const CartIcon: React.FC = () => {
  // Mock cart data
  const state = { items: [] };
  const dispatch = (action: any) => {};
  
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      className="relative p-2 text-gray-300 hover:text-white transition-colors"
      aria-label={`Carrito de compras con ${itemCount} artículos`}
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
