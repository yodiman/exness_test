import {IConfigDTO} from 'app/config/IConfigDTO';
const configDefaults = require('./defaults.json');

const ssl = +(process.env.SSL) === 1;
const protocolPrefix = `http${ssl ? 's' : ''}://`;
const port = +(process.env.PORT);
const host = process.env.HOST || configDefaults.host;
const hostUrl = `${protocolPrefix}${host}:${port}`;

const config: IConfigDTO = {
  app: {
    title: 'Exness test',
    description: 'Exness test',
    head: {
      titleTemplate: 'Exness test: %s',
      meta: [
        {name: 'description', content: 'Exness test'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Exness test'},
        {property: 'og:locale', content: 'en_GB'},
        {property: 'og:title', content: 'Exness test'},
        {property: 'og:description', content: 'Exness test'},
        {property: 'og:card', content: 'summary'},
      ],
    },
  },
  env: {
    host,
    hostUrl,
    isProduction: process.env.NODE_ENV === 'production',
    port,
    ssl,
  },
};


export default config;
