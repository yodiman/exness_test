import * as React from 'react';
import RoutesHelper from 'app/routes/RoutesHelper';
import Link from 'react-router-dom/Link';

const productsUrl = RoutesHelper.getPath(RoutesHelper.paths.products);

export default function ProductsLink(): JSX.Element {
  return (
    <Link
      className="btn-primary"
      to={productsUrl}
    >
      Buy products
    </Link>
  );
}
