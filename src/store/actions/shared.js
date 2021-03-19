import { getInitialData } from '../../utils/api'
import { recieveUsers, recieveTweets, setAuthedUser } from './index'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const AUTHED_ID = 'tylermcginnis'
export const handleInitialData = () => dispatch => {
    dispatch(showLoading())
    return getInitialData().then(({ users, tweets }) => {
        dispatch(recieveUsers(users))
        dispatch(recieveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
    })
}