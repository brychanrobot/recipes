import React, {Component} from 'react'
import { List } from 'material-ui/List'
import RecipeListItem from './RecipeListItem'

class RecipeList extends Component {
	render () {
		let listItems = this.props.route.recipes.map((recipe) =>
			<RecipeListItem recipe={recipe} key={recipe.uuid} />
		)

		return (
			<List>
			{listItems}
			</List>
		)
	}
}

/*
RecipeList.propTypes = {
	recipes: PropTypes.arrayOf(PropTypes.object).isRequired
}
*/

export default RecipeList