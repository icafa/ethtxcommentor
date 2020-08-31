import React from 'react'
import styled from 'styled-components'
import { EmptyStateCard, IconAttention } from '@aragon/ui'
import history from '../history'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const App404 = () => (
  <Wrapper>
    <EmptyStateCard
      title="Are you lost?"
      text="Not all those who wander are lost, but you seem to be. We couldn't find a matching route."
      icon={<IconAttention />}
      actionText="Go Home"
      onActivate={() => history.push('/')}
    />
  </Wrapper>
)

export default App404
