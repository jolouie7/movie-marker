import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Home", () => {
  it("renders without crashing", () => {
    const client = new QueryClient();
    render(
      <QueryClientProvider client={client}>
        <Home />
      </QueryClientProvider>
    );

    const titleElement = screen.getByText(/Movie Marker/i);
    expect(titleElement).toBeInTheDocument();
  });
});
