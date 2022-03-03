import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductoComponent } from './producto/producto.component';
import { NavbarComponent } from './navbar/navbar.component';
const routes: Routes=[
  {path: '', component: HomeComponent},
  {path:'sign-in', component: SignInComponent},
  { path: '**', redirectTo:'', pathMatch:'full'},
];
@NgModule({
  declarations: [
    ProductoComponent,
    NavbarComponent,
    SignInComponent,
    AppComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
