import React, {Component, PropTypes} from 'react'
import Checkbox from 'material-ui/Checkbox'
import defaultChef from '../resources/defaultChef.png'

class Recipe extends Component {
	render () {
		console.log(this.props.location.state.recipe.properties.ingredientsText.split('\n'))
		return (
			<div>
			{this.props.location.state.recipe.properties.ingredientsText.split('\n').map(ingredient => 
				<Checkbox label={ingredient} key={ingredient} />
			)}
			</div>
		)
	}
}

Recipe.propTypes = {

}

export default Recipe