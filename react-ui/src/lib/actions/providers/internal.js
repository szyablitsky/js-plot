import { parse, evaluate } from 'lib/evaluator'
import { submitEnd } from 'lib/store/form'
import { setError, setValues, setConditions } from 'lib/store/result'

import { WIDTH } from 'lib/constants/plot'

export const internal = () => (dispatch, getState) => {
  const { engine, expression, min: strMin, max: strMax } = getState().form
  const min = parseFloat(strMin)
  const max = parseFloat(strMax)

  if (min === max) {
    dispatch(setError('`min` and `max` should be different'))
  } else if (max < min) {
    dispatch(setError('`max` should be greater than `min`'))
  } else {
    try {
      const ast = parse(expression)
      console.log(ast)
      const values = []
      const delta = (max - min) / WIDTH
      for (let i = 0; i <= WIDTH; i++) {
        values[i] = evaluate(ast, { x: min + i * delta })
      }
      dispatch(setValues(values))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

  dispatch(submitEnd())
  dispatch(setConditions(engine, expression, min, max))
}
