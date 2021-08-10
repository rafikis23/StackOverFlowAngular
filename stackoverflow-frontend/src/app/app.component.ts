import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetallePreguntasComponent } from './components/detalle-preguntas/detalle-preguntas.component';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('detallePregunta') detallePreguntaComponent:DetallePreguntasComponent;
  title = 'stackoverflow-frontend';
  usuarios:any=[];
  usuarioSeleccionado:any;
  regionVisible:string = '';
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
  verPregunta(){
    this.detallePreguntaComponent.verPreguntas();
  }

  seleccionarUsuario(usuario){
    console.log('El id es', usuario._id);
    this.usuarioSeleccionado = usuario.urlImagen;
    console.log(this.usuarioSeleccionado);
    console.log('La imagen es', usuario.urlImagen);
    this.modalService.dismissAll();
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
