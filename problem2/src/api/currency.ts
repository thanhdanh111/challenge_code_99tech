import useSWR from "swr";
import { fetcher } from "../utils/axios";
import { useMemo } from "react";
import type { PriceData } from "../types";



export function useGetCurrenciesData() {

  const { data, error, isLoading } = useSWR<PriceData[]>('/prices.json', fetcher);

  const memoizedValue = useMemo(
    () => ({
      currencies: data,
      isLoading,
      error,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
}
