const API_KEY = '0ac2dd6e01833f7f8b1c57b368edaf18'; // Replace with your TMDb API key
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function searchMovies() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetch(`${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => displayMovies(data.results))
            .catch(error => console.error('Error:', error));
    }
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
        movieElement.className = 'movie';

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : 'https://via.placeholder.com/100x150';
        movieElement.appendChild(moviePoster);

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-info';

        const movieTitle = document.createElement('h3');
        movieTitle.innerText = movie.title;
        movieInfo.appendChild(movieTitle);

        const movieOverview = document.createElement('p');
        movieOverview.innerText = movie.overview;
        movieInfo.appendChild(movieOverview);

        movieElement.appendChild(movieInfo);

        moviesContainer.appendChild(movieElement);
    });
}
