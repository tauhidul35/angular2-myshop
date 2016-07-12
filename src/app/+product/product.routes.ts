import { RouterConfig } from '@angular/router';

import { ProductComponent }   from './product.component';
import { ProductOrdersComponent } from './productOrders.component';
import { ProductDetailsComponent } from './productDetails.component';
import { ProductEditComponent } from './productEdit.component';

export const ProductRoutes: RouterConfig = [
  { 
    path: 'products/:id', 
    component: ProductComponent,
    children: [
      { path:'orders',  component: ProductOrdersComponent },
      { path:'details', component: ProductDetailsComponent },
      { path:'edit', component: ProductEditComponent }
    ]
  }
];
