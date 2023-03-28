// API DATA


// Here is your key: 182bd55b

// Please append it to all of your API requests,

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=182bd55b

// Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=345e360b-4933-42ba-9692-06126be79e0a
// If you did not make this request, please disregard this email.

const form = document.getElementById("form")
const result = document.getElementById("results")
const movieTitle  = document.getElementById("movie-title")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    fetchMovies()
})


const fetchMovies = async () => {
    const response = await fetch(`http://www.omdbapi.com/?s=${movieTitle.value}&apikey=182bd55b`);
    const movie = await response.json();
    const searchResults = movie.Search
    searchResults.length = 7

    const resultsWithDetails = []
    for ( let searchResult of searchResults){
        const response = await fetch(`http://www.omdbapi.com/?t=${searchResult.Title}&apikey=182bd55b`);
        const movies = await response.json();
        resultsWithDetails.push(movies)
    }
    console.log(resultsWithDetails)


    let html = ''
    for (let movie of resultsWithDetails) {
        html += `<div class="w-[454px] flex border-b border-b-[#2E2E2F] py-6 mb-3">
        <img
          src="${movie.Poster}"
          alt="movie poster"
          class="w-[100px] h-[150px] inline-block mr-6"
        />
        <div class="inline-block w-[300px] text-white">
          <h1 class="inline text-xl mr-3 font-semibold mt-9">${movie.Title}</h1>
          <p class=" inline mr-5 text-lg">${movie.Ratings[0].Value}⭐️</p>
          <br>
          <p class="inline text-xs mr-3">${movie.Runtime}</p>
          <p class="inline text-xs mr-3">${movie.Genre}</p>
          <button class="text-xs mt-3 font-bold text-[#434344] hover:text-white">➕ Watchlist</button>
          <p class="text-xs mt-3 text-[#434344] ">${movie.Plot}</p>
        </div>
      </div>`
    }
    result.innerHTML = html
}


   