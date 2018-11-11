import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as CleanPlugin from 'clean-webpack-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import getBaseConfig from './webpack.config.client';
import * as dotenv from 'dotenv';

dotenv.config({path: './env/.env'});

const baseConfig = getBaseConfig({development: false});

const config = {
  devtool: false,
  entry: {
    main: [
      './src/client',
    ],
    global: [
      'theme/index.scss',
    ],
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),

    new CleanPlugin(
      [path.relative(baseConfig.context, baseConfig.output.path)],
      {root: baseConfig.context}
    ),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),
  ],
};

export default merge(baseConfig, config);
