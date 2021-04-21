import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  items: Item [] = [];

  constructor(private itemService: ItemService,
    private translate: TranslateService,
    private checkAuth: CheckAuthService) { }

  ngOnInit(): void {
    this.checkAuth.autologin();
    //this.items = this.itemService.itemsInService;
    this.itemService.getItemsFromDatabase().subscribe(items => {
      this.items = [];
      this.itemService.itemsInService = [];
      for (const key in items) {
          const element = items[key];
          this.items.push(element);
          this.itemService.itemsInService.push(element);
      }
    })
    console.log("töötlen");
  }

  onDeleteItem(id: number) {
    let isConfirm = confirm(this.translate.instant("Kas kustutada?"));
    if (isConfirm) {
      let i = this.itemService.itemsInService.findIndex(item => item.id == id);
      if (i) {
      this.itemService.itemsInService.splice(i,1);
      this.items.splice(i, 1);
      this.itemService.saveItemsToDatabase().subscribe();
      }
      
    }
    
  }

}
