import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmmiterService {

  //? -> Emisores 
  public $emmiterLoadUser : EventEmitter<boolean> = new EventEmitter()
  public $emmiterLoadCategorys : EventEmitter<boolean> = new EventEmitter()
  public $emmiterLoadProductos : EventEmitter<boolean> = new EventEmitter()

  constructor() { }
}
