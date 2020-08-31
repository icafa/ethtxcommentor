import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { EmptyStateCard, IconError } from '@aragon/ui'

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`

const GenericError = ({ reportCallback }) => (
  <Wrapper>
    <EmptyStateCard
      title="An unexpected error has ocurred"
      text="We're sorry for the inconvenience."
      icon={<IconError />}
      actionText="Report Error"
      onActivate={reportCallback}
    />
  </Wrapper>
)

GenericError.propTypes = {
  reportCallback: PropTypes.func.isRequired,
}

export default GenericError
