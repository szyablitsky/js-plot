import { WIDTH, HEIGHT } from 'lib/constants/plot'

export const plot = (ctx, min, max, values) => {
  const xMin = min
  const xMax = max
  const yMin = Math.min(...values)
  const yMax = Math.max(...values)
  const yMul = HEIGHT / (yMax - yMin)

  xAxis(ctx, xMin, xMax)
  yAxis(ctx, yMin, yMax)

  const y = (index) => HEIGHT - (values[index] - yMin) * yMul

  ctx.beginPath()
  ctx.moveTo(0, y(0))
  for (let i = 1; i <= WIDTH; i++) ctx.lineTo(i, y(i))
  ctx.stroke()
}

const getTextSize = (ctx, text = '0') => {
  const metrics = ctx.measureText(text)
  return {
    width: metrics.width,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  }
}

const xAxis = (ctx, min, max) => {
  // axis
  ctx.beginPath()
  ctx.moveTo(0, HEIGHT)
  ctx.lineTo(WIDTH, HEIGHT)
  ctx.stroke()
  // text measurements
  const { width, height } = getTextSize(ctx, max.toString())
  // min
  ctx.fillText(min.toString(), 0, HEIGHT + height + 5)
  // max
  ctx.fillText(max.toString(), WIDTH - width, HEIGHT + height + 5)
}

const yAxis = (ctx, min, max) => {
  // axis
  ctx.beginPath()
  ctx.moveTo(WIDTH, 0)
  ctx.lineTo(WIDTH, HEIGHT)
  ctx.stroke()
  // text measurements
  const { height } = getTextSize(ctx)
  // min
  ctx.fillText(min.toString(), WIDTH + 5, HEIGHT)
  // max
  ctx.fillText(max.toString(), WIDTH + 5, height)
}
