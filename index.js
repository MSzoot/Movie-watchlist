// API DATA
// Here is your key: 182bd55b



//variables set up for serchbar form , container of results and searched movie title and serachresults
const form = document.getElementById("form")
const SearchResultsContainer = document.getElementById("search-results-container")
const movieTitle  = document.getElementById("movie-title")
const watchlistMoviesContainer = document.getElementById("watchlist-container")
let resultsWithDetails


//search bar event listener 
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    waiting()
    fetchMovies()
})




// fetch movies async function
const fetchMovies = async () => {
    // fetching api using by search option, search option will return array of movies but without details
    const response = await fetch(`http://www.omdbapi.com/?s=${movieTitle.value}&type=movie&apikey=182bd55b`);
    const movies = await response.json();
   
    // if search failed show this message to the user
    if (movies.Response == "False"){
        SearchResultsContainer.innerHTML = '<p class="text-[#2E2E2F] w-[320px] text-center font-bold mt-52 mb-72 ">Unable to find what you’re looking for. Please try another search.</p>'
    
    }else {
            const searchResults = movies.Search

            // iterating over searchResults array and fetching api again , this time using title option
            //api will return single object of for each title with details needed , objects will be pushed to empty resultsWithDetails array
            resultsWithDetails = []
            for ( let searchResult of searchResults){
                const response = await fetch(`http://www.omdbapi.com/?t=${searchResult.Title}&apikey=182bd55b`);
                const movies = await response.json();
                resultsWithDetails.push(movies)
            }
            //generate html based on resultWithDetails arr
            generateHtml();
        }
    }



  // function displays animated searching message when waiting for search results
  const waiting = () =>{
    SearchResultsContainer.innerHTML = '<p class="text-white w-[320px] text-xl text-center font-bold mt-52 mb-72 animate-pulse ">Searching ...</p>'
}




    // function to generate html feed 
    const generateHtml = () => {
        let html = ''
            for (let result of resultsWithDetails) {
                html += `<div class="w-[454px] flex border-b border-b-[#2E2E2F] py-6 mb-3">
                    <img
                    src="${result.Poster}"
                    alt="movie poster"
                    class="w-[100px] h-[150px] inline-block mr-6"
                    />
                    <div class="inline-block w-[300px] text-white">
                    <h1 class="inline text-xl mr-3 font-semibold mt-9">${result.Title}</h1>
                    <p class=" inline mr-5 text-lg">${result.imdbRating}⭐️</p>
                    <br>
                    <p class="inline text-xs mr-3">${result.Runtime}</p>
                    <p class="inline text-xs mr-3">${result.Genre}</p>
                    <button class="text-xs mt-3 font-bold text-[#434344] hover:text-white" id="${result.imdbID}">➕ Watchlist</button>
                    <p class="text-xs mt-3 text-[#434344] ">${result.Plot}</p>
                    </div>
                </div>`
                
            }
            //update index.html with previusly generated html
            SearchResultsContainer.innerHTML = html
    }



  