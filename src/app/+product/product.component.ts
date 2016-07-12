import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'orders',
  templateUrl: 'product.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class ProductComponent implements OnInit {
  displayMode:ProductDisplayModeEnum;
  displayModeEnum = ProductDisplayModeEnum;

  constructor(private router:Router) {
  }

  ngOnInit() {
    //Next line needs a better technique. This is the easiest way
    //to get child route path that I've found so far.
    //Hoping this will be easier with later builds of router
    const path = this.router.url.split('/')[3];
    switch (path) {
      case 'details':
        this.displayMode = ProductDisplayModeEnum.Details;
        break;
      case 'orders':
        this.displayMode = ProductDisplayModeEnum.Orders;
        break;
      case 'edit':
        this.displayMode = ProductDisplayModeEnum.Edit;
        break;
    }
  }
}

enum ProductDisplayModeEnum {
  Details = 0,
  Orders = 1,
  Edit = 2
}
