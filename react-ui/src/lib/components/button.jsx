import React from 'react'
import PropTypes from 'prop-types'

import css from './components.module.sass'

export const Button = ({ type, title, disabled, onClick }) =>
  <button type={type} className={css.button} disabled={disabled}>{title}</button>

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  type: 'submit',
  disabled: false,
}

export default Button
