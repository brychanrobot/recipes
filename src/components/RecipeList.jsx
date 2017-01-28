import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import RecipeListItem from './RecipeListItem'

class RecipeList extends Component {
	render () {
		let listItems = this.props.recipes.map((recipe) =>
			<RecipeListItem recipe={recipe} key={recipe.uuid} />
		)

		return (
			<List>
			{listItems}
			</List>
		)
	}
}

RecipeList.propTypes = {
	recipes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(store => {
	return {recipes: store.recipes}
})(RecipeList)