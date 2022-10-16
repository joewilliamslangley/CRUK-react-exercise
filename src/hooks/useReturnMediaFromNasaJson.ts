import { useQueries } from "@tanstack/react-query";
import { NasaResponse } from "../types";

export const useReturnMediaFromNasaJson = (data: NasaResponse | undefined) => {
  const contentQueries = []
  let i = 0
  let length
  typeof data !== 'undefined' ? length = data.collection.items.length : length = 0

  while (i < length) {
    const href = data?.collection.items[i]?.href
    contentQueries.push({
      queryKey: [href],
      queryFn: () => fetch(String(href)).then((res) => res.json()),
      enabled: !!href,
      select: (queryData: string[]) => queryData
    })
    i += 1
  }

  return useQueries({queries: contentQueries})
}

export default useReturnMediaFromNasaJson;
