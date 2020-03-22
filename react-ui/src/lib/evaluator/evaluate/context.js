export default function (variables = {}) {
  const constants = {
    pi: 3.1415926535897932384,
    phi: 1.6180339887498948482
  }

  const functions = {
    abs: Math.abs,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    ceil: Math.ceil,
    cos: Math.cos,
    exp: Math.exp,
    floor: Math.floor,
    ln: Math.ln,
    random: Math.random,
    sin: Math.sin,
    sqrt: Math.sqrt,
    tan: Math.tan,
  }

  return { constants, functions, variables }
};
