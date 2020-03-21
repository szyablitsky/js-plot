import * as types from 'lib/constants/token_types'

function Token(type, value) {
  this.type = type;
  this.value = value;
}

const isComma = (ch) => /,/.test(ch)
const isDigit = (ch) => /\d/.test(ch)
const isLetter = (ch) => /[a-z]/i.test(ch)
const isOperator = (ch) => /\+|-|\*|\/|\^/.test(ch)
const isLeftParenthesis = (ch) => /\(/.test(ch)
const isRightParenthesis = (ch) => /\)/.test(ch)

export const tokenize = (str) => {
  str.replace(/\s+/g, '')
  str = str.split('')

  const result = []
  const letterBuffer = []
  const numberBuffer = []

  const emptyLetterBufferAsVariables = () => {
    var l = letterBuffer.length
    for (var i = 0; i < l; i++) {
      result.push(new Token(types.VARIABLE, letterBuffer[i]))
      if (i < l - 1) { // there are more Variables left
        result.push(new Token(types.OPERATOR, '*'))
      }
    }
    letterBuffer.length = 0
  }

  function emptyNumberBufferAsLiteral() {
    if (numberBuffer.length) {
      result.push(new Token(types.LITERAL, numberBuffer.join('')))
      numberBuffer.length = 0
    }
  }

  str.forEach(function (char) {
    if (isDigit(char)) {
      numberBuffer.push(char)
    } else if (char === '.') {
      numberBuffer.push(char)
    } else if (isLetter(char)) {
      if (numberBuffer.length) {
        emptyNumberBufferAsLiteral()
        result.push(new Token(types.OPERATOR, '*'))
      }
      letterBuffer.push(char)
    } else if (isOperator(char)) {
      emptyNumberBufferAsLiteral()
      emptyLetterBufferAsVariables()
      result.push(new Token(types.OPERATOR, char))
    } else if (isLeftParenthesis(char)) {
      if(letterBuffer.length) {
        result.push(new Token(types.FUNCTION, letterBuffer.join('')))
        letterBuffer.length = 0
      } else if(numberBuffer.length) {
        emptyNumberBufferAsLiteral()
        result.push(new Token(types.OPERATOR, '*'))
      }
      result.push(new Token(types.LPAREN, char))
    } else if (isRightParenthesis(char)) {
      emptyLetterBufferAsVariables()
      emptyNumberBufferAsLiteral()
      result.push(new Token(types.RPAREN, char))
    } else if (isComma(char)) {
      emptyNumberBufferAsLiteral()
      emptyLetterBufferAsVariables()
      result.push(new Token(types.SEPARATOR, char))
    }
  })

  if (numberBuffer.length) emptyNumberBufferAsLiteral()
  if(letterBuffer.length) emptyLetterBufferAsVariables()

  return result;
}
