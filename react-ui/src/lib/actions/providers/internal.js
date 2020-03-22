import { parse, evaluate } from 'lib/evaluator'
import { submitEnd } from 'lib/store/form'
import { setTokens, setConditions } from 'lib/store/result'

export const internal = () => (dispatch, getState) => {
  const { engine, expression, min, max } = getState().form

  const ast = parse(expression)
  const tokens = [
    evaluate(ast, { x: -1 }),
    evaluate(ast, { x: 0 }),
    evaluate(ast, { x: 1 }),
  ]
  dispatch(setTokens(tokens))
  dispatch(submitEnd())
  dispatch(setConditions(engine, expression, min, max))
}
