import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  //? -_ Metodo que creara caracteres aleatoreos para la contraseña de un usuario
  ramdom_password() {
    //* |-> Caracteres que se usaran
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //* |-> Declaracion de variable que contendra el resultado
    let password = '';
    //* Capturamos el numero de caracteres
    const charactersLength = characters.length;
    //* |-> Barremos para crear un string de minimo 7 caracteres
    for (let i = 0; i < 7; i++) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return password;
  }
}
