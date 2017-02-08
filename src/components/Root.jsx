import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { yellow600 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'
import RecipeList from './RecipeList'
import Recipe from './Recipe'

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow600
  }
})

const Root = ({store}) => (
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={RecipeList} />
					<Route path="recipe/:id" component={Recipe} />
				</Route>
			</Router>
		</MuiThemeProvider>
	</Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;