import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { plot } from './plot'
import { WIDTH, HEIGHT } from 'lib/constants/plot'

export const Internal = ({ min, max, values }) => {
  const canvas = useRef(null)

  useEffect(() => {
    const context = canvas.current.getContext('2d')
    plot(context, min, max, values)
  }, [min, max, values])

  return <canvas ref={canvas} width={WIDTH + 200} height={HEIGHT + 20}/>
}


Internal.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
}


const mapStateToProps = (state) => ({
  min: state.result.min,
  max: state.result.max,
  values: state.result.values,
})

export default connect(mapStateToProps, {})(Internal)
