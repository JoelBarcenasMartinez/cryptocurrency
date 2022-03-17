import React, { lazy, Suspense } from 'react';

const LazyCryptoMonedaComponent = lazy(() => import('./CryptoMonedaComponent'));

const CryptoMonedaComponent = props => (
  <Suspense fallback={null}>
    <LazyCryptoMonedaComponent {...props} />
  </Suspense>
);

export default CryptoMonedaComponent;
