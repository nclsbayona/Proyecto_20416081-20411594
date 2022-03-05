import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductoComponent } from './producto/producto.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
const routes: Routes=[
  {path: '', component: HomeComponent},
  {path:'sign-in', component: SignInComponent},
  {path:'sign-up', component: SignUpComponent},
  { path: '**', component: ErrorComponent},
];
@NgModule({
  declarations: [
    ProductoComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    AppComponent,
    HomeComponent,
    SignUpComponent,
    ErrorComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
