import React, {Component, PropTypes} from 'react'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Fraction from 'fraction.js'
import startCase from 'lodash/startCase'

class Ingredient extends Component {
	render () {
		console.log(this.props.ingredient)
		let amount = '' //this.props.scale.mul(this.props.ingredient.amount)
		if(this.props.ingredient.amount && this.props.ingredient.amount !== 0) {
			amount += this.props.scale.mul(this.props.ingredient.amount.min).toFraction(true)
			if (this.props.ingredient.amount.max) {
				amount += ' to ' + this.props.scale.mul(this.props.ingredient.amount.max).toFraction(true)
			}
		} 
		let pluralizer = amount > 1 ? 's' : ''

		return (
			<Paper style={{background: "#FFFFE0", padding: "0.4em 0 0.4em 1em", margin: "0.5em 0"}} zDepth={2}>
				{this.props.ingredient.isSubHeading
					?<h4 style={{margin: '0.4em 0'}}>{startCase(this.props.ingredient.name)}</h4>
					:<Checkbox label={
						amount
						+ (this.props.ingredient.unit ? ' ' + startCase(this.props.ingredient.unit) + pluralizer : '')
						+ ' ' + startCase(this.props.ingredient.name)
					} />
				}
				
				{/*
				<Paper style={{background: "#FFFFE0", padding: "0.4em 0 0.4em 1em", margin: "0.5em 0"}} zDepth={2}>
					{ingredient.endsWith(":")
					?<h4 style={{margin: "0.4em 0"}}>{ingredient}</h4>
					:<Checkbox label={ingredient} key={ingredient} />}
				</Paper>
				*/}
			</Paper>
		)
	}
}

Ingredient.propTypes = {
	ingredient: PropTypes.object.isRequired,
	scale: PropTypes.instanceOf(Fraction).isRequired
}

export default Ingredient