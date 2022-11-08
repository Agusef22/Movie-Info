window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)


searchIconBtm.addEventListener("click", () => {
  location.hash = "#search=" + inputSearch.value;
});

trendingMovies.addEventListener("click", () => {
  location.hash = "#trends";
});


function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage()
  } else if (location.hash.startsWith("#search=")) {
    searchPage()
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage()
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage()
  } else {
    homePage()
  }
}

function homePage() {
  console.log("Home!!")
  getTrendingMoviesPreview()
  getCategoriesPreview()
  movieDetails.classList.add("inactive");
  genericList.classList.add("inactive");
  arrowBackDiv.classList.add("inactive");
  headerDivContainerLogo.classList.remove("inactive");
  divSearchIcon.classList.remove("inactive");
  divSearchIcon.setAttribute("style", "margin-top:15px;");
  headerTitleCategory.classList.add("inactive");
  titleCategoryH2.classList.remove("inactive");
}
function categoriesPage() {
  console.log("Categories!!")
  movieDetails.classList.add("inactive");
  movieDetailsImage.classList.add("inactive");
  genericList.classList.remove("inactive");
  arrowBackDiv.classList.remove("inactive");
  arrowBack.classList.add("arrow-filter")
  navSection.classList.add("inactive");
  sectionMovies.classList.add("inactive");
  sectionCategories.classList.add("inactive");
  titleCategoryH2.classList.add("inactive");
  headerTitleCategory.classList.remove("inactive");
  headerDivContainerLogo.classList.add("inactive");
  divSearchIcon.classList.add("inactive");

  const urlCategory = location.hash.split("=");
  const [categoryId, categoryName] = urlCategory[1].split("-");

  

  getMoviesByCategories(categoryId,categoryName)
}
function movieDetailsPage() {
  console.log("Movie!!")
  movieDetails.classList.remove("inactive");
  movieDetailsImage.classList.remove("inactive");
  arrowBackDiv.classList.remove("inactive");
  arrowBack.classList.remove("arrow-filter")
  navSection.classList.add("inactive");
  sectionMovies.classList.add("inactive");
  sectionCategories.classList.add("inactive");
  headerDivContainerLogo.classList.add("inactive");
  titleCategoryH2.classList.add("inactive");
  divSearchIcon.classList.add("inactive");
  genericList.classList.add("inactive");
  headerTitleCategory.classList.add("inactive");

  const [_, movieId] = location.hash.split("=");

  getMovieById(movieId)
}
function searchPage() {
  console.log("Search!!")

  movieDetails.classList.add("inactive");
  movieDetailsImage.classList.add("inactive");
  genericList.classList.remove("inactive");
  arrowBackDiv.classList.remove("inactive");
  arrowBack.classList.add("arrow-filter")
  navSection.classList.add("inactive");
  sectionMovies.classList.add("inactive");
  sectionCategories.classList.add("inactive");
  titleCategoryH2.classList.add("inactive");
  headerTitleCategory.classList.add("inactive");
  headerDivContainerLogo.classList.add("inactive");
  divSearchIcon.classList.remove("inactive");
  divSearchIcon.setAttribute("style", "margin-top:4em;")

  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);

}
function trendsPage() {
  console.log("TRENDS!!")
  movieDetails.classList.add("inactive");
  movieDetailsImage.classList.add("inactive");
  genericList.classList.remove("inactive");
  arrowBackDiv.classList.remove("inactive");
  arrowBack.classList.add("arrow-filter")
  navSection.classList.add("inactive");
  sectionMovies.classList.add("inactive");
  sectionCategories.classList.add("inactive");
  titleCategoryH2.classList.add("inactive");
  headerTitleCategory.classList.remove("inactive");
  headerDivContainerLogo.classList.add("inactive");
  divSearchIcon.classList.add("inactive");

  getTrendingMoviesViewAll()
}