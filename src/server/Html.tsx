import * as React from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import * as serialize from 'serialize-javascript';
import config from 'app/config/config';
import {Store} from 'redux';
import {IStateDTO} from 'app/redux/dto/IStateDTO';


export interface IHtmlProps {
  assets: any;
  component?: JSX.Element;
  store: Store<IStateDTO>;
}

const defaultProps: Partial<IHtmlProps> = {
  component: null,
};


export default function Html(props: IHtmlProps) {
  const {assets, component, store} = props;
  const {isProduction} = config.env;
  const initialState = `window.__INITIAL_STATE__ = ${serialize(store.getState(), {isJSON: true})}`;
  const head = Helmet.rewind();
  const ie = '<!--[if lte IE 9]><div class="browsehappy"><div class="browsehappy__inner"><div class="browsehappy__message">You are using an <strong>outdated</strong> browser.Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div></div></div><![endif]-->'; // tslint:disable-line
  const content = component ? renderToString(component) : null;

  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <meta charSet="utf-8" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        {/* favicons */}
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        {/* styles */}
        <link href={assets.styles.global} rel="stylesheet" type="text/css" />
        <link href={assets.styles.main} rel="stylesheet" type="text/css" />
        {/* styles will be preloaded */}
        {isProduction && <link rel="preload" href={assets.styles.global} as="style" />}
        {isProduction && <link rel="preload" href={assets.styles.main} as="style" />}
      </head>
      <body>
        <div dangerouslySetInnerHTML={{__html: ie}} />
        <div id="root" dangerouslySetInnerHTML={{__html: content}} />
        <script dangerouslySetInnerHTML={{__html: initialState}} />
        {isProduction && <script defer src={assets.javascript.vendor} />}
        <script crossOrigin="true" defer src={assets.javascript.main} />
      </body>
    </html>
  );
}

Html.defaultProps = defaultProps;
