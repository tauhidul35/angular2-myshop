import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { Sorter } from '../shared/utils/sorter';
import { TrackByService } from '../shared/services/trackby.service';

@Component({
  moduleId: module.id,
  selector: 'products-grid',
  templateUrl: 'productsGrid.component.html',
  directives: [ROUTER_DIRECTIVES, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsGridComponent implements OnInit {
  @Input() products: any[] = [];

  constructor(private sorter: Sorter, public trackby: TrackByService) { }

  ngOnInit() {}

  sort(prop: string) {
    this.sorter.sort(this.products, prop);
  }
}
