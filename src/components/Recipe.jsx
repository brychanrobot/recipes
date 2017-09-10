import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Fraction from 'fraction.js'
import parseIngredient from '../utils/ingredientParser'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import Ingredient from './Ingredient'
import ScaleDialog from './ScaleDialog'
//import defaultChef from '../resources/defaultChef.png'

class Recipe extends Component {
	constructor (props) {
		super(props)
		this.state = {
			scale: Fraction(1),
			scaleDialogOpen: false
		}

		this.handleScaleChange = this.handleScaleChange.bind(this)
		this.handleScaleTouchTap = this.handleScaleTouchTap.bind(this)
	}

	handleScaleChange(newScale) {
		console.log(newScale)
		this.setState({
			scale: newScale,
			scaleDialogOpen: false
		})
	}

	handleScaleTouchTap(evt) {
		this.setState({
			scaleDialogOpen: true
		})
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			scale: Fraction(1) //reset scale for new recipe
		})
		ReactDOM.findDOMNode(this).scrollTop = 0
	}
		
	
	render () {
		console.log(this.props.recipe.ingredientsText)
		const ingredientList = this.props.recipe.ingredientsText.split(/\s*\n\s*/)
						.filter(ingredient => ingredient && ingredient.length > 0)
						.map((ingredient, index) => 
							<Ingredient
								ingredient={parseIngredient(ingredient)}
								scale={this.state.scale}
								key={index}
							/>
						)
		
		const instructionList = this.props.recipe.preparationText.split(/\s*\n\s*/)
						.filter(instruction => instruction && instruction.length > 0)
						.map((instruction, index) => 
							<li key={index}>
								{instruction.replace(/((\\n)*\d+\.\s)/, "\n")}
							</li>
						)
		
		return (
			<div style={{height: 'inherit', overflowY: 'auto', padding: '1rem'}}>
				<FloatingActionButton style={{position: 'fixed', top: '5em', right: '1em'}}
					onTouchTap={this.handleScaleTouchTap}>
					<FontIcon style={{fontSize: '1em', fontWeight: 'bold'}}>
						{this.state.scale.toFraction(true)}
					</FontIcon>
				</FloatingActionButton>

				<h2>{this.props.recipe.name}</h2>
				<div>
					<h3>Ingredients:</h3>
					{ingredientList}
				</div>
				<Paper style={{background: "#FFFFE0", padding: "1.5em", marginTop: "1em"}} zDepth={2}>
					<h3 style={{marginTop: "0"}}>Instructions:</h3>
					<ol>
						{instructionList}
					</ol>
				</Paper>

				<ScaleDialog
					open={this.state.scaleDialogOpen}
					scale={this.state.scale}
					onClose={this.handleScaleChange}
				/>
			</div>
		)
	}
}

/*Recipe.propTypes = {

}*/

export default connect((state, ownProps) => {
	let recipe = state.recipes.filter(recipe => recipe.uuid === ownProps.params.id)[0]
	return { recipe }
})(Recipe)