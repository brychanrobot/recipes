import recipes from '../resources/recipes.json'
import unescape from 'lodash/unescape'

export default function reducer(state={
	recipes: recipes.map(recipe => {
		return {
				uuid: recipe.uuid.replace(/\/UUID\(/, '').replace(/\)\//, ''),
				name: recipe.name,
				ingredientsText: unescape(recipe.properties.ingredientsText).replace('&#13;', ''),
				preparationText: unescape(recipe.properties.preparationText).replace(/&#(13)?;?/g, ''),
			}
	})
}, action) {
	return state
}