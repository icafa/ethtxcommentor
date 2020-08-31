import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'styled-components/macro'
import {
  Card,
  Button,
  Text,
  Badge,
  TransactionBadge,
  IdentityBadge,
  theme,
} from '@aragon/ui'

import TransactionPNG from '../assets/transaction@3x.png'
import { GU, toEther } from '../utils/utils'
import history from '../history'

const CardContent = styled.div`
  display: flex;
  padding: ${2 * GU}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .block-stats {
    margin-top: ${GU}px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${2 * GU}px;
    .stat {
      grid-column: span 1;
    }
  }
`

const TransactionCard = ({ transactInfo }) => (
  <Card
    height="auto"
    width="300px"
    css={`
      margin: 0 auto;
    `}
  >
    <CardContent>
      <img
        src={TransactionPNG}
        alt="Hands with coins floating"
        width="64px"
        height="64px"
      />
      <Text size="large">Transaction Information</Text>
      <TransactionBadge
        transaction={transactInfo && transactInfo.hash}
        shorten
      />
      <div className="block-stats">
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            From
          </Text>
        </div>
        <div className="stat">
          <IdentityBadge entity={transactInfo && transactInfo.from} />
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            To
          </Text>
        </div>
        <div className="stat">
          <IdentityBadge entity={transactInfo && transactInfo.to} shorten />
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            Status
          </Text>
        </div>
        <div className="stat">
          {transactInfo && transactInfo.gasPrice ? (
            <Badge
              background={theme.badgeInfoBackground}
              foreground={theme.positive}
            >
              Success
            </Badge>
          ) : (
            <Badge
              background={theme.badgeInfoBackground}
              foreground={theme.negative}
            >
              Pending
            </Badge>
          )}
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            Transaction Value (ETH)
          </Text>
        </div>
        <div className="stat">
          <Badge>{transactInfo && toEther(transactInfo.value)}</Badge>
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            Gas Price
          </Text>
        </div>
        <div className="stat">
          <Badge>{transactInfo && transactInfo.gas}</Badge>
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            From Block
          </Text>
        </div>
        <div className="stat">
          <Badge>{transactInfo.blockNumber}</Badge>
        </div>
      </div>

      <Button
        wide
        mode="secondary"
        onClick={() => history.goBack()}
        css={`
          margin: ${GU}px 0 0 0;
        `}
      >
        Go Back
      </Button>
    </CardContent>
  </Card>
)

TransactionCard.propTypes = {
  transactInfo: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    blockNumber: PropTypes.number.isRequired,
    transactionIndex: PropTypes.number.isRequired,
    gas: PropTypes.number.isRequired,
    gasPrice: PropTypes.string.isRequired,
  }),
}

export default TransactionCard
