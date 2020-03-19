import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { generateIds } from 'lib/tools/ids'

import css from './components.module.sass'

export const Radio = ({ label, options, value, onChange }) => {
  const [ids] = useState(generateIds(options.length))

  const handleChange = (event) => onChange(event.target.value)

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
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Radio
