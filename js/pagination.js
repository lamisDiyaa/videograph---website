let count = 0;
let next = document.querySelector(".next");
let before = document.querySelector(".before");
let start = 3;
let end;
let itemsPerPage = 3;

const itemsDiv = document.querySelector(".portfolio__cards");
let data;

async function getData() {
  if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));
    console.log("Data loaded from localStorage:", data);
  } else {
    try {
      const response = await fetch("data.json");
      data = await response.json();
      localStorage.setItem("data", JSON.stringify(data));
      console.log("Data fetched from API:", data);
    } catch (error) {
      alert("Error fetching data: " + error);
    }
  }
}

async function init() {
  await getData(); // Wait for data to load first
  if (data && data.length > 0) { // Ensure data is not undefined or empty
    showDefault(); // Render the first three items
    setUpPagination(); // Set up pagination event listeners
  } else {
    console.error("Data is empty or not correctly loaded.");
  }
}

function show(arr) {
  itemsDiv.innerHTML = arr
    .map(
      (item) => `<div class="portfolio__card">
        <div class="card__img">
          <img src="${item.img}" alt="">
          <div class="portfolio__overlay">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
        <h3>VIP Auto Tires & Service</h3>
        <p>eCommerce / Magento</p>
      </div>`
    )
    .join("");
}

function showDefault() {
  if (data.length > 0) {
    let html = ''; // Construct HTML in a variable
    for (let i = 0; i < 3; i++) {
      // Ensure data[i] is defined and has an img property
      if (data[i] && data[i].img) {
        html += `
          <div class="portfolio__card">
            <div class="card__img">
              <img src="${data[i].img}" alt="">
              <div class="portfolio__overlay">
                <i class="fa-solid fa-play"></i>
              </div>
            </div>
            <h3>VIP Auto Tires & Service</h3>
            <p>eCommerce / Magento</p>
          </div>`;
      } else {
        console.error(`Missing 'img' property in data[${i}]`);
      }
    }
    itemsDiv.innerHTML = html; // Update the DOM
  } else {
    console.error("Data is empty or not correctly structured.");
  }
}

function setUpPagination() {
  next.addEventListener("click", function (e) {
    if (start < data.length) {
      end = start + itemsPerPage;
      let paginatedItems = data.slice(start, end);
      show(paginatedItems);
      start += itemsPerPage;
    } else {
      e.preventDefault();
    }
  });

  before.addEventListener("click", function (e) {
    if (start > itemsPerPage) {
      start -= itemsPerPage;
      end = start + itemsPerPage;
      let paginatedItems = data.slice(start, end);
      show(paginatedItems);
    } else {
      e.preventDefault();
    }
  });
}

init(); // Initialize the app
