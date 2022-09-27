import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../../services/services.service';
import { StaticsService } from '../../../../api/statics.service';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmmiterService } from '../../../../services/emmiter.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  /***********************/
  //? -_ Propiedades entrantes
  @Input() public user!: any

  /***********************/
  //? -_ Propiedades internas del componente
  public formUser !: FormGroup
  private password_ran!: string
  public hide: boolean = true

  constructor(
    private fb : FormBuilder,
    private services_s : ServicesService,
    private static_services: StaticsService,
    public activeModal: NgbActiveModal,
    private emmiter_services: EmmiterService
  ) { 
    this.password_ran = services_s.ramdom_password()
  }

  ngOnInit(): void {
    this.loadFormUser()
    if (this.user != null || this.user != undefined) {
      this.loadSetUserInfo()
    }
  }

  //? -> Metodo que cargara el formulario de usuarios
  loadFormUser() {
    this.formUser = this.fb.group({
      //? -_ Campos = { nombre, correo, password, rol }
      nombre: ['', [ Validators.required ]],
      correo: ['', [ Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.minLength(6) ]],
      password: [this.password_ran, [ Validators.required, Validators.minLength(7) ]]
    })
  }

  //? -> Metodo que seteara los valores existentes de un usuario al formulario
  loadSetUserInfo() {
    this.formUser.setValue({
      nombre: this.user?.nombre || '',
      correo: this.user?.correo || '',
      password: ''
    })
  }

  //? -> Metodo que enviara el posteo para la creacion o edicion de un usuario
  sumbitInfoUser() {
    const body = this.formUser.value
    if (this.user === null || this.user === undefined) {
      this.static_services.createUser({...body, rol: 'ADMIN_ROLE'}).subscribe(
        resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registro correctamente el usuario',
            showConfirmButton: false,
            timer: 1500
          })
          this.activeModal.close()
          this.emmiter_services.$emmiterLoadUser.emit()
        }, err => {
          Swal.fire(
            'Lo sentimos',
            'Ocurrio un error al enviar tu nuevo usuario! Por favor comunicate con el equipo tecnico',
            'error'
          )
        }
      )
    }else {
      delete body.password
      this.static_services.editUser({...body, rol: 'ADMIN_ROLE'}, this.user.uid).subscribe(
        resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Se actualizo correctamente el usuario ${body.nombre}!`,
            showConfirmButton: false,
            timer: 1500
          })
          this.activeModal.close()
          this.emmiter_services.$emmiterLoadUser.emit()
        }, err => {
          Swal.fire(
            'Lo sentimos',
            'Ocurrio un error al enviar tu nuevo usuario! Por favor comunicate con el equipo tecnico',
            'error'
          )
        }
      )
    }
  }

}
