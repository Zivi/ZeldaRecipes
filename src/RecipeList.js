import React from 'react';
import Recipe from './Recipe';

function filterRecipes(recipes, filters) {
  return recipes.filter(recipe => {
    // Filter by search keyword
    if (filters.search) {
      return recipe.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        Object.keys(recipe.ingredients).some(ingredient =>
          ingredient.toLowerCase().includes(filters.search.toLowerCase())
        );
    } else return true;
  }).filter(recipe => {
    return Object.keys(recipe.ingredients).every(ingredient =>
      filters.ingredients[ingredient]
    ) && (recipe.effect === null || filters.effects[recipe.effect])
  });
}

function RecipeList({ state: recipes, subSpace, filters}) {
  const filteredRecipes = filterRecipes(recipes, filters);

  return (
    filteredRecipes.length === 0 ?
      <div className="no-recipes">No recipes match your search</div>
    :
      <ul className="recipe-list">
        {filteredRecipes.map(recipe =>
          <li key={recipe.id}>
            <Recipe {...subSpace(recipe.id)} />
          </li>
        )}
      </ul>
  );
}

export default RecipeList;
