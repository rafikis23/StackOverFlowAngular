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
  regionVisible: string;
  constructor(private preguntaService: PreguntasService) { }

  ngOnInit(): void {
  }
  verPreguntas(){
   this.regionVisible = 'verPreguntas'; 
  }

  obtenerDetallePregunta(idPregunta){

    this.preguntaService.obtenerDetallePregunta(idPregunta).subscribe(
      res=>{
        this.detalle = res;
        console.log("Detalle de la pregunta", this.detalle);
    },
    error=>{
      console.log(error);
    });
  }  
  }


