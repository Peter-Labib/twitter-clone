import React, { useEffect } from 'react'
import LoadingBar from 'react-redux-loading-bar'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './store/actions/index'
import Nav from './components/Nav'
import Dashboard from './components/Dashboard'
import NewTweet from './components/NewTweet'
import FullTweet from './components/FullTweet'

function App(props) {
  const { getInitialData } = props

  useEffect(() => {
    getInitialData()
  }, [getInitialData])

  return (
    <div className="App">
      <LoadingBar style={{ 'backgroundColor': '#0056C3' }} />
      <Nav />
      <div className='container'>
        <Route path='/' exact>
          {props.loading ?
            <div className="spinner-border text-dark d-block mx-auto mt-4" role="status">
              <span className="sr-only">Loading...</span>
            </div> : <Dashboard />}
        </Route>
        <Route path='/new'>
          <NewTweet />
        </Route>
        <Route path='/tweet/:id'>
          <FullTweet />
        </Route>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser == null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

