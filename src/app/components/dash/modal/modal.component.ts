import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  @Input() public title!: string
  @Input() public data!: any
  @Input() public path : number = 0 //? { 0: usuarios, 1: categorias, 2: productos }

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    const background = document.getElementsByClassName('modal-backdrop')[0]
    const modal = document.getElementsByClassName('modal')[0]
    background.classList.add('w-100')
    modal.classList.add('w-100')
  }

}
