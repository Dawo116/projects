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


async function searchMeal(food) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
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
            <button class="getRecipe" id="${element.idMeal}"> Get Recipe </button>
            `
            cards.appendChild(div)
        });
    }    
}

const cards = document.querySelector(".cardsContainer")


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
            <button class="getRecipe" id="${element.idMeal}"> Get Recipe </button>
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

const recipeWrapper = document.querySelector('.recipeWrapper')

cards.addEventListener('click', e => {
    if(e.target.classList.contains('getRecipe')) {
        recipeWrapper.style.display = "block"
        getRecipe(`${e.target.id}`)
    }
})

const closeRecipe = document.querySelector('.closeMark')

closeRecipe.addEventListener('click', e => {
    if(e.target.classList.contains('closeMark')) {
        recipeWrapper.style.display = "none"
    }
})

async function getRecipe(meal) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
    if(!response.ok) {
        console.log("error")
    }
    else {
        const data = await response.json()

        const recipeName = document.querySelector('.recipeName').innerHTML = `${data.meals[0].strMeal}`
        const mealThumb = document.querySelector('.mealThumb').src = `${data.meals[0].strMealThumb}`
        const recipe = document.querySelector('.recipe').innerHTML = `${data.meals[0].strInstructions}`
        const ingredients = document.querySelector('.ingredients')
        
        let myMeal = data.meals[0]
        let ingredientsList = []
        let count = 1

        for (let i in myMeal) {
            let ingredient = ''
            let measure = ''
            if(i.startsWith("strIngredient") && myMeal[i]) {
                ingredient = myMeal[i]
                measure = myMeal[`strMeasure` + count]
                count += 1
                ingredientsList.push(`${measure} ${ingredient}`)
            }
        }
        ingredientsList.forEach(element => {
            const div = document.createElement("div");
            div.setAttribute("class", `ingredientItem`)
            div.innerHTML = `${element}`
            ingredients.appendChild(div)
        })
    }
    
}



getData()
// getCategoryMeal(e.target.textContent)
