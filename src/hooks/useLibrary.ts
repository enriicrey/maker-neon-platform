
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SavedNewsletter {
  id: string;
  user_id: string;
  newsletter_id: string;
  collection_id?: string;
  title: string;
  excerpt?: string;
  image_url?: string;
  read_status: 'unread' | 'reading' | 'completed';
  is_favorite: boolean;
  reading_progress: number;
  notes?: string;
  tags?: string[];
  saved_at: string;
  last_read_at?: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export const useLibrary = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch saved newsletters
  const { data: savedNewsletters = [], isLoading: isLoadingNewsletters } = useQuery({
    queryKey: ['saved-newsletters', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('saved_newsletters')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });
      
      if (error) throw error;
      return data as SavedNewsletter[];
    },
    enabled: !!user,
  });

  // Fetch collections
  const { data: collections = [], isLoading: isLoadingCollections } = useQuery({
    queryKey: ['collections', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Collection[];
    },
    enabled: !!user,
  });

  // Save newsletter
  const saveNewsletterMutation = useMutation({
    mutationFn: async (newsletter: Omit<SavedNewsletter, 'id' | 'user_id' | 'saved_at'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('saved_newsletters')
        .insert({
          ...newsletter,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-newsletters'] });
      toast.success('Newsletter guardada en biblioteca');
    },
    onError: (error) => {
      toast.error('Error al guardar newsletter');
      console.error('Error saving newsletter:', error);
    },
  });

  // Update newsletter
  const updateNewsletterMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SavedNewsletter> }) => {
      const { data, error } = await supabase
        .from('saved_newsletters')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-newsletters'] });
    },
    onError: (error) => {
      toast.error('Error al actualizar newsletter');
      console.error('Error updating newsletter:', error);
    },
  });

  // Create collection
  const createCollectionMutation = useMutation({
    mutationFn: async (collection: Omit<Collection, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('collections')
        .insert({
          ...collection,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast.success('Colección creada');
    },
    onError: (error) => {
      toast.error('Error al crear colección');
      console.error('Error creating collection:', error);
    },
  });

  return {
    savedNewsletters,
    collections,
    isLoading: isLoadingNewsletters || isLoadingCollections,
    saveNewsletter: saveNewsletterMutation.mutate,
    updateNewsletter: updateNewsletterMutation.mutate,
    createCollection: createCollectionMutation.mutate,
    isSaving: saveNewsletterMutation.isPending,
    isUpdating: updateNewsletterMutation.isPending,
    isCreatingCollection: createCollectionMutation.isPending,
  };
};
