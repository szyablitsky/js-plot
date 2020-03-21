import { tokenize } from './tokenizer'

export const parse = (input) => {
  const tokens = tokenize(input)
  return tokens
}
