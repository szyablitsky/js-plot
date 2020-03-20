import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as engines from 'lib/constants/engines'
import Internal from './internal'
import WolframAlpha from './wolfram_alpha'

const engine2descrition = {
  [engines.INTERNAL]: 'Internal',
  [engines.WOLFRAM_ALPHA]: 'Wolfram Alpha',
}

const engine2component = {
  [engines.INTERNAL]: Internal,
  [engines.WOLFRAM_ALPHA]: WolframAlpha,
}

export const Result = ({ engine, expression, min, max, error }) => {
  if (!engine) return null

  return (
    <React.Fragment>
      <h2>Results</h2>
      <p>Engine: {engine2descrition[engine]}</p>
      <p>plot {expression} for x beetween {min} and {max}</p>
      {error
        ? <p>Error: {error}</p>
        : React.createElement(engine2component[engine])}
    </React.Fragment>
  )
}

Result.propTypes = {
  engine: PropTypes.string,
  expression: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  engine: state.result.engine,
  expression: state.result.expression,
  min: state.result.min,
  max: state.result.max,
  error: state.result.error,
})

export default connect(mapStateToProps, {})(Result)
