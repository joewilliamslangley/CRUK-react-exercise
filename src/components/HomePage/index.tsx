import { useState, SyntheticEvent } from "react";
import { Heading, Box, TextField, Select, Button } from "@cruk/cruk-react-components";
import { useForm, Controller } from "react-hook-form";
import { UseQueryResult } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useNasaQuery from "../../hooks/useNasaQuery";
import { NasaResponse, NasaSearchParams } from "../../types";
import useReturnContent from "../../hooks/useReturnContent";
import Results from "../Results";


const schema = yup.object().shape({
  keywords:
    yup
      .string()
      .min(2, "Keywords must have at least 2 characters.")
      .max(50, "keywords must have at most 50 characters.")
      .required(),
  yearStart:
    yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .nullable()
      .typeError("Please enter a valid number.")
      .integer("Please enter a valid number.")
      .min(1900, "Year start must be after 1900.")
      .max(new Date().getFullYear(), "Year start must not be in the future."),
  mediaType:
    yup
      .string()
      .oneOf(['audio', 'video', 'image'], "Please select a media type.")
      .required("Please select a media type.")
});

function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    if (promise) {
      promise(event).catch(() => null);
    }
  };
}

export const HomePage = () => {
  const exampleParam: NasaSearchParams = {
    keywords: "moon",
    yearStart: 2000,
    mediaType: "image",
  };

  const [params, setParams] = useState(exampleParam)
  const [isSearch, setIsSearch] = useState(false)

  const { data, isLoading } = useNasaQuery(params, isSearch)
  const queryResults = useReturnContent(data)
  const contentLoading = queryResults.some(query => query.isLoading) || isLoading

  const retrieveDataFromApiResults = (apiData: NasaResponse | undefined, apiQueryResults: UseQueryResult<string[], unknown>[]) => {
    const queryHrefs = apiQueryResults.map(query => (
      query.data?.[0]
    ))
    const queryData = apiData?.collection.items.map((item, index) => ({
      title: item.data[0]?.title,
      description: item.data[0]?.description,
      nasaId: item.data[0]?.nasa_id,
      href: queryHrefs[index]
    }))
    return queryData
  }

  const { handleSubmit, control, formState: { errors } } = useForm<NasaSearchParams>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((searchParams: NasaSearchParams) => {
    setParams(searchParams)
    setIsSearch(true)
  })

  return (
    <Box marginTop="s" paddingTop="s">
      <Heading h1>React Exercise</Heading>

      <form onSubmit={onPromise(onSubmit)}>
        <Controller
          name="keywords"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) =>
            <Box marginBottom="s">
              <TextField
                onChange={onChange}
                value={value}
                label="Keywords"
                required
                hasError={typeof errors.keywords !== "undefined" }
                errorMessage={errors.keywords?.message}
              />
            </Box>
          }
        />

        <Controller
          name="mediaType"
          control={control}
          defaultValue="image"
          render={({ field: { onChange } }) =>
            <Box marginBottom="s">
              <Select
                onChange={onChange}
                label="Media Type"
                defaultValue=""
                required
                hasError={typeof errors.mediaType !== "undefined" }
                errorMessage={errors.mediaType?.message}
              >
                <option disabled value=""> -- select an option -- </option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </Select>
            </Box>
          }
        />

        <Controller
          name="yearStart"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Box marginBottom="s">
              <TextField
                onChange={onChange}
                value={value}
                label="Minimum Year"
                hasError={typeof errors.yearStart !== "undefined" }
                errorMessage={errors.yearStart?.message}
              />
            </Box>
          }
        />

        <Button
          appearance="primary"
          type="submit"
          disabled={contentLoading && isSearch}
        >
          {contentLoading && isSearch ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {isSearch ? <Results apiResultData={retrieveDataFromApiResults(data, queryResults)} contentLoading={contentLoading}/> : null}
    </Box>
  );
};

export default HomePage;
