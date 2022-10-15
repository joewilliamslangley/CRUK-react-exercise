import { Link, Loader, Text, Box, Heading } from "@cruk/cruk-react-components";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";
import useReturnContent from "../../hooks/useReturnContent";

type ResultsProps = {
  searchParams: NasaSearchParams,
  onLoad: (status: boolean) => void
};

export const Results = ({ searchParams, onLoad }: ResultsProps) => {
  const abbreviateDescription = (text: string | undefined ) => {
    if (typeof text === "undefined") {
      return ''
    }
    if (text.length > 500) {
      return `${text.substring(0,500)}...`
    }
    return text
  }

  const { data, isLoading } = useNasaQuery(searchParams)
  const queryResults = useReturnContent(data)
  const queryData = queryResults.map(query => (
    query.data
  ))
  const queryInfo = data?.collection.items.map((item) => ({
    title: item.data[0]?.title,
    description: item.data[0]?.description,
    nasaId: item.data[0]?.nasa_id
  }))
  const contentLoading = queryResults.some(query => query.isLoading)
  onLoad(isLoading || contentLoading)

  if (isLoading || contentLoading) {
    return (
      <Box paddingVertical="m">
        <Loader />
      </Box>
    )
  }

  if (queryResults.length === 0) {
    return (
      <Box paddingVertical="m">
        <Text>Sorry, your reach did not return any results</Text>
      </Box>
      )
  }

  return (
    <Box paddingVertical="m">
      <Heading h3>Results</Heading>
      {queryData?.slice(0, 10).map((query, index) => (
        <Box
          key={queryInfo?.[index]?.nasaId}
          marginBottom="s">
          <Link
            href={query?.[0]}
            appearance="primary"
            target="_blank"
          >
            {queryInfo?.[index]?.title}
          </Link>
          <Text>
            {abbreviateDescription(queryInfo?.[index]?.description)}
          </Text>
        </Box>
      ))}
    </Box>
  )
}




export default Results;
