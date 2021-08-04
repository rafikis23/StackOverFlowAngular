function votar(i) {
  console.log('Agregar votación ', i);
}

function modalUsuario() {
  $('#modal-usuarios').modal('show');
}

function modalPregunta() {
  $('#modal-pregunta').modal('show');
}

function seleccionarUsuario(id) {
  console.log('Usuario', id);
}

function verPreguntas() {
  document.getElementById('listaPreguntas').style.display = 'block';
  document.getElementById('detallePregunta').style.display = 'none';
}

function  verDetallePregunta() {
  document.getElementById('listaPreguntas').style.display = 'none';
  document.getElementById('detallePregunta').style.display = 'block';
}