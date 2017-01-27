import React, {Component, PropTypes} from 'react'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Fraction from 'fraction.js'
import startCase from 'lodash/startCase'

class Ingredient extends Component {
	render () {
		let amount = this.props.scale.mul(this.props.ingredient.amount)
		let pluralizer = amount > 1 ? 's' : ''
		return (
			<Paper style={{background: "#FFFFE0", padding: "0.4em 0 0.4em 1em", margin: "0.5em 0"}} zDepth={2}>
				<Checkbox label={
					(amount > 0 ? amount.toFraction() : '')
					+ (this.props.ingredient.unit ? ' ' + this.props.ingredient.unit + pluralizer : '')
					+ ' ' + startCase(this.props.ingredient.name)
				} />
				
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