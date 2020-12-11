'use strict';

const responseJson = {
    "results": [
        {
            "id": 667024,
            "title": "Simple Spaghetti Fra Diavolo",
            "readyInMinutes": 45,
            "servings": 4,
            "sourceUrl": "http://bakerbynature.com/simple-spaghetti-fra-diavolo/",
            "openLicense": 0,
            "image": "Simple-Spaghetti-Fra-Diavolo-667024.jpg"
        },
        {
            "id": 718828,
            "title": "21 Day Fix Broccoli Mac & Cheese (AKA the perfect Mac & Cheese)",
            "readyInMinutes": 45,
            "servings": 8,
            "sourceUrl": "http://thefoodieandthefix.com/21-day-fix-broccoli-mac-cheese-aka-the-perfect-mac-cheese/",
            "openLicense": 0,
            "image": "21-day-fix-broccoli-mac-cheese-(aka-the-perfect-mac-cheese)-718828.jpg"
        },
        {
            "id": 603329,
            "title": "Avocado Pasta",
            "readyInMinutes": 20,
            "servings": 4,
            "sourceUrl": "http://damndelicious.net/2014/06/20/avocado-pasta/",
            "openLicense": 0,
            "image": "Avocado-Pasta-603329.jpg"
        },
        {
            "id": 694932,
            "title": "Ravioli & Vegetable Soup",
            "readyInMinutes": 25,
            "servings": 4,
            "sourceUrl": "http://www.eatingwell.com/recipes/ravioli_vegetable_soup.html",
            "openLicense": 0,
            "image": "ravioli-vegetable-soup-694932.jpg"
        },
        {
            "id": 735844,
            "title": "Creamy Lemon Pasta",
            "readyInMinutes": 30,
            "servings": 6,
            "sourceUrl": "http://cooking.nytimes.com/recipes/8355-creamy-lemon-pasta",
            "openLicense": 0,
            "image": "creamy-lemon-pasta-735844.jpg"
        },
        {
            "id": 621163,
            "title": "Pesto Pasta with Lemon, Spinach, Edamame & Toasted Almonds",
            "readyInMinutes": 45,
            "servings": 4,
            "sourceUrl": "http://www.thekitchn.com/recipe-pesto-pasta-with-lemon-145783",
            "openLicense": 0,
            "image": "Pesto-Pasta-with-Lemon--Spinach--Edamame---Toasted-Almonds-621163.jpg"
        },
        {
            "id": 750949,
            "title": "Mexican Macaroni Salad",
            "readyInMinutes": 60,
            "servings": 12,
            "sourceUrl": "http://www.foodnetwork.com/recipes/ree-drummond/mexican-macaroni-salad.html",
            "openLicense": 0,
            "image": "mexican-macaroni-salad-750949.jpeg"
        },
        {
            "id": 668358,
            "title": "Spaghetti with Avocado Sauce",
            "readyInMinutes": 30,
            "servings": 8,
            "sourceUrl": "http://www.purewow.com/recipes/Spaghetti-with-Avocado-Sauce?utm_source=zergnet",
            "openLicense": 0,
            "image": "Spaghetti-with-Avocado-Sauce-668358.png"
        },
        {
            "id": 586792,
            "title": "Poblano Macaroni and Cheese",
            "readyInMinutes": 60,
            "servings": 15,
            "sourceUrl": "http://www.nutmegnanny.com/2011/09/10/poblano-macaroni-and-cheese-the-homesick-texan-cookbook-spotlight-cook-off/",
            "openLicense": 0,
            "image": "Poblano-Macaroni-and-Cheese-586792.jpg"
        },
        {
            "id": 577319,
            "title": "Caprese Pasta Salad",
            "readyInMinutes": 35,
            "servings": 6,
            "sourceUrl": "http://www.simplyscratch.com/2013/07/caprese-pasta-salad.html",
            "openLicense": 0,
            "image": "Caprese-Pasta-Salad-577319.jpg"
        }
    ],
    "baseUri": "https://spoonacular.com/recipeImages/",
    "offset": 0,
    "number": 10,
    "totalResults": 806,
    "processingTimeMs": 538,
    "expires": 1607920554934
};

const apiKey = '';
const searchURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/'
const recipeEndpoint = 'recipes/search?'
const wineEndpoint = 'food/wine/pairing?'

function displayDrinkRec () {
    
}

function getWineRec() {
    console.log(`getWineRec ran`)

}

function getCocktailRec() {
    console.log('getCocktailRec ran')
}

function watchRecipeList() {
    $('.js-recipe-list').on('click', 'button', function(event) {
      event.stopPropagation();
      const bevType = $(this).attr('id');
      console.log(bevType);
      if (bevType === 'wine') {
        getWineRec()
        } else {
          getCocktailRec(bevType);
      }
    });
}

function displayDrinkOptions() {
    return `<fieldset class="bev-options">
                   <legend>Wine or cocktail?</legend>
                   <button type="button" id="wine" name="drink"><label for="wine">Wine</label>
                   <button type="button"id="cocktail" name="drink"><label for="cocktail">Cocktail</label>
                   <button type="button" id="non-alcoholic" name="drink"><label for="non-alcoholic">Non-alcoholic/Mocktail</label>
              </fieldset>`
}


function displayRecipeResults(responseJson) {
    //console.log(responseJson);
    $('.js-error-message').text('');
    $('.js-recipe-list').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        $('.js-recipe-list').append(`
        <li><h4><a href=${responseJson.results[i].url}>${responseJson.results[i].title}</a></h4>
        <img href="${responseJson.results[i].image}" alt="${responseJson.results[i].title}">
        <p>Ready in ${responseJson.results[i].readyInMinutes} minutes! Makes ${responseJson.results[i].servings} servings</p>
        <p>Source recipe:<a href=${responseJson.results[i].sourceUrl}>${responseJson.results[i].sourceUrl}</a></p>
        ${displayDrinkOptions()}
       </li>`)
    }
    $('.js-results').removeClass('hidden');
    watchRecipeList();
}


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`); 
    return queryItems.join('&');
}




function getRecipeList(recipeQuery, intoleranceInput, dietInput, numberInput) {
    const recipeParams = {
        query: recipeQuery,
        diet: dietInput,
        number: numberInput
    }
    const queryString = formatQueryParams(recipeParams);
    const url = searchURL + recipeEndpoint + queryString;
    console.log(url);
    /* fetch(url, {
	"headers": {
		"x-rapidapi-key": apiKey,
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            console.log(responseJson)
        })
        */
        displayRecipeResults(responseJson);
}


function handleFormSubmit() {
    $('.js-form').submit(event => {
        event.preventDefault();
        const recipeQuery = $('input#recipe-query').val();
        let intolerances = []
        $('input[name="intolerance"]:checked').each(function() {
          intolerances.push(this.value);
        });
        intolerances = intolerances.join(', ');
        const dietInput = $('select[id="diet"]').val();
        const numberInput = $('input[type="number"]').val();
        /* const intolerances ?? const intolerances = [];
        intolerances.push($('input[type="checkbox":checked').val()); */
        // const cuisine = $('select[id="cuisine"').val();
        getRecipeList(recipeQuery, dietInput, numberInput)
        //wine => pass vars to formatSpoon
        //cocktail => pass vars to formatSpoonAndCocktail

    })
}

$(handleFormSubmit);