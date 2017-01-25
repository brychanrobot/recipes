import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import RecipeList from './RecipeList'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="Recipes" />
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
          {this.props.children}
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
