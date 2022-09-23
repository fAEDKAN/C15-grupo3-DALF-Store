//* Declaración de elementos HTML */
const togglePass = document.querySelector('#togglePass');

const pass = document.querySelector('#pass');


//* Acción al hacer click en el icono */
togglePass.addEventListener('click', function(){

    //* Cambia el atributo 'type' */
    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
    pass.setAttribute('type', type);

    //* Cambia el icono de 'eye-slash' a 'eye'*/
    this.classList.toggle('fa-eye');
});


//* Evita el envío del form */
/* const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
}); */