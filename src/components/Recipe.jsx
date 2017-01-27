import React, {Component} from 'react'
import Fraction from 'fraction.js'
import IParser from 'ingredientparser'
//import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Ingredient from './Ingredient'
//import defaultChef from '../resources/defaultChef.png'

class Recipe extends Component {
	render () {
		//console.log(this.props.location.state.recipe.properties.ingredientsText.split('\n'))
		//console.log(this.props.location.state.recipe.properties.preparationText)
		return (
			<div>
				<h2>{this.props.location.state.recipe.name}</h2>
				<div>
					<h3>Ingredients:</h3>
					{this.props.location.state.recipe.properties.ingredientsText.split('\n')
						.filter(ingredient => ingredient && ingredient.length > 0)
						.map(ingredient =>
						<Ingredient ingredient={IParser.parse(ingredient)} scale={new Fraction('2/2')} key={ingredient} />
					)}
				</div>
				<Paper style={{background: "#FFFFE0", padding: "1.5em", marginTop: "1em"}} zDepth={2}>
					<h3 style={{marginTop: "0"}}>Instructions:</h3>
					<ol>
						{this.props.location.state.recipe.properties.preparationText.split('\n')
							.filter(instruction => instruction && instruction.length > 0)
							.map(instruction =>
							<li key={instruction}>
								{instruction.replace(/(\d+.\s*)/, "")}
							</li>
						)}
					</ol>
				</Paper>
			</div>
		)
	}
}

/*Recipe.propTypes = {

}*/

export default Recipe