// API DATA


// Here is your key: 182bd55b

// Please append it to all of your API requests,

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=182bd55b

// Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=345e360b-4933-42ba-9692-06126be79e0a
// If you did not make this request, please disregard this email.

const form = document.getElementById("form")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    fetchMovies()
})


const fetchMovies = async () => {
    const response = await fetch('http://www.omdbapi.com/?t=Terminator+2&apikey=182bd55b');
    const movies = await response.json();
    console.log(movies)
    const searchResult = {
        Poster : movies.Poster,
        Title : movies.Title,
        Rating : movies.Ratings[0].Value
    };
    console.log(searchResult)
    
  }


