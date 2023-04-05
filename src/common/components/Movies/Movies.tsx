import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Movie } from "@/common/types/types";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import DisplayMovies from "@/common/components/DisplayMovies/DisplayMovies";
import useDebounce from "@/common/hooks/useDebounce";
import Pagination from "@/common/components/Pagination/Pagination";

interface MoviesProps {
  searchTerm: string;
}

function Movies({ searchTerm }: MoviesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearchQuery = useDebounce(searchTerm, 2000);

  const getMovies = async (page: number) => {
    try {
      const response = await axios.get(
        "https://movie-database-alternative.p.rapidapi.com/",
        {
          params: {
            s: debouncedSearchQuery,
            r: "json",
            page: page,
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
          },
        }
      );
      console.log("response.data.Search: ", response.data.Search);
      return {
        Search: response.data.Search,
        totalResults: response.data.totalResults,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, isLoading, isError } = useQuery(
    ["movies", debouncedSearchQuery, currentPage],
    () => getMovies(currentPage)
  );

  useEffect(() => {
    if (data) {
      const totalPages = Math.ceil(Number(data.totalResults) / 10); // 10 results per page
      setTotalPages(totalPages);
    }
  }, [data]);

  function handleGoToPage(page: number) {
    setCurrentPage(page);
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
      localStorage.setItem(
        "localStorageMovies",
        JSON.stringify([favoriteMovie])
      );
    }
    // If 'movie' is in localStorage, add current movie to the array
    else {
      if (
        !movies.some(
          (storedMovie: Movie) => storedMovie.imdbID === movie.imdbID
        )
      ) {
        movies.push(favoriteMovie);
        localStorage.setItem("localStorageMovies", JSON.stringify(movies));
      } else {
        console.log("Movie already exists in Bookmarks.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box>
      {!data?.Search ? (
        <Flex align="center" justify="center" mt="4">
          Search Movies
        </Flex>
      ) : (
        <>
          <DisplayMovies
            movies={data.Search}
            handleAddBookmark={handleAddBookmark}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={handleGoToPage}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default Movies;
