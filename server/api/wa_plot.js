const waAppID = process.env.WA_APP_ID_JS_PLOT

const WolframAlphaAPI = require('wolfram-alpha-api')
const waApi = WolframAlphaAPI(waAppID)

exports.waPlot = function (req, res) {
  const { expression, min, max } = req.query
  const query = `plot ${expression} for x between ${min} and ${max}`
  waApi.getFull(query).then((queryresult) => {
    if (queryresult.success) {
      res.set('Content-Type', 'application/json')
      res.send(`{"imageUrl":"${queryresult.pods[1].subpods[0].img.src}"}`)
    }
  }).catch((error) => {
    res.set('Content-Type', 'application/json')
    res.send(`{"error":"${error}"}`)
  })
}
