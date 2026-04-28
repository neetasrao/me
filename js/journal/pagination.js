const postsContainer = document.querySelector('.content');
const pageSize = 5;
const totalPages = Math.ceil(posts.length / pageSize);
let currentPage = 1;

document.addEventListener('DOMContentLoaded', function () {
    drawPage(1);
});

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage -= 1;
        drawPage(currentPage);
    }
}

function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage += 1;
        drawPage(currentPage);
    }
}

function checkButtons() {
    const nextBtn = document.querySelector('#next-btn');
    const prevBtn = document.querySelector('#prev-btn');

    nextBtn.disabled = currentPage >= totalPages;
    prevBtn.disabled = currentPage <= 1;
}

function getPagePosts(n) {
    const start = (n - 1) * pageSize;
    const end = start + pageSize;
    return posts.slice(start, end);
}

function drawPage(n) {
    console.log("hi");
    postsContainer.innerHTML = '';
    const pagePosts = getPagePosts(n);
    console.log(pagePosts);

    pagePosts.forEach(function (post) {
        // sticker = getRandomSticker();
        // prevSticker = sticker;
        postsContainer.insertAdjacentHTML('beforeend',
            `
    <div class="post">
      <p class="datetime">${post.date}</p>
      <p class="post-text">${post.text}</p>
    </div>
    `);
    });

    // <div class="post-footer-sticker"><img src="./imgs/${sticker}" id="${sticker.split('.')[0]}"></div>


    postsContainer.scroll(0, 0);
    checkButtons();
}