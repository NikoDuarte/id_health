import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { _productos } from 'src/app/interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { StaticsService } from '../../api/statics.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/dash/modal/modal.component';
import { EmmiterService } from '../../services/emmiter.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {

  public displayedColumnsProductos: string[] = ['nombre', 'precio', 'categoria', 'opt'];
  public dataSourceProductos!: MatTableDataSource<_productos>

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public total!: number

  constructor(
    private statics_services: StaticsService,
    private modalService: NgbModal,
    private emmiter_services: EmmiterService
  ) { }

  ngOnInit(): void {
    this.loadProductsAll()
    this.emmiter_services.$emmiterLoadProductos.subscribe(
      resp => this.loadProductsAll()
    )
  }

  //? -> Metodo que cargara los usuarios inscritos
  loadProductsAll() {
    this.statics_services.viewAllProducts().subscribe(
      ({ productos, total }: any) => {
        this.total = total
        const mapp_data = productos.map(
          (elt: _productos) => {
            return {
              _id: elt._id,
              nombre: elt.nombre,
              precio: elt.precio,
              categoria: elt.categoria !== null ? elt.categoria.nombre : 'Sin categoria'
            }
          }
        )
        this.dataSourceProductos = new MatTableDataSource(mapp_data);
        this.dataSourceProductos.paginator = this.paginator;
      }
    )
  }

  //? -> Metodo que buscara por parametros de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProductos.filter = filterValue.trim().toLowerCase();
  }

  //? -> Metodo que abrira el modal para la creacion o edicion de usuarios
  openModal(opt: boolean, data?: any) { //? { opt === true ? crear : editar }
    const modalRef = this.modalService.open(ModalComponent, { size: 'xl' });
    modalRef.componentInstance.title = opt === true ? 'Crear un producto' : 'Editar un producto'
    modalRef.componentInstance.data = opt === true ? null : data
    modalRef.componentInstance.path = 2
  }

  //? -> Metodo que eliminara a un usuario inscrito segun su id
  deleteProduct(elt: any) {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar?',
      text: `Se eliminaran los datos de ${elt.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.statics_services.deleteProductById(elt._id).subscribe(
          resp => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se elimino correctamente el usuario',
              showConfirmButton: false,
              timer: 1500
            })
            this.emmiter_services.$emmiterLoadProductos.emit(true)
          }, err => console.log(err)
        )
      }
    })
  }

}
