import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as engines from 'lib/constants/engines'
import { Button, Input, Radio } from 'lib/components'
import { change } from 'lib/store/form'
import { plot } from 'lib/actions/plot'

const options = [
  { label: 'Internal', value: engines.INTERNAL },
  { label: 'Volfram Alpha', value: engines.WOLFRAM_ALPHA },
]

export const Form = ({ engine, expression, min, max, pending, change, plot }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    plot()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        You can use addition, substraction, multiplicatin, division,
        unary minus and parentheses in expression
      </p>
      <p><Radio name='engine' label='Engine' options={options} value={engine} onChange={change}/></p>
      <p><Input name='expression' label='Expression' value={expression} onChange={change}/></p>
      <p><Input name='min' label='Min X' value={min} onChange={change}/></p>
      <p><Input name='max' label='Max X' value={max} onChange={change}/></p>
      <Button type='submit' title={pending ? 'processing...' : 'Plot!'} disabled={pending}/>
    </form>
  )
}

Form.propTypes = {
  engine: PropTypes.string.isRequired,
  expression: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  plot: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  engine: state.form.engine,
  expression: state.form.expression,
  min: state.form.min,
  max: state.form.max,
  pending: state.form.pending,
})

export default connect(mapStateToProps, { change, plot })(Form)
