import { submitEnd } from 'lib/store/form'
import { setConditions } from 'lib/store/result'

export const internal = () => (dispatch, getState) => {
  const { engine, expression, min, max } = getState().form
  dispatch(submitEnd())
  dispatch(setConditions(engine, expression, min, max))
}
