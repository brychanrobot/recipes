import React, {Component, PropTypes} from 'react'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import defaultChef from '../resources/defaultChef.png'

class RecipeListItem extends Component {
	constructor (props, context) {
		super(props, context)
		this.handleTouchTap = this.handleTouchTap.bind(this)
	}

	handleTouchTap(evt) {
		evt.preventDefault()
		browserHistory.push({
			pathname: '/recipe/' + this.props.recipe.uuid
		})
	}
	
	render () {
		return (
			<ListItem
				primaryText={this.props.recipe.name}
				leftAvatar={<Avatar src={defaultChef} />}
				onTouchTap={this.handleTouchTap}
			/>
		)
	}
}

RecipeListItem.propTypes = {
	recipe: PropTypes.object.isRequired
}

export default RecipeListItem