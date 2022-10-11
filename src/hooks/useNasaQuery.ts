import { useQuery } from "@tanstack/react-query";

import urlNasaSearch from "../services/nasa";
import { NasaResponse, NasaSearchParams } from "../types";

export const useNasaQuery = (params: NasaSearchParams) => {
  const urlNasaSearchUrl = urlNasaSearch(params);

  return useQuery<NasaResponse, Error>([urlNasaSearchUrl], () =>
    fetch(urlNasaSearchUrl).then((res) => res.json())
  );
};

export default useNasaQuery;
