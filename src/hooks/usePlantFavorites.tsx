import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface PlantFavorite {
  id: string;
  user_id: string;
  plant_id: string;
  plant_name: string;
  created_at: string;
}

export const usePlantFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["plant_favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("plant_favorites")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as PlantFavorite[];
    },
    enabled: !!user,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async ({ plantId, plantName }: { plantId: string; plantName: string }) => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("plant_favorites")
        .insert({
          user_id: user.id,
          plant_id: plantId,
          plant_name: plantName,
        })
        .select()
        .single();
      
      if (error) {
        if (error.code === "23505") {
          throw new Error("Plant already in favorites");
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plant_favorites"] });
      toast.success("Added to favorites!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (plantId: string) => {
      if (!user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from("plant_favorites")
        .delete()
        .eq("plant_id", plantId)
        .eq("user_id", user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plant_favorites"] });
      toast.success("Removed from favorites");
    },
    onError: (error) => {
      toast.error(`Failed to remove: ${error.message}`);
    },
  });

  const isFavorite = (plantId: string) => {
    return favorites.some((f) => f.plant_id === plantId);
  };

  const toggleFavorite = (plantId: string, plantName: string) => {
    if (isFavorite(plantId)) {
      removeFavoriteMutation.mutate(plantId);
    } else {
      addFavoriteMutation.mutate({ plantId, plantName });
    }
  };

  return {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
  };
};
