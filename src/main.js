const containerTrendingMovies = document.querySelector(".div-container-movies");
const containerSectionCategories = document.querySelector(".section-categories");
const arrowBack = document.querySelector(".arrow-back-icon");
arrowBack.addEventListener("click", () => {
    movieDetails.classList.add("inactive");
    movieDetailsImage.classList.add("inactive");
    navSection.classList.remove("inactive");
    sectionMovies.classList.remove("inactive");
    sectionCategories.classList.remove("inactive");
    history.back();
    // location.hash = "#home";
});

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});


async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    containerTrendingMovies.innerHTML = "";

    const movies = data.results;
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("div-img-movie-container");
        const imgMovie = document.createElement("img");
        imgMovie.classList.add("img-movie");
        imgMovie.addEventListener("click", () => {
            console.log("click")
            location.hash = '#movie=' + movie.id;
            
        });
        imgMovie.alt = movie.title;
        imgMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
        movieContainer.appendChild(imgMovie);
        containerTrendingMovies.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    containerSectionCategories.innerHTML = "";

    const categories = data.genres;
    console.log(categories)
    categories.forEach(category => {
        const containerTitleCategory = document.createElement("div");
        const titleCategory = document.createElement("h2");
        titleCategory.classList.add("title-categories-section");
        titleCategory.id = 'id' + category.id
        titleCategory.innerText = category.name
        titleCategory.addEventListener("click", () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        containerTitleCategory.appendChild(titleCategory);
        containerSectionCategories.appendChild(containerTitleCategory)
    });
}

async function getMoviesByCategories(id,name) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    headerTitleCategory.innerHTML = name
    genericList.innerHTML = "";
    genericList.scrollTop = 0

    const movies = data.results;
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");
        const imgMovie = document.createElement("img");
        imgMovie.classList.add("movie-img");
        imgMovie.addEventListener("click", () => {
            console.log("click")
            location.hash = '#movie=' + movie.id;
            
        });
        imgMovie.alt = movie.title;
        imgMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
        movieContainer.appendChild(imgMovie);
        genericList.appendChild(movieContainer);
    });
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });

    genericList.innerHTML = "";
    genericList.scrollTop = 0

    const movies = data.results;
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");
        const imgMovie = document.createElement("img");
        imgMovie.classList.add("movie-img");
        imgMovie.addEventListener("click", () => {
            console.log("click")
            location.hash = '#movie=' + movie.id;
            
        });
        imgMovie.alt = movie.title;
        imgMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
        movieContainer.appendChild(imgMovie);
        genericList.appendChild(movieContainer);
    });
}

async function getTrendingMoviesViewAll() {
    const { data } = await api('trending/movie/day');
    genericList.innerHTML = "";
    headerTitleCategory.innerHTML = "Trends"
    genericList.scrollTop = 0;

    const movies = data.results;
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("div-img-movie-container");
        const imgMovie = document.createElement("img");
        imgMovie.classList.add("img-movie");
        imgMovie.addEventListener("click", () => {
            console.log("click")
            location.hash = '#movie=' + movie.id;
            
        });
        imgMovie.alt = movie.title;
        imgMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
        movieContainer.appendChild(imgMovie);
        genericList.appendChild(movieContainer);
    });
}

async function getMovieById(id) {
    const { data } = await api(`movie/${id}`);
    const { data: similar } = await api(`movie/${id}/similar`);
    const similarMovies = similar.results;
    movieDetailInfo.innerHTML = "";
    console.log(data)
    
    
    const movieImgDetail = "https://image.tmdb.org/t/p/w300/" + data.poster_path;
    movieDetailsImage.src = movieImgDetail;


    const titleMovieDetail = document.createElement("div");
    titleMovieDetail.classList.add("title-movie-detail");

    const titleMovieDetailH2 = document.createElement("h2");
    titleMovieDetailH2.classList.add("title-movie-detail-h2");
    titleMovieDetailH2.innerText = data.original_title;

    const containerDetailStar = document.createElement('div');
    containerDetailStar.classList.add("container-detail-star");

    const imageStar = document.createElement('img');
    imageStar.src = "./icons/star-solid.svg";
    const puntStar = document.createElement("h3");
    puntStar.innerText = data.vote_average;

    containerDetailStar.appendChild(imageStar);
    containerDetailStar.appendChild(puntStar);
    titleMovieDetail.appendChild(titleMovieDetailH2);
    titleMovieDetail.appendChild(containerDetailStar);

    const movieDetailDescription = document.createElement("div");
    movieDetailDescription.classList.add("movie-detail-description");
    movieDetailDescription.innerText = data.overview;

    movieDetailInfo.appendChild(titleMovieDetail);
    movieDetailInfo.appendChild(movieDetailDescription);

    const divMovieTitles = document.createElement("div");
    divMovieTitles.classList.add("div-movies-titles");
    
    const divMovieTitlesH2 = document.createElement("h2");
    divMovieTitlesH2.innerText = "Similar";

    const divMovieTitlesH3 = document.createElement("h3");
    divMovieTitlesH3.innerText = "View All";

    divMovieTitles.appendChild(divMovieTitlesH2);
    divMovieTitles.appendChild(divMovieTitlesH3);

    const divContainerMovies = document.createElement("div");
    divContainerMovies.classList.add("div-container-movies");

    const sectionMoviesSimilar = document.createElement("div");
    sectionMoviesSimilar.classList.add("section-movies-similar");

    similarMovies.forEach(movie => {
        const divImgMovieContainer = document.createElement("div");
        divImgMovieContainer.classList.add("div-img-movie-container");

        const imgMovieSimilar = document.createElement("img");
        imgMovieSimilar.classList.add("img-movie");
        imgMovieSimilar.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
        imgMovieSimilar.addEventListener("click", () => {
            console.log("click")
            location.hash = '#movie=' + movie.id;
            
        });
        

        divImgMovieContainer.appendChild(imgMovieSimilar);
        divContainerMovies.appendChild(divImgMovieContainer);
    });

    sectionMoviesSimilar.appendChild(divMovieTitles);
    sectionMoviesSimilar.appendChild(divContainerMovies);
    movieDetailInfo.appendChild(sectionMoviesSimilar);

}



/* 
<div class="div-img-movie-container">
    <img class="img-movie" src="./images/movie-black.jpeg" alt="">
</div>
<div class="div-img-movie-container">
    <img class="img-movie" src="./images/movie-la-huerfana.jpeg" alt="">
</div>
<div class="div-img-movie-container">
    <img class="img-movie" src="./images/movie-sonrie.jpeg" alt="">
</div>
<div class="div-img-movie-container">
    <img class="img-movie" src="./images/movie-sonrie.jpeg" alt="">
</div> */