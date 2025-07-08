
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/AuthLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('El email es requerido');
      return;
    }

    if (!validateEmail(email)) {
      setError('Formato de email inválido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast.success('Te enviamos un link de recuperación a tu email');
    } catch (error: any) {
      setError('Error al enviar el email: ' + error.message);
      toast.error('Error al enviar el email de recuperación');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout 
        title="Email Enviado"
        subtitle="Revisa tu bandeja de entrada"
      >
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <p className="text-gray-300">
            Te enviamos un link de recuperación a{' '}
            <span className="text-white font-medium">{email}</span>
          </p>
          <p className="text-gray-400 text-sm">
            El link es válido por 1 hora. Si no ves el email, revisa tu carpeta de spam.
          </p>
          <div className="space-y-2 pt-4">
            <Button
              onClick={() => setSent(false)}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Enviar a otro email
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al login
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Recuperar Contraseña"
      subtitle="Ingresa tu email para recibir un link de recuperación"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            placeholder="tu@email.com"
            autoComplete="email"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar Link de Recuperación'
          )}
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link 
          to="/login" 
          className="text-blue-400 hover:text-blue-300 underline inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
