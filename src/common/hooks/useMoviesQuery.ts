import axios from "axios";
import { useQuery } from "react-query";

export const useMoviesQuery = (
  debouncedSearchQuery: string,
  currentPage: number
) => {
  const results = useQuery(
    ["movies", debouncedSearchQuery, currentPage],
    async () => {
      try {
        const response = await axios.get(
          "https://movie-database-alternative.p.rapidapi.com/",
          {
            params: {
              s: debouncedSearchQuery,
              r: "json",
              page: currentPage,
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
    }
  );
  return results;
};
