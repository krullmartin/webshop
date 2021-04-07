import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { SizeService } from '../size-item/size.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  sizes: string [] = [];
  itemSizes: string [] = [];

  constructor(private itemService:ItemService,
    private router: Router,
    private checkAuth: CheckAuthService,
    private sizeService: SizeService) { }

  ngOnInit(): void {
    this.itemSizes = [];
    this.checkAuth.autologin();
    this.sizes = this.sizeService.sizes;
  }

  onSizeChanged(size: string, event: Event) {
    let isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked) {
      this.itemSizes.push(size);
    } else {
      let i = this.itemSizes.indexOf(size);
      this.itemSizes.splice(i,1);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let formValue = form.value;
      let item = new Item(
        formValue.title,
        formValue.price,
        formValue.imgSrc,
        formValue.category,
        formValue.barcode,
        formValue.producer,
        formValue.description,
        true,
        this.itemSizes);
      //this.itemService.itemsInService.push(item);
      this.itemService.addItemToDatabase(item).subscribe(()=> 
        this.router.navigateByUrl("/admin/items")
        );

    }
    //else {
    //alert ("VIGANE TOODE");
    //}
  }


}
