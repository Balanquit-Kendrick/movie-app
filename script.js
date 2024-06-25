const API_KEY = '0ac2dd6e01833f7f8b1c57b368edaf18'; // Replace with your TMDb API key
const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const API_PAGE = 1;
const counter = 0;
const limit = 40;

async function searchMovies() {

    try {
        const response1 = await fetch(`${API_URL}?api_key=${API_KEY}&language=en-US&page=${API_PAGE}`);
        const data1 = await response1.json();
        const movies = data1.results;
        // console.log(`Number of movies on page 1: ${movies.length}`);
        
        if (movies.length<limit){
        // Limit the results to the required number of movies
        const limitedMovies = movies.slice(0, limit);
        displayMovies(limitedMovies)};
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = '';

    console.log(movies);
    if (movies.length === 0) {
        moviesContainer.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie flex p-2 h-[200px]content-center justify-self-content';

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : 'https://via.placeholder.com/100x150';
        movieElement.appendChild(moviePoster);
        moviesContainer.className = 'grid grid-cols-8'
        moviesContainer.appendChild(movieElement);
    });
}

searchMovies();
