// src/pages/index.lazy.ts
import React from 'react';

export const LazyProductsPage = React.lazy(() =>
  import('@/pages/Products').then((m) => ({ default: m.ProductsPage })),
);
export const LazyLoginPage = React.lazy(() =>
  import('@/pages/Login').then((m) => ({ default: m.LoginPage })),
);
