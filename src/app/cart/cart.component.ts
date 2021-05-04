import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CheckAuthService } from '../auth/check-auth.service';
import { Item } from '../models/item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: {cartItem: Item, cartSize: string, count: number}[] = []; 
  sumOfCart: number = 0;
  countOfCart: number = 0;

  constructor(private cartService: CartService,
    private checkAuth: CheckAuthService,
    private cookieService: CookieService) { }


  ngOnInit(): void {
    this.checkAuth.autologin();
    this.cartItems = this.cartService.cartItems;
    this.calculateSumOfCart();
    this.calculateCountOfCart();
  }

  onDeleteFromCart(index: number){
    this.cartService.cartItems.splice(index,1);
    this.calculateSumOfCart();
    this.calculateCountOfCart();
  }

  onEmtyCart () {
    this.cartService.cartItems.splice(0);
    this.calculateSumOfCart();
    this.calculateCountOfCart();
  }

  onRemoveFromCart(item: any) {
    let i = this.cartService.cartItems.findIndex(cartItem => 
      item.cartItem.id == cartItem.cartItem.id && cartItem.cartSize == item.cartSize);
    if (i != -1) {
      if (this.cartService.cartItems[i].count == 1) {
        this.cartService.cartItems.splice(i,1);
      } else {
        this.cartService.cartItems[i].count -= 1;
      }
      this.calculateSumOfCart();
      this.calculateCountOfCart();
    }
  }

  onAddToCart(item: any) {
    let i = this.cartService.cartItems.findIndex(cartItem => 
      item.cartItem.id == cartItem.cartItem.id && cartItem.cartSize == item.cartSize);
    if (i != -1) {
      this.cartService.cartItems[i].count += 1;
    } 
      this.calculateSumOfCart();
      this.calculateCountOfCart();
  }

  // koodi korduv osa lihtsamal kujul
  calculateSumOfCart() {
    this.sumOfCart = 0;
    this.cartItems.forEach(item => {
      //this.sumOfCart = this.sumOfCart + item.price;
      this.sumOfCart += item.cartItem.price * item.count;
    });
    this.cartService.cartChanged.next(this.cartService.cartItems);
    this.cookieService.set( 'cart', JSON.stringify(this.cartService.cartItems) );
  }

  calculateCountOfCart() {
    this.countOfCart = 0;
    this.cartItems.forEach(item => {
      //this.sumOfCart = this.sumOfCart + item.price;
      this.countOfCart += item.count;
    });
    this.cartService.cartChanged.next(this.cartService.cartItems);
    this.cookieService.set( 'cart', JSON.stringify(this.cartService.cartItems) );

  }
  
}
