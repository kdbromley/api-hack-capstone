'use strict';

            
const apiKey = 'd6b052fd42msh1e1c01d961ce133p15b713jsnb0961a325deb';
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
    console.log(responseJson);
    const drinkLink = generateDrinkLink(responseJson);
    $('.js-recipe-list').find('div.result__li__group').append(`
    <div class="result__drink--item">
    <img src="${responseJson.drinks[0].strDrinkThumb}" alt="${responseJson.drinks[0].strDrink}" class="result__image result__image--item">
    <p>Try a <a href=${drinkLink} target="_blank">${responseJson.drinks[0].strDrink}!</p>
    </div>`)
    $('.js-recipe-list').find('button#cocktail').remove();
}

function getCocktailRec() {
    const url = searchURLCocktail + cocktailRandomEndpoint;
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
       $(this).closest('li').nextAll().remove();
       $(this).closest('li').prevAll().remove();
        getCocktailRec();
      });
    }


function displayRecipeResults(responseJson) {
    console.log(responseJson);
    $('.js-error-message').remove();
    $('.js-recipe-list').empty();
    if (responseJson.totalResults == 0) {
        $('.js-recipe-list').append(`<h4 class="js-error-message" style="color: #dd917aff">Uh oh, no results for these search terms. Try broadening your search.</h4>`)
    }
    for (let i = 0; i < responseJson.results.length; i++) {
        $('.js-recipe-list').append(`
       <li><h4><a href=${responseJson.results[i].sourceUrl} target="_blank" >${responseJson.results[i].title}</a></h4>
       <div class="result__li__group">
        <div class="result__recipe--item">
        <img src="${responseJson.baseUri}${responseJson.results[i].image}" alt="${responseJson.results[i].title}" class="result__image result__image--item">
        <p>Ready in ${responseJson.results[i].readyInMinutes} minutes! Makes ${responseJson.results[i].servings} servings.</p>
        <p><a href="${responseJson.results[i].sourceUrl}">Source Recipe</a></p>
        </div>
        </div>
        <button type="button" id="cocktail" name="cocktail?" class="result__drink__button">Cocktail?</button> 
       </li>`)
    }
    $('.js-results').removeClass('invisible');
    watchRecipeList();
}


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`); 
    return queryItems.join('&');
}


function getRecipeList(recipeQuery, intoleranceInput, dietInput, cuisineInput, numberInput=10) {
    const recipeParams = {
        query: recipeQuery,
        intolerances: intoleranceInput,
        diet: dietInput,
        cuisine: cuisineInput,
        number: numberInput
    }
    const queryString = formatQueryParams(recipeParams);
    const url = searchURLRecipe + recipeEndpoint + queryString;
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
        let intoleranceInput = [];
        $('input[name="intolerance"]:checked').each(function() {
          intoleranceInput.push(this.value);
        });
        intoleranceInput = intoleranceInput.join(', ');
        const dietInput = $('select[id="diet"]').val();
        const cuisineInput = $('select[id="cuisine"]').val();
        const numberInput = $('input[type="number"]').val();
        getRecipeList(recipeQuery, intoleranceInput, dietInput, cuisineInput, numberInput);
    })
}

//html inline function, reveal rest of form upon input
function handleFormProgress() {  
        $('fieldset').removeClass('hidden');
        $('div#diet-select').removeClass('hidden');
        $('div#cuisine-select').removeClass('hidden');
        $('label[for="results-number"]').removeClass('invisible');
}

$(handleFormSubmit);
