import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const WolframAlpha = ({ imageUrl }) => <img src={imageUrl} alt='plot'/>

WolframAlpha.propTypes = {
  imageUrl: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  imageUrl: state.result.imageUrl,
})

export default connect(mapStateToProps, {})(WolframAlpha)
