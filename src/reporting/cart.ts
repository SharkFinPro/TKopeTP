import { ProductData } from "../productTypes";

export default class Cart {
  cart: ProductData[] | string;
  paymentMethod: string;
  time: Date;
  totalMoney: number;

  constructor(cart: ProductData[], paymentMethod: string, time: Date) {
    this.cart = cart;
    this.paymentMethod = paymentMethod;
    this.time = time;
    this.totalMoney = 0;
  }
}