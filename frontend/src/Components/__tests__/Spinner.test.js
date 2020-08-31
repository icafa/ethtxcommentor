import React from 'react'
import { render } from '@testing-library/react'
import Spinner from '../Spinner'

describe('Spinner Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<Spinner />)
    expect(asFragment()).toMatchSnapshot()
  })
})
