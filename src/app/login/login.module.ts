import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginRotes } from './login.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRotes)
  ]
})

export class LoginModule { }
