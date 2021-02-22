import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Item[] = []; 

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    console.log("Kasutaja läks carti peale");
    console.log(this.cartItems);
  }

  onDeleteFromCart(index: number){
    console.log(index);
    console.log("kustutamine toimib");
    this.cartService.cartItems.splice(index,1)
  }
}
