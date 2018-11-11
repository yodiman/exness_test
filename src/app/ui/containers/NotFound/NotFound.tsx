import * as React from 'react';
import Link from 'react-router-dom/Link';

const styles = require('./NotFound.scss');

export default function NotFound(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>Doh! 404!</h1>
      <p>These are <em>not</em> the droids you are looking for!</p>
      <div>
        <Link className="btn-primary" to="/">Home Page</Link>
      </div>
    </div>
  );
}
