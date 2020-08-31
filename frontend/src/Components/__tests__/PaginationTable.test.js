import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Main, TableRow, TableHeader, TableCell } from '@aragon/ui'
import PaginationTable from '../PaginationTable'

const mockedItems = [
  {
    thing: 'Guitar',
    strings: 6,
  },
  {
    thing: 'Bass',
    strings: 4,
  },
]

const paginableMockedItems = Array(20).map((value, index) => ({ value: index }))
const unevenPaginableMockedItems = Array(23).map((value, index) => ({
  value: index,
}))
describe('PaginationTable Component', () => {
  it('renders correctly with items', () => {
    const { asFragment } = render(
      <Main>
        <PaginationTable
          header={
            <TableRow>
              <TableHeader>Thing</TableHeader>
              <TableHeader>Strings</TableHeader>
            </TableRow>
          }
          items={mockedItems}
        >
          {items =>
            items.map(item => (
              <TableRow key={item.thing}>
                <TableCell>{item.thing}</TableCell>
                <TableCell>{item.strings}</TableCell>
              </TableRow>
            ))
          }
        </PaginationTable>
      </Main>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('paginates correctly', () => {
    const { getByTestId } = render(
      <Main>
        <PaginationTable
          header={
            <TableRow>
              <TableHeader>Value</TableHeader>
            </TableRow>
          }
          items={paginableMockedItems}
        >
          {items =>
            items.map(item => (
              <TableRow>
                <TableCell>{items.value}</TableCell>
              </TableRow>
            ))
          }
        </PaginationTable>
      </Main>
    )
    const paginationText = getByTestId('pagination-text')
    expect(paginationText).toHaveTextContent('1 - 10 out of 20')
    const backButton = getByTestId('back-button')
    expect(backButton).toBeDisabled()
    const startButton = getByTestId('start-button')
    expect(startButton).toBeDisabled()
    const nextButton = getByTestId('next-button')
    expect(nextButton).toBeInTheDocument()
    fireEvent.click(nextButton)
    expect(paginationText).toHaveTextContent('11 - 20 out of 20')
    fireEvent.click(nextButton)
    expect(paginationText).toHaveTextContent('11 - 20 out of 20')
    expect(nextButton).toBeDisabled()
    const endButton = getByTestId('end-button')
    expect(endButton).toBeDisabled()
    fireEvent.click(backButton)
    expect(paginationText).toHaveTextContent('1 - 10 out of 20')
    expect(startButton).toBeDisabled()
  })
  it('paginates correctly with a non-round array length', () => {
    const { getByTestId } = render(
      <Main>
        <PaginationTable
          header={
            <TableRow>
              <TableHeader>Value</TableHeader>
            </TableRow>
          }
          items={unevenPaginableMockedItems}
        >
          {items =>
            items.map(item => (
              <TableRow>
                <TableCell>{items.value}</TableCell>
              </TableRow>
            ))
          }
        </PaginationTable>
      </Main>
    )
    const paginationText = getByTestId('pagination-text')
    expect(paginationText).toHaveTextContent('1 - 10 out of 23')
    const backButton = getByTestId('back-button')
    expect(backButton).toBeDisabled()
    const startButton = getByTestId('start-button')
    expect(startButton).toBeDisabled()
    const nextButton = getByTestId('next-button')
    expect(nextButton).toBeInTheDocument()
    fireEvent.click(nextButton)
    expect(paginationText).toHaveTextContent('11 - 20 out of 23')
    fireEvent.click(nextButton)
    expect(paginationText).toHaveTextContent('20 - 23 out of 23')
    expect(nextButton).toBeDisabled()
    const endButton = getByTestId('end-button')
    expect(endButton).toBeDisabled()
    fireEvent.click(backButton)
    expect(paginationText).toHaveTextContent('11 - 20 out of 23')
    fireEvent.click(startButton)
    expect(startButton).toBeDisabled()
    expect(paginationText).toHaveTextContent('1 - 10 out of 23')
  })
})
