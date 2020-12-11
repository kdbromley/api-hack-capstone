'use strict';



function getRecipesWine(params) {
    //const 
    //const 

}

function formatRecipeCocktailParams() {
    //when cocktail not wine cocktailDB
    //pass to getRecipesCocktails
}


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`); 
    return queryItems.join('&').;
}


function getRecipeList(foodVars) {
    //const params []
    const recipeParams {
        query: query,
        diet: dietInput,
        number: numberInput
    }
    formatQueryParams(recipeParams)

    //pass to getRecipesWine

}

function handleFormSubmit() {
    $('.js-form').submit(event => {
        event.preventDefault();
        const beverageType = $('input[name="drink"]:checked').attr('id')
        const recipeQuery = $('input[id="recipe-query"').val();
        const dietInput = $('select[id="diet"]').val();
        const numberInput = $();
        /* const intolerances ?? const intolerances = [];
        intolerances.push($('input[type="checkbox":checked').val()); */
        // const cuisine = $('select[id="cuisine"').val();
        if (beverageType === 'wine') {
            console.log(`${beverageType} is wine`)
        } else {
            console.log(`${beverageType} is not wine`)
        }
        //wine => pass vars to formatSpoon
        //cocktail => pass vars to formatSpoonAndCocktail
        console.log('handleFormSubmit ran');

    })
}

$(handleFormSubmit);