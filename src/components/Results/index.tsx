import { Link, Loader, Text } from "@cruk/cruk-react-components";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";
import useReturnContent from "../../hooks/useReturnContent";

type ResultsProps = {
  searchParams: NasaSearchParams,
  onLoad: (status: boolean) => void
};

export const Results = ({ searchParams, onLoad }: ResultsProps) => {
  const { data, isLoading } = useNasaQuery(searchParams)
  console.log(data)
  const queryResults = useReturnContent(data)
  const contentLoading = queryResults.some(query => query.isLoading)
  onLoad(isLoading)

  if (isLoading || contentLoading) {
    return <Loader />
  }

  if (queryResults.length === 0) {
    return <Text>Sorry, your reach did not return any results</Text>
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
