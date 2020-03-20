import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { generateId } from 'lib/tools/ids'

import css from './components.module.sass'

export const Input = ({ inputClassName, name, label, value, onChange }) => {
  const [id] = useState(generateId())

  const handleChange = (event) => {
    const { value } = event.target
    return name ? onChange(name, value) : onChange(value)
  }

  const inputClass = classNames(css.input, inputClassName)

  return (
    <React.Fragment>
      {label && <label className={css.label} htmlFor={id}>{label}</label>}
      <input className={inputClass} id={id} value={value} onChange={handleChange}/>
    </React.Fragment>
  )
}

Input.propTypes = {
  inputClassName: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input
