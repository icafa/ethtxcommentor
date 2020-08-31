import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import GenericError from '../GenericError'
import { Main } from '@aragon/ui'

describe('GenericError Component Tests', () => {
  it('matches the snapshot', () => {
    const reportCallback = jest.fn()
    const { asFragment } = render(
      <Main>
        <GenericError reportCallback={reportCallback} />
      </Main>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('renders in the dom succesfully and shows static data', () => {
    const reportCallback = jest.fn()
    const { getByText } = render(
      <Main>
        <GenericError reportCallback={reportCallback} />
      </Main>
    )
    const title = getByText(/an unexpected error has ocurred/i)
    expect(title).toBeInTheDocument()
    const info = getByText(/we're sorry for the inconvenience/i)
    expect(info).toBeInTheDocument()
  })
  it('succesfully calls the reportCallback prop passed', () => {
    const reportCallback = jest.fn()
    const { getByText } = render(
      <Main>
        <GenericError reportCallback={reportCallback} />
      </Main>
    )
    const reportButton = getByText(/report error/i)
    fireEvent.click(reportButton)
    expect(reportCallback).toHaveBeenCalledTimes(1)
  })
})
