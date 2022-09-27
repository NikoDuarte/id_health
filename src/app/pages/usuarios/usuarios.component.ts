import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaticsService } from '../../api/statics.service';
import { User } from '../../models/user.model';
import { ModalComponent } from '../../components/dash/modal/modal.component';
import Swal from 'sweetalert2';
import { EmmiterService } from '../../services/emmiter.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  // rol estado nombre correo
  public displayedColumnsUser: string[] = ['nombre', 'correo', 'estado', 'rol', 'opt'];
  public dataSourceUser!: MatTableDataSource<User>

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public total!: number

  constructor(
    private statics_services: StaticsService,
    private modalService: NgbModal,
    private emmiter_services: EmmiterService
  ) { }

  ngOnInit(): void {
    this.loadUsersAll()
    this.emmiter_services.$emmiterLoadUser.subscribe(
      resp => this.loadUsersAll()
    )
  }

  //? -> Metodo que cargara los usuarios inscritos
  loadUsersAll() {
    this.statics_services.viewAllUsers().subscribe(
      ({usuarios, total}) => {
        this.total = total
        this.dataSourceUser = new MatTableDataSource(usuarios);
        this.dataSourceUser.paginator = this.paginator;
      }
    )
  }

  //? -> Metodo que buscara por parametros de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceUser.filter = filterValue.trim().toLowerCase();  
  }

  //? -> Metodo que abrira el modal para la creacion o edicion de usuarios
  openModal(opt: boolean, data?: any) { //? { opt === true ? crear usuario : editar }
    const modalRef = this.modalService.open(ModalComponent, { size: 'xl' });
    modalRef.componentInstance.title = opt === true ? 'Crear un usuario' : 'Editar un usuario'
    modalRef.componentInstance.data = opt === true ? null : data
    modalRef.componentInstance.path = 0
  }

  //? -> Metodo que eliminara a un usuario inscrito segun su id
  deleteUser(elt: any) {
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
        this.statics_services.deleteUserId(elt.uid).subscribe(
          resp => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se elimino correctamente el usuario',
              showConfirmButton: false,
              timer: 1500
            })
            this.emmiter_services.$emmiterLoadUser.emit(true)
          }
        )
      }
    })
  }

}
