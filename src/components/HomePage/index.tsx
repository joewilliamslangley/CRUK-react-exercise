import { useState } from "react";
import { Heading, Box } from "@cruk/cruk-react-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { NasaSearchParams } from "../../types";
import Results from "../Results";

const schema = yup.object().shape({
  keywords: yup.string().min(2, "keywords must have at least 2 characters.").max(50, "keywords must have at most 50 characters.").required(),
  yearStart: yup.number().typeError("Please enter a valid number.").integer("Please enter a valid number.").min(1900, "Year start must be after 1900.").max(new Date().getFullYear(), "Year start must not be in the future.").notRequired(),
  mediaType: yup.string().oneOf(['audio', 'video', 'image'], "Please select a media type.").required("Please select a media type.")
});

interface IFormInputs {
  keywords: string,
  yearStart: number,
  mediaType: string
}

export const HomePage = () => {
  const [params, setParams] = useState({})
  const [isSearch, setIsSearch] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: object) => {
    setParams(data)
    setIsSearch(true)
  }

  const exampleParam: NasaSearchParams = {
    keywords: "moon",
    yearStart: 2000,
    mediaType: "image",
  };

  return (
    <Box marginTop="s" paddingTop="s">
      <Heading h1>React Exercise</Heading>

      <form onSubmit={handleSubmit(submitForm)}>

        <input type="text" placeholder="Keywords" {...register('keywords')}/>
        <p>{errors.keywords?.message}</p>
        <select {...register('mediaType')}>
          <option disabled selected value> -- select an option -- </option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
        <p>{errors.mediaType?.message}</p>
        <input type="text" {...register('yearStart')} placeholder="Minimum year" />
        <p>{errors.yearStart?.message}</p>
        <input type="submit" />

      </form>

      {isSearch ? <Results searchParams={params}/> : null}
    </Box>
  );
};

export default HomePage;
