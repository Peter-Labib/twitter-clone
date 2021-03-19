import * as actionType from './actionTypes'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { saveLikeToggle, saveTweet } from '../../utils/api'

export const recieveTweets = (tweets) => {
    return {
        type: actionType.RECIEVE_TWEETS,
        tweets
    }
}

export const toggleTweet = ({ id, authedUser, hasLiked }) => {
    return {
        type: actionType.TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export const handleToggleTweet = (info) => {
    return (dispatch) => {
        dispatch(toggleTweet(info))
        return saveLikeToggle(info)
            .catch((e) => {
                console.warn('error in handleToggleTweet', e)
                dispatch(toggleTweet(info))
            })
    }
}

const addTweet = (tweet) => {
    return {
        type: actionType.ADD_TWEET,
        tweet
    }
}

export const addTweetHandler = (text, replyingTo) => (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())
    return saveTweet({
        text,
        author: authedUser,
        replyingTo
    })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(() => dispatch(hideLoading()))
}