import React, { useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Movie } from "@/common/types/types";
import { Box, Flex } from "@chakra-ui/react";
import DisplayMovies from "@/common/components/DisplayMovies/DisplayMovies";
import useDebounce from "@/common/hooks/useDebounce";

interface MoviesProps {
  searchTerm: string;
  page: string;
}

const handleAddBookmark = (movie: Movie) => {
  console.log("movie: ", movie.imdbID);
  const favoriteMovie: Movie = {
    Title: movie.Title,
    Year: movie.Year,
    Type: movie.Type,
    Poster: movie.Poster,
    imdbID: movie.imdbID,
    watched: false,
  };
  const movies: Movie[] = JSON.parse(
    localStorage.getItem("localStorageMovies") || "[]"
  );
  // If 'movie' is not in localStorage, add it
  if (movies.length === 0) {
    localStorage.setItem("localStorageMovies", JSON.stringify([favoriteMovie]));
  }
  // If 'movie' is in localStorage, add current movie to the array
  else {
    if (
      !movies.some((storedMovie: Movie) => storedMovie.imdbID === movie.imdbID)
    ) {
      movies.push(favoriteMovie);
      localStorage.setItem("localStorageMovies", JSON.stringify(movies));
    } else {
      console.log("Movie already exists in Bookmarks.");
    }
  }
};

function Movies({ searchTerm, page }: MoviesProps) {
  const debouncedSearchQuery = useDebounce(searchTerm, 2000);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        "https://movie-database-alternative.p.rapidapi.com/",
        {
          params: {
            s: `${debouncedSearchQuery}`,
            r: "json",
            page: 1,
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
          },
        }
      );
      console.log("response.data.Search: ", response.data.Search);
      return response.data.Search;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, isLoading, isError } = useQuery(
    ["movies", debouncedSearchQuery],
    getMovies
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box>
      {!data ? (
        <Flex align="center" justify="center" mt="4">
          Search Movies
        </Flex>
      ) : (
        <DisplayMovies movies={data} handleAddBookmark={handleAddBookmark} />
      )}
    </Box>
  );
}

export default Movies;
