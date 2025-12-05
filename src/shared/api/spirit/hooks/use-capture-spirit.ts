"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpiritStatus, type Spirit } from "@/shared/types";
import { spiritApi } from "../api";
import { spiritKeys } from "../query-keys";
import { toast } from "react-toastify";

export const useCaptureSpirit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (spiritId: string) => {
      try {
        const response = await spiritApi.capture(spiritId);
        return response.data;
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Не удалось поймать духа";

        throw new Error(message);
      }
    },
    onMutate: async (spiritId) => {
      const previousSpirits = queryClient.getQueryData<Spirit[]>(
        spiritKeys.all
      );

      queryClient.setQueryData<Spirit[]>(spiritKeys.all, (old) =>
        old?.map((spirit) =>
          spirit.id === spiritId
            ? { ...spirit, status: SpiritStatus.Captured }
            : spirit
        )
      );

      return { previousSpirits };
    },
    onSuccess: (data, spiritId, context) => {
      toast(`${data.message || "Дух успешно пойман!"}`, {
        type: "success",
        position: "top-right",
        theme: "dark",
      });
    },
    onError: (error, spiritId, context) => {
      if (context?.previousSpirits) {
        queryClient.setQueryData(spiritKeys.all, context.previousSpirits);
      }

      const errorMessage =
        error instanceof Error ? error.message : "Не удалось поймать духа";

      toast(errorMessage, {
        type: "error",
        position: "top-right",
        theme: "dark",
      });

      console.error(" Ошибка при поимке духа:", errorMessage);
    },
  });
};
