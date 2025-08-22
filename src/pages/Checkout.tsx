
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { useCart } from '@/contexts/CartContext'; // Temporarily disabled
import Layout from '@/components/Layout';

const Checkout: React.FC = () => {
  // Mock cart data
  const state = { items: [], total: 0, subtotal: 0, shipping: 0, tax: 0, currency: '€', discountAmount: 0 };
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    postalCode: '',
    country: 'ES',
    shippingMethod: 'standard',
    sameAsBilling: true,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    termsAccepted: false
  });

  const steps = [
    { id: 1, title: 'Información de Envío', icon: MapPin },
    { id: 2, title: 'Método de Pago', icon: CreditCard },
    { id: 3, title: 'Revisión Final', icon: Shield }
  ];

  const shippingOptions = [
    { id: 'standard', name: 'Envío Estándar', time: '3-5 días laborables', price: 4.99 },
    { id: 'express', name: 'Envío Express', time: '1-2 días laborables', price: 9.99 },
    { id: 'overnight', name: 'Entrega Siguiente Día', time: 'Siguiente día laborable', price: 19.99 }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedShipping = shippingOptions.find(option => option.id === formData.shippingMethod);
  const subtotal = state.subtotal - state.discountAmount;
  const shipping = selectedShipping?.price || 0;
  const tax = subtotal * 0.21;
  const total = subtotal + shipping + tax;

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
          <Link to="/drops">
            <Button className="btn-neon">Explorar Productos</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-black' 
                    : 'border-gray-600 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep >= step.id ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Información de Envío</h2>
                
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Información de Contacto</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-800 border-gray-600"
                      />
                      <Input
                        placeholder="Teléfono (opcional)"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Dirección de Envío</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Nombre"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="bg-gray-800 border-gray-600"
                        />
                        <Input
                          placeholder="Apellidos"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="bg-gray-800 border-gray-600"
                        />
                      </div>
                      <Input
                        placeholder="Dirección"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="bg-gray-800 border-gray-600"
                      />
                      <Input
                        placeholder="Apartamento, oficina, etc. (opcional)"
                        value={formData.address2}
                        onChange={(e) => handleInputChange('address2', e.target.value)}
                        className="bg-gray-800 border-gray-600"
                      />
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Ciudad"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="bg-gray-800 border-gray-600"
                        />
                        <Input
                          placeholder="Código Postal"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className="bg-gray-800 border-gray-600"
                        />
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
                        >
                          <option value="ES">España</option>
                          <option value="FR">Francia</option>
                          <option value="DE">Alemania</option>
                          <option value="IT">Italia</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Método de Envío</h3>
                    <div className="space-y-3">
                      {shippingOptions.map(option => (
                        <label key={option.id} className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={formData.shippingMethod === option.id}
                            onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            formData.shippingMethod === option.id 
                              ? 'border-primary bg-primary' 
                              : 'border-gray-400'
                          }`}>
                            {formData.shippingMethod === option.id && (
                              <div className="w-2 h-2 bg-black rounded-full mx-auto mt-0.5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-white font-medium">{option.name}</p>
                                <p className="text-gray-400 text-sm">{option.time}</p>
                              </div>
                              <p className="text-primary font-bold">€{option.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button onClick={handleNextStep} className="btn-neon">
                    Continuar al Pago
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Método de Pago</h2>
                
                <div className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Selecciona tu método de pago</h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                        <input type="radio" name="payment" defaultChecked className="sr-only" />
                        <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary mr-3">
                          <div className="w-2 h-2 bg-black rounded-full mx-auto mt-0.5" />
                        </div>
                        <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-white">Tarjeta de Crédito/Débito</span>
                      </label>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Detalles de la Tarjeta</h3>
                    <div className="space-y-4">
                      <Input
                        placeholder="Número de Tarjeta"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="bg-gray-800 border-gray-600"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="MM/AA"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="bg-gray-800 border-gray-600"
                        />
                        <Input
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="bg-gray-800 border-gray-600"
                        />
                      </div>
                      <Input
                        placeholder="Nombre en la Tarjeta"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 text-green-400">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm font-medium">Pago 100% Seguro</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Tus datos están protegidos con encriptación SSL de 256 bits
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Volver
                  </Button>
                  <Button onClick={handleNextStep} className="btn-neon">
                    Revisar Pedido
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Revisar Pedido</h2>
                
                <div className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Productos</h3>
                    <div className="space-y-4">
                      {state.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                          <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{item.title}</h4>
                            <p className="text-gray-400 text-sm">Cantidad: {item.quantity}</p>
                          </div>
                          <p className="text-primary font-bold">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Dirección de Envío</h3>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-white">{formData.firstName} {formData.lastName}</p>
                      <p className="text-gray-400">{formData.address}</p>
                      {formData.address2 && <p className="text-gray-400">{formData.address2}</p>}
                      <p className="text-gray-400">{formData.city}, {formData.postalCode}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Método de Pago</h3>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-white">Tarjeta terminada en ****</p>
                      <p className="text-gray-400">Método de envío: {selectedShipping?.name}</p>
                    </div>
                  </div>

                  {/* Terms */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-gray-400 text-sm">
                        Acepto los <Link to="/terms" className="text-primary hover:underline">términos y condiciones</Link> y la <Link to="/privacy" className="text-primary hover:underline">política de privacidad</Link>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Volver
                  </Button>
                  <Button 
                    disabled={!formData.termsAccepted}
                    className="btn-neon disabled:opacity-50"
                  >
                    Completar Pedido
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700 h-fit">
            <h3 className="text-lg font-bold text-white mb-4">Resumen del Pedido</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Envío</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>IVA (21%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
