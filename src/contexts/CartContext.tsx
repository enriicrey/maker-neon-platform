
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  variants?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  discountCode?: string;
  discountAmount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; amount: number } }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'UPDATE_SHIPPING'; payload: number };

const initialState: CartState = {
  items: [],
  isOpen: false,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  currency: '€',
  discountAmount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.21; // 21% VAT
      const total = subtotal + state.shipping + tax - state.discountAmount;
      
      return { ...state, items: newItems, subtotal, tax, total };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.21;
      const total = subtotal + state.shipping + tax - state.discountAmount;
      
      return { ...state, items: newItems, subtotal, tax, total };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, Math.min(action.payload.quantity, item.stock)) }
          : item
      );
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.21;
      const total = subtotal + state.shipping + tax - state.discountAmount;
      
      return { ...state, items: newItems, subtotal, tax, total };
    }
    
    case 'CLEAR_CART':
      return { ...initialState, currency: state.currency };
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    
    case 'APPLY_DISCOUNT': {
      const total = state.subtotal + state.shipping + state.tax - action.payload.amount;
      return { 
        ...state, 
        discountCode: action.payload.code,
        discountAmount: action.payload.amount,
        total
      };
    }
    
    case 'REMOVE_DISCOUNT': {
      const total = state.subtotal + state.shipping + state.tax;
      return { 
        ...state, 
        discountCode: undefined,
        discountAmount: 0,
        total
      };
    }
    
    case 'UPDATE_SHIPPING': {
      const total = state.subtotal + action.payload + state.tax - state.discountAmount;
      return { ...state, shipping: action.payload, total };
    }
    
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        parsedCart.items.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
