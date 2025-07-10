
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setAdminRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('role, is_active')
          .eq('user_id', user.id)
          .single();

        if (adminData && adminData.is_active) {
          setIsAdmin(true);
          setAdminRole(adminData.role);
        } else {
          setIsAdmin(false);
          setAdminRole(null);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setAdminRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, adminRole, loading };
};
