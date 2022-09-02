const url = 'https://openapi.programming-hero.com/api/news/categories'
fetch(url)
    .then(res => res.json())
    .then(data => displayItems(data.data.news_category))
    .catch((error) => {
        console.log(error)
    });

const displayItems = (items) => {
    // console.log(items)
    const allItems = document.getElementById('all-item')
    items.forEach(item => {
        const span = document.createElement('span')
        span.innerHTML = `
        <span>${item.category_name}</span>
        `
        allItems.appendChild(span)
    })
}
const newsUrl = 'https://openapi.programming-hero.com/api/news/category/08'
fetch(newsUrl)
    .then(res => res.json())
    .then(data => displayAllNews(data.data))
    .catch((error) => {
        console.log(error)
    });

const displayAllNews = (allNews) => {
    const allCards = document.getElementById('all-cards')
    allNews.forEach(news => {
        console.log(news)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 800px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details}</p>
        <div>
            <img style="width: 50px" class="rounded-circle" src="${news.author.img}" alt="" />
            <p>${news.author.name}</p>
        </div>
        <div>
            <p>Published Date: ${news.author.published_date}</p>
            <p><img src="https://img.icons8.com/external-others-inmotus-design/40/000000/external-View-basic-elements-others-inmotus-design.png"/> ${news.total_view}</p>
        </div>
      </div>
    </div>
  </div>
</div>
        `
        allCards.appendChild(div);
    })
}