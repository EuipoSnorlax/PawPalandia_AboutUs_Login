const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
<<<<<<< HEAD
e.preventDefault();

const loginEmail = document.querySelector('#loginEmail').value;
const loginPassword = document.querySelector('#loginPassword').value;

const users = JSON.parse(localStorage.getItem('users')) || [];

const userRegister = users.find(user => user.email === loginEmail);
if (userRegister) {
return alert("El usuario ya está registrado");
}

users.push({ email: loginEmail, password: loginPassword });
localStorage.setItem('users', JSON.stringify(users));

alert("Sesion iniciada con exito " );
=======
    e.preventDefault();

    const loginEmail = document.querySelector('#loginEmail').value;
    const loginPassword = document.querySelector('#loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userRegister = users.find(user => user.email === loginEmail);
    if (userRegister) {
        return alert("El usuario ya está registrado");
    }

    users.push({ email: loginEmail, password: loginPassword });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Usuario registrado con éxito");
>>>>>>> 5d0a240f0640fa048a23a152757c8077a7fa640e
});
