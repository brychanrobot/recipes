import React, {Component, PropTypes} from 'react'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Fraction from 'fraction.js'
import {toPrettyString} from '../utils/ingredientParser'
import startCase from 'lodash/startCase'

class Ingredient extends Component {
	render () {

		return (
			<Paper style={{background: "#FFFFE0", padding: "0.4em 0 0.4em 1em", margin: "0.5em 0"}} zDepth={2}>
				{this.props.ingredient.isSubHeading
					?<h4 style={{margin: '0.4em 0'}}>{startCase(this.props.ingredient.name)}</h4>
					:<Checkbox label={toPrettyString(this.props.ingredient, this.props.scale)} />
				}
			</Paper>
		)
	}
}

Ingredient.propTypes = {
	ingredient: PropTypes.object.isRequired,
	scale: PropTypes.instanceOf(Fraction).isRequired
}

export default Ingredient