
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Bell, Lock, CreditCard, Settings, Database } from 'lucide-react';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import SubscriptionSettings from '@/components/settings/SubscriptionSettings';
import PreferencesSettings from '@/components/settings/PreferencesSettings';
import DataSettings from '@/components/settings/DataSettings';
import { useAuth } from '@/contexts/AuthContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMediaQuery } from '@/hooks/use-mobile';

const DashboardConfiguracion = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const tabs = [
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      component: ProfileSettings,
      description: 'Información personal y avatar'
    },
    {
      id: 'account',
      label: 'Cuenta',
      icon: Shield,
      component: AccountSettings,
      description: 'Email, contraseña y seguridad'
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: Bell,
      component: NotificationSettings,
      description: 'Preferencias de comunicación'
    },
    {
      id: 'privacy',
      label: 'Privacidad',
      icon: Lock,
      component: PrivacySettings,
      description: 'Control de datos y visibilidad'
    },
    {
      id: 'subscription',
      label: 'Suscripción',
      icon: CreditCard,
      component: SubscriptionSettings,
      description: 'Plan actual y facturación'
    },
    {
      id: 'preferences',
      label: 'Preferencias',
      icon: Settings,
      component: PreferencesSettings,
      description: 'Contenido y experiencia'
    },
    {
      id: 'data',
      label: 'Datos',
      icon: Database,
      component: DataSettings,
      description: 'Export, import y eliminación'
    }
  ];

  if (!user) {
    return null;
  }

  if (isMobile) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Configuración</h1>
            <p className="text-gray-400 mt-2">
              Gestiona tu perfil, preferencias y configuración de cuenta
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const ContentComponent = tab.component;
              
              return (
                <AccordionItem key={tab.id} value={tab.id}>
                  <AccordionTrigger className="text-white hover:text-primary">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-sm text-gray-400">{tab.description}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="bg-dark-surface border-dark-border">
                      <CardContent className="p-6">
                        <ContentComponent />
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Configuración</h1>
          <p className="text-gray-400 mt-2">
            Gestiona tu perfil, preferencias y configuración de cuenta
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-dark-surface">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabs.map((tab) => {
            const ContentComponent = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id}>
                <Card className="bg-dark-surface border-dark-border">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {tab.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContentComponent />
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardConfiguracion;
