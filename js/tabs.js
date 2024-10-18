let tabs = document.querySelectorAll(".portfolio__tab");
let listELe=document.querySelectorAll(".portfolio__header ul li")
console.log(listELe)

tabs.forEach(function(ele){
    ele.addEventListener("click",function(e){
        tabs.forEach(function(element){
            element.classList.remove("active-portfolio-list")
        })
        e.target.classList.add("active-portfolio-list")
        let id=e.target.id
      let filteredData=  data.filter(function(tab){
        return tab.category==id
      })
      show(filteredData)
      if(id=="All"){
      showDefault()
      console.log("fffffffffffffff")
      }
    })
})


