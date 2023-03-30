// API DATA
// Here is your key: 182bd55b



//variables set up for serchbar form , container of results and searched movie title
const form = document.getElementById("form")
const SearchResultsContainer = document.getElementById("search-results-container")
const movieTitle  = document.getElementById("movie-title")
const watchlistMoviesContainer = document.getElementById("watchlist-container")


// set up empty arrays for finish search results and items added to watchlist 
let resultsWithDetails = []


// function displays animated searching message when waiting for search results
const waiting = () =>{
    SearchResultsContainer.innerHTML = '<p class="text-white w-[320px] text-xl text-center font-bold mt-52 mb-72 animate-pulse ">Searching ...</p>'

}

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
    if (movies.Response == "True"){
        const searchResults = movies.Search


        
        // iterating over searchResults array and fetching api again , this time using title option
        //api will return single object of for each title with details needed , objects will be pushed to empty resultsWithDetails array
        const resultsWithDetails = []
        for ( let searchResult of searchResults){
            const response = await fetch(`http://www.omdbapi.com/?t=${searchResult.Title}&apikey=182bd55b`);
            const movies = await response.json();
            resultsWithDetails.push(movies)
        }



        //this bit will generate html based for each index of resultsWithDetails array
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


        // add event listener to each + watchlist button, every button have his own ID based on movie imdbID provided by API,
        // when clicked it will add movie object to myWatchlist array only when array doesnt include this object already
        // this solution may not be ideal but it works and its simple to understand ;) I will think about different aprroach later on
        for(let result of resultsWithDetails){
            document.getElementById(`${result.imdbID}`).addEventListener("click", () => {
                let myWatchlist = JSON.parse(localStorage.getItem("LSmovies"))
                if(myWatchlist== null){
                myWatchlist =[]
                }
                if (!myWatchlist.includes(result)) {
                    myWatchlist.push(result)
                }
                localStorage.setItem("LSmovies", JSON.stringify(myWatchlist));
                console.log(myWatchlist)
            })
        }
    }

    
    //app will inform the user when search failed or there is no any result find
    else {
        SearchResultsContainer.innerHTML = '<p class="text-[#2E2E2F] w-[320px] text-center font-bold mt-52 mb-72 ">Unable to find what you’re looking for. Please try another search.</p>'
    }
}


