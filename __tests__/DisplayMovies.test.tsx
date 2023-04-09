import { render, screen, waitFor } from "@testing-library/react";
import DisplayMovies from "@/common/components/DisplayMovies/DisplayMovies";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
  }),
}));

describe("DisplayMovies component", () => {
  const movies = [
    {
      imdbID: "1",
      Title: "Movie 1",
      Year: "2020",
      Poster: "https://example.com/movie1.jpg",
      Type: "movie",
    },
    {
      imdbID: "2",
      Title: "Movie 2",
      Year: "2021",
      Poster: "https://example.com/movie2.jpg",
      Type: "movie",
    },
    {
      imdbID: "3",
      Title: "Movie 3",
      Year: "2019",
      Poster: "https://example.com/movie3.jpg",
      Type: "movie",
    },
  ];

  it("renders without errors", () => {
    render(<DisplayMovies movies={movies} />);
    expect(screen.getByRole("img", { name: /Movie 1/i })).toBeInTheDocument();
  });

  it("displays the correct number of movies", () => {
    render(<DisplayMovies movies={movies} />);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("displays a fallback image for movies without a poster", () => {
    const noPosterMovies = [
      {
        imdbID: "1",
        Title: "Movie 1",
        Year: "2020",
        Poster: "N/A",
        Type: "movie",
      },
      {
        imdbID: "2",
        Title: "Movie 2",
        Year: "2021",
        Poster: "",
        Type: "movie",
      },
    ];
    render(<DisplayMovies movies={noPosterMovies} />);
    const moviePoster1 = screen.getByRole("img", { name: /Movie 1/i });
    const moviePoster2 = screen.getByRole("img", { name: /Movie 2/i });
    expect(moviePoster1).toHaveAttribute("src", "No_image_available.png");
    expect(moviePoster2).toHaveAttribute("src", "No_image_available.png");
  });

  it("correctly handles bookmarking a movie", async () => {
    const oneMovie = [
      {
        imdbID: "1",
        Title: "Movie 1",
        Year: "2020",
        Poster: "https://example.com/movie1.jpg",
        Type: "movie",
      },
    ];
    const handleAddBookmark = jest.fn();
    render(
      <DisplayMovies movies={oneMovie} handleAddBookmark={handleAddBookmark} />
    );
    const bookmarkButton = screen.getAllByRole("button", {
      name: /bookmark/i,
    })[0];
    userEvent.click(bookmarkButton);
    await waitFor(() => expect(handleAddBookmark).toHaveBeenCalledTimes(1));
    expect(handleAddBookmark).toHaveBeenCalledWith(oneMovie[0]);
  });
});
