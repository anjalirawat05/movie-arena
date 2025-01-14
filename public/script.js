
const API_URL = 'http://localhost:3001/api/movies';

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

function displayMovies(movies) {                                
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = ''; 

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

function displayError(message) {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = `<p style="color: red;">${message}</p>`;
}



document.getElementById('search-box').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { 
        searchMovies(); 
    }
});