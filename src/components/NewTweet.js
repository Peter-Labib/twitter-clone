import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addTweetHandler } from '../store/actions/index'

const NewTweet = (props) => {
    const { id } = props
    const maxCharacterLength = 280
    const [tweet, setTweet] = useState('')
    const [characterLength, setCharacterLength] = useState(0)

    const handleChange = (e) => {
        const text = e.target.value
        setTweet(text)
        setCharacterLength(text.length)
    }

    const submitHandler = (e) => {
        const text = tweet
        e.preventDefault()
        props.addTweet(text, id)
        setTweet('')
        if (!id) {
            props.history.push('/')
        }
    }

    return (
        <form onSubmit={e => submitHandler(e)}>
            <div className='form-group mb-4 text-center'>
                <label htmlFor='newTweet' className='h3 mt-5 mb-2'>Compose new tweet</label>
                <textarea
                    dir='auto'
                    className='form-control'
                    id='newTweet'
                    rows='3'
                    style={{ 'resize': 'none' }}
                    value={tweet}
                    onChange={(e) => handleChange(e)}
                    placeholder="what's happening"
                    maxLength={maxCharacterLength} />
                <div className='ml-auto text-muted mt-1' style={{ 'width': 'fit-content' }}>{`${characterLength} / ${maxCharacterLength}`}</div>
                <button type='submit' className='btn btn-primary mx-auto mt-2'
                    disabled={!tweet.trim()}
                >submit</button>
            </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTweet: (text, replyingTo) => dispatch(addTweetHandler(text, replyingTo))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NewTweet)) 
