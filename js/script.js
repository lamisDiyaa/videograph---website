let toggle = document.querySelector(".toggle");
let nav = document.querySelector("nav");
let header =
  document.querySelector("nav .header__list") ??
  document.querySelector("nav .header__list__responsive");
let headerLi = document.querySelectorAll(".header-li");
let data = JSON.parse(localStorage.getItem("data")) ?? [];
let scoreCards = document.querySelectorAll(".score__number");
let scoreSection = document.querySelector(".score");

async function getData() {
  try {
    const response = await fetch("data.json");
    let allData = await response.json();
    localStorage.setItem("data", JSON.stringify(allData));
    console.log(data);
  } catch (error) {
    alert(error);
  }
}
getData();

let countersTriggered = false;

// to put active-li onloading when page is index just
const currentURL = window.location.href;
if (currentURL.includes("/index.html")) {
  headerLi[0].classList.add("active-li");
}

window.onscroll = function () {
  if (!countersTriggered && window.scrollY > scoreSection.offsetTop - 150) {
    console.log("Counters triggered!");
    counterShow();
    countersTriggered = true;
  }
};
function counterShow() {
  scoreCards.forEach(function (ele) {
    let value = +ele.textContent;
    console.log(value);
    ele.textContent = 0;
    let increment = value / 100;
    let currentValue = 0;

    let myCounter = setInterval(function () {
      currentValue += increment;
      if (currentValue >= value) {
        currentValue = value;
        clearInterval(myCounter);
      }
      ele.textContent = Math.round(currentValue);
    }, 10);
  });
}

toggle.addEventListener("click", function () {
  nav.classList.toggle("active");

  count += 6;
});

// to put the class on selected li in the header
header.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("header-li")) {
    headerLi.forEach(function (ele) {
      ele.classList.remove("active-li");
    });

    let href = e.target.getAttribute("href");
    localStorage.setItem("activeLink", href);
    window.location.href = href;
  }
});

window.addEventListener("load", function () {
  let activeLink = localStorage.getItem("activeLink");
  if (activeLink) {
    let headerArr = [...headerLi];
    let selectedLi = headerArr.find(function (ele) {
      return ele.getAttribute("href") == activeLink;
    });
    selectedLi.classList.add("active-li");
  }
});
