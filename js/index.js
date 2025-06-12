const toggleLoading = (isLoading) => {
    const loader = document.getElementById('loading');
    loader.classList.toggle('d-none', !isLoading);
};

const loadMeals = (searchText) => {
    toggleLoading(true);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data.meals));
        .then(data => displayMeals(data.meals))
        .finally(() => toggleLoading(false));
}

const displayMeals = meals => {
    // console.log(meals);
    // step 1: container element
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerText = '';

    if (!meals) {
        mealsContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center w-100" style="min-height: 100px;">
            <p class="text-danger fs-4 m-0">No meals found. Please try another search.</p>
        </div>
        `;
        return;
    }

    meals.forEach(meal => {
        // console.log(meal);
        // console.log(meal.strMeal);
        // console.log(meal.strMealThumb);
        // step 2: create child for each element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // step-3 set content of the child
        mealDiv.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadMealDetail2(${meal.idMeal})"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                    Details
                </button>
            </div>
        </div>
        `

        // step-4: appendChild
        mealsContainer.appendChild(mealDiv);

    })
}

const searchMeals = () => {
    // console.log('Button Clicked');
    const searchText = document.getElementById('search-field').value;
    // search meals
    // console.log(searchText);

    // Clear any old content (including "no meals" message)
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = ''; // ensures it's clean before showing new content

    loadMeals(searchText);

}

const loadMealDetail = idMeal => {
    // console.log(idMeal);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data));
        .then(data => displayMealDetails(data.meals[0]))
        .catch(error => {

            console.log(error)
        })
}

// async await
const loadMealDetail2 = async (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    }
    catch (error) {
        console.log(error)
    }
}

const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealsDetails = document.getElementById('mealDetailsBody');
    mealsDetails.innerHTML = `
        <img class="img-fluid" src="${meal.strMealThumb}">
    `
}

loadMeals('fish');
// loadMeals('fish');
// loadMeals('chi');

// Enable search on "Enter" key press
document.getElementById('search-field').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchMeals();
    }
});