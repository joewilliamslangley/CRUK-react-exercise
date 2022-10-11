import { useState } from "react";
import { Heading, Box, TextField, Select, Button } from "@cruk/cruk-react-components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { NasaSearchParams } from "../../types";
import Results from "../Results";

const schema = yup.object().shape({
  keywords: yup.string().min(2, "Keywords must have at least 2 characters.").max(50, "keywords must have at most 50 characters.").required(),
  yearStart: yup.number().typeError("Please enter a valid number.").integer("Please enter a valid number.").min(1900, "Year start must be after 1900.").max(new Date().getFullYear(), "Year start must not be in the future.").notRequired(),
  mediaType: yup.string().oneOf(['audio', 'video', 'image'], "Please select a media type.").required("Please select a media type.")
});

// interface IFormInputs {
//   keywords: string,
//   yearStart: number,
//   mediaType: string
// }

export const HomePage = () => {
  const exampleParam: NasaSearchParams = {
    keywords: "moon",
    yearStart: 2000,
    mediaType: "image",
  };

  const [params, setParams] = useState(exampleParam)
  const [isSearch, setIsSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm<NasaSearchParams>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: NasaSearchParams) => {
    setParams(data)
    setIsSearch(true)
  }

  const onLoad = (status: boolean) => {
    setIsLoading(status)
  }

  return (
    <Box marginTop="s" paddingTop="s">
      <Heading h1>React Exercise</Heading>

      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="keywords"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) =>
            <TextField
              onChange={onChange}
              value={value}
              label="Keywords"
              required
              hasError={typeof errors.keywords !== "undefined" }
              errorMessage={errors.keywords?.message}
            />}
        />

        <Controller
          name="mediaType"
          control={control}
          defaultValue="image"
          render={({ field: { onChange } }) =>
            <Select
              onChange={onChange}
              label="Media Type"
              required
              hasError={typeof errors.mediaType !== "undefined" }
              errorMessage={errors.mediaType?.message}
            >
              <option disabled selected value=""> -- select an option -- </option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </Select>
            }
        />

        <Controller
          name="yearStart"
          control={control}
          render={({ field: { value, onChange } }) =>
            <TextField
              onChange={onChange}
              value={value}
              label="Minimum Year"
              hasError={typeof errors.yearStart !== "undefined" }
              errorMessage={errors.yearStart?.message}
            />}
        />

        <Button
          appearance="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {isSearch ? <Results searchParams={params} onLoad={onLoad}/> : null}
    </Box>
  );
};

export default HomePage;
