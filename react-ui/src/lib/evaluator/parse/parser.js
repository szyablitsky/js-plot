import * as tokens from 'lib/constants/token_types'
import * as nodes from 'lib/constants/node_types'
import Tokenizer from './tokenizer'

const matchOp = (token, op) =>
  (typeof token !== 'undefined') &&
  token.type === tokens.OPERATOR &&
  token.value === op

const createNode = (type, content) => ({ type, content })

export default function () {
  const tokenizer = new Tokenizer()

  // ArgumentList := Expression |
  //                 Expression ',' ArgumentList
  function parseArgumentList() {
    let token, expr, args = []

    while (true) {
      expr = parseExpression()
      if (typeof expr === 'undefined') {
        // TODO maybe throw exception?
        break
      }
      args.push(expr)
      token = tokenizer.peek()
      if (!matchOp(token, ',')) break
      tokenizer.next()
    }

    return args
  }

  // FunctionCall ::= Identifier '(' ')' ||
  //                  Identifier '(' ArgumentList ')'
  function parseFunctionCall(name) {
    let token, args = []

    token = tokenizer.next()
    if (!matchOp(token, '(')) {
      throw new SyntaxError(`Expecting \`(\` in a function call "${name}"`)
    }

    token = tokenizer.peek()
    if (!matchOp(token, ')')) {
      args = parseArgumentList()
    }

    token = tokenizer.next()
    if (!matchOp(token, ')')) {
      throw new SyntaxError(`Expecting \`)\` in a function call "${name}"`)
    }

    return createNode(nodes.FUNCTION_CALL, { name, args })
  }

  // Primary ::= Identifier |
  //             Number |
  //             '(' Assignment ')' |
  //             FunctionCall
  function parsePrimary() {
    let token = tokenizer.peek()

    if (typeof token === 'undefined') {
      throw new SyntaxError('Unexpected termination of expression')
    }

    if (token.type === tokens.IDENTIFIER) {
      token = tokenizer.next()
      if (matchOp(tokenizer.peek(), '(')) {
        return parseFunctionCall(token.value)
      } else {
        return createNode(nodes.IDENTIFIER, token.value)
      }
    }

    if (token.type === tokens.NUMBER) {
        token = tokenizer.next()
        return {
          type: nodes.NUMBER,
          content: token.value,
        }
    }

    if (matchOp(token, '(')) {
      tokenizer.next()
      const expression = parseAssignment()
      token = tokenizer.next()
      if (!matchOp(token, ')')) {
        throw new SyntaxError('Expecting `)`')
      }
      return createNode(nodes.EXPRESSION, expression)
    }

    throw new SyntaxError('Parse error, can not process token ' + token.value)
  }

  // Unary ::= Primary |
  //           '-' Unary
  function parseUnary() {
    let token = tokenizer.peek()
    if (matchOp(token, '-') || matchOp(token, '+')) {
      token = tokenizer.next()
      const expression = parseUnary()
      return createNode(nodes.UNARY, { operator: token.value, expression })
    }

    return parsePrimary()
  }

  // Exponential ::= Unary |
  //                 Exponential '^' Unary
  function parseExponential() {
    let expression = parseUnary()
    let token = tokenizer.peek()
    while (matchOp(token, '^')) {
      token = tokenizer.next()
      expression = createNode(nodes.BINARY, {
        operator: token.value,
        left: expression,
        right: parseUnary(),
      })
      token = tokenizer.peek()
    }
    return expression
  }

  // Multiplicative ::= Unary |
  //                    Multiplicative '*' Unary |
  //                    Multiplicative '/' Unary
  function parseMultiplicative() {
    let expression = parseExponential()
    let token = tokenizer.peek()
    while (matchOp(token, '*') || matchOp(token, '/')) {
      token = tokenizer.next()
      expression = createNode(nodes.BINARY, {
        operator: token.value,
        left: expression,
        right: parseExponential(),
      })
      token = tokenizer.peek()
    }
    return expression
  }

  // Additive ::= Multiplicative |
  //              Additive '+' Multiplicative |
  //              Additive '-' Multiplicative
  function parseAdditive() {
    let expression = parseMultiplicative()
    let token = tokenizer.peek()
    while (matchOp(token, '+') || matchOp(token, '-')) {
      token = tokenizer.next()
      expression = createNode(nodes.BINARY, {
        operator: token.value,
        left: expression,
        right: parseMultiplicative(),
      })
      token = tokenizer.peek()
    }
    return expression
  }

  // Assignment ::= Identifier '=' Assignment |
  //                Additive
  function parseAssignment() {
    const expression = parseAdditive()
    if (typeof expr !== 'undefined' && expression.type === nodes.IDENTIFIER) {
      const token = tokenizer.peek()
      if (matchOp(token, '=')) {
        tokenizer.next()
        return createNode(nodes.ASSIGNMENT, {
          name: expression,
          value: parseAssignment(),
        })
      }
    }

    return expression
  }

  // Expression ::= Assignment
  function parseExpression() {
    return parseAssignment()
  }

  function parse(input) {
    tokenizer.init(input)
    const expression = parseExpression()

    const token = tokenizer.next()
    if (typeof token !== 'undefined') {
      throw new SyntaxError('Unexpected token ' + token.value)
    }

    return createNode(nodes.EXPRESSION, expression)
  }

  return { parse }
}
