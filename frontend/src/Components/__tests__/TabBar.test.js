import React from 'react'
import { render } from '@testing-library/react'
import TabBar from '../TabBar'
import { Main } from '@aragon/ui'

describe('TabBarTest', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Main>
        <TabBar />
      </Main>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
