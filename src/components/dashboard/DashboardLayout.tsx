
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark-surface border-b border-dark-border">
        <DashboardHeader 
          onToggleSidebar={toggleSidebar}
          isCollapsed={sidebarCollapsed}
        />
      </div>

      {/* Sidebar */}
      <DashboardSidebar isCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <main className={`pt-20 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
