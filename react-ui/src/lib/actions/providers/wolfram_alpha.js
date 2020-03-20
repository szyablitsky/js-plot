import { submitEnd } from 'lib/store/form'
import { setError, setImageUrl, setConditions } from 'lib/store/result'

export const wolframAlpha = () => async (dispatch, getState) => {
  const { engine, expression, min, max } = getState().form
  const url = `/api?expression=${encodeURI(expression)}&min=${min}&max=${max}`
  const response = await fetch(url)
  const json = await response.json()
  const { imageUrl, error } = json

  dispatch(submitEnd())
  if (error) {
    dispatch(setError(error))
  } else {
    dispatch(setImageUrl(imageUrl))
  }
  dispatch(setConditions(engine, expression, min, max))
}
