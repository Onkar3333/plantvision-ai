import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface PlantScan {
  id: string;
  user_id: string;
  plant_name: string;
  disease_name: string | null;
  confidence: number | null;
  symptoms: string[] | null;
  treatment: string | null;
  image_url: string | null;
  is_healthy: boolean;
  created_at: string;
}

export const usePlantScans = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: scans = [], isLoading } = useQuery({
    queryKey: ["plant_scans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("plant_scans")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as PlantScan[];
    },
    enabled: !!user,
  });

  const saveScanMutation = useMutation({
    mutationFn: async (scan: Omit<PlantScan, "id" | "user_id" | "created_at">) => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("plant_scans")
        .insert({
          ...scan,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plant_scans"] });
      toast.success("Scan saved successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to save scan: ${error.message}`);
    },
  });

  const deleteScanMutation = useMutation({
    mutationFn: async (scanId: string) => {
      const { error } = await supabase
        .from("plant_scans")
        .delete()
        .eq("id", scanId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plant_scans"] });
      toast.success("Scan deleted");
    },
    onError: (error) => {
      toast.error(`Failed to delete scan: ${error.message}`);
    },
  });

  return {
    scans,
    isLoading,
    saveScan: saveScanMutation.mutate,
    deleteScan: deleteScanMutation.mutate,
    isSaving: saveScanMutation.isPending,
  };
};
