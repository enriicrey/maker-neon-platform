
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingDrops from '@/components/dashboard/UpcomingDrops';
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations';
import SubscriptionStatus from '@/components/dashboard/SubscriptionStatus';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Right Column - Subscription Status & Upcoming Drops */}
          <div className="space-y-6">
            <SubscriptionStatus />
            <UpcomingDrops />
          </div>
        </div>

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
