import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
//import { Observable } from 'rxjs/Observable';

import { DataService } from '../shared/services/data.service';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { ProductsCardComponent } from './productsCard.component';
import { ProductsGridComponent } from './productsGrid.component'
import { IProduct, IOrder } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'products',
  templateUrl: 'products.component.html',
  directives: [ ROUTER_DIRECTIVES, FilterTextboxComponent,
                ProductsCardComponent, ProductsGridComponent ]
})

export class ProductsComponent implements OnInit {
  title: string;
  filterText: string;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.title = 'Products';
    this.filterText = 'Filter Products:';
    this.displayMode = DisplayModeEnum.Card;

    this.dataService.getProducts()
      .subscribe((products: IProduct[]) => {
        this.products = this.filteredProducts = products;
      });
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
  }

  filterChanged(data: string) {
    if (data && this.products) {
      data = data.toUpperCase();
      let props = ['name', 'price', 'address', 'city', 'orderTotal'];
      let filtered = this.products.filter(item => {
        let match = false;
        for (let prop of props) {
          //console.log(item[prop] + ' ' + item[prop].toUpperCase().indexOf(data));
          if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
            match = true;
            break;
          }
        }
        return match;
      });
      this.filteredProducts = filtered;
    }
    else {
      this.filteredProducts = this.products;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
