import { Injectable } from '@angular/core';

import { IProduct, IOrder } from '../interfaces';

@Injectable()
export class TrackByService {
  product(index:number, product: IProduct) {
    return product.id;
  }
}
