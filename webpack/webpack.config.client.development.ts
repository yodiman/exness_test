import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import getBaseConfig from './webpack.config.client';
import appConfig from './webpack.config.app';

const {host, port} = appConfig;
const baseConfig = getBaseConfig({
  development: true,
  css_bundle: true,
});

const config = {
  devtool: 'source-map',

  performance: {
    hints: false,
  },

  entry: {
    main: [
      `webpack-hot-middleware/client?path=${host}:${port}/__webpack_hmr`,
      'react-hot-loader/patch',
      baseConfig.entry.main,
    ],
    global: [
      'theme/index.scss',
    ],
  },

  output: {
    publicPath: `${host}:${port}${baseConfig.output.publicPath}`,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),
  ],
};

export default merge(baseConfig, config);
