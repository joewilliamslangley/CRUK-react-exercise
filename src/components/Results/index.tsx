import { Link, Loader, Text, Box, Heading } from "@cruk/cruk-react-components";
import { UseQueryResult } from "@tanstack/react-query";
import { NasaResponse } from "../../types";

type ResultsProps = {
  apiData: NasaResponse | undefined
  queryResults: UseQueryResult<string[], unknown>[],
  contentLoading: boolean,
};

export const Results = ({ queryResults, contentLoading, apiData }: ResultsProps) => {
  const abbreviateDescription = (text: string | undefined ) => {
    if (typeof text === "undefined") {
      return ''
    }
    if (text.length > 500) {
      return `${text.substring(0,500)}...`
    }
    return text
  }

  const queryData = queryResults.map(query => (
    query.data
  ))
  const queryInfo = apiData?.collection.items.map((item) => ({
    title: item.data[0]?.title,
    description: item.data[0]?.description,
    nasaId: item.data[0]?.nasa_id
  }))


  const renderResults = () => {
    if (contentLoading) {
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

    return queryData?.slice(0, 10).map((query, index) => (
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
    ))
  }

  return (
    <Box paddingVertical="m">
      <Heading h3>Results</Heading>
      {renderResults()}
    </Box>
  )
}




export default Results;
