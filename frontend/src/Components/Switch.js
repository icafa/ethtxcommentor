import React from 'react'
import { theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GU } from '../utils/utils'

const StyledSwitch = styled.div`
  height: 20px;
  .switch {
    margin: 0 ${GU / 2}px 0 ${GU / 2}px;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
  }

  .switch::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: all 0.3s;
  }

  input[type='checkbox']:checked + .switch::after {
    transform: translateX(20px);
  }

  input[type='checkbox']:checked + .switch {
    background-color: ${theme.accent};
  }

  .offscreen {
    position: absolute;
    left: -9999px;
  }
`

const Switch = ({ onChange, on }) => (
  <StyledSwitch>
    <input
      type="checkbox"
      id="toggle"
      name="toggle"
      className="offscreen"
      onChange={onChange}
      checked={on}
    />{' '}
    <label htmlFor="toggle" className="switch" />
  </StyledSwitch>
)

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  on: PropTypes.bool.isRequired,
}

export default Switch
