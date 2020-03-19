export const generateId = () => `f${(~~(Math.random()*1e8)).toString(16)}`

export const generateIds = (n) => Array.from({length: n}, () => generateId())
