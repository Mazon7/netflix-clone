//Called when the page is loaded
window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
  getGenres();
  letVarExample();
  getWishList();
};

function getWishList() {
  fetch("http://localhost:3000/wishlist", {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error_data) => {
    logOut();
    console.log(error_data);
  })
}


function letVarExample(firstName = "Max"){
  let address = {
    street: "Zebra street",
    city: "Some City",
    state: "Delaware"
  }
}

// Gets the movie trailer basing on id
async function getMovieTrailer(id){
  var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`;
  return await fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  })
}


const setTrailer = (trailers) => {
  const iframe  = document.getElementById('movieTrailer');
  const movieNotFound = document.querySelector('.movieNotFound');
  if(trailers.length > 0) {
    movieNotFound.classList.add('d-none');
    iframe.classList.remove('d-none');
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
  } else {
    iframe.classList.add('d-none');
    movieNotFound.classList.remove('d-none')
  }
};

const handleMovieSelection = (e) => {
  const id = e.target.getAttribute('data-id');
  const iframe = document.getElementById('movieTrailer');
  // here we need the id of the movie
  getMovieTrailer(id).then((data) => {
    const results = data.results;
    const youtubeTrailers = results.filter((result)=> {
      if (result.site == "YouTube" && result.type == "Trailer"){
        return true;
      } else {
        return false;
      }
    })
    setTrailer(youtubeTrailers);
  });
  // open modal
  $('#trailerModal').modal('show')
      // we need to call the api with the ID
      disableIframe();
}


// 1st option
// $(document).click(function(event){
//   // if you click on anything except the modal itself or the "open modal" link, close the modal
//   if (!$(event.target).closest(".modal").length) {
//     console.log('clicked')
//     document.getElementById('movieTrailer').src += '';
//   }});

// 2nd option
// $(document).ready(function() {
//   $('#trailerModal').on('hidden.bs.modal', function() {
//     var $this = $(this).find('iframe'),
//       tempSrc = $this.attr('src');
//     $this.attr('src', "");
//     $this.attr('src', tempSrc);
//   });
// });



// 3rd option
// document.getElementById("trailerModal").addEventListener("click", function() {
//   // changes the iframe src to prevent playback or stop the video playback in our case
//   $('#movieTrailer').each(function(index) {
//     $(this).attr('src', $(this).attr('src'));
//     console.log('clicked')
//     return false;
//   });
//   //click function
// }); 

// document.querySelector('.close').clicked


// MAIN FUNCTION FOR RELOADING AN IFRAME
const disableIframe = () => {
$(document).click(function(event){
  // if you click on anything except the modal itself or the "open modal" link, close the modal
  $(document).ready(function() {
  $('#trailerModal').on('hidden.bs.modal', function() {
    var $this = $(this).find('iframe'),
      tempSrc = $this.attr('src');
    $this.attr('src', "");
    $this.attr('src', tempSrc);
  });
});
  });
}



// Show movies on the Frontend
// Function takes 3 parameters (movies objects; selector of an element,  path to the image in the JSON)
function showMovies(movies, element_selector, path_type) {
  var moviesEl = document.querySelector(element_selector);
  for (var movie of movies.results) {
    var imageElement = document.createElement('img');
    imageElement.setAttribute('data-id', movie.id)
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;

    imageElement.addEventListener('click', (e)=> {
      handleMovieSelection(e);
    })
    moviesEl.appendChild(imageElement); 
  }
}

// Handling API data
function fetchMovies(url, element_selector, path_type) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong, check movies API");
      }
    })
    .then((data) => {
      showMovies(data, element_selector, path_type);
    })
    .catch((error_data) => {
      console.log(error_data);
    });
}

// Get Genres
function getGenres(){
  var url = "https://api.themoviedb.org/3/genre/movie/list?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US";
  fetch(url)
  .then((response)=>{
      if (response.ok) {
          return response.json();
      } else {
          throw new Error("something went wrong");
      }
  })
  .then((data)=>{
      showMoviesGenres(data);
  })
  .catch((error_data)=>{
      console.log(error_data);
  })
}

// Get Originals data
function getOriginals() {
  var url =
    "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213";
  fetchMovies(url, ".original__movies", "poster_path");
}

// Get Trending data
function getTrendingNow() {
  var url =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
  fetchMovies(url, "#trending", "backdrop_path");
}

// Get Top Rated data
function getTopRated() {
  var url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
  fetchMovies(url, "#top_rated", "backdrop_path");
}


// Loop through list of genres 
//     Show genres in HTML
//     Fetch movies based on genre fetchMovie(url, genre)
//     Display the list of movies


// Fetch Movies Based on Genres from API
function fetchMoviesBasedOnGenre(genreId){
  var url = "https://api.themoviedb.org/3/discover/movie?";
  url += "api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  url += `&with_genres=${genreId}`;
  return fetch(url)
  .then((response)=>{
      if (response.ok) {
          return response.json();
      } else {
          throw new Error("something went wrong");
      }
  }) // returns a promise already
}


// Show Movies Genres 
function showMoviesGenres(genres) {
  genres.genres.forEach(function(genre){
    // get list of movies
    var movies = fetchMoviesBasedOnGenre(genre.id);
    movies.then(function (movies) {
      showMoviesBasedOnGenre(genre.name, movies);
    }).catch(function (error){
      console.log("BAD", error)
    })
  })
}


// Show Movies Based on Genres 
function showMoviesBasedOnGenre(genreName, movies) {
  let allMovies = document.querySelector(".movies");
  let genreEl = document.createElement('div');
  genreEl.classList.add('movies__header');
  genreEl.innerHTML = `<h2>${genreName}</h2>`;

  let moviesEl = document.createElement('div');
  moviesEl.classList.add('movies__container');
  moviesEl.setAttribute('id', genreName);

  // 
  for (var movie of movies.results) {
    var imageElement = document.createElement('img');
    imageElement.setAttribute('data-id', movie.id)
    imageElement.src = `https://image.tmdb.org/t/p/original${movie["backdrop_path"]}`;

    imageElement.addEventListener('click', (e)=> {
      handleMovieSelection(e);
    });
    moviesEl.appendChild(imageElement); 
  }

  allMovies.appendChild(genreEl);
  allMovies.appendChild(moviesEl);
}


// Get TV Genres - do not use it so far
// function getTVGenres() {
//   var url = "https://api.themoviedb.org/3/genre/tv/list?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US";
//   fetchGenres(url)
// }