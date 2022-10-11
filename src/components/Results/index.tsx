import { Link, Loader } from "@cruk/cruk-react-components";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";
import useReturnContent from "../../hooks/useReturnContent";

type ResultsProps = {
  searchParams: NasaSearchParams,
  onLoad: (status: boolean) => void
};

export const Results = ({ searchParams, onLoad }: ResultsProps) => {
  const { data } = useNasaQuery(searchParams)
  const queryResults = useReturnContent(data)
  const isLoading = queryResults.some(query => query.isLoading)
  onLoad(isLoading)


  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      {queryResults?.map((query) => (
        <Link href={query.data[0]} key={query.data[0]}>{query.data[0]}</Link>
      ))}
    </div>
  )
}




export default Results;
