const url = 'https://openapi.programming-hero.com/api/news/categories'
fetch(url)
    .then(res => res.json())
    .then(data => displayItems(data.data.news_category))
    .catch((error) => {
        console.log(error)
    });

const displayItems = (items) => {
    console.log(items)
    const allItems = document.getElementById('all-item')
    items.forEach(item => {
        const span = document.createElement('span')
        span.innerHTML = `
        <span onclick="itemFunction(${item.category_id})">${item.category_name}</span>
        `
        allItems.appendChild(span)
    })
}
const itemFunction = id => {
    // console.log(id)
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(newsUrl)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
        .catch((error) => {
            console.log(error)
        });

    const displayAllNews = (allNews) => {
        console.log(allNews.length)
        const allCards = document.getElementById('all-cards')
        allCards.textContent = '';
        const itemFound = document.createElement('h1')
        itemFound.innerHTML = `<h1>Matched Result: ${allNews.length ? allNews.length : 'No Result Found'}</h1>`
        allCards.appendChild(itemFound)
        allNews.forEach(news => {
            // console.log(news)
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
        <p class="card-text">${news.details.slice(0, 250).concat('...')}</p>
        <div class="d-flex justify-content-between align-items-center">
        <div>
        <img style="width: 50px" class="rounded-circle" src="${news.author.img}" alt="" />
        <p>${news.author.name}</p>
    </div>
    <div>
        <p>${news.author.published_date}</p>
        <p><img src="https://img.icons8.com/external-others-inmotus-design/40/000000/external-View-basic-elements-others-inmotus-design.png"/> ${news.total_view}</p>
    </div>
    <div>
        <span>Ragings: ${news.rating.number}</span>
    </div>
    <button type="button" class="btn btn-primary">Details</button>
    </div>
      </div>
    </div>
  </div>
</div>
        `
            allCards.appendChild(div);
        })
    }
}
