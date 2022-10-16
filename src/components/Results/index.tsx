import { Link, Loader, Text, Box, Heading } from "@cruk/cruk-react-components";
import { ApiResponseData } from "../../types";

type ResultsProps = {
  apiResultData: ApiResponseData
  contentLoading: boolean,
};

export const Results = ({ apiResultData, contentLoading }: ResultsProps) => {
  const abbreviateDescription = (text: string | undefined ) => {
    if (typeof text === "undefined") {
      return ''
    }
    if (text.length > 500) {
      return `${text.substring(0,500)}...`
    }
    return text
  }

  const renderResults = () => {
    if (contentLoading) {
      return (
        <Box paddingVertical="m">
          <Loader />
        </Box>
      )
    }

    if (apiResultData.queryHrefs.length === 0) {
      return (
        <Box paddingVertical="m">
          <Text>Sorry, your reach did not return any results</Text>
        </Box>
        )
    }

    return apiResultData.queryHrefs?.slice(0, 10).map((query, index) => (
      <Box
        key={apiResultData.queryData?.[index]?.nasaId}
        marginBottom="s">
        <Link
          href={query?.[0]}
          appearance="primary"
          target="_blank"
        >
          {apiResultData.queryData?.[index]?.title}
        </Link>
        <Text>
          {abbreviateDescription(apiResultData.queryData?.[index]?.description)}
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
