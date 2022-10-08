import { Text } from "@cruk/cruk-react-components";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";

type ResultsProps = {
  searchParams: NasaSearchParams;
};

export const Results = ({ searchParams }: ResultsProps) => {
  const { data, error, isLoading } = useNasaQuery(searchParams);
  const searchItems = data?.collection.items
  // searchItems?.slice(0,10).forEach((item) => {
  //   console.log(item.href)
  // })

  if (searchItems !== undefined) {
    return (
      <div>
        {searchItems?.slice(0,10).map((item) => (
          <Text>{item.href}</Text>
        ))}
      </div>
    )
  }
};

export default Results;
