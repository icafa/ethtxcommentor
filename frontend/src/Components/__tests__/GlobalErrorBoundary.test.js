import React from 'react'
import { render } from '@testing-library/react'
import GlobalErrorBoundary from '../GlobalErrorBoundary'
import { Main } from '@aragon/ui'

// eslint-disable-next-line react/prop-types
const BombComponent = ({ bomb }) => {
  if (bomb) {
    throw new Error('K-Boom')
  }
  return <h1>Hi!</h1>
}

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

describe('GlobalErrorBoundary Component', () => {
  it('Renders without any errors', () => {
    const { getByText } = render(
      <Main>
        <GlobalErrorBoundary>
          <BombComponent />
        </GlobalErrorBoundary>
      </Main>
    )
    const greeting = getByText(/hi/i)
    expect(greeting).toBeInTheDocument()
  })
  it('Catches an error when a component throws', () => {
    const { getByText } = render(
      <Main>
        <GlobalErrorBoundary>
          <BombComponent bomb />
        </GlobalErrorBoundary>
      </Main>
    )
    const errorMessage = getByText(/an unexpected error has ocurred/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
