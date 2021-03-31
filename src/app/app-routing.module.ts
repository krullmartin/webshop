import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { ViewItemComponent } from './admin/view-item/view-item.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './item/view/view.component';

// kommentaar ctrl ä
const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"view/:itemId", component: ViewComponent},
  {path:"cart", component: CartComponent},

  {path:"admin", canActivate: [AuthGuard], children: [
    {path:"", component: AdminHomeComponent},
    {path:"add-item", component: AddItemComponent},
    {path:"edit-item/:itemId", component: EditItemComponent},
    {path:"items", component: ViewItemComponent}
  ]},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
