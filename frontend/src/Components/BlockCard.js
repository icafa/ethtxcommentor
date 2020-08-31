import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'styled-components/macro'
import { Card, Button, Text, Badge, theme } from '@aragon/ui'
import BlockPNG from '../assets/block@3x.png'
import history from '../history'
import { GU } from '../utils/utils'

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

const BlockCard = ({ blockData }) => (
  <Card
    height="auto"
    css={`
      margin: 0 auto;
    `}
  >
    <CardContent>
      <img src={BlockPNG} alt="Blue block" width="64px" height="64px" />
      <Text size="large">Block Information</Text>
      <Badge>{blockData && Number(blockData.number)}</Badge>
      <div className="block-stats">
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            State
          </Text>
        </div>
        <div className="stat">
          {blockData && blockData.nonce ? (
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
            Gas Used
          </Text>
        </div>
        <div className="stat">
          <Badge>{blockData && blockData.gasUsed}</Badge>
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            Gas Limit
          </Text>
        </div>
        <div className="stat">
          <Badge>{blockData && blockData.gasLimit}</Badge>
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            Difficulty
          </Text>
        </div>
        <div className="stat">
          <Badge>{blockData && blockData.difficulty}</Badge>
        </div>
        <div className="stat">
          <Text smallcaps color={theme.textSecondary}>
            Block Size
          </Text>
        </div>
        <div className="stat">
          <Badge>{blockData && blockData.size}</Badge>
        </div>
      </div>
      <Button
        wide
        mode="strong"
        onClick={() => history.push(`/transactions/${blockData.number}`)}
        css={`
          margin: ${GU}px 0 0 0;
        `}
        data-testid="transactions-button"
      >
        See transactions from this block
      </Button>
      <Button
        wide
        mode="secondary"
        onClick={() => history.goBack()}
        css={`
          margin: ${GU}px 0 0 0;
        `}
        data-testid="back-button"
      >
        Go Back
      </Button>
    </CardContent>
  </Card>
)

BlockCard.propTypes = {
  blockData: PropTypes.shape({
    number: PropTypes.number.isRequired,
    nonce: PropTypes.string,
    difficulty: PropTypes.string.isRequired,
    gasUsed: PropTypes.number.isRequired,
    gasLimit: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  }),
}

export default BlockCard
