# Project Overview

**Films Lists** is a site to store all your movies and series in one place and easily find where to watch them. Unlike other sites, Films Lists addresses some common issues:

1. **Availability**: Often, you may find that a specific movie or series is unavailable for various reasons, including its absence from the platform's library.
2. **Language and genre limitations**: Websites may lack desired language dubs or specific genres.

**Films Lists** resolves these problems - website contains lists of your movies and series with information about them, along with a list of links found on your sites that lead to the respective pages for that movie or series where you can watch it. Therefore, you can avoid relying on just one site and simply navigate to the page with the movie or series by clicking on one of the provided links. This allows you to quickly navigate to the movie or series page on your preferred sites and choose the option that suits your viewing preferences.

## Start using:
  - <a href="https://docs.google.com/document/d/1UrjssVFoUaaIBy29jNmxIzbs1b3pSWQh6I6ECwx6emA" target="_blank">Guide for start</a>
  - <a href="https://docs.google.com/presentation/d/1w8oCRWQ_VCIR8ftrq1Ig2xDFtACX9uAK8yNiOXL4keA" target="_blank">Presentation</a>

## Main Features
### Movies and Series:
- **Search**: Find movies and series using a search or on discover page.
- **Search on sites**: In the settings page fill in search API form fields following the provided <a href="https://docs.google.com/document/d/1UrjssVFoUaaIBy29jNmxIzbs1b3pSWQh6I6ECwx6emA" target="_blank">guide</a> and add a few websites. After you can check the availability of movies or series on these sites by clicking the “Search on sites” button.
- **Add to lists**: Add movies and series to various lists.
- **Delete from lists**: Delete movies and series from lists.
- **Leave notes**: Add personal notes to your movies or series such as favorite quotes or track the numbers of the last watched season and episode for series.

### Lists:
  - Create new lists.
  - Change list title.
  - Change lists order.
  - Delete lists.
  - Default lists are immutable.

### Manage Sites: 
  - Add new sites.
  - Change sites order.
  - Delete sites.
  - Update sites.

### User Authentication:
  - Sign Up, Sign In

## Tech Stack:
- **React**: Used for building the user interface.
- **Redux**: Manage the application's state.
- **TypeScript**: Chosen for its ability to add static typing to JavaScript, which helps in catching errors early during development and improving code quality.
- **Tailwind CSS**: Utilized for styling the application.
- **Supabase**: Used as the backend service that provides database and authentication.
- **Jest**: For testing the application.
- **Google Search API**: Integrated to perform search for movies and series across multiple sites.
- **TMDB API**: For getting information about movies and series.
