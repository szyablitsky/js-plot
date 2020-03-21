// import Tokenizer from './tokenizer'
import Parser from './parser'

export const parse = (input) => {
  // const tokenizer = new Tokenizer()
  // const tokens = []
  // tokenizer.init(input)
  // while (true) {
  //   let token = tokenizer.next()
  //   if (typeof token === 'undefined') break
  //   tokens.push(token)
  // }
  // return tokens
  const parser = new Parser()
  return parser.parse(input)
}
