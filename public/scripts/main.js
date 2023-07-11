const themeButton = document.getElementById("themeBtn");
const body = document.body;
const homePageForm = document.getElementById("homepage");
const searchForm = document.getElementById("searchPage");

homePageForm.addEventListener("submit", (e) => {
  e.preventDefault();

});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

});
themeButton.addEventListener("click", () => {
  body.classList.toggle("darkTheme");
});
