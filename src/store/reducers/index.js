import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import tweets from './tweets'
import users from './users'
import authedUser from './authedUser'

export default combineReducers({
    loadingBar: loadingBarReducer,
    tweets,
    users,
    authedUser
})