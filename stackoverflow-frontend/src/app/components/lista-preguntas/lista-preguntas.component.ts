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
  @Output() onGuardarPregunta = new EventEmitter(); 
  preguntas:any = [];
  tituloPregunta: string = '';
  usuarioId:any;
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
  guardarUsuarioId(usuarioId){
    this.usuarioId = usuarioId;
    
  }
  guardarPregunta(){
    console.log('Probando el servicio', this.tituloPregunta);
    console.log('El usuario es', this.usuarioId);
    this.usuariosService.guardarTituloPregunta(this.usuarioId, this.tituloPregunta).subscribe(
      res=>{
        console.log(res);
        if(res.ok === 1){
          this.modalPreguntas.dismissAll();
        }

      },
      error=> console.log(error)
    )
  }
  
  enviarTitulo(){
    this.onGuardarPregunta.emit(this.tituloPregunta);
  }
  verDetallePregunta(detalle){
    this.onVerDetallePregunta.emit(detalle._id);
    console.log('El id del detalle es', detalle._id)
  }

  modalNuevaPregunta(modal){
    this.modalPreguntas.open(
      modal,
      {
        size: 'md'
      }
    )
  }

}
