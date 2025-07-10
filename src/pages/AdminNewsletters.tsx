
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import NewsletterList from '@/components/admin/newsletters/NewsletterList';

const AdminNewsletters: React.FC = () => {
  return (
    <AdminLayout>
      <NewsletterList />
    </AdminLayout>
  );
};

export default AdminNewsletters;
