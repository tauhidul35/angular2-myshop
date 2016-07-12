import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { IProduct, IOrder, IOrderItem } from '../shared/interfaces';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';

@Component({
  moduleId: module.id,
  selector: 'product-orders',
  templateUrl: 'productOrders.component.html',
  pipes: [ CapitalizePipe ]
})

export class ProductOrdersComponent implements OnInit {
  filteredOrders: IOrder[] = [];
  product: IProduct;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    const id = +this.router.routerState.parent(this.route).snapshot.params['id'];
    this.dataService.getOrders(id).subscribe((orders: IOrder[]) => {
      this.filteredOrders = orders;
    });
    this.dataService.getProduct(id).subscribe((product: IProduct) => {
      this.product = product;
    });
  }
  
  orderTrackBy(index: number, order: IOrderItem) {
    return order.id;
  }
  
  orderItemTrackBy(index: number, orderItem: any) {
    return orderItem.id;
  }

}