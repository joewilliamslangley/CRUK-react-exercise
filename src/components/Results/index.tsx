import { Link, Loader, Text, Box, Heading } from "@cruk/cruk-react-components";
import { ApiResponseData } from "../../types";

type ResultsProps = {
  mediaData: ApiResponseData
  isContentLoading: boolean,
};

export const Results = ({ mediaData, isContentLoading }: ResultsProps) => {
  const renderResults = () => {
    if (isContentLoading) {
      return (
        <Box paddingVertical="m">
          <Loader />
        </Box>
      )
    }
    if (typeof mediaData === 'undefined' || mediaData?.length === 0) {
      return (
        <Box marginBottom="s">
          <Text>Sorry, your search did not return any results.</Text>
        </Box>
        )
    }
    return mediaData?.slice(0, 10).map((query) => (
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

  const abbreviateDescription = (text: string | undefined ) => {
    if (typeof text === "undefined") {
      return ''
    }
    if (text.length > 500) {
      return `${text.substring(0,500)}...`
    }
    return text
  }

  return (
    <Box paddingVertical="m">
      <Heading h3>Results</Heading>
      {renderResults()}
    </Box>
  )
}




export default Results;
