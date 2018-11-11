import * as React from 'react';
import RoutesHelper from 'app/routes/RoutesHelper';
import Link from 'react-router-dom/Link';

const cartUrl = RoutesHelper.getPath(RoutesHelper.paths.cart);

export default function CartLink(): JSX.Element {
  return (
    <Link
      className="btn-warning"
      to={cartUrl}
    >
      Open Cart
    </Link>
  );
}
