import { provideRouter, RouterConfig } from '@angular/router';

import { ProductsRoutes } from './products/products.routes';
import { ProductRoutes } from './+product/product.routes';

export const App_Routes: RouterConfig = [
  ...ProductsRoutes,
  ...ProductRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(App_Routes)
];
