const api_key = "c7dfee31307a489baf386ca92ecf52dd";
let url = "https://newsapi.org/v2/everything?q=";

document.addEventListener("load", fetchNews("india"));

async function fetchNews(query) {
    let temp = url;
    temp += query + `&apiKey=${api_key}`;
    const response = await fetch(temp);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.querySelector(".cards");
    const cardTemplate = document.querySelector(".card-template");

    cardContainer.innerHTML = "";

    let count = 0;
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        if(count===15) return;
        count++;
        const cloneCard = cardTemplate.content.cloneNode(true);
        fillData(cloneCard, article);
        cardContainer.appendChild(cloneCard);
    });
}

function fillData(cloneCard, article) {
    let img = cloneCard.querySelector(".topic-image");     
    let title = cloneCard.querySelector(".topic-title");
    let date = cloneCard.querySelector(".topic-date");
    let desc = cloneCard.querySelector(".topic-desc");

    img.src = article.urlToImage;
    title.innerHTML = article.title;
    desc.innerHTML = article.description;
    
    const time = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    date.innerHTML = `${article.source.name} - ${time}`;

    cloneCard.firstElementChild.addEventListener("click", function() {
        window.open(article.url, "_blank");
    })
}

let currentNav = null;
function handleClick(id) {
    fetchNews(id);
    const navItem = document.querySelector(`#${id}`);
    currentNav?.classList.remove("active");
    currentNav = navItem;
    currentNav.classList.add("active");
}

const submit = document.querySelector("#submit");
submit.addEventListener("click", function() {
    const search_text = document.querySelector("#search-text").value;
    if(search_text!=="") {
        fetchNews(search_text);
        currentNav?.classList.remove("active");
        currentNav = null;
    }
});

const logo = document.querySelector("#logo-image");
logo.addEventListener("click", function() {
    window.location.reload();
});