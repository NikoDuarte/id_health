import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StaticsService } from '../../api/statics.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  //? |-> Proìedades publicas (accesables del front)

  public hide = true;
  
  //? |-> Propiedades del formulario
  public signForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    /***********/
    private statics_services: StaticsService,
    /***********/
    private ngZone: NgZone,
    /***********/
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFormSignIn()
  }

  //? -_ Metodo que cargara el formulario para el inicio de sesion
  loadFormSignIn() {
    this.signForm = this.fb.group({
      correo: ['test1@gmail.com', [Validators.required, Validators.minLength(6), Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: [ '123456', [ Validators.required, Validators.minLength(3) ] ]
    })
  }

  //? -_ Metodo que realizara el posteo a la api
  submitSignIn() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    this.statics_services.sign_in(this.signForm.value).subscribe(
      ({token, usuario}) => {
        localStorage.setItem('token', token)
        localStorage.setItem('usuario', JSON.stringify(usuario))
        let timerInterval: any
        Swal.fire({
          title: 'ID Health',
          html: `Bienvenido ${usuario.nombre}!`,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            timerInterval = setTimeout(() => {
              //Navegar al dashboard
              this.ngZone.run( () => {                
                this.router.navigateByUrl('/dashboard')
              } )
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
      }
    )
  }

}
