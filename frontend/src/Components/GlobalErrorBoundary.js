import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/browser'
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

  handleReport = () => {
    if (process.env.REACT_APP_SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
      })
      const eventId = Sentry.captureException(this.state.error)
      Sentry.showReportDialog({ eventId })
    }
  }

  render() {
    return this.state.hasError ? (
      <GenericError reportCallback={this.handleReport} />
    ) : (
      this.props.children
    )
  }
}
