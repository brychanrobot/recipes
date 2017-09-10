import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { yellow700 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back'
// import SvgIcon from 'material-ui/SvgIcon'

// import erlenmeyerSilhouette from '../resources/erlenmeyer-logo-silhouette.svg'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isInRecipe: browserHistory.location !== '/',
      searchText: ''
    }

    browserHistory.listen(location => {
      this.setState({
        isInRecipe: location.pathname !== '/',
        searchText: ''
      })
    });

    this.handleUpdateSearchInput = this.handleUpdateSearchInput.bind(this)
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this)
    this.handleNavButtonTouchTap = this.handleNavButtonTouchTap.bind(this)
  }

  handleSearchSubmission(recipe) {
    browserHistory.push({
      pathname: '/recipe/' + recipe.uuid
    })
  }

  handleUpdateSearchInput(searchText) {
    this.setState({
      searchText: searchText,
    });
  };

  handleNavButtonTouchTap() {
    browserHistory.push({
      pathname: '/'
    })
  }

  render() {
    //console.log(this.props.params)
    return (
      <div style={{ height: '100vh' }}>
        <AppBar title='RA' iconElementLeft={<IconButton>{this.state.isInRecipe ? <NavigationBack /> : <NavigationMenu />}</IconButton>} onLeftIconButtonTouchTap={this.handleNavButtonTouchTap} iconStyleRight={{ width: '100%' }}
          iconElementRight={
            <AutoComplete
              hintText='Search'
              searchText={this.state.searchText}
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.props.recipes}
              dataSourceConfig={{
                text: 'name',
                value: 'uuid'
              }}
              maxSearchResults={7}
              onUpdateInput={this.handleUpdateSearchInput}
              onNewRequest={this.handleSearchSubmission}
              fullWidth={true}
              underlineShow={false}
              style={{ textColor: 'light-grey', background: yellow700 }}
              inputStyle={{ color: 'gray' }}
              textFieldStyle={{ padding: '0 1em', color: 'gray' }} />}
        />

        <div style={{ height: "calc(100vh - 64px)" }}>
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
