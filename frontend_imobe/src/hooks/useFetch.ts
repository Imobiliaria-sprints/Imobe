import useSWR from "swr";
import { api } from "../services/api";

export const useFetch = <Data = any, Error = any>(
  url: string,
  token?: string
) => {
  const { data, error, mutate, isValidating } = useSWR<Data, Error>(
    url,
    async (url) => {
      const { data } = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    }
  );

  return { data, error, mutate, isValidating };
};
