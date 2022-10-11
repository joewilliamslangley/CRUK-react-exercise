import { Link, Loader, Text, Box, Heading } from "@cruk/cruk-react-components";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";
import useReturnContent from "../../hooks/useReturnContent";

type ResultsProps = {
  searchParams: NasaSearchParams,
  onLoad: (status: boolean) => void
};

export const Results = ({ searchParams, onLoad }: ResultsProps) => {
  const { data, isLoading } = useNasaQuery(searchParams)
  const queryResults = useReturnContent(data)
  const queryInfo = data?.collection.items.map((item) => ({
    title: item.data[0]?.title,
    description: item.data[0]?.description,
    nasaId: item.data[0]?.nasa_id
  }))
  const contentLoading = queryResults.some(query => query.isLoading)
  onLoad(isLoading || contentLoading)

  if (isLoading || contentLoading) {
    return <Loader />
  }

  if (queryResults.length === 0) {
    return <Text>Sorry, your reach did not return any results</Text>
  }

  return (
    <Box paddingVertical="m">
      <Heading h3>Results</Heading>
      {queryResults?.slice(0, 10).map((query, index) => (
        <Box
          key={queryInfo?.[index]?.nasaId}
          marginBottom="s">
          <Link
            href={query.data[0]}
            appearance="primary"
            target="_blank"
          >
            {queryInfo?.[index]?.title}
          </Link>
          <Text>
            {queryInfo?.[index]?.description.length > 500 ? `${queryInfo?.[index]?.description.substring(0, 500)}...` : queryInfo?.[index]?.description}
          </Text>
        </Box>
      ))}
    </Box>
  )
}




export default Results;
