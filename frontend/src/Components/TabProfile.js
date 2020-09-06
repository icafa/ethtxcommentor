import React from 'react'
import { connect } from 'react-redux'
import { history } from '../store'

const AppTabProfile = ({ me }) => {
  if (me) {
    return (
      <div>
          {me.user.email}
      </div>
    )
  }
  return (
    <div onClick={() => history.push('/login')}>
        Log In
    </div>
  )
}

const mapStateToProps = state => ({
  me: state.usersReducer.me
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppTabProfile)