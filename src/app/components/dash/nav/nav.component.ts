import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { User } from '../../../models/user.model';
import { StaticsService } from '../../../api/statics.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public titulo!: string
  
  public user: User

  constructor(
    private router: Router,
    private static_services: StaticsService
  ) { 
    this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map(
        (event: ActivationEnd) => event.snapshot.data
      )
    )
    .subscribe(
      ({title}) => {
        this.titulo = title
      }
    )
    this.user = static_services.user
  }

  ngOnInit(): void {
  }

}
