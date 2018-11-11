import * as Express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.client.development';
import appConfig from './webpack.config.app';

const app = Express();
const compiler = webpack(config);
const {port} = appConfig;

const options = {
  quiet: true,
  noInfo: true,
  hot: true,
  publicPath: config.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true},
};

app.use(webpackDevMiddleware(compiler, options));
app.use(webpackHotMiddleware(compiler));

app.listen(port, error => {
  if (error) {
    console.error(error.stack || error);
    throw error;
  }

  console.info('Webpack development server listening on port %s', port);
});
