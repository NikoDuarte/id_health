import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**************************/
//? -> Contenido de angular material UI
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
/**************************/
@NgModule({
  declarations: [],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatSelectModule,
    MatChipsModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
