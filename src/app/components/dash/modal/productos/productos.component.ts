import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticsService } from '../../../../api/statics.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { _categorys } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';
import { EmmiterService } from '../../../../services/emmiter.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {

  @Input() public productos!: any

  public categorys!: _categorys[]

  /***********************/
  //? -_ Propiedades internas del componente
  public formCate !: FormGroup

  constructor(
    private fb : FormBuilder,
    private static_services: StaticsService,
    public activeModal: NgbActiveModal,
    private emmiter_services: EmmiterService
  ) { }

  ngOnInit(): void {
    this.loadFormProducts()
    this.loadCategorys()
    if (this.productos != null || this.productos != undefined) {
      this.loadSetProductsInfo()
    }
  }

  //? -> Metodo que cargara el formulario
  loadFormProducts() {
    this.formCate = this.fb.group({
      nombre: [ '', [ Validators.required ] ],
      categoria: [ '', [ Validators.required ] ]
    })
  }

  //? -> Metodo que seteara los valores al fomulario de categoria
  loadSetProductsInfo() {    
    this.formCate.setValue({ nombre: this.productos?.nombre, categoria: this.productos?._id })
  }

  //? -> Metodo que traera las categorias existentes
  loadCategorys() {
    this.static_services.viewAllCategorys().subscribe(
      ({categorias}) => {
        this.categorys = categorias
      }
    )
  }

  //? -> Metodo que posteara el nuevo producto
  submitProductos() {
    if (this.productos === null || this.productos === undefined ) {
      this.static_services.createProduct(this.formCate.value).subscribe(
        resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registro correctamente la categoria',
            showConfirmButton: false,
            timer: 1500
          })
          this.activeModal.close()
          this.emmiter_services.$emmiterLoadProductos.emit(true)
        }
      )
    }else {
      this.static_services.editProductById(this.formCate.value, this.productos._id).subscribe(
        resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registro correctamente la categoria',
            showConfirmButton: false,
            timer: 1500
          })
          this.activeModal.close()
          this.emmiter_services.$emmiterLoadProductos.emit(true)
        }
      )
    }
  }

}
