const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {

e.preventDefault();

const loginName = document.querySelector('#loginName').value;
const loginEmail = document.querySelector('#loginEmail').value;
const loginPassword = document.querySelector('#loginPassword').value;
const container = document.querySelector('#alertContainer');

const users = JSON.parse(localStorage.getItem('users')) || [];

const user = users.find(user => user.email === loginEmail);

if (user) {

    const alertHTML = ` <div class="alert alert-success alert-dismissible fade show" role="alert">
        ¡Bienvenido!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
`;
container.innerHTML = alertHTML;
return;
}

users.push({ name: loginName, email: loginEmail, password: loginPassword });
localStorage.setItem('users', JSON.stringify(users)); 

alert("Sesion iniciada con exito " );
    // const alertHTML = `
    //   <div class="alert alert-warning alert-dismissible fade show" role="alert">
    //     Correo y/o contraseña incorrectos. Por favor, verifica tus datos.
    //     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    //   </div>
    // `;

    // container.innerHTML = alertHTML;

});

//Redirigir a incio

function logInForm() {
    window.location.href = 'index.html'
}