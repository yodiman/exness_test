import {serverConfiguration} from 'universal-webpack';
import config from './webpack.config';
const settings = require('./universal-webpack-settings.json');

export default serverConfiguration(config, settings);
