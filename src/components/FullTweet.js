import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

const FullTweet = (props) => {
    const { id } = props.match.params
    return (
        <div className='mb-3'>
            <Tweet id={id} />
            <NewTweet id={id} />
            {
                props.replies.map(tweetId => <Tweet key={tweetId} id={tweetId} />)
            }
        </div>
    )
}

const mapStateToProps = ({ tweets }, props) => {
    const { id } = props.match.params

    return {
        id,
        replies: tweets[id] ? tweets[id].replies.sort((a, b) => tweets[a].timestamp - tweets[b].timestamp) : []
    }
}

export default withRouter(connect(mapStateToProps)(FullTweet))
