import React from 'react'
import { Provider } from 'react-redux'

import store from 'lib/store'
import Form from './form'
import Result from './result'

import css from './app.module.sass'

const App = () =>
  <Provider store={store}>
    <div className={css.app}>
      <h1>JavaScript Plot</h1>
      <Form/>
      <Result/>
    </div>
  </Provider>

export default App
