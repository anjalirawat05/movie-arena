// Backend API URL
const API_URL = 'http://localhost:3001/api/movies';

// Fetch movies from the backend

async function searchMovies() {
    const query = document.getElementById('search-box').value.trim();
 console.log('Search Query:', query);
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`);
        const movies = await response.json();
       
        if (response.ok) {
            displayMovies(movies);
          
        } else {
            displayError(movies.error);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        displayError('Failed to fetch movies. Please try again.');
    }
}

// Display movies in the DOM
function displayMovies(movies) {                                // here movies contain json format of fetched movies
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';

        movieItem.innerHTML = `
             <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
          <div class="movie-info">
              <h3>${movie.Title}</h3>
             
          </div>
          <div class="Year">
            <p>Year:${movie.Year} </p>
               </div>
                
            </div>
        `;

        moviesList.appendChild(movieItem);
    });
}

// Display error message
function displayError(message) {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = `<p style="color: red;">${message}</p>`;
}


// Enable search on pressing Enter
document.getElementById('search-box').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { // Check if the key pressed is Enter
        searchMovies(); // Trigger the search
    }
});