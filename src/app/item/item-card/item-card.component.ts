import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Input() i!: number;
  @Output() itemActiveChanged = new EventEmitter();
  isLoggedIn = false;

  constructor( private cookieService: CookieService,
    private cartService: CartService,
    private checkAuth: CheckAuthService) { }

  ngOnInit(): void {
    this.checkAuth.autologin();
    this.checkAuth.loggedIn.subscribe(logged => {
      this.isLoggedIn = logged;
    });
    this.isLoggedIn = this.checkAuth.isLoggedIn();
  }

  onItemActive() {
    this.item.isActive = ! this.item.isActive;
    this.itemActiveChanged.emit(this.item);
  }

  // onRemoveFromCart(item: Item) {
  //   let i = this.cartService.cartItems.findIndex(cartItem => item.title == cartItem.cartItem.title);
  //   if (i != -1) {
  //     if (this.cartService.cartItems[i].count == 1) {
  //       this.cartService.cartItems.splice(i,1);
  //     } else {
  //       this.cartService.cartItems[i].count -= 1;
  //     }
  //     this.cartService.cartChanged.next(this.cartService.cartItems);
  //     this.cookieService.set( 'cart', JSON.stringify(this.cartService.cartItems) );
  //   }
  // }

  // onAddToCart(item: Item) {
  //   let i = this.cartService.cartItems.findIndex(cartItem => item.title == cartItem.cartItem.title);
  //   if (i != -1) {
  //     this.cartService.cartItems[i].count += 1;
  //   } else {
  //     this.cartService.cartItems.push({cartItem: item, count:1});
  //   }
  //     this.cartService.cartChanged.next(this.cartService.cartItems);
  //     this.cookieService.set( 'cart', JSON.stringify(this.cartService.cartItems) );
  // }

}
