import * as engines from 'lib/constants/engines'

const PREFIX = 'form.'
const CHANGE = `${PREFIX}CHANGE`
const SUBMIT_BEGIN = `${PREFIX}BEGIN`
const SUBMIT_END = `${PREFIX}END`

export const initialState = {
  engine: engines.INTERNAL,
  expression: '2.75 * (-x^2 + 1) / sqrt(.5) - 1',
  min: '-1',
  max: '1',
  pending: false,
}

export const change = (key, value) => ({ type: CHANGE, key, value })
export const submitBegin = () => ({ type: SUBMIT_BEGIN })
export const submitEnd = () => ({ type: SUBMIT_END })

export default (state = initialState, action) => {
  const { type, key, value } = action

  switch (type) {
    case CHANGE:
      return { ...state, [key]: value }

    case SUBMIT_BEGIN:
      return { ...state, pending: true }

    case SUBMIT_END:
      return { ...state, pending: false }

    default:
      return state
  }
}
