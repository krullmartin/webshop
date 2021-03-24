import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './global/navbar/navbar.component';
import { FooterComponent } from './global/footer/footer.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { ViewItemComponent } from './admin/view-item/view-item.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';
import { ShortenTitlePipe } from './pipes/shorten-title.pipe';
import { ViewComponent } from './item/view/view.component';
import { UniqueCategoryPipe } from './pipes/unique-category.pipe';
import { SpinnerComponent } from './shared/spinner/spinner.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AddItemComponent,
    EditItemComponent,
    ViewItemComponent,
    AdminHomeComponent,
    ThousandSeparatorPipe,
    ShortenTitlePipe,
    ViewComponent,
    UniqueCategoryPipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      //defaultLanguage: 'en', 
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    })
  ],
  providers: [UniqueCategoryPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }