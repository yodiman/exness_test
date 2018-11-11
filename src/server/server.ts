import * as path from 'path';
import * as compression from 'compression';
import * as Express from 'express';
import * as favicon from 'serve-favicon';
import createSSR from './createSSR';
import config from 'app/config/config';
import NetworkHelper from './helpers/NetworkHelper';
import CartHelper from './helpers/CartHelper';
import ProductsHelper from './helpers/ProductsHelper';

const {hostUrl, port, isProduction, ssl} = config.env;
const app: Express.Express = Express();


export default function (parameters) {
  if (isProduction) {
    app.use(compression());
  }
  app.disable('etag');
  app.disable('x-powered-by');
  app.use('/', Express.static('static', {etag: false}));
  app.use(favicon(path.join(__dirname, '..', 'favicons', 'favicon.ico')));
  app.use('/static/images', Express.static(path.join(__dirname, '..', 'images')));

  app.use((req, res, next) => {
    if (ssl && req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
    } else {
      next();
    }
  });


  app.get(
    '/api/products',
    async (_req: Express.Request, res: Express.Response) =>
      res.send(await NetworkHelper.getSuccessResponse(ProductsHelper.getProducts())),
  );

  app.get(
    '/api/cart',
    async (req: Express.Request, res: Express.Response) =>
      res.send(await NetworkHelper.getSuccessResponse(CartHelper.getCartProducts(req))),
  );


  app.get('*', createSSR(parameters.chunks()));

  app.listen(port, error => {
    console.log(error || `Listening at ${hostUrl}`);
  });
}
