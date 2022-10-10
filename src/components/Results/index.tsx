import { Text, Loader } from "@cruk/cruk-react-components";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";

type ResultsProps = {
  searchParams: NasaSearchParams,
  onLoad: (status: boolean) => void
};

export const Results = ({ searchParams, onLoad }: ResultsProps) => {
  const { data, error, isLoading } = useNasaQuery(searchParams);
  const searchItems = data?.collection.items
  onLoad(isLoading)
  // searchItems?.slice(0,10).forEach((item) => {
  //   console.log(item.href)
  // })
  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      {searchItems?.slice(0,10).map((item) => (
        <Text>{item.href}</Text>
      ))}
    </div>
  )
}




export default Results;
