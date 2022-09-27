import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/************************/
//? -> Components
import { NavComponent } from './dash/nav/nav.component';
import { SidebarComponent } from './dash/sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from './dash/card/card.component';
/************************/
//? -> Modulos
import { MaterialModule } from '../material/material.module';
import { ModalComponent } from './dash/modal/modal.component';
import { UsuariosComponent } from './dash/modal/usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasComponent } from './dash/modal/categorias/categorias.component';
import { ProductosComponent } from './dash/modal/productos/productos.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    NavComponent,
    SidebarComponent,
    CardComponent,
    ModalComponent,
    UsuariosComponent,
    CategoriasComponent,
    ProductosComponent
  ],
  exports: [
    NavComponent,
    SidebarComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class ComponentsModule { }
