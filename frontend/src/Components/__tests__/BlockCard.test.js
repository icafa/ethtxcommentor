import React from 'react'
import { render } from '@testing-library/react'
import BlockCard from '../BlockCard'
import { Main } from '@aragon/ui'

const mockedSuccessBlock = {
  number: 3,
  nonce: '0xfb6e1a62d119228b',
  difficulty: '21345678965432',
  totalDifficulty: '324567845321',
  size: 616,
  gasLimit: 3141592,
  gasUsed: 21662,
}

const mockedPendingBlock = {
  number: 3,
  nonce: null,
  difficulty: '21345678965432',
  totalDifficulty: '324567845321',
  size: 616,
  gasLimit: 3141592,
  gasUsed: 21662,
}

describe('BlockCard Component', () => {
  it('Renders in the dom with static information succesfully', () => {
    const { getByText } = render(
      <Main>
        <BlockCard blockData={mockedSuccessBlock} />
      </Main>
    )
    const title = getByText(/block information/i)
    expect(title).toBeInTheDocument()
  })
  it('Reads properties of the block object succesfully', () => {
    const { getByText } = render(
      <Main>
        <BlockCard blockData={mockedSuccessBlock} />
      </Main>
    )
    const blockNumber = getByText(String(mockedSuccessBlock.number))
    expect(blockNumber).toBeInTheDocument()
    const successfulStatus = getByText(/success/i)
    expect(successfulStatus).toBeInTheDocument()
    const blockSize = getByText(String(mockedSuccessBlock.number))
    expect(blockSize).toBeInTheDocument()
  })
  it('Shows pending on the status when nonce is not present on the block ', () => {
    const { getByText } = render(
      <Main>
        <BlockCard blockData={mockedPendingBlock} />
      </Main>
    )
    const pendingStatus = getByText(/pending/i)
    expect(pendingStatus).toBeInTheDocument()
  })
})
