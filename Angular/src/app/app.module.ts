import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { BillsComponent } from './bills/bills.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { CartElementComponent } from './cart-element/cart-element.component';
import { BillElementComponent } from './bill-element/bill-element.component';
import { BillSpecificComponent } from './bill-specific/bill-specific.component';
export const routes: Routes=[
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'bills', component: BillsComponent, canActivate: [AuthGuard]},
  {path:'sign-in', component: SignInComponent},
  {path:'sign-up', component: SignUpComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  declarations: [
    ProductComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    AppComponent,
    HomeComponent,
    SignUpComponent,
    ErrorComponent,
    BillsComponent,
    CartComponent,
    CartElementComponent,
    BillElementComponent,
    BillSpecificComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { 
}
