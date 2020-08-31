import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import 'styled-components/macro'
import {
  Card,
  Text,
  Badge,
  theme,
} from '@aragon/ui'

import TransactionPNG from '../assets/transaction@3x.png'
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


const CommentsCard = ({ transactInfo }) => {
  const { register, handleSubmit, errors, setValue} = useForm()
  const initialComments = [
    {
      avatar: TransactionPNG,
      username: "Dev2",
      text: "It's too expensive"
    },
    {
      avatar: TransactionPNG,
      username: "Dev1",
      text: "0.1 ether is $43.47 ?"
    }
  ]
  const [comments, setComments] = useState(initialComments)

  const onSubmit = (data) => {
    console.log(data)
    const newComments = [{
      ...data,
      username: "Dev3",
      avatar: TransactionPNG
    }].concat(comments)
    setComments(newComments)
    setValue("text", "")
  };

  return (
    <Card
      height="auto"
      width="500px"
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="text" ref={register} /> {/* register an input */}
        <input type="submit" />
      </form>
      <div className="block-stats">
      {
        comments.map(comment => {
          return (
            <>
              <div className="stat">
                <img
                  src={comment.avatar}
                  alt="Hands with coins floating"
                  width="32px"
                  height="32px"
                />
                <Text smallcaps color={theme.textSecondary}>
                  {comment.username}
                </Text>
              </div>
              <div className="stat">
                <Badge>{comment.text}</Badge>
              </div>
            </>
          )
        })
      }
      </div>
  
    </CardContent>
    </Card>
  )
}

CommentsCard.propTypes = {
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

export default CommentsCard
