import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { yellow600 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './components/App'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import recipes from './resources/recipes.json'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow600
  }
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path="/" component={App} recipes={recipes}>
        <IndexRoute component={RecipeList} recipes={recipes}/>
        <Route path="recipe" component={Recipe} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
