import { submitBegin } from 'lib/store/form'
import * as engines from 'lib/constants/engines'
import * as providers from './providers'

const engine2provider = {
  [engines.INTERNAL]: providers.internal,
  [engines.WOLFRAM_ALPHA]: providers.wolframAlpha,
}

export const plot = () => (dispatch, getState) => {
  const { pending, engine } = getState().form

  if (pending) return

  dispatch(submitBegin())
  const provider = engine2provider[engine]
  dispatch(provider())
}
