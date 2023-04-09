# Movie Marker

Movie Marker is a web application that allows users to search for movies and bookmark their favorite ones for later viewing.

Here is the Live Site: https://movie-marker.vercel.app/

## Getting Started

To get started with the app, first clone the repository:

```
git clone git@github.com:jolouie7/movie-marker.git
```

Then, navigate into the project directory and install the necessary dependencies:

```
cd movie-marker
npm install
```

After installing the dependencies, start the development server:

```
npm run dev
```

The app should now be running at http://localhost:3000.

## Features

- **Search for movies**: Users can search for movies using the search bar at the top of the page. Results are displayed in a grid of movie posters, with each poster displaying the movie's title, year of release, and a bookmark button.

- **Bookmark movies**: Users can bookmark movies for later viewing by clicking on the bookmark button on the movie poster.

- **View bookmarks**: Users can view their bookmarked movies by clicking on the "Bookmarks" link in the navigation bar.

- **Remove bookmarks**: Users can remove bookmarks by clicking on the "remove" button on the bookmarked movie poster.

## Testing

The app includes a suite of Jest and React Testing Library tests to ensure that the components and functions are working correctly. To run the tests, use the command:

```
npm run test
```

## Technologies Used

- Next.js
- Chakra UI
- Typescript
- React Query

## Future Features

- Notes for why you bookmarked a movie
- Add a database
- A share link to share your list of bookmarked movies
- Dark mode
