import Context from './context'
import * as nodes from 'lib/constants/node_types'

export default function (ctx) {
  const context = (arguments.length < 1) ? new Context() : ctx;

  function exec(node) {
    const { type, content } = node

    if (type === nodes.EXPRESSION) return exec(content)

    if (type === nodes.NUMBER) return parseFloat(content)

    if (type === nodes.BINARY) {
      const left = exec(content.left)
      const right = exec(content.right)
      switch (content.operator) {
        case '+': return left + right
        case '-': return left - right
        case '*': return left * right
        case '/': return left / right
        case '^': return Math.pow(left, right)
        default: throw new SyntaxError(`Unknown operator \`${content.operator}\``)
      }
    }

    if (type === nodes.UNARY) {
      const expr = exec(content.expression);
      switch (content.operator) {
        case '+': return expr
        case '-': return -expr
        default: throw new SyntaxError(`Unknown operator \`${content.operator}\``)
      }
    }

    if (type === nodes.IDENTIFIER) {
      if (context.constants.hasOwnProperty(content)) {
        return context.constants[content]
      }
      if (context.variables.hasOwnProperty(content)) {
        return context.variables[content]
      }
      throw new SyntaxError(`Unknown identifier \`${content}\``);
    }

    if (type === nodes.ASSIGNMENT) {
      const right = exec(content.value)
      context.variables[content.name.content] = right
      return right
    }

    if (type === nodes.FUNCTION_CALL) {
      if (context.functions.hasOwnProperty(content.name)) {
        const args = []
        for (let i = 0; i < content.args.length; i += 1) {
          args.push(exec(content.args[i]))
        }
        return context.functions[content.name].apply(null, args)
      }
      throw new SyntaxError(`Unknown function \`${content.name}\``)
    }

    throw new SyntaxError('Unknown syntax node');
  }

  function evaluate(ast) {
    return exec(ast)
  }

  return { exec, evaluate }
}
