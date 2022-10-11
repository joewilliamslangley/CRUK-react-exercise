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

  if (error) {
    return <Text>{error.message}</Text>
  }

  // let hrefs = [];
  // console.log(searchItems)
  // searchItems?.slice(0,10).map((item) => {
  //   const { href } = item
  //   const query = useQuery([href], () =>
  //     fetch(href).then((res) => res.json())
  //   );
  //   if (query.isLoading) {
  //     return <Loader />
  //   }
  //   console.log(data)
  //   hrefs.push(query.data)
  // })
  return (
    <div>
      {searchItems?.slice(0,10).map((item) => (
        <Text key={item.href}>{item.href}</Text>
      ))}
    </div>
  )
}




export default Results;
