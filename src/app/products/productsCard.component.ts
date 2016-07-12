import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { IProduct } from '../shared/interfaces';
import { TrackByService } from '../shared/services/trackby.service';

@Component({
  moduleId: module.id,
  selector: 'products-card',
  templateUrl: 'productsCard.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  pipes: [ CapitalizePipe, TrimPipe ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsCardComponent implements OnInit {

  @Input() products: IProduct[] = [];

  constructor(public trackby: TrackByService) { }

  ngOnInit() {}
}
