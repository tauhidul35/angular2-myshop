import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {IProduct, IOrder, IState} from '../interfaces';

@Injectable()
export class DataService {
  _baseUrl:string = '';
  products:IProduct[];
  orders:IOrder[];
  states:IState[];

  constructor(private http:Http) {
  }

  getProducts():Observable<IProduct[]> {
    if (!this.products) {
      return this.http.get(this._baseUrl + 'products.json')
        .map((res:Response) => {
          this.products = res.json();
          return this.products;
        })
        .catch(this.handleError);
    }
    else {
      //return cached data
      return this.createObservable(this.products);
    }
  }

  getProduct(id:number):Observable<IProduct> {
    if (this.products) {
      //filter using cached data
      return this.findProductObservable(id);
    }
    else {
      //Query the existing products to find the target product
      return Observable.create((observer:Observer<IProduct>) => {
          this.getProducts().subscribe((products:IProduct[]) => {
            this.products = products;
            const cust = this.filterProducts(id);
            observer.next(cust);
            observer.complete();
          })
        })
        .catch(this.handleError);
    }
  }

  getOrders(id:number):Observable<IOrder[]> {
    return this.http.get(this._baseUrl + 'orders.json')
      .map((res:Response) => {
        this.orders = res.json();
        return this.orders.filter((order:IOrder) => order.productId === id);
      })
      .catch(this.handleError);
  }

  updateProduct(product:IProduct):Observable<boolean> {
    return Observable.create((observer:Observer<boolean>) => {
      this.products.forEach((cust:IProduct, index:number) => {
        if (cust.id === product.id) {
          const state = this.filterStates(product.state.abbreviation);
          product.state.abbreviation = state.abbreviation;
          product.state.name = state.name;
          this.products[index] = product;
        }
      });
      observer.next(true);
      observer.complete();
    });
  }

  getStates():Observable<IState[]> {
    if (this.states) {
      return Observable.create((observer:Observer<IState[]>) => {
        observer.next(this.states);
        observer.complete();
      });
    }
    else {
      return this.http.get(this._baseUrl + 'states.json').map((response:Response) => {
          this.states = response.json();
          return this.states;
        })
        .catch(this.handleError);
    }
  }

  private findProductObservable(id:number):Observable<IProduct> {
    return this.createObservable(this.filterProducts(id));
  }

  private filterProducts(id:number):IProduct {
    const custs = this.products.filter((cust) => cust.id === id);
    return (custs.length) ? custs[0] : null;
  }

  private createObservable(data:any):Observable<any> {
    return Observable.create((observer:Observer<any>) => {
      observer.next(data);
      observer.complete();
    });
  }

  private filterStates(stateAbbreviation:string) {
    const filteredStates = this.states.filter((state) => state.abbreviation === stateAbbreviation);
    return (filteredStates.length) ? filteredStates[0] : null;
  }

  private handleError(error:any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
