import { parse } from 'lib/evaluator'
import { submitEnd } from 'lib/store/form'
import { setTokens, setConditions } from 'lib/store/result'

export const internal = () => (dispatch, getState) => {
  const { engine, expression, min, max } = getState().form

  dispatch(setTokens(parse(expression)))
  dispatch(submitEnd())
  dispatch(setConditions(engine, expression, min, max))
}
