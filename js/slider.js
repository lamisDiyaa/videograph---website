let sliderContainer = document.querySelector(".our__clients__cards");
let clientsCard = document.querySelector(".our");
let nextDOt = document.querySelector(".nextDot");
let beforeDOt = document.querySelector(".beforeDot");
let dots = document.querySelectorAll(".dot");
const element = document.querySelector("body");
const elements = document.querySelectorAll(".clients__card");
let sliderWidth = clientsCard.style.transform;
let num = elements.length-1;
let count = 0;

// function to remove active class and put it on selected element
function removeClass(classname, element) {
  dots.forEach(function (ele) {
    ele.classList.remove(classname);
    element.classList.add(classname);
  });
}

// Adding event listeners outside of the observer
const nextDot = document.querySelector(".next-dot"); // Adjust selector as needed
nextDOt.addEventListener("click", function (e) {
  if (element.clientWidth > 768) {
    console.log(num)
    removeClass("blue__dot", e.target);
    if (num >= 3) {
      clientsCard.style.transform += "translateX(-320px)";
      num--;
    } 
  }
console.log(num)

  if (element.clientWidth < 768) {
    removeClass("blue__dot", e.target);
    if (num >= 3) {
      clientsCard.style.transform += "translateX(-420px)";
      num--;
    }
  }
});

beforeDOt.addEventListener("click", function (e) {
  if (element.clientWidth > 768) {
    console.log(num)
    removeClass("blue__dot", e.target);
    if (num < (elements.length-1)) {
      clientsCard.style.transform += "translateX(320px)";
      num++;
    } 
  }
  // num = 3;

  if (element.clientWidth < 768) {
    removeClass("blue__dot", e.target);
    if (num >= 0) {
      clientsCard.style.transform += "translateX(420px)";
      num--;
    }
  }
});

//////////////////////////////////////////////////////

const resizeObserver = new ResizeObserver((entries) => {
  [entry] = entries;
  if (entry.contentRect.width < 1200 && entry.contentRect.width > 768) {
    if (clientsCard.style.transform.includes("translateX(-420px)") || clientsCard.style.transform.includes("translateX(420px)") ) {
      clientsCard.style.transform = "translateX(0)";
      console.log(clientsCard.style.transform);
    }
  } else if (entry.contentRect.width < 768) {
    console.log("aaaaaaaaaaaaaaaaaa");
    if (clientsCard.style.transform.includes("translateX(-320px)") || clientsCard.style.transform.includes("translateX(320px)")) {
      clientsCard.style.transform = "translateX(0)";
      console.log(clientsCard.style.transform);
      console.log("ddddddddddddddddd");
    }
  }
});

resizeObserver.observe(element);
