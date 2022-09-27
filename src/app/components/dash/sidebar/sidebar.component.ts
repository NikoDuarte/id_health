import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  //? -_ Metodo que cerrara la sesion activa
  logoutBestApp() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    this.router.navigateByUrl('/sign-in')
  }

}
