let correo = document.querySelector('#emailPre');
let nombre = document.querySelector('#nombPre');
let apell = document.querySelector('#apelPre')
let numero = document.querySelector('#celPre');
let fech = document.querySelector('#fechPre');
let botonCont = document.querySelector('#botonPre');
let form = document.querySelector('#adopcion');
let valida = true;

botonCont.addEventListener('click', function(event){
  event.preventDefault();
  let alerta = document.querySelectorAll('.alert');
  for (let i = 0; i < alerta.length; i++) {
    alerta[i].remove();
  }
  if(/[A-z][A-z-\.0-9]+[@][A-z-0-9]+(\.[A-z]{2,})+/.test(correo.value)){
    validar(correo);
  }else{
    error(correo);
  }
  if (/[\w']+/.test(nombre.value)) {
    validar(nombre);
  }else{
    error(nombre);
  }
  if (/[\w']+/.test(apell.value)) {
    validar(apell);
  }else{
    error(apell);
  }
  if (fech.value == "") {
    error(fech);
  }else{
    validar(fech);
  }
  if (/[\d]{4}[-][\d]{7}/.test(numero.value)) {
    validar(numero);
  }else {
    error(numero);
  }

  if (valida) {
    form.submit();
    window.alert('Formulario de Adopción Enviado.');
  }
});

function validar(vari){
  let div = document.createElement('div');
  div.className = 'alert alert-success';
  div.innerHTML = 'Campo Correcto';
  vari.parentElement.appendChild(div);
}
function error(vari){
  let div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.innerHTML = vari.getAttribute('error');
  vari.parentElement.appendChild(div);
  valida = false;
}