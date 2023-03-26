// endpoint
const requestURL = `https://api.spaceflightnewsapi.net/v3/articles`;

let isLoading = true;

const getArticles = async () => {
  try {
    const response = await fetch(requestURL);
    const data = await response.json();
    isLoading = false;
    return data;
  } catch (error) {
    isLoading = false;
    console.log("error", error);
  }
};

const displayCard = (article) => {
  let card = document.createElement("div");
  card.className = "col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12";

  const title =
    article.title.length > 100
      ? `${article.title.slice(0, 100)}...`
      : article.title;

  const summary =
    article.summary.length > 100
      ? `${article.summary.slice(0, 100)}...`
      : article.summary;

  card.innerHTML = `
    <div class="card" style="max-width: 18rem; height: 550px; margin-top: 30px; margin-right: 15px;">
    <img src="${article.imageUrl}" class="card-img-top" style="height: 200px;">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text" style="min-height: 96px;">${summary}</p>
    </div>
    <div class="card-body mt-5">
    <a href="article.html?id=${article.id}" type="button" class="btn btn-primary">Read More</a>    
    </div>
  </div>
    `;

  return card;
};

window.addEventListener("DOMContentLoaded", async () => {
  const articles = await getArticles();
  const cardsEl = document.getElementById("cards");
  const loadingEl = document.querySelector(".lds-ring");

  if (!isLoading) {
    loadingEl.style.display = "none";
  }

  articles.forEach((article) => {
    const card = displayCard(article);
    cardsEl.appendChild(card);
  });
});
