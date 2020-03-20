import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { generateIds } from 'lib/tools/ids'

import css from './components.module.sass'

export const Radio = ({ name, label, options, value, onChange }) => {
  const [ids] = useState(generateIds(options.length))

  const handleChange = (event) => {
    const { value } = event.target
    return name ? onChange(name, value) : onChange(value)
  }

  return (
    <React.Fragment>
      {label && <label className={css.label}>{label}</label>}
      {options.map((option, index) =>
        <label key={ids[index]}>
          <input
            type='radio'
            value={option.value}
            checked={option.value === value}
            onChange={handleChange}/>
          {option.label}
        </label>
      )}
    </React.Fragment>
  )
}

Radio.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Radio
