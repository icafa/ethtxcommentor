import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../actions/users.actions'
import {
    TextInput,
    Button,
    theme,
} from '@aragon/ui'
import { history } from '../store'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.accent};
  text-align: center;
`

const RegisterPage = ({registerUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmit = () => {
        registerUser({
            email,
            password
        })
    }
    return (
        <Wrapper>
            <div>
                <form>
                    <TextInput
                        wide
                        type="email"
                        placeholder="Enter your email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextInput
                        wide
                        type="password"
                        placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        wide
                        mode="strong"
                        onClick={() => onSubmit()}
                    >
                        Sign Up
                    </Button>
                    <StyledLink to="/login">go to login page</StyledLink>
                </form>
            </div>
        </Wrapper>
    )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    registerUser: (payload) => dispatch(registerUser(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage)
