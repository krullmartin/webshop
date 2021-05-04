import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { Item } from 'src/app/models/item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-navbar',
  templateUrl: './cart-navbar.component.html',
  styleUrls: ['./cart-navbar.component.css']
})
export class CartNavbarComponent implements OnInit {
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