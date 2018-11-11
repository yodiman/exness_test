import 'reflect-metadata'; // tslint:disable-line
import {server} from 'universal-webpack';
import config from './../../webpack/webpack.config';

const settings = require('./../../webpack/universal-webpack-settings.json');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

server(config, settings);
