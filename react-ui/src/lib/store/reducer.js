import { combineReducers } from 'redux'

import * as form from './form'
import * as result from './result'

export const initialState = {
  form: form.initialState,
  result: result.initialState,
}

export default combineReducers({
  form: form.default,
  result: result.default,
})
