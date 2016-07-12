import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { IProduct } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';

@Component({
  moduleId: module.id,
  selector: 'product-details',
  templateUrl: 'productDetails.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  pipes: [ CapitalizePipe ]
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
      const id = +this.router.routerState.parent(this.route).snapshot.params['id'];
      this.dataService.getProduct(id)
          .subscribe((product: IProduct) => this.product = product);
  }
}
