import * as dotenv from 'dotenv';
import baseConfiguration from './webpack.config.server';

dotenv.config({path: './env/.env'});

export default baseConfiguration;
