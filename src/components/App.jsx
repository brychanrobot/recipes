import React, { Component } from 'react'
import { yellow700 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import { browserHistory } from 'react-router'
import AutoComplete from 'material-ui/AutoComplete'

class App extends Component {
  constructor (props) {
    super(props)
    
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this)
  }
  

  handleSearchSubmission(recipe) {
		browserHistory.push({
			pathname: '/recipe',
			state: { recipe }
		})
	}

  render() {
    return (
      <div>
        <AppBar title='Recipes' style={{position: 'fixed', top: '0'}} iconStyleRight={{width: '70%'}} iconElementRight={
          <AutoComplete
            hintText='Search'
            filter={AutoComplete.fuzzyFilter}
            dataSource={ this.props.route.recipes }
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

        {/*<AutoComplete
          floatingLabelText="search"
          filter={AutoComplete.fuzzyFilter}
          dataSource={ this.props.route.recipes }
          dataSourceConfig={{
            text: 'name',
            value: 'uuid'
          }}
          maxSearchResults={7}
          onNewRequest={obj => console.log(obj)} />*/}
        <div style={{marginTop: '64px', padding: '0.5em'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

/*
App.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
}
*/

export default App
