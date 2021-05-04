import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { ViewCategoryComponent } from './admin/category/view-category/view-category.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { SizeItemComponent } from './admin/size-item/size-item.component';
import { ViewItemComponent } from './admin/view-item/view-item.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartNavbarComponent } from './cart/cart-navbar/cart-navbar.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './item/view/view.component';

// kommentaar ctrl ä
const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"view/:itemId", component: ViewComponent},
  {path:"cart", component: CartComponent},
  {path:"cart-nav", component: CartNavbarComponent},

  {path:"admin", canActivate: [AuthGuard], children: [
    {path:"", component: AdminHomeComponent},
    {path:"add-item", component: AddItemComponent},
    {path:"edit-item/:itemId", component: EditItemComponent},
    {path:"items", component: ViewItemComponent},
    {path: "sizes", component: SizeItemComponent},
    {path: "categories", component: ViewCategoryComponent},
    {path: "add-category", component: AddCategoryComponent},
    {path:"signup", component: SignupComponent},
  ]},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
