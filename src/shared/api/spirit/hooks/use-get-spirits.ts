import { useQuery } from "@tanstack/react-query";
import { spiritApi } from "../api";
import { spiritKeys } from "../query-keys";

export const useGetSpirits = () => {
  return useQuery({
    queryKey: spiritKeys.all,
    queryFn: () => spiritApi.getAll().then((res) => res.data),
  });
};
