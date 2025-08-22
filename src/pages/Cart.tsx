
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { useCart } from '@/contexts/CartContext'; // Temporarily disabled
import Layout from '@/components/Layout';

const Cart: React.FC = () => {
  // Mock cart data
  const state = { items: [], total: 0, subtotal: 0, shipping: 0, tax: 0, currency: '€', discountAmount: 0, discountCode: undefined };
  const dispatch = (action: any) => {};
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [discountSuccess, setDiscountSuccess] = useState('');

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleApplyDiscount = () => {
    setDiscountError('');
    setDiscountSuccess('');
    
    // Mock discount codes
    const validCodes = {
      'WELCOME10': 0.1,
      'SAVE20': 0.2,
      'FIRST15': 0.15
    };
    
    const discount = validCodes[discountCode.toUpperCase() as keyof typeof validCodes];
    
    if (discount) {
      const discountAmount = state.subtotal * discount;
      dispatch({ 
        type: 'APPLY_DISCOUNT', 
        payload: { code: discountCode.toUpperCase(), amount: discountAmount }
      });
      setDiscountSuccess(`Código aplicado: -${(discount * 100).toFixed(0)}%`);
      setDiscountCode('');
    } else {
      setDiscountError('Código inválido o expirado');
    }
  };

  const handleRemoveDiscount = () => {
    dispatch({ type: 'REMOVE_DISCOUNT' });
    setDiscountSuccess('');
  };

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <ShoppingBag className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-400 mb-8">¡Descubre nuestros increíbles diseños 3D!</p>
            <Link to="/drops">
              <Button className="btn-neon">
                Explorar Productos
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2">/</span>
          <span>Carrito</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white mb-8">
              Tu Carrito ({state.items.length} {state.items.length === 1 ? 'artículo' : 'artículos'})
            </h1>

            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={item.id} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded-xl object-cover bg-gray-800"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-primary font-bold text-lg mb-4">
                        {state.currency}{item.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">Cantidad:</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            
                            <span className="text-white font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 hover:border-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-white font-bold text-xl">
                        {state.currency}{(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity < item.stock && (
                        <p className="text-gray-400 text-sm mt-1">
                          {item.stock} disponibles
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Discount Code */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Código de Descuento
              </h3>
              
              {!state.discountCode ? (
                <div className="space-y-3">
                  <Input
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Ingresa tu código"
                    className="bg-gray-800 border-gray-600"
                  />
                  <Button
                    onClick={handleApplyDiscount}
                    disabled={!discountCode.trim()}
                    className="w-full"
                    variant="outline"
                  >
                    Aplicar Código
                  </Button>
                  {discountError && (
                    <p className="text-red-400 text-sm">{discountError}</p>
                  )}
                  {discountSuccess && (
                    <p className="text-green-400 text-sm">{discountSuccess}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <span className="text-green-400 text-sm font-medium">
                    {state.discountCode} aplicado
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleRemoveDiscount}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Resumen del Pedido</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{state.currency}{state.subtotal.toFixed(2)}</span>
                </div>
                
                {state.discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Descuento</span>
                    <span>-{state.currency}{state.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-400">
                  <span>Envío</span>
                  <span>Se calcula en checkout</span>
                </div>
                
                <div className="flex justify-between text-gray-400">
                  <span>IVA (21%)</span>
                  <span>Se calcula en checkout</span>
                </div>
                
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>{state.currency}{(state.subtotal - state.discountAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Link to="/checkout">
                  <Button className="w-full btn-neon">
                    Proceder al Checkout
                  </Button>
                </Link>
                <Link to="/drops">
                  <Button variant="outline" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
