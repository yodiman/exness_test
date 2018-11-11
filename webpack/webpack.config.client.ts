import {clientConfiguration} from 'universal-webpack';
import config from './webpack.config';
const settings = require('./universal-webpack-settings.json');

export default function (options) {
  return (clientConfiguration as any)(config, settings, options);
}
