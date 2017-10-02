var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./dev');
var compiler = webpack(config);

var app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.path + './../dev'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname + './../dist/dev'));

app.get('*', function(req, res) {
  var hostName = req.get('host');
  var protocol = req.connection.encrypted == null ? 'http://' : 'https://';
  var host = `${protocol}${hostName}`;
  res.sendFile(path.join(__dirname + './../dist/dev/index.html'));
});

var port = 8888;

app.listen(port, function(err) {
  if(err) {
    console.log(err);
    return;
  }
  console.log(`Listen dev server at http://localhost:${port}`);
});
