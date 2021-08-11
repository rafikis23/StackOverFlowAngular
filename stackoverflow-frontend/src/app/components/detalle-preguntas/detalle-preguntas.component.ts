import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-detalle-preguntas',
  templateUrl: './detalle-preguntas.component.html',
  styleUrls: ['./detalle-preguntas.component.css']
})
export class DetallePreguntasComponent implements OnInit {
  @Output() onVerPregunta = new EventEmitter();
  detalle: any = {};
  respuestaVotos: any;
  respuestas: any = [];
  usuariosRespuesta: any = [];
  regionVisible: string;
  constructor(private preguntaService: PreguntasService) { }

  ngOnInit(): void {
  }
  votarMas(){
    console.log(this.detalle.votos += 1);
  }
  votarMenos(){
    console.log(this.detalle.votos -= 1);
  }
  votarRes(voto){
    console.log(voto += 1);
  }
  votarMenosRes(voto){
    console.log(voto -= 1);
  }
  verPreguntas(detalle){
    this.onVerPregunta.emit(detalle._id);
    console.log('El id es',detalle._id); 
  }
  obtenerRespuestaPregunta(idPregunta){
    this.preguntaService.obtenerRespuestaPregunta(idPregunta).subscribe(
      res=>{
        this.respuestas = res.respuestas;
        this.usuariosRespuesta = res.usuarios;
        console.log(res);
        console.log('Respuesta de la pregunta', this.respuestas);
        console.log('Usuarios que respondieron', this.usuariosRespuesta);
      },
      error=>{
        console.log(error);
      }
    );
  }

  obtenerDetallePregunta(idPregunta){

    this.preguntaService.obtenerDetallePregunta(idPregunta).subscribe(
      res=>{
        this.detalle = res;
        this.respuestaVotos = res.respuestas;
        console.log("Detalle de la pregunta", this.detalle);
        console.log('Respuestas votos', this.respuestaVotos);
    },
    error=>{
      console.log(error);
    });
  }  
  }


