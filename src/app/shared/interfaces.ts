export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  address: string;
  city: string;
  state: IState;
  orderTotal?: number;
}

export interface IState {
  abbreviation: string;
  name: string;
}

export interface IOrder {
  productId: number;
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  id: number;
  customerName: string;
  quantity: number;
  itemCost: number;
}
