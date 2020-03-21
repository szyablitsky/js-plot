export const initialState = {
  engine: null,
  expression: '',
  min: '',
  max: '',
  error: null,
  imgUrl: null,
  tokens: [],
}

const PREFIX = 'result.'
const SET_ERROR = `${PREFIX}SET_ERROR`
const SET_IMAGE_URL = `${PREFIX}SET_IMAGE_URL`
const SET_TOKENS = `${PREFIX}SET_TOKENS`
const SET_CONDITIONS = `${PREFIX}SET_CONDITIONS`

export const setError = (error) => ({ type: SET_ERROR, error })
export const setImageUrl = (imageUrl) => ({ type: SET_IMAGE_URL, imageUrl })
export const setTokens = (tokens) => ({ type: SET_TOKENS, tokens })
export const setConditions = (engine, expression, min, max) =>
  ({ type: SET_CONDITIONS, engine, expression, min, max })

export default (state = initialState, action) => {
  const { type, engine, expression, min, max, error, tokens, imageUrl } = action

  switch (type) {
    case SET_ERROR:
      return { ...state, error }

    case SET_IMAGE_URL:
      return { ...state, imageUrl, error: null }

    case SET_TOKENS:
      return { ...state, tokens, error: null }

    case SET_CONDITIONS:
      return { ...state, engine, expression, min, max }

    default:
      return state
  }
}
