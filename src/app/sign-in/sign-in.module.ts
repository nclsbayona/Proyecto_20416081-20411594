import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    RouterModule,
    CommonModule
  ],exports:[SignInComponent]
})
export class SignInModule { }
