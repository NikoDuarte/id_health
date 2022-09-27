import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from '../material/material.module';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    UsuariosComponent,
    CategoriasComponent,
    ProductosComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    /**********/
    ComponentsModule,
    /**********/
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
