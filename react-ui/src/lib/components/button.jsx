import React from 'react'
import PropTypes from 'prop-types'

import css from './components.module.sass'

export const Button = ({ type, title, onClick }) =>
  <button type={type} className={css.button}>{title}</button>

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  type: 'submit',
}

export default Button
