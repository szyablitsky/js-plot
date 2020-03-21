import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const Internal = ({ tokens }) =>
  <p>
    Tokens:
    <code>{JSON.stringify(tokens)}</code>
  </p>

Internal.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
}


const mapStateToProps = (state) => ({
  tokens: state.result.tokens,
})

export default connect(mapStateToProps, {})(Internal)
