import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-preguntas',
  templateUrl: './lista-preguntas.component.html',
  styleUrls: ['./lista-preguntas.component.css']
})
export class ListaPreguntasComponent implements OnInit {
  @Output() onVerDetallePregunta = new EventEmitter(); 
  preguntas:any = [];
  constructor(
    private modalPreguntas: NgbModal,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosService.obtenerUsuariosPreguntas().subscribe(
      res=>{
        this.preguntas = res;
        console.log('Las preguntas', this.preguntas);
      },
      error=>console.log(error)
    );
  }
  verDetallePregunta(detalle){
    this.onVerDetallePregunta.emit(detalle._id);
    console.log('El id del detalle es', detalle._id)
  }

  modalNuevaPregunta(modal){
    this.modalPreguntas.open(
      {
        size: 'md'
      }
    )
  }

}
