import { RouterConfig } from '@angular/router';

import { ProductsComponent } from './products.component';

export const ProductsRoutes: RouterConfig = [
  { path: '', terminal: true, redirectTo: '/products' },
  { path: 'products', component: ProductsComponent}
];
