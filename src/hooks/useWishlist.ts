
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  user_id: string;
  category_id?: string;
  product_id: string;
  title: string;
  description?: string;
  price_current?: number;
  price_original?: number;
  image_url?: string;
  product_url?: string;
  priority: 'high' | 'medium' | 'low';
  is_available: boolean;
  price_alert_target?: number;
  stock_alert_enabled: boolean;
  notes?: string;
  added_at: string;
  updated_at: string;
}

export interface WishlistCategory {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface PriceHistory {
  id: string;
  wishlist_item_id: string;
  price: number;
  recorded_at: string;
}

export const useWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch wishlist items
  const { data: wishlistItems = [], isLoading: isLoadingItems } = useQuery({
    queryKey: ['wishlist-items', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });
      
      if (error) throw error;
      return data as WishlistItem[];
    },
    enabled: !!user,
  });

  // Fetch wishlist categories
  const { data: wishlistCategories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['wishlist-categories', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlist_categories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as WishlistCategory[];
    },
    enabled: !!user,
  });

  // Add item to wishlist
  const addToWishlistMutation = useMutation({
    mutationFn: async (item: Omit<WishlistItem, 'id' | 'user_id' | 'added_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('wishlist_items')
        .insert({
          ...item,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
      toast.success('Producto añadido a wishlist');
    },
    onError: (error) => {
      toast.error('Error al añadir a wishlist');
      console.error('Error adding to wishlist:', error);
    },
  });

  // Update wishlist item
  const updateWishlistItemMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<WishlistItem> }) => {
      const { data, error } = await supabase
        .from('wishlist_items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
    },
    onError: (error) => {
      toast.error('Error al actualizar producto');
      console.error('Error updating wishlist item:', error);
    },
  });

  // Remove from wishlist
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
      toast.success('Producto eliminado de wishlist');
    },
    onError: (error) => {
      toast.error('Error al eliminar producto');
      console.error('Error removing from wishlist:', error);
    },
  });

  // Create category
  const createCategoryMutation = useMutation({
    mutationFn: async (category: Omit<WishlistCategory, 'id' | 'user_id' | 'created_at'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('wishlist_categories')
        .insert({
          ...category,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-categories'] });
      toast.success('Categoría creada');
    },
    onError: (error) => {
      toast.error('Error al crear categoría');
      console.error('Error creating category:', error);
    },
  });

  return {
    wishlistItems,
    wishlistCategories,
    isLoading: isLoadingItems || isLoadingCategories,
    addToWishlist: addToWishlistMutation.mutate,
    updateWishlistItem: updateWishlistItemMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    createCategory: createCategoryMutation.mutate,
    isAdding: addToWishlistMutation.isPending,
    isUpdating: updateWishlistItemMutation.isPending,
    isRemoving: removeFromWishlistMutation.isPending,
    isCreatingCategory: createCategoryMutation.isPending,
  };
};
