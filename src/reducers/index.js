import recipes from '../resources/recipes_reduced.json'

export default function reducer(state={
	recipes: recipes.map(recipe => {
		return {
				uuid: recipe.uuid,
				name: recipe.name,
				ingredientsText: recipe.ingredientsText,
				preparationText: recipe.preparationText,
			}
	})
}, action) {
	return state
}