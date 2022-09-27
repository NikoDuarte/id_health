import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { _categorys } from 'src/app/interfaces/interfaces';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StaticsService } from '../../api/statics.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/dash/modal/modal.component';
import { EmmiterService } from '../../services/emmiter.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent implements OnInit {

  public displayedColumnsCategory: string[] = ['nombre', 'opt'];
  public dataSourceCategory!: MatTableDataSource<_categorys>

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public total!: number

  constructor(
    private statics_services: StaticsService,
    private modalService: NgbModal,
    private emmiter_services: EmmiterService
  ) { }

  ngOnInit(): void {
    this.loadCategorysAll()
    this.emmiter_services.$emmiterLoadCategorys.subscribe(
      resp => this.loadCategorysAll()
    )
  }

  //? -> Metodo que cargara los usuarios inscritos
  loadCategorysAll() {
    this.statics_services.viewAllCategorys().subscribe(
      ({ categorias, total }: any) => {
        this.total = total
        const mapp_data = categorias.map(
          (elt: _categorys) => {
            return {
              _id: elt._id,
              nombre: elt.nombre,
            }
          }
        )
        this.dataSourceCategory = new MatTableDataSource(mapp_data);
        this.dataSourceCategory.paginator = this.paginator;
      }
    )
  }

  //? -> Metodo que buscara por parametros de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCategory.filter = filterValue.trim().toLowerCase();
  }

  //? -> Metodo que abrira el modal para la creacion o edicion de usuarios
  openModal(opt: boolean, data?: any) { //? { opt === true ? crear : editar }
    const modalRef = this.modalService.open(ModalComponent, { size: 'xl' });
    modalRef.componentInstance.title = opt === true ? 'Crear una categoria' : 'Editar una categoria'
    modalRef.componentInstance.data = opt === true ? null : data
    modalRef.componentInstance.path = 1
  }

  //? -> Metodo que eliminara a un usuario inscrito segun su id
  deleteCategorys(elt: any) {
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
        this.statics_services.deleteCategoryById(elt._id).subscribe(
          resp => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se elimino correctamente el usuario',
              showConfirmButton: false,
              timer: 1500
            })
            this.emmiter_services.$emmiterLoadCategorys.emit(true)
          }, err => console.log(err)
        )
      }
    })
  }

}
