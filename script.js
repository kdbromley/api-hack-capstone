'use strict';

            
const apiKey = '';
const searchURLRecipe= 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/'
const recipeEndpoint = 'recipes/search?'
const searchURLCocktail = 'https://the-cocktail-db.p.rapidapi.com/'
const cocktailRandomEndpoint = 'random.php'

function generateDrinkLink(responseJson) {
    const liveURL = 'https://thecocktaildb.com/drink/'
    const drinkId = responseJson.drinks[0].idDrink
    const uriDrink = encodeURIComponent(responseJson.drinks[0].strDrink).replace(/%20/g, '-');
    return liveURL + drinkId + '-' + uriDrink
  }

function displayCocktailRec(responseJson) {
    console.log(responseJson)
    const drinkLink = generateDrinkLink(responseJson)
    console.log(drinkLink)
    $('.js-recipe-list').find('section.bev-options').html(`<p class="random-drink-result">Try a <a href=${drinkLink} target="_blank">${responseJson.drinks[0].strDrink}!</p>`)
}

function getCocktailRec() {
    console.log('getCocktailRec ran')
    const url = searchURLCocktail + cocktailRandomEndpoint
    console.log(url)
    fetch(url, {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-key": apiKey,
		    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
	    }
    })
    .then(response => { 
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => displayCocktailRec(responseJson))
    .catch(err => { alert(`Uh oh! An error occured: ${err.message}`);
    });

}



function watchRecipeList() {
    $('.js-recipe-list').on('click', 'button', function(event) {
        getCocktailRec();
      });
    }

function displayDrinkOptions() {
    return `<section class="bev-options">
                   <button type="button"id="cocktail" name="drink"><label for="cocktail">Cocktail?</label>
            </section> `
}


function displayRecipeResults(responseJson) {
    console.log(responseJson);
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




function getRecipeList(recipeQuery, intoleranceInput, dietInput, numberInput=10) {
    const recipeParams = {
        query: recipeQuery,
        intolerances: intoleranceInput,
        diet: dietInput,
        number: numberInput
    }
    const queryString = formatQueryParams(recipeParams);
    const url = searchURLRecipe + recipeEndpoint + queryString;
    console.log(url);
    fetch(url, {
	    "headers": {
		    "x-rapidapi-key": apiKey,
		    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
         }
        throw new Error(response.statusText);
     })
    .then(responseJson => displayRecipeResults(responseJson))
    .catch(err => { alert(`Uh oh! An error occured: ${err.message}`);
        });
}


function handleFormSubmit() {
    $('.js-form').submit(event => {
        event.preventDefault();
        const recipeQuery = $('input#recipe-query').val();
        let intoleranceInput = []
        $('input[name="intolerance"]:checked').each(function() {
          intoleranceInput.push(this.value);
        });
        intoleranceInput = intoleranceInput.join(', ');
        const dietInput = $('select[id="diet"]').val();
        const numberInput = $('input[type="number"]').val();
        getRecipeList(recipeQuery, intoleranceInput, dietInput, numberInput)
    })
}

$(handleFormSubmit);