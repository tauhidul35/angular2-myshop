import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { IProduct, IState } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'product-edit',
  templateUrl: 'productEdit.component.html'
})
export class ProductEditComponent implements OnInit {

  product: IProduct = 
  {
    id: 0,
    name: '',
    price: 0,
    image: '',
    address: '',
    city: '',
    state: {
        abbreviation: '',
        name: ''
    }
  };
  states: IState[];
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService) { }

  ngOnInit() {
      const id = +this.router.routerState.parent(this.route).snapshot.params['id'];
      this.dataService.getProduct(id).subscribe((product: IProduct) => {
        //Quick and dirty clone used in case user cancels out of form
        const cust = JSON.stringify(product);
        this.product = JSON.parse(cust);
      });
      this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  onSubmit() {
      this.dataService.updateProduct(this.product)
        .subscribe((status: boolean) => {
          this.router.navigate(['/']);
      });
  }
  
  onCancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}