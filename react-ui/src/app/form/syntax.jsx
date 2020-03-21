import React, { useState } from 'react'

export const Syntax = () => {
  const [syntax, setSyntax] = useState(false)

  const toggleSyntax = () => setSyntax(!syntax)

  return (
    <React.Fragment>
      <p onClick={toggleSyntax}><u>Syntax ({syntax ? 'hide' : 'show'})</u></p>
      {syntax &&
        <ul>
          <li>Whitespace characters allowed</li>
          <li>Only `x` variable allowed</li>
          <li>
            You can use
            <ul>
              <li>Parentheses `(` and `)`</li>
              <li>Addition `+`</li>
              <li>Substraction `-`</li>
              <li>
                Multiplication
                <ul>
                  <li>Explicit `*`</li>
                  <li>Implicit (only between Literals and Variables, or Literals and Functions)</li>
                </ul>
              </li>
              <li>Division `/`</li>
              <li>Unary minus `-`</li>
              <li>Exponentiation `^`</li>
              <li>Square root extraction `sqrt()`</li>
            </ul>
          </li>
        </ul>}
    </React.Fragment>
  )
}

export default Syntax
