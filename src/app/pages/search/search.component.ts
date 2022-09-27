import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticsService } from '../../api/statics.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { User } from '../../models/user.model';
import { _categorys, _productos } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public formSearch!: FormGroup

  public search: boolean = false

  public users!: User[]
  public categorys!: _categorys[]
  public products!: _productos[]

  constructor(
    private fb : FormBuilder,
    private static_services: StaticsService
  ) { }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      term: [ '', [ Validators.required ] ]
    })
  }

  submitSearch() {
    this.static_services.searchGlobalByCollection('usuarios', this.formSearch.value).subscribe(
      ({results}: any) => {
        this.search = true
        this.users = results
      }
    )
    this.static_services.searchGlobalByCollection('categorias', this.formSearch.value).subscribe(
      ({results}: any) => {
        this.search = true
        this.categorys = results
      }
    )
    this.static_services.searchGlobalByCollection('productos', this.formSearch.value).subscribe(
      ({results}: any) => {
        this.search = true
        this.products = results
      }
    )
  }

}
