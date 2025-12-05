import { AxiosResponse } from "axios";
import { request } from "../axios";
import { Spirit } from "@/shared/types";

export const spiritApi = {
  capture: (spiritId: string) =>
    request.post("/api/spirits/capture", JSON.stringify({ spiritId })),
  getAll: () => request.get<Spirit[]>("/api/spirits"),
};
