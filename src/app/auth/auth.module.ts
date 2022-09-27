import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
/************************/
//? -> Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/************************/
//? -> Material UI
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    /*************/
    FormsModule,
    ReactiveFormsModule,
    /*************/
    MaterialModule
  ]
})
export class AuthModule { }
