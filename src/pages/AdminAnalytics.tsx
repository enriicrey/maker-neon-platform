
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAnalytics from '@/components/admin/analytics/AdminAnalytics';

const AdminAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminAnalytics />
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
