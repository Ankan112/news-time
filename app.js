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
        <span onclick="itemFunction(${item.category_id})">${item.category_name}</span>
        `
        allItems.appendChild(span)
    })

}
const toggleLoader = isLoading => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
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
        // console.log(allNews.length)

        const allCards = document.getElementById('all-cards')
        allCards.textContent = '';
        const itemFound = document.createElement('h1')
        itemFound.innerHTML = `<h1>Matched Result: ${allNews.length ? allNews.length : 'No Result Found'}</h1>`
        allCards.appendChild(itemFound)
        allNews.forEach(news => {
            // console.log(news)
            const div = document.createElement('div')
            // div.classList.add('col-12 col-md-6')
            div.innerHTML = `
            
        <div class="card mb-3" >
  <div class="row g-0">
    <div class="col-12 col-md-4">
      <img class="img-fluid" style="width:100%" src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-12 col-md-8">
      <div class="card-body">
        <h5 class="card-title fs-3">${news.title}</h5>
        <p class="card-text">${news.details.slice(0, 450).concat('...')}</p>
    <div style="height: 200px" class="d-flex justify-content-between align-items-center">
        <div>
        <img style="width: 50px" class="rounded-circle" src="${news.author.img}" alt="" />
        <p>${news.author.name ? news.author.name : 'Not Found'}</p>
    </div>
    <div>
        <p>${news.author.published_date ? news.author.published_date : 'Not Found'}</p>
        <p><img src="https://img.icons8.com/external-others-inmotus-design/40/000000/external-View-basic-elements-others-inmotus-design.png"/> ${news.total_view ? news.total_view : 'Not Found'}</p>
    </div>
    <div>
        <span>Ratings: ${news.rating.number}</span>
    </div>
    <button id="show-btn" onclick="showDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Details
</button>
    </div>
      </div>
    </div>
  </div>
</div>
        `
            allCards.appendChild(div);
        })
        toggleLoader(false);
    }
    toggleLoader(true);
}

itemFunction(8);
toggleLoader(true);
const showDetails = btnId => {
    fetch(`https://openapi.programming-hero.com/api/news/${btnId}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch((error) => {
            console.log(error)
        });

    const displayNewsDetails = news => {
        console.log(news);
        const modalTitle = document.getElementById('exampleModalLabel');
        modalTitle.innerText = news.title;
        const modalBody = document.getElementById('news-details');
        modalBody.innerHTML = `
        <p>${news.details}</p>
        <h6>Published Date: ${news.author.published_date ? news.author.published_date : 'Not Found'}</h6>
        `
    }

}