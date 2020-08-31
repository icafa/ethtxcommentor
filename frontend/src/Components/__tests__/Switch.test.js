import React from 'react'
import { render } from '@testing-library/react'
import Switch from '../Switch'

describe('Switch component', () => {
  it('renders correctly with on state', () => {
    const onChange = jest.fn()
    const on = true
    const { asFragment } = render(<Switch onChange={onChange} on={on} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it('renders correctly with off state', () => {
    const onChange = jest.fn()
    const on = false
    const { asFragment } = render(<Switch onChange={onChange} on={on} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
