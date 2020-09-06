import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getComments, addComment } from '../actions/comments.actions'
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


const CommentsCard = ({ transactInfo, commentsByHash, commentsLoading, getComments, addComment }) => {
  const { register, handleSubmit, errors, setValue} = useForm()

  let txHash = transactInfo.hash
  let comments = commentsByHash[txHash] || []

  useEffect(() => {
    if(!commentsByHash[txHash] && !commentsLoading[txHash]) {
      getComments(transactInfo.hash)
    }
  }, [commentsByHash[txHash], commentsLoading[txHash]])

  const onSubmit = (data) => {
    addComment({
      ...data,
      hash: txHash,
    })
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
      <div>
      {
        comments.map((comment, index) => {
          return (
            <div key={index} className="block-stats">
              <div className="stat">
                <img
                  src={comment.avatar || TransactionPNG}
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
            </div>
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

const mapStateToProps = state => ({
  commentsByHash: state.commentsReducer.commentsByHash,
  commentsLoading: state.commentsReducer.commentsLoading,
})

const mapDispatchToProps = dispatch => ({
  getComments: (payload) => dispatch(getComments(payload)),
  addComment: (payload) => dispatch(addComment(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsCard)
