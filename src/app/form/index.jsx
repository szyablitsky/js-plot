import React, { useState } from 'react'

import * as engines from 'lib/constants/engines'
import { Button, Input, Radio } from 'lib/components'

const options = [
  { label: 'Internal', value: engines.INTERNAL },
  { label: 'Volfram Alpha', value: engines.WOLFRAM_ALPHA },
]

export const Form = () => {
  const [engine, setEngine] = useState(options[0].value)
  const [expression, setExpression] = useState('2*(-x+1)/5-1')
  const [min, setMin] = useState('-1')
  const [max, setMax] = useState('1')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>You can use addition, substraction, multiplicatin, division, unary minus and parentheses</p>
      <p><Radio label='Engine' options={options} value={engine} onChange={setEngine}/></p>
      <p><Input label='Expression' value={expression} onChange={setExpression}/></p>
      <p><Input label='Min X' value={min} onChange={setMin}/></p>
      <p><Input label='Max X' value={max} onChange={setMax}/></p>
      <Button type='submit' title='Plot!'/>
    </form>
  )
}

export default Form
