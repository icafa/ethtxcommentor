import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GenericError from './GenericError'

export default class GlobalErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
  }
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, errorInfo: info })
  }

  render() {
    return this.state.hasError ? (
      <GenericError reportCallback={this.handleReport} />
    ) : (
      this.props.children
    )
  }
}
