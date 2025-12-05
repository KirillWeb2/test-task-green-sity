"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { SSEMessage } from "@/shared/types";
import { spiritKeys } from "../query-keys";

export const useSSEUpdates = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connect = () => {
      eventSource = new EventSource("/api/sse");

      eventSource.onmessage = (event) => {
        try {
          if (event.data === "connected") {
            console.log("SSE connected");
            return;
          }

          const message: SSEMessage = JSON.parse(event.data);

          if (message.type === "threat_update") {
            const { spiritId, newThreatLevel, timestamp } = message.data;

            queryClient.setQueryData(spiritKeys.all, (oldData: any) => {
              if (!oldData) return oldData;

              return oldData.map((spirit: any) =>
                String(spirit.id) === String(spiritId)
                  ? {
                      ...spirit,
                      threatLevel: newThreatLevel,
                      lastUpdate: timestamp,
                    }
                  : spirit
              );
            });
          }
        } catch (error) {
          console.error("SSE parse error:", error);
        }
      };

      eventSource.onerror = () => {
        console.error("SSE error, reconnecting...");
        if (eventSource) {
          eventSource.close();
        }
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [queryClient]);
};
