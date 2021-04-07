import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { SizeService } from '../size-item/size.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item!: Item; //= new Item("",0,"","");
  itemEditForm!: FormGroup; //new FormGroup({});
  itemId!: number //= 0;
  sizes: string [] = [];
  itemSizes: string [] = [];
  isItemSizesChecked: {size: string, checked: boolean}[] = [];

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private checkAuth: CheckAuthService,
    private sizeService: SizeService) { }

  ngOnInit(): void {
    this.sizes = this.sizeService.sizes;
    this.checkAuth.autologin();
    this.itemId = (Number)(this.route.snapshot.paramMap.get("itemId"));
    this.item = this.itemService.itemsInService[this.itemId];
    this.itemSizes = this.item.size;
    this.isItemSizesChecked = this.sizes.map(size => { return{size:size, checked:false}});
    
    this.itemEditForm = new FormGroup({
      title: new FormControl(this.item.title),
      price: new FormControl(this.item.price),
      imgSrc: new FormControl(this.item.imgSrc),
      category: new FormControl(this.item.category),
      barcode: new FormControl(this.item.barcode),
      producer: new FormControl(this.item.producer),
      description: new FormControl(this.item.description),
      isActive: new FormControl(this.item.isActive),
      size: new FormControl(this.item.size),
    });
    console.log(this.item);
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

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.itemService.itemsInService[this.itemId] = new Item(
        form.value.title,
        form.value.price,
        form.value.imgSrc,
        form.value.category,
        form.value.barcode,
        form.value.producer,
        form.value.description,
        form.value.isActive,
        this.itemSizes
        );
      this.itemService.saveItemsToDatabase().subscribe (()=> 
        this.router.navigateByUrl("/admin/items")
      //setTimeout(()=> this.router.navigateByUrl("/admin/items"), 200);
      );
    //else {
    //alert ("VIGANE TOODE");
    //}
  }
  }
}