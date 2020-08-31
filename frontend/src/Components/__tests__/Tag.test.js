import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import TagLink from '../TagLink'

describe('Tag component', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory()
    const { asFragment } = render(
      <Router history={history}>
        <TagLink location="/" text="hello" />
      </Router>
    )
    expect(asFragment).toMatchSnapshot()
  })
})
