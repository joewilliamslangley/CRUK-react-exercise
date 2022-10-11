import { useQueries } from "@tanstack/react-query";
import { NasaResponse } from "../types";

export const useReturnContent = (data: NasaResponse | undefined) => {
  let i = 0
  let length

  typeof data !== 'undefined' ? length = data.collection.items.length : length = 0

  const contentQueries = []

  while (i < length) {
    const href = data?.collection.items[i]?.href
    contentQueries.push({
      queryKey: [href],
      queryFn: () => fetch(String(href)).then((res) => res.json()),
      enabled: !!href
    })
    i += 1
  }

  console.log(contentQueries)
  return useQueries({queries: contentQueries})
}

export default useReturnContent;
