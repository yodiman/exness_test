(process as any).noDeprecation = true;

import * as path from 'path';
import * as webpack from 'webpack';
import * as Dotenv from 'dotenv-webpack';

const rootFolder = path.resolve(__dirname, '..');

const scssConfig = (includePath: string, modules: boolean) => {
  return {
    test: /\.(scss)$/,
    include: [
      path.resolve(rootFolder, includePath),
    ],
    use: [
      {
        loader: 'style-loader',
      }, {
        loader : 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2,
          modules,
          localIdentName: '[local]__[hash:base64:5]',
        },
      }, {
        loader : 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader : 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
          includePaths: [
            path.resolve(__dirname, './../src/app/theme'),
            path.resolve(__dirname, './../node_modules'),
          ],
        },
      },
    ],
  };
};

const config = {
  context: rootFolder,

  entry: {
    main: './src/client',
  },

  output: {
    path: path.resolve(rootFolder, 'static/assets'),
    publicPath: '/assets/',
    filename: '[name].[hash].js',
  },

  watchOptions: {
    ignored: /\.tsx?$|\.map$/,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'source-map-loader',
          },
        ],
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|otf|wav|mp3)$/,
        use: 'file-loader',
      }, {
        ...scssConfig('src/app/theme', false),
      }, {
        ...scssConfig('src/app/ui', true),
      }, {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader : 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },

  node: {
    fs: 'empty',
  },


  plugins: [
    new Dotenv({
      path: './env/.env',
      systemvars: true,
    }),
    new webpack.WatchIgnorePlugin([
      /\.tsx?$/, /\.map$/,
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    extensions: ['*', '.json', '.js'],
    modules: [
      path.resolve(rootFolder, 'src/app/'),
      path.resolve(rootFolder, 'node_modules'),
    ],
    alias: {
      app: path.resolve(rootFolder, 'src/app'),
      helpers: path.resolve(rootFolder, 'src/helpers'),
    },
  },
};

export default config;
