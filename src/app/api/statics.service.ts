import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
/*************************/
//? -> Environments
import { environment } from '../../environments/environment';
//? -> Interfaces
import { _categorys, _productos } from '../interfaces/interfaces';
//? -> Models
import { User } from '../models/user.model';
/*****************/
//? -> Variable que almacenara la url de la api estatica
const url: string = environment.url_api

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  public user!: User

  constructor(
    private http: HttpClient
  ) { }


  /*******************************/
  // TODO -> Getters
  get header_auth(){
    return {
      headers: {
        'x-token': String(localStorage.getItem('token'))
      }
    }
  }

  /*******************************/
  // TODO -> Autentificacion
  //? -> Metodo que hara conexion con login-services-api
  sign_in(user_auth: { email: string, password: string }) {
    const api: string = `${url}/auth/login`
      return this.http.post<{token: string, usuario: User}>(api, user_auth)
  }

  /*******************************/
  // TODO -> Usuario
  //? -> Metodo que traera todos los usuarios
  viewAllUsers() {
    const api: string = `${url}/usuarios`
      return this.http.get<{total: number, usuarios: User[]}>(api, this.header_auth)
  }
  //? -> Metodo que creara un usuario
  createUser(body: { nombre: string, correo: string, password: string, rol: string }) {
    const api: string = `${url}/usuarios`
      return this.http.post(api, body, this.header_auth)
  }
  //? -> Metodo que editara un usuario segun su id
  editUser(body: { nombre: string, correo: string }, id: string) {
    const api: string = `${url}/usuarios/${id}`
      return this.http.put(api, body, this.header_auth)
  }
  //? -> Metodo que eliminara un usuario segun su id
  deleteUserId(id: string) {
    const api: string = `${url}/usuarios/${id}`
      return this.http.delete(api, this.header_auth)
  }

  /*******************************/
  // TODO -> Categorias
  //? -> Metodo que traera todos las categorias
  viewAllCategorys() {
    const api: string = `${url}/categorias`
      return this.http.get<{ total: number, categorias: _categorys[] }>(api, this.header_auth)
  }
  //? -> Metodo que creara una categoria
  createCategory(body: { nombre: string }) {
    const api: string = `${url}/categorias`
      return this.http.post(api, body, this.header_auth)
  }
  //? -> Metodo que editara una categoria segun su id
  editCategoryById(body: { nombre: string }, id: string) {
    const api: string = `${url}/categorias/${id}`
      return this.http.put(api, body, this.header_auth)
  }
  //? -> Metodo que eliminara una categoria segun su id
  deleteCategoryById(id: string) {
    const api: string = `${url}/categorias/${id}`
      return this.http.delete(api, this.header_auth)
  }

  /*******************************/
  // TODO -> Productos
  //? -> Metodo que traera todos los productos
  viewAllProducts() {
    const api: string = `${url}/productos`
      return this.http.get<{total: number, productos: _productos}>(api, this.header_auth)
  }
  //? -> Metodo que creara un producto
  createProduct(body: { nombre: string, categoria: string }) {
    const api: string = `${url}/productos`
      return this.http.post(api, body, this.header_auth)
  }
  //? -> Metodo que actualizara un producto segun su id
  editProductById(body: { nombre: string, categoria: string }, id: string) {
    const api: string = `${url}/productos/${id}`
      return this.http.put(api, body, this.header_auth)
  }
  //? -> Metodo que eliminara un producto
  deleteProductById(id: string) {
    const api: string = `${url}/productos/${id}`
      return this.http.delete(api, this.header_auth)
  }

  /*******************************/
  // TODO -> Busqueda global
  searchGlobalByCollection(collection: string, term: string) {
    const api: string = `${url}/buscar/${collection}/${term}`
      return this.http.get(api, this.header_auth)
  }
}
