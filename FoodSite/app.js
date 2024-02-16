const menuOpen = document.querySelector('.menu-open')
const menuClose = document.querySelector('.menu-close')
const nav = document.querySelector('.nav')

menuOpen.addEventListener('click', menuTog)
menuClose.addEventListener('click', menuTog)

function menuTog(e) {
    nav.classList.toggle('active')
}

const container = document.querySelector('.categoriesContainer')
const content = document.querySelector('.content')
const hamburger = document.querySelector('.hamburger')
const ul = document.getElementById("list");

deleteAll = () => {
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
}

async function getData() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const data = await response.json()

    data.categories.forEach(element => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${element.strCategory}`));
        li.setAttribute("class", `listItem`); // added line
        ul.appendChild(li);
    });
}
const searchForm = document.querySelector(".searchForm")
const searchBar = document.getElementById('5')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (searchBar.value.length > 0) {
        deleteAll()
        searchMeal(searchBar.value)
    }
})

const getRecipe = document.querySelectorAll('.getRecipe')

getRecipe.addEventListener('click', e => {
    console.log('boom')
})

async function searchMeal(food) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
    if(!response.ok) {
        console.log("error")
    }
    else {
        const data = await response.json()
        console.log(data)
    }    
}

searchMeal('pizza')



const cards = document.querySelector(".cardsContainer")
const card = document.querySelectorAll('.card')


async function getCategoryMeal(cat) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    if(!response.ok) {
        console.log("error")
    }
    else {
        const data = await response.json()
        
        

        data.meals.forEach(element => {
            const div = document.createElement("div");
            div.setAttribute("class", `card`)
            div.setAttribute("id", `${element.idMeal}`)
            div.innerHTML = 
            `
            <img src="${element.strMealThumb}" name="${element.strMeal}">
            <p>${element.strMeal}</p>
            <button class="getRecipe"> Get Recipe </button>
            `
            cards.appendChild(div)
        });
        
    }
    
}

ul.addEventListener('click', e => {
    if(e.target.classList.contains("listItem") && cards.childNodes.length <= 1) {
        getCategoryMeal(e.target.textContent)
        menuTog()
    }
    else {
        deleteAll()
        getCategoryMeal(e.target.textContent)
        menuTog()
    }
       
})

cards.addEventListener('click', e => {
    console.log(e)
})

getData()
// getCategoryMeal(e.target.textContent)
