const API_KEY = '0ac2dd6e01833f7f8b1c57b368edaf18'; 
const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const limit = 40;

function fetchMovies() {
    const promises = [];

    // Fetching movies from page 1 and page 2
    for (let page = 1; page <= 2; page++) {
        promises.push(fetch(`${API_URL}?api_key=${API_KEY}&language=en-US&page=${page}`)
            .then(response => response.json()));
    }

    Promise.all(promises)
        .then(results => {
            // Combining movies from both pages
            const allMovies = results.flatMap(result => result.results);
            const limitedMovies = allMovies.slice(0, limit); // Limit to 40 movies
            displayMovies(limitedMovies);
        })
        .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = '';

    if (movies.length === 0) {
        moviesContainer.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie flex p-2 h-[200px] content-center justify-self-content';

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : 'https://via.placeholder.com/100x150';

        movieElement.appendChild(moviePoster);
        moviesContainer.className = 'grid grid-cols-8';
        moviesContainer.appendChild(movieElement);
    });
}

fetchMovies();
