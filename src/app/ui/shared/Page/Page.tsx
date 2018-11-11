import * as React from 'react';
import * as classNames from 'classnames/bind';
import Helmet from 'react-helmet';
import ErrorBoundary from 'app/ui/shared/ErrorBoundary/ErrorBoundary';
import Loader from 'app/ui/shared/Loader/Loader';

const styles = require('./Page.scss');

export interface IPageProps {
  children: JSX.Element | Array<JSX.Element | JSX.Element[]>;
  className?: string;
  header: JSX.Element | string;
  loading?: boolean;
}


export default class Page extends React.PureComponent<IPageProps> {
  render(): JSX.Element {
    const {className, children, header, loading} = this.props;

    return (
      <ErrorBoundary>
        <div className={classNames(styles.page, className)}>
          <Helmet title={header} />
          <h1>
            {header}
            <Loader show={loading} size={25} className={styles.loader} />
          </h1>
          {children}
        </div>
      </ErrorBoundary>
    );
  }
}
