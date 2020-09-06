import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { logoutUser } from '../actions/users.actions'
import { history } from '../store'

const StyledLink = styled.a`
  text-decoration: none;
`

const AppTabProfile = ({ me, logoutUser }) => {
  if (me) {
    return (
      <div>
          {me.user.email}
          /
          <StyledLink to="/login" onClick={() => {
            logoutUser()
            history.push('/login')
          }}>
            Log Out
          </StyledLink>
      </div>
    )
  }
  return (
    <div>
      <StyledLink href="/login">
        Log In
      </StyledLink>
      /
      <StyledLink href="/register">
        Sign Up
      </StyledLink>
    </div>
  )
}

const mapStateToProps = state => ({
  me: state.usersReducer.me,
})

const mapDispatchToProps = dispatch => ({
  logoutUser: (payload) => dispatch(logoutUser(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppTabProfile)