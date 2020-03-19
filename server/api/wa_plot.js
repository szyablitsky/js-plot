const ttt = process.env.WA_APP_ID_JS_PLOT

exports.waPlot = function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(`{"message":"Hello from the custom server ${ttt}!"}`);
}
