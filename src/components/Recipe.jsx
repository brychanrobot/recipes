import React, {Component, PropTypes} from 'react'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import defaultChef from '../resources/defaultChef.png'

class Recipe extends Component {
	render () {
		//console.log(this.props.location.state.recipe.properties.ingredientsText.split('\n'))
		console.log(this.props.location.state.recipe.properties.preparationText)
		return (
			<div>
				<h2>{this.props.location.state.recipe.name}</h2>
				<div>
					<h3>Ingredients:</h3>
					{this.props.location.state.recipe.properties.ingredientsText.split('\n')
						.filter(ingredient => ingredient && ingredient.length > 0)
						.map(ingredient =>
						<Paper style={{background: "#FFFFE0", padding: "0.4em 0 0.4em 1em", margin: "0.5em 0"}} zDepth={2}>
							{ingredient.endsWith(":")
							?<h4 style={{margin: "0.4em 0"}}>{ingredient}</h4>
							:<Checkbox label={ingredient} key={ingredient} />}
						</Paper>
					)}
				</div>
				<Paper style={{background: "#FFFFE0", padding: "1.5em", marginTop: "1em"}} zDepth={2}>
					<h3 style={{marginTop: "0"}}>Instructions:</h3>
					<ol>
						{this.props.location.state.recipe.properties.preparationText.split('\n')
							.filter(instruction => instruction && instruction.length > 0)
							.map(instruction =>
							<li>
								{instruction.replace(/(\d+.\s*)/, "")}
							</li>
						)}
					</ol>
				</Paper>
			</div>
		)
	}
}

Recipe.propTypes = {

}

export default Recipe