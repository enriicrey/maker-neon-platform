
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Camera, Globe, MapPin, Clock, Briefcase, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    timezone: 'UTC',
    bio: '',
    occupation: '',
    experience_level: 'beginner',
    website_url: '',
    interests: [] as string[],
    avatar_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          username: data.username || '',
          email: user.email || '',
          phone: data.phone || '',
          location: data.location || '',
          timezone: data.timezone || 'UTC',
          bio: data.bio || '',
          occupation: data.occupation || '',
          experience_level: data.experience_level || 'beginner',
          website_url: data.website_url || '',
          interests: data.interests || [],
          avatar_url: data.avatar_url || ''
        });
      } else {
        setProfile(prev => ({ ...prev, email: user.email || '' }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar el perfil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          username: profile.username,
          phone: profile.phone,
          location: profile.location,
          timezone: profile.timezone,
          bio: profile.bio,
          occupation: profile.occupation,
          experience_level: profile.experience_level,
          website_url: profile.website_url,
          interests: profile.interests,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Perfil actualizado",
        description: "Los cambios se guardaron correctamente"
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el perfil",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const timezones = [
    'UTC', 'Europe/Madrid', 'Europe/London', 'America/New_York',
    'America/Los_Angeles', 'Asia/Tokyo', 'Australia/Sydney'
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
    { value: 'expert', label: 'Experto' }
  ];

  if (loading) {
    return <div className="text-gray-400">Cargando perfil...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Foto de perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback className="text-lg bg-primary text-white">
                {profile.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Subir foto
              </Button>
              <p className="text-sm text-gray-400">
                JPG, PNG o WebP. Máximo 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Información básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name" className="text-gray-300">
                Nombre completo
              </Label>
              <Input
                id="full_name"
                value={profile.full_name}
                onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                className="bg-dark-surface border-dark-border text-white"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                className="bg-dark-surface border-dark-border text-white"
                placeholder="username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                value={profile.email}
                disabled
                className="bg-dark-surface border-dark-border text-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">
                Teléfono
              </Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-dark-surface border-dark-border text-white"
                placeholder="+34 600 000 000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Ubicación
              </Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                className="bg-dark-surface border-dark-border text-white"
                placeholder="Ciudad, País"
              />
            </div>
            <div>
              <Label htmlFor="timezone" className="text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Zona horaria
              </Label>
              <Select
                value={profile.timezone}
                onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  {timezones.map(tz => (
                    <SelectItem key={tz} value={tz} className="text-white">
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Información profesional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation" className="text-gray-300">
                Ocupación
              </Label>
              <Input
                id="occupation"
                value={profile.occupation}
                onChange={(e) => setProfile(prev => ({ ...prev, occupation: e.target.value }))}
                className="bg-dark-surface border-dark-border text-white"
                placeholder="Designer, Maker, Hobbyist..."
              />
            </div>
            <div>
              <Label htmlFor="experience_level" className="text-gray-300">
                Nivel de experiencia
              </Label>
              <Select
                value={profile.experience_level}
                onValueChange={(value) => setProfile(prev => ({ ...prev, experience_level: value }))}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  {experienceLevels.map(level => (
                    <SelectItem key={level.value} value={level.value} className="text-white">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="website_url" className="text-gray-300 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website/Portfolio
            </Label>
            <Input
              id="website_url"
              value={profile.website_url}
              onChange={(e) => setProfile(prev => ({ ...prev, website_url: e.target.value }))}
              className="bg-dark-surface border-dark-border text-white"
              placeholder="https://tuportfolio.com"
            />
          </div>

          <div>
            <Label htmlFor="bio" className="text-gray-300">
              Bio personal
            </Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="bg-dark-surface border-dark-border text-white min-h-[100px]"
              placeholder="Cuéntanos sobre ti..."
              maxLength={500}
            />
            <p className="text-sm text-gray-400 mt-1">
              {profile.bio.length}/500 caracteres
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Intereses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Añadir interés"
              className="bg-dark-surface border-dark-border text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
            />
            <Button onClick={handleAddInterest} variant="outline">
              Añadir
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/20 text-primary border-primary/30 flex items-center gap-1"
              >
                {interest}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-400"
                  onClick={() => handleRemoveInterest(interest)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
