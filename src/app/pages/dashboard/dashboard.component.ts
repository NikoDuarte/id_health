import { Component, OnInit } from '@angular/core';
import { StaticsService } from '../../api/statics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //? -> Propiedades publicas accesibles desde el front
  public total_users!: number
  public total_categorys!: number
  public total_productos!: number

  constructor(
    private static_services: StaticsService
  ) { }

  ngOnInit(): void {
    this.loadTotals()
  }

  //? -> Metodo que cargara todos los servicios de carga
  loadTotals() {
    this.loadTotalsUser()
    this.loadTotalsCategory()
    this.loadTotalsProducts()
  }

  //? -> Metodo que cargara los totales de usuario
  loadTotalsUser() {
    this.static_services.viewAllUsers().subscribe(
      ({total}) => {
        this.total_users = total
      }, err => {
        console.log(err);
      }
    )
  }

  //? -> Metodo que cargara los totales de categorias
  loadTotalsCategory() {
    this.static_services.viewAllCategorys().subscribe(
      ({total}) => {
        this.total_categorys = total
      }, err => {
        console.log(err);
      }
    )
  }

  //? -> Metodo que cargara los totales de productos
  loadTotalsProducts() {
    this.static_services.viewAllProducts().subscribe(
      ({total}) => {
        this.total_productos = total
      }, err => {
        console.log(err);
      }
    )
  }

}
