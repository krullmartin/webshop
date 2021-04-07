import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item/add-item.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ItemModule } from '../item/item.module';
import { SizeItemComponent } from './size-item/size-item.component';



@NgModule({
  declarations: [
    AddItemComponent,
    EditItemComponent,
    ViewItemComponent,
    AdminHomeComponent,
    SizeItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    AppRoutingModule,
    ItemModule
  ],
})
export class AdminModule { }
