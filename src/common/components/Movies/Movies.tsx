import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { avengersEndgame } from "@/common/utils/searchObj";
import { VStack, Image, Box, Text, Flex, Wrap } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

function Movies() {
  const [movies, setMovies] = useState<Movie[]>(avengersEndgame.Search);
  const { isLoading, isError, data, error } = useQuery("movies", async () => {
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    //     "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    //   },
    // };
    // W/ Axios
    // const response = await axios.get(
    //   "https://movie-database-alternative.p.rapidapi.com/",
    //   {
    //     params: { s: "Avengers Endgame", r: "json", page: "1" },
    //     headers: {
    //       "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    //       "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    //     },
    //   }
    // );
    // const { data } = await axios.get(
    //   "/api/movies?searchTerm=Avengers%20Endgame"
    // );
    // console.log(data);
    // const res = await fetch(
    //   "https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1",
    //   options
    // );
    // const response = await res.json();
    // try {
    // setMovies(response.data.Search);
    // console.log("res: ", response);
    // } catch (error) {
    //   console.error(error);
    // }
    // console.log("res: ", response.data);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Wrap spacing={5} justify="center">
      {movies.map((movie) => (
        <VStack
          key={movie.imdbID}
          borderWidth="1px"
          borderRadius="md"
          width="100%"
          maxWidth="400px"
        >
          {movie.Poster === "N/A" || movie.Poster === "" ? (
            <Image
              boxSize="200px"
              src="No_image_available.png"
              alt={movie.Title}
              w="100%"
              h="100%"
            />
          ) : (
            <Image
              boxSize="200px"
              src={movie.Poster}
              alt={movie.Title}
              objectFit="contain"
              w="100%"
              h="100%"
            />
          )}
          <Box p="4">
            <Text fontSize="xl" fontWeight="bold" mb="2">
              {movie.Title}
            </Text>
            <Flex align="center" justify="space-between">
              <Text fontSize="md" color="gray.500">
                {movie.Year}
              </Text>
              <StarIcon color="yellow.500" boxSize="4" />
            </Flex>
          </Box>
        </VStack>
      ))}
    </Wrap>
  );
}

export default Movies;
