let isLoading = true;

const getArticle = async (articleId) => {
  const requestURL = `https://api.spaceflightnewsapi.net/v3/articles/${articleId}`;
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

const displayArticle = (article) => {
    const detailsEl = document.querySelector(".details");
    const imgEl = detailsEl.querySelector('.details-img');
    const titleEl = detailsEl.querySelector('.details-title');
    const summaryEl = detailsEl.querySelector('.details-summary');

    imgEl.src = article.imageUrl;
    titleEl.textContent = article.title;
    summaryEl.textContent = article.summary;
}

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const articleId = queryParams.get("id");
  const article = await getArticle(articleId);

  const loadingEl = document.querySelector(".lds-ring");

  if (!isLoading && loadingEl) {
    loadingEl.style.display = "none";
  }

  displayArticle(article);
});
