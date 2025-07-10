
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, 
  Globe, 
  DollarSign, 
  Calendar, 
  Clock, 
  BookOpen, 
  TrendingUp,
  Target,
  Zap,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const PreferencesSettings = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    theme: 'auto',
    language: 'es',
    currency: 'EUR',
    date_format: 'DD/MM/YYYY',
    timezone_display: 'local',
    content_categories: [] as string[],
    difficulty_level: 'intermediate',
    content_length_preference: 'medium',
    update_frequency: 'weekly'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme, language, currency, date_format, timezone_display, content_categories, difficulty_level, content_length_preference, update_frequency')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPreferences(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Preferencias guardadas",
        description: "Tus configuraciones se actualizaron correctamente"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron guardar las preferencias",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const addContentCategory = (category: string) => {
    if (!preferences.content_categories.includes(category)) {
      updatePreference('content_categories', [...preferences.content_categories, category]);
    }
  };

  const removeContentCategory = (category: string) => {
    updatePreference('content_categories', preferences.content_categories.filter(c => c !== category));
  };

  const availableCategories = [
    '3D Printing', 'Electronics', 'Woodworking', 'Metalworking', 'Crafts',
    'DIY', 'Robotics', 'Arduino', 'Raspberry Pi', 'CNC', 'Laser Cutting',
    'Design', 'CAD', 'Programming', 'IoT', 'Home Automation'
  ];

  if (loading) {
    return <div className="text-gray-400">Cargando preferencias...</div>;
  }

  return (
    <div className="space-y-8">
      {/* UI Preferences */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Experiencia de usuario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Tema
              </Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => updatePreference('theme', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="auto" className="text-white">Automático</SelectItem>
                  <SelectItem value="light" className="text-white">Claro</SelectItem>
                  <SelectItem value="dark" className="text-white">Oscuro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Idioma
              </Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => updatePreference('language', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="es" className="text-white">Español</SelectItem>
                  <SelectItem value="en" className="text-white">English</SelectItem>
                  <SelectItem value="fr" className="text-white">Français</SelectItem>
                  <SelectItem value="de" className="text-white">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Moneda
              </Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) => updatePreference('currency', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="EUR" className="text-white">Euro (€)</SelectItem>
                  <SelectItem value="USD" className="text-white">US Dollar ($)</SelectItem>
                  <SelectItem value="GBP" className="text-white">British Pound (£)</SelectItem>
                  <SelectItem value="JPY" className="text-white">Japanese Yen (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Formato de fecha
              </Label>
              <Select
                value={preferences.date_format}
                onValueChange={(value) => updatePreference('date_format', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="DD/MM/YYYY" className="text-white">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY" className="text-white">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD" className="text-white">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Zona horaria
              </Label>
              <Select
                value={preferences.timezone_display}
                onValueChange={(value) => updatePreference('timezone_display', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="local" className="text-white">Local</SelectItem>
                  <SelectItem value="utc" className="text-white">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Preferences */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Contenido personalizado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-3 block">Categorías de interés</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {preferences.content_categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-primary/20 text-primary border-primary/30 flex items-center gap-1"
                >
                  {category}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-400"
                    onClick={() => removeContentCategory(category)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableCategories
                .filter(cat => !preferences.content_categories.includes(cat))
                .map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => addContentCategory(category)}
                    className="text-xs"
                  >
                    + {category}
                  </Button>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Nivel de dificultad
              </Label>
              <Select
                value={preferences.difficulty_level}
                onValueChange={(value) => updatePreference('difficulty_level', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="beginner" className="text-white">Principiante</SelectItem>
                  <SelectItem value="intermediate" className="text-white">Intermedio</SelectItem>
                  <SelectItem value="advanced" className="text-white">Avanzado</SelectItem>
                  <SelectItem value="expert" className="text-white">Experto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300">Longitud de contenido</Label>
              <Select
                value={preferences.content_length_preference}
                onValueChange={(value) => updatePreference('content_length_preference', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="short" className="text-white">Corto (< 5 min)</SelectItem>
                  <SelectItem value="medium" className="text-white">Medio (5-15 min)</SelectItem>
                  <SelectItem value="long" className="text-white">Largo (> 15 min)</SelectItem>
                  <SelectItem value="mixed" className="text-white">Variado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Frecuencia de actualización
              </Label>
              <Select
                value={preferences.update_frequency}
                onValueChange={(value) => updatePreference('update_frequency', value)}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="daily" className="text-white">Diario</SelectItem>
                  <SelectItem value="weekly" className="text-white">Semanal</SelectItem>
                  <SelectItem value="biweekly" className="text-white">Quincenal</SelectItem>
                  <SelectItem value="monthly" className="text-white">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Preferences */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recomendaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300 mb-2 block">
                Balance exploración vs explotación
              </Label>
              <p className="text-sm text-gray-400 mb-4">
                Controla si prefieres contenido similar a tus intereses actuales o explorar temas nuevos
              </p>
              <div className="space-y-2">
                <Slider
                  value={[50]}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Más similar</span>
                  <span>Explorar nuevo</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Incluir contenido trending</Label>
                <p className="text-sm text-gray-400">Mostrar tendencias populares aunque no coincidan exactamente</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Priorizar contenido reciente</Label>
                <p className="text-sm text-gray-400">Dar más peso a contenido publicado recientemente</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Diversificar fuentes</Label>
                <p className="text-sm text-gray-400">Evitar mostrar mucho contenido del mismo autor</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={savePreferences}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {saving ? 'Guardando...' : 'Guardar preferencias'}
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSettings;
