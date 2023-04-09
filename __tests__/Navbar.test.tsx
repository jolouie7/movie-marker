import { render, screen } from "@testing-library/react";
import Navbar from "@/common/components/Navbar/Navbar";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Navbar component", () => {
  it("renders Navbar without errors", () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole("banner");
    expect(navbarElement).toBeInTheDocument();
  });

  it("renders Navbar logo and links correctly", () => {
    render(<Navbar />);
    const logoElement = screen.getByText("Movie Marker");
    expect(logoElement).toBeInTheDocument();

    const homeLinkElement = screen.getByRole("link", { name: /home/i });
    expect(homeLinkElement).toHaveAttribute("href", "/");

    const bookmarksLinkElement = screen.getByRole("link", {
      name: /bookmarks/i,
    });
    expect(bookmarksLinkElement).toHaveAttribute("href", "/bookmarks");
  });

  it("renders Navbar search bar correctly", () => {
    render(<Navbar />);
    const searchBarElement = screen.getByPlaceholderText("Search...");
    expect(searchBarElement).toBeInTheDocument();
  });

  it("opens Drawer component on hamburger icon click", () => {
    render(<Navbar />);
    const hamburgerIconElement = screen.getByRole("button", {
      name: /open menu/i,
    });
    expect(hamburgerIconElement).not.toBeDisabled();
    userEvent.click(hamburgerIconElement);
    const drawerTitleElement = screen.getByText("Movie Marker");
    expect(drawerTitleElement).toBeInTheDocument();
  });

  it("renders Drawer links correctly", () => {
    render(<Navbar />);
    const hamburgerIconElement = screen.getByRole("button", {
      name: /open menu/i,
    });
    expect(hamburgerIconElement).not.toBeDisabled();
    userEvent.click(hamburgerIconElement);
    const homeLinkElement = screen.getByRole("link", { name: /home/i });
    expect(homeLinkElement).toHaveAttribute("href", "/");
    const bookmarksLinkElement = screen.getByRole("link", {
      name: /bookmarks/i,
    });
    expect(bookmarksLinkElement).toHaveAttribute("href", "/bookmarks");
  });
});
