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
    console.log(responseJson)
    const drinkLink = generateDrinkLink(responseJson)
    $('.js-recipe-list').find('div.recipe-list__group').append(`
    <div class="item__result__drink">
    <img src="${responseJson.drinks[0].strDrinkThumb}" alt="${responseJson.drinks[0].strDrink}" class="result__image item__result__image">
    <p>Try a <a href=${drinkLink} target="_blank">${responseJson.drinks[0].strDrink}!</p>
    </div>`)
    $('.js-recipe-list').find('button#cocktail').remove();
}

function getCocktailRec() {
    console.log('getCocktailRec ran')
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
       $(this).closest('li').nextAll().remove()
       $(this).closest('li').prevAll().remove();
        getCocktailRec();
      });
    }


function displayRecipeResults(responseJson) {
    console.log(responseJson);
    $('.js-error-message').text('');
    $('.js-recipe-list').empty();
    //getImage(responseJson)
    for (let i = 0; i < responseJson.results.length; i++) {
        $('.js-recipe-list').append(`
       <li><h4 class"recipe__title--inline"><a href=${responseJson.results[i].sourceUrl} target="_blank" >${responseJson.results[i].title}</a></h4>
       <button type="button" id="cocktail" name="cocktail?" class="button--inline">Cocktail?</button> 
       <div class="recipe-list__group">
        <div class="item__result__recipe">
        <img src="${responseJson.baseUri}${responseJson.results[i].image}" alt="${responseJson.results[i].title}" class="result__image item__result__image">
        <p>Ready in ${responseJson.results[i].readyInMinutes} minutes! Makes ${responseJson.results[i].servings} servings. <br/> 
        Source recipe: <a href="${responseJson.results[i].sourceUrl}">${responseJson.results[i].sourceUrl}</a></p>
        </div>
        </div>
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

function handleFormProgress() {
        $('fieldset').removeClass('hidden');
        $('div#diet-select').removeClass('hidden');
        $('div#cuisine-select').removeClass('hidden');
        $('label[for="results-number"]').removeClass('invisible');
}

$(handleFormSubmit);