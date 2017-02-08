import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { yellow700 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'

class App extends Component {
  constructor (props) {
    super(props)
    
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this)
  }
  
  handleSearchSubmission(recipe) {
		browserHistory.push({
			pathname: '/recipe/' + recipe.uuid
		})
	}

  render() {
    //console.log(this.props.params)
    return (
      <div style={{height: '100vh'}}>
        <AppBar title='Recipes' iconElementLeft={<div></div>} iconStyleRight={{width: '80%'}} iconElementRight={
          <AutoComplete
            hintText='Search'
            filter={AutoComplete.fuzzyFilter}
            dataSource={ this.props.recipes }
            dataSourceConfig={{
              text: 'name',
              value: 'uuid'
            }}
            maxSearchResults={7}
            onNewRequest={this.handleSearchSubmission}
            fullWidth={true}
            underlineShow={false}
            style={{textColor: 'light-grey', background: yellow700}}
            inputStyle={{color: 'gray'}}
            textFieldStyle={{padding: '0 1em', color: 'gray'}} />}
        />

        <div style={{height: "calc(100vh - 64px)"}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(store => store)(App)
