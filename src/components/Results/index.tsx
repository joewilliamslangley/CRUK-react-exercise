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

    if (typeof apiResultData === 'undefined' || apiResultData?.length === 0) {
      return (
        <Box paddingVertical="m">
          <Text>Sorry, your search did not return any results</Text>
        </Box>
        )
    }

    return apiResultData?.slice(0, 10).map((query) => (
      <Box
        key={query.nasaId}
        marginBottom="s">
        <Link
          href={query.href}
          appearance="primary"
          target="_blank"
        >
          {query.title}
        </Link>
        <Text>
          {abbreviateDescription(query.description)}
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
