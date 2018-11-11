import * as clone from 'clone';
import baseConfig from './webpack.config.server';
import appConfig from './webpack.config.app';

const {host, port} = appConfig;
const config = clone(baseConfig);

config.output.publicPath = `${host}:${port}${config.output.publicPath}`;

export default config;
