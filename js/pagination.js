let count = 0;
let next = document.querySelector(".next");
let before = document.querySelector(".before");
let start = 3;
let end;
let itemsPerPage = 3;
data = JSON.parse(localStorage.getItem("data")) ?? [];
const itemsDiv = document.querySelector(".portfolio__cards");

function show(arr) {
  itemsDiv.innerHTML = arr
    .map(
      (item) => `<div class="portfolio__card">
          <div class="card__img">
              <img src=${item.img} alt="">
              <div class="portfolio__overlay">
                  <i class="fa-solid fa-play"></i>
              </div>
          </div>
              <h3>
                  VIP Auto Tires & Service
              </h3>
              <p>
                  eCommerce / Magento
              </p>
         </div>`
    )
    .join("");
}

// the default products
function showDefault() {
  for (let i = 0; i < 3; i++) {
    itemsDiv.innerHTML += `<div class="portfolio__card">
              <div class="card__img">
                  <img src=${data[i].img} alt="">
                  <div class="portfolio__overlay">
                      <i class="fa-solid fa-play"></i>
                  </div>
              </div>
                  <h3>
                      VIP Auto Tires & Service
                  </h3>
                  <p>
                      eCommerce / Magento
                  </p>
             </div>`;
  }
}
showDefault();

// Function to render items for the current page

next.addEventListener("click", function (e) {
  start = start == 0 ? 3 : start;
  if (start < data.length) {
    end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);
    show(paginatedItems);
    start += 3;
  } else {
    e.preventDefault();
  }
});

before.addEventListener("click", function (e) {
  console.log(start);
  let end2;
  if (start > data.length) {
    end2 = data.length;
  } else {
    end2 = start - 3;
  }

  if (start > 3) {
    start = end2 - itemsPerPage;
    let paginatedItems = data.slice(start, end2);
    show(paginatedItems);
    console.log(start, end);
    start = end2;
  } else {
    start = 0;
    e.preventDefault();
  }
});
