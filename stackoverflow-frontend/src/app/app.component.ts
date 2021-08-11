import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetallePreguntasComponent } from './components/detalle-preguntas/detalle-preguntas.component';
import { ListaPreguntasComponent } from './components/lista-preguntas/lista-preguntas.component';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('detallePregunta') detallePreguntaComponent:DetallePreguntasComponent;
  @ViewChild('listadoPregunta') listadoPreguntaComponent: ListaPreguntasComponent;
  title = 'stackoverflow-frontend';
  usuarios:any=[];
  usuarioSeleccionado:any;
  usuarioId: any;
  regionVisible:string = '';
  preguntas:any = [];
  constructor(
    private usuariosService: UsuariosService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void{
    this.usuariosService.obtenerUsuarios().subscribe(
      res=>{
        this.usuarios = res;
        console.log("Usuarios: ", this.usuarios);

      },
      error=>{
        console.log(error);
      }
    );
  }
  verDetalle(idPregunta){
    console.log('La pregunta con el id', idPregunta);
    this.regionVisible = 'detallePregunta';
    console.log(this.regionVisible);
    this.detallePreguntaComponent.obtenerDetallePregunta(idPregunta);

  }
  guardarPreguntaNueva(){
    
  }
  verTitulo(tituloPregunta){
    console.log('El titulo es', tituloPregunta);
  }
  verRespuesta(idPregunta){
    console.log('La respuesta de la pregunta con id', idPregunta);
    this.detallePreguntaComponent.obtenerRespuestaPregunta(idPregunta);
  }
  verPregunta(idPregunta){
    console.log('EL id es', idPregunta);
    this.regionVisible = 'listadoPregunta';
    console.log(this.regionVisible);
    this.detallePreguntaComponent.verPreguntas(idPregunta);
  }

  seleccionarUsuario(usuario){
    console.log('El id es', usuario._id);
    console.log('el usuario seleccionado es', usuario.nombre);
    this.preguntas = [];
    this.usuariosService.obtenerListadoPreguntasUsuario(usuario._id).subscribe(
      res=>{
        this.preguntas = res.preguntas;
        this.modalService.dismissAll();
        console.log("Preguntas del usuario", this.preguntas);
    },
    error=>{
      console.log(error);
    });
    this.listadoPreguntaComponent.guardarUsuarioId(usuario._id);
    this.usuarioSeleccionado = usuario.urlImagen;
    this.usuarioId = usuario._id;

    console.log(this.usuarioSeleccionado);
    console.log('La imagen es', usuario.urlImagen);
    console.log(this.usuarioId);
    
  }
  modalUsuarios(modal){
    this.modalService.open(
      modal,
      {
        size: 'md',
        
      }
    );

  }
}
