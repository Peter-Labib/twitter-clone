import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

const Dashboard = props => {
    return (
        <div className='text-center'>
            <h3>Your Timeline</h3>
            {props.tweetsId.map(id => <Tweet key={id} id={id} />)}
        </div>
    )
}

const mapStateToProps = ({ tweets }) => ({
    tweetsId: Object.keys(tweets)
})

export default connect(mapStateToProps)(Dashboard)
