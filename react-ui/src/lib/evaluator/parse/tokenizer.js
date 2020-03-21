import * as types from 'lib/constants/token_types'

const isWhiteSpace = (ch) => (ch === '\u0009') || (ch === ' ') || (ch === '\u00A0')
const isLetter = (ch) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
const isDecimalDigit = (ch) => (ch >= '0') && (ch <= '9')
const isIdentifierStart = (ch) => (ch === '_') || isLetter(ch)
const isIdentifierPart = (ch) => isIdentifierStart(ch) || isDecimalDigit(ch)

export default function() {
  let expression = ''
  let length = 0
  let index = 0
  let marker = 0

  function peekNextChar() {
    const idx = index
    return ((idx < length) ? expression.charAt(idx) : '\x00')
  }

  function getNextChar() {
    var ch = '\x00'
    const idx = index
    if (idx < length) {
      ch = expression.charAt(idx)
      index += 1
    }
    return ch
  }

  function createToken(type, value) {
    return {
      type: type,
      value: value,
      start: marker,
      end: index - 1,
    }
  }

  function skipSpaces() {
      let ch

      while (index < length) {
        ch = peekNextChar()
        if (!isWhiteSpace(ch)) break
        getNextChar()
      }
  }

  function scanOperator() {
    const ch = peekNextChar()
    if ('+-*/()^%=,'.indexOf(ch) >= 0) {
      return createToken(types.OPERATOR, getNextChar())
    }
    return undefined
  }

  function scanIdentifier() {
    let ch = peekNextChar()
    if (!isIdentifierStart(ch)) return undefined

    let id = getNextChar()
    while (true) {
      ch = peekNextChar()
      if (!isIdentifierPart(ch)) break
      id += getNextChar()
    }

    return createToken(types.IDENTIFIER, id)
  }

  function scanNumber() {
    let ch = peekNextChar()
    if (!isDecimalDigit(ch) && (ch !== '.')) return undefined

    let number = ''
    if (ch !== '.') {
      number = getNextChar()
      while (true) {
        ch = peekNextChar()
        if (!isDecimalDigit(ch)) break
        number += getNextChar()
      }
    }

    if (ch === '.') {
      number += getNextChar()
      while (true) {
        ch = peekNextChar()
        if (!isDecimalDigit(ch)) break
        number += getNextChar()
      }
    }

    if (ch === 'e' || ch === 'E') {
      number += getNextChar()
      ch = peekNextChar()
      if (ch === '+' || ch === '-' || isDecimalDigit(ch)) {
        number += getNextChar()
        while (true) {
          ch = peekNextChar()
          if (!isDecimalDigit(ch)) break
          number += getNextChar()
        }
      } else {
        ch = 'character ' + ch
        if (index >= length) {
          ch = '<end>'
        }
        throw new SyntaxError('Unexpected ' + ch + ' after the exponent sign')
      }
    }

    if (number === '.') {
      throw new SyntaxError('Expecting decimal digits after the dot sign')
    }

    return createToken(types.NUMBER, number)
  }

  function init(str) {
    expression = str
    length = str.length
    index = 0
  }

  function next() {
    let token

    skipSpaces()
    if (index >= length) return undefined

    marker = index

    token = scanNumber()
    if (typeof token !== 'undefined') return token

    token = scanOperator()
    if (typeof token !== 'undefined') return token

    token = scanIdentifier()
    if (typeof token !== 'undefined') return token

    throw new SyntaxError('Unknown token from character ' + peekNextChar())
  }

  function peek() {
    let token

    let idx = index
    try {
      token = next()
      delete token.start
      delete token.end
    } catch (e) {
      token = undefined
    }
    index = idx

    return token
  }

  return { init, next, peek }
}
