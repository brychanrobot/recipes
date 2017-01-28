import React, {Component, PropTypes} from 'react'
import Fraction from 'fraction.js'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'

class ScaleDialog extends Component {
	constructor (props) {
		super(props)
		let frac = this.props.scale.mod(1).abs().toFraction() //get fractional part
		let whole = this.props.scale - frac //get whole part
		this.state = {
			whole,
			frac
		}

		this.handleRequestClose = this.handleRequestClose.bind(this)
		this.handleWholeChange = this.handleWholeChange.bind(this)
		this.handleFracChange = this.handleFracChange.bind(this)
	}
	
	handleRequestClose(isConfirmed) {
		this.props.onClose(isConfirmed ? Fraction(this.state.whole).add(this.state.frac) : this.props.scale)
	}

	handleWholeChange(event, index, value) {
		console.log(value)
		this.setState({
			whole: value
		})
	}

	handleFracChange(event, index, value) {
		console.log(value)
		this.setState({
			frac: value
		})
	}

	render () {
		const actions = [
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={false}
				onTouchTap={this.handleRequestClose}
			/>,
		]	

		return (
			<Dialog open={this.props.open} onRequestClose={this.handleRequestClose} actions={actions}>
				<SelectField
					floatingLabelText="Whole"
					value={this.state.whole}
					onChange={this.handleWholeChange}
				>
					<MenuItem value={0} primaryText="" />
					<MenuItem value={1} primaryText="1" />
					<MenuItem value={2} primaryText="2" />
					<MenuItem value={3} primaryText="3" />
					<MenuItem value={4} primaryText="4" />
				</SelectField>

				<SelectField
					floatingLabelText="Fraction"
					value={this.state.frac}
					onChange={this.handleFracChange}
				>
					<MenuItem value="0" primaryText="" />
					<MenuItem value="1/4" primaryText="1/4" />
					<MenuItem value="1/3" primaryText="1/3" />
					<MenuItem value="1/2" primaryText="1/2" />
					<MenuItem value="2/3" primaryText="2/3" />
					<MenuItem value="3/4" primaryText="3/4" />
				</SelectField>
			</Dialog>
		)
	}
}

ScaleDialog.propTypes = {
	scale: PropTypes.instanceOf(Fraction),
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
}

export default ScaleDialog