import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
/************************/
//? -> AuthModule
import { AuthModule } from './auth/auth.module';
//? -> MaterialModule
import { MaterialModule } from './material/material.module';
/************************/
//? -> Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NgSelectModule,
    /*************/
    AuthModule,
    PagesModule,
    MaterialModule,
    /*************/
    FormsModule,
    ReactiveFormsModule,
    /*************/
    HttpClientModule,
    /*************/
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
