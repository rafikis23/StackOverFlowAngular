import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private httpClient: HttpClient) { }

  obtenerDetallePregunta(idPregunta):Observable<any> {
    return this.httpClient.get(`http://localhost:8888/preguntas/${idPregunta}/detalle`, {});  
    console.log('Obtener el detalle de una pregunta del servidor');
  }
  obtenerRespuestaPregunta(idPregunta):Observable<any> {
    return this.httpClient.get(`http://localhost:8888/preguntas/${idPregunta}/respuestas`, {});
    console.log('Obtener las respuesta de una pregunta del servidor');
  }
}
