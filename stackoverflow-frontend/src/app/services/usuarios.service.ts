import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient) { }

  obtenerUsuarios():Observable<any> {
    return this.httpClient.get('http://localhost:8888/usuarios', {});  
    console.log('Obtener listado de usuarios del servidor');
  }
  obtenerUsuariosPreguntas():Observable<any> {
    return this.httpClient.get('http://localhost:8888/usuarios/preguntasUsuario', {});
    console.log('Obtener listado de preguntas del servidor');
  }
}
