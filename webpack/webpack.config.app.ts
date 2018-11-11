const configDefaults = require('../src/app/config/defaults.json');

const ssl = +(process.env.SSL) === 1;
const protocolPrefix = `http${ssl ? 's' : ''}://`;
const host = protocolPrefix + (process.env.HOST || configDefaults.host);

export default {
  host,
  port: configDefaults.webpackServerPort,
};
