import React, {Component} from 'react'
import Fraction from 'fraction.js'
import parseIngredient from '../utils/ingredientParser'
//import IParser from 'ingredientparser'
//import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Ingredient from './Ingredient'
//import defaultChef from '../resources/defaultChef.png'

class Recipe extends Component {
	render () {
		const ingredientList = this.props.location.state.recipe.properties.ingredientsText.split(/\s*\n\s*/)
						.filter(ingredient => ingredient && ingredient.length > 0)
						.map((ingredient, index) => 
							<Ingredient ingredient={parseIngredient(ingredient)} scale={Fraction(1)} key={index} />
						)
		//console.log(this.props.location.state.recipe.properties.preparationText)
		return (
			<div>
				<h2>{this.props.location.state.recipe.name}</h2>
				<div>
					<h3>Ingredients:</h3>
					{ingredientList}
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