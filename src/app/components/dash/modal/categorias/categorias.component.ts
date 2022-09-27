import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticsService } from '../../../../api/statics.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EmmiterService } from '../../../../services/emmiter.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent implements OnInit {

    /***********************/
  //? -_ Propiedades entrantes
  @Input() public category!: any

  /***********************/
  //? -_ Propiedades internas del componente
  public formCate !: FormGroup

  constructor(
    private fb : FormBuilder,
    private static_services: StaticsService,
    public activeModal: NgbActiveModal,
    private emmiter_service: EmmiterService
  ) { }

  ngOnInit(): void {
    this.loadFormCategory()
    if (this.category != null || this.category != undefined) {
      this.loadSetCategoryInfo()
    }
  }

  //? -> Metodo que cargara el formulario
  loadFormCategory() {
    this.formCate = this.fb.group({
      nombre: [ '', [ Validators.required ] ]
    })
  }

  //? -> Metodo que seteara los valores al fomulario de categoria
  loadSetCategoryInfo() {    
    this.formCate.setValue({ nombre: this.category?.nombre })
  }

  //? -> Metodo que posteara la categoria
  submitCategory() {
    if (this.category === null || this.category === undefined) {
      this.static_services.createCategory(this.formCate.value).subscribe(
        resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registro correctamente la categoria',
            showConfirmButton: false,
            timer: 1500
          })
          this.activeModal.close()
          this.emmiter_service.$emmiterLoadCategorys.emit(true)
        }
      )
    }else {
      this.static_services.editCategoryById(this.formCate.value, this.category._id).subscribe(
        resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registro correctamente la categoria',
            showConfirmButton: false,
            timer: 1500
          })
          this.activeModal.close()
          this.emmiter_service.$emmiterLoadCategorys.emit(true)
        }
      )
    }
  }

}
