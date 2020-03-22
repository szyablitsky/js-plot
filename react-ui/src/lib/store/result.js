export const initialState = {
  engine: null,
  expression: '',
  min: '',
  max: '',
  error: null,
  imgUrl: null,
  values: null,
}

const PREFIX = 'result.'
const SET_ERROR = `${PREFIX}SET_ERROR`
const SET_IMAGE_URL = `${PREFIX}SET_IMAGE_URL`
const SET_VALUES = `${PREFIX}SET_VALUES`
const SET_CONDITIONS = `${PREFIX}SET_CONDITIONS`

export const setError = (error) => ({ type: SET_ERROR, error })
export const setImageUrl = (imageUrl) => ({ type: SET_IMAGE_URL, imageUrl })
export const setValues = (values) => ({ type: SET_VALUES, values })
export const setConditions = (engine, expression, min, max) =>
  ({ type: SET_CONDITIONS, engine, expression, min, max })

export default (state = initialState, action) => {
  const { type, engine, expression, min, max, error, values, imageUrl } = action

  switch (type) {
    case SET_ERROR:
      return { ...state, error }

    case SET_IMAGE_URL:
      return { ...state, imageUrl, error: null }

    case SET_VALUES:
      return { ...state, values, error: null }

    case SET_CONDITIONS:
      return { ...state, engine, expression, min, max }

    default:
      return state
  }
}
