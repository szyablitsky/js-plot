import Context from './context'
import Evaluator from './evaluator'

export const evaluate = (ast, values) => {
  const context = new Context(values)
  const evaluator = new Evaluator(context)
  return evaluator.exec(ast)
}
