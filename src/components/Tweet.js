import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleToggleTweet } from '../store/actions/index'
import { TiArrowBackOutline } from 'react-icons/ti'
import { TiHeartOutline } from 'react-icons/ti'
import { TiHeartFullOutline } from 'react-icons/ti'

const Tweet = (props) => {
    const { tweet, handleToggleTweet, authedUser } = props
    const { avatar, id, hasLiked, likes, name, parent, replies, text, timestamp } = tweet

    const toParent = (e, parent) => {
        e.preventDefault()
        props.history.push(`/tweet/${parent.id}`)
    }

    const handleLike = (e) => {
        e.preventDefault()

        handleToggleTweet({ id, hasLiked, authedUser })
    }

    return (
            <Link to={`/tweet/${id}`} className='card tweet'>
                <div className='row no-gutters'>
                    <div className='col-2 text-center py-3'>
                        <img alt={`avatar of ${name}`}
                            className='rounded-circle m-2'
                            src={avatar}
                            style={{ 'width': '54%' }} />
                    </div>
                    <div className='col-9 card-body text-left'>
                        <h5 className='card-title'>{name}</h5>
                        <p className='card-subtitle text-muted'>{formatDate(timestamp)}</p>
                        {parent && (<button className='text-muted replying-to' onClick={e => toParent(e, parent)}>
                            Replying to @{parent.author}
                        </button>)}
                        <p className='card-text mt-2 tweet__text'>{text}</p>
                        <TiArrowBackOutline style={{ 'fontSize': '1.4rem', 'cursor': 'pointer' }} />
                        <span className='after-icons'>{replies !== 0 && replies}</span>
                        {
                            hasLiked ?
                                <TiHeartFullOutline className='ml-3' style={{ 'fontSize': '1.4rem', 'color': '#de0000', 'cursor': 'pointer' }} onClick={(e) => handleLike(e)} /> :
                                <TiHeartOutline className='ml-3' style={{ 'fontSize': '1.4rem', 'cursor': 'pointer' }} onClick={(e) => handleLike(e)} />
                        }
                        <span className='after-icons'>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
    )
}

const mapStateToProps = ({ tweets, authedUser, users }, { id }) => {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        handleToggleTweet: (info) => dispatch(handleToggleTweet(info))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tweet)) 
