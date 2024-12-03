// const loginForm = document.querySelector('#loginForm');
// loginForm.addEventListener('submit', (e) => {

// e.preventDefault();

// const loginName = document.querySelector('#loginName').value;
// const loginEmail = document.querySelector('#loginEmail').value;
// const loginPassword = document.querySelector('#loginPassword').value;
// const container = document.querySelector('#alertContainer');

// const users = JSON.parse(localStorage.getItem('users')) || [];

// const user = users.find(user => user.email === loginEmail);

// if (user) {

//     const alertHTML = ` <div class="alert alert-success alert-dismissible fade show" role="alert">
//         ¡Bienvenido!
//         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       </div>
// `;
// container.innerHTML = alertHTML;
// return;
// }

// users.push({ name: loginName, email: loginEmail, password: loginPassword });
// localStorage.setItem('users', JSON.stringify(users)); 

// alert("Sesion iniciada con exito " );
//     // const alertHTML = `
//     //   <div class="alert alert-warning alert-dismissible fade show" role="alert">
//     //     Correo y/o contraseña incorrectos. Por favor, verifica tus datos.
//     //     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//     //   </div>
//     // `;

//     // container.innerHTML = alertHTML;

// });

// //Redirigir a incio

// async function logInForm() {
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     window.location.href = 'index.html'
// }

/* ----------------------------------------
            Log-in Form
------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    if (document.body.classList.contains('log-in')) {
      const formLogin= document.getElementById('loginForm');
      if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent the form from submitting the default way  
          // Validate the input fields
          if (validateLogin()) {
              // Send the email if validation passes
              //alert("Sesion iniciada con exito " );
              //const alertMessage = "🐈🐕--Bienvenido --🐈🐕";
              //showAlertAccount("success", alertMessage);
              
              const registro = new LogIn();
              // console.log(document.getElementById('registerName'));
              registro.ingresaUsuario(
                document.getElementById('loginName').value, 
                document.getElementById('loginEmail').value, 
                document.getElementById('loginPassword').value              );
              //console.log(registro.items); 
              /*---------------Almacenar datos en el Local Storage-----*/  
              const loginObjectJSON = JSON.stringify(registro.items);
              localStorage.setItem('newLogin',loginObjectJSON);

              //console.log(loginObjectJSON);
              
              const url = `http://localhost:8080/api/v3/users/email/r0g3r211@gmail.com`;

              // fetch para método get
              fetch(url)
                  .then(response => response.json())
                  .then(data => {
                    if (document.getElementById('loginName').value === data.name && document.getElementById('loginEmail').value === data.email && document.getElementById('loginPassword').value === data.password){
                      const alertMessage = "🐈🐕--Bienvenido --🐈🐕";
                      showAlertAccount("success", alertMessage);
                      //Redirigir a inicio con un retraso de 10 segundos

                       setTimeout(function(){
                        window.location.href = 'PagePromos.html';
                      }, 4000);

                    }else{
                      const alertMessage = "🐈🐕--Intenta de nuevo --🐈🐕";
                      showAlertAccount("danger", alertMessage);
                    }

                      
              
                  })
                  .catch(error => {
                      userInfo.innerHTML = `
                          Usuario no encontrado
                      `
                      console.error(error)
                  })

               
          }
        });
      }
     }
    });
    
    function validateLogin() {
      const nameLogin = document.getElementById('loginName').value;
      const emailLogin = document.getElementById('loginEmail').value;
      const passwordLogin = document.getElementById('loginPassword').value;      
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.innerHTML = ''; // Clear previous error messages
    
      // Validation checks 
      const isLoginNameValid = validateNameLogin(nameLogin)? true : (showAlertErrorOne("danger", "Usuario no válido.<br>"), false);
      const isLoginEmailValid = validateEmailLogin(emailLogin)? true : (showAlertErrorOne("danger", "Email no válido.<br>"), false);
      const isLoginPasswordValid = validatePasswordLogin(passwordLogin) ? true : (showAlertErrorOne("danger", "Contraseña incorrecta.<br>"), false);

      return isLoginNameValid && isLoginEmailValid && isLoginPasswordValid; // All validations passed
    }
    function validateNameLogin(name) {
      const namePattern = /^.{4,}$/;
      return namePattern.test(name);
    }
    function validatePasswordLogin(password) {
      const passwordPattern = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
      return passwordPattern.test(password);
    }
    
    function validateEmailLogin(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
    // Create a ItemsController class
    class LogIn {
      // Set up the items and currentId property in the contructor
      constructor(currentId = 1) {
          this.items = [];
          this.currentId = currentId;
      }
      // Create the addItem method
      
      ingresaUsuario(nameLogin, emailLogin, passwordLogin) {
          const user = {
              // Increment the currentId property
              name: nameLogin,
              email: emailLogin,
              password: passwordLogin,
              id: this.currentId++,
          };          
          // Push the item to the items property
          this.items.push(user);
          localStorage.clear();
      }
    }
     // Function to show the alerts. Alerts clean up after a certain time
    function showAlertErrorOne(type, message) {
      const alertContainer = document.getElementById('alertContainer');
      alertContainer.insertAdjacentHTML('beforeend', `
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
      `);
      
      setTimeout(function() {
          alertContainer.innerHTML = '';
      }, 1500);
    }

