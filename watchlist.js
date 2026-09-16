const content = document.querySelector(".content");

async function renderWatchlistedMovies(){
    const data = JSON.parse(localStorage.getItem("watchlist"))
    if (data.length){
        const htmlArray = await Promise.all(data.map(async e => {
            const movieData = await fetchApiId(e);
            return `<div class="movie-box">
              <div class="movie-poster">
                <img
                  src="${movieData.Poster}"
                  alt="movie-poster"
                />
              </div>
              <div class="movie-desc">
                <h3 class="movie-title">
                  ${movieData.Title}
                  <span>
                    <svg
                      width="12"
                      height="11"
                      viewBox="0 0 12 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.86276 0.518226C5.08727 -0.172757 6.06483 -0.172758 6.28934 0.518225L7.09152 2.98707C7.19193 3.29609 7.47989 3.50531 7.80481 3.50531H10.4007C11.1273 3.50531 11.4293 4.43502 10.8416 4.86207L8.74142 6.3879C8.47856 6.57889 8.36856 6.91741 8.46897 7.22643L9.27115 9.69528C9.49566 10.3863 8.7048 10.9609 8.11702 10.5338L6.01689 9.00797C5.75402 8.81699 5.39808 8.81699 5.13521 9.00797L3.03508 10.5338C2.4473 10.9609 1.65644 10.3863 1.88095 9.69528L2.68313 7.22643C2.78354 6.91741 2.67354 6.57889 2.41068 6.3879L0.31055 4.86207C-0.277235 4.43502 0.0248458 3.50531 0.751388 3.50531H3.34729C3.67221 3.50531 3.96017 3.29609 4.06058 2.98707L4.86276 0.518226Z"
                        fill="#FEC654"
                      />
                    </svg>
                    ${movieData.Ratings[0].Value.split("/")[0]}
                  </span>
                </h3>
                <div class="movie-info">
                  <span class="duration">${movieData.Runtime}</span>
                  <span class="genre">${movieData.Genre}</span>
                  <button class="wishlist-btn" id=${movieData.imdbID}>
                    <img src="./assests/minus-icon.png" alt="add-icon" />
                    Remove
                  </button>
                </div>
                <p class="movie-brief">
                  ${movieData.Plot}
                </p>
              </div>
            </div>`

        }))
        content.innerHTML = htmlArray.join("")
    } else{
        content.innerHTML = `<img src="./assests/no-data-initial.png" alt="no-data-image" class="no-data-img">`
    }
}

function watchlistBtn() {
  document.querySelector(".content").addEventListener("click", (e) => {
    const movieId = e.target.id || e.target.parentElement.id
    if (movieId){
      const data = JSON.parse(localStorage.getItem("watchlist"))
      localStorage.setItem("watchlist", JSON.stringify(data.filter(e => {
        return e!=movieId
      })))
      renderWatchlistedMovies()   
    }
  });
}

async function fetchApiId(name) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=486f9cb9&i=${name}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
}

renderWatchlistedMovies()

watchlistBtn()