import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { shortenAddress, GU } from '../utils/utils'

const StyledLink = styled(Link)`
  display: inline-block;
  font-family: monospace;
  background: ${props =>
    props.background !== '' ? props.background : '#DDEAEF'};
  padding: ${GU / 2}px;
  border-radius: ${GU / 2}px;
  color: black;
  text-decoration: none;
  font-weight: normal;
`

const TagLink = ({ shorten, text, background = '', location }) => {
  let mutatedText = text
  if (shorten) {
    mutatedText = shortenAddress(text)
  }
  return (
    <StyledLink to={`${location}`} background={background}>
      {mutatedText}
    </StyledLink>
  )
}

TagLink.propTypes = {
  shorten: PropTypes.bool,
  text: PropTypes.string.isRequired,
  background: PropTypes.string,
  location: PropTypes.string.isRequired,
}

export default TagLink
