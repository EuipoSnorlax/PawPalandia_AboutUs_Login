//

window.addEventListener("load", () => {
  /* ----------------------------------------
  Page Loader
  ------------------------------------------- */
  const pageLoader= document.querySelector(".js-page-loader");
  if (pageLoader) {
    pageLoader.classList.add("fade-out");
  setTimeout(() => {
    pageLoader.style.display = "none";
  }, 600);
  }
});

/* ----------------------------------------
           Button conocenos
------------------------------------------- */

function scrollToElement() {
  document.getElementById("click").scrollIntoView({
    behavior: "smooth",
  });
}

/* ----------------------------------------
            Testimonial Slider
------------------------------------------- */
const testimonialSlider = () => {
  const carouselOne = document.getElementById("carouselOne");
  carouselOne &&
    carouselOne.addEventListener("slid.bs.carousel", () => {
      const activeItem = carouselOne.querySelector(".active");
      document.querySelector(".js-testimonial-img").src = activeItem
        ? activeItem.getAttribute("data-js-testimonial-img")
        : "";
    });
};
testimonialSlider();

/* ----------------------------------------
            Validation Form
------------------------------------------- */
if (document.body.classList.contains("contact-page")) {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting the default way

      // Validate the input fields
      if (validateForm()) {
        // Send the email if validation passes
        sendEmail();
        alertMessage = "Mensaje enviado correctamente!";
        showAlert("success", alertMessage);
      }
    });
}





// Boring Option:
// function validateForm() {
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const telephone = document.getElementById('telephone').value;
//     const message = document.getElementById('message').value;
//     const errorMessage = document.getElementById('errorMessage');

//     errorMessage.innerHTML = ''; // Clear previous error messages

//     // Simple validation checks
//     if (!name) {
//         errorMessage.innerHTML += 'Name is required.<br>';
//         return false;
//     }
//     if (!validateEmail(email)) {
//         errorMessage.innerHTML += 'Invalid email format.<br>';
//         return false;
//     }
//     if (!validateTelephone(telephone)) {
//         errorMessage.innerHTML += 'Invalid telephone format.<br>';
//         return false;
//     }
//     if (!message) {
//         errorMessage.innerHTML += 'Message is required.<br>';
//         return false;
//     }

//     return true; // All validations passed
// }

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;
  const message = document.getElementById("message").value;
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.innerHTML = ""; // Clear previous error messages

  // Validation checks
  const isNameValid = name
    ? true
    : ((errorMessage.innerHTML += "Se requiere un nombre.<br>"), false);
  const isEmailValid = validateEmail(email)
    ? true
    : ((errorMessage.innerHTML += "Formato de email no válido.<br>"), false);
  const isTelephoneValid = validateTelephone(telephone)
    ? true
    : ((errorMessage.innerHTML += "Formato de teléfono no válido.<br>"), false);
  const isMessageValid = message
    ? true
    : ((errorMessage.innerHTML += "Se requiere un mensaje.<br>"), false);

  return isNameValid && isEmailValid && isTelephoneValid && isMessageValid; // All validations passed
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateTelephone(telephone) {
  const telPattern = /^\d{10}$/;
  return telPattern.test(telephone);
}

function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;
  const message = document.getElementById("message").value;

  // Console
  console.log("Sending email with the following data:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Telephone: ${telephone}`);
  console.log(`Message: ${message}`);

  // Clear the form after sending... Allons-y !!!
  document.getElementById("contactForm").reset();
}

// Function to display Bootstrap alert
function showAlert(type, message) {
  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
}
/* ----------------------------------------
            New User Validation T-9
------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('registration-page')) {
    const formUser= document.getElementById('userRegistrationForm');
    if (formUser) {
      formUser.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way  
        // Validate the input fields
        if (validateNewUser()) {
            // Send the email if validation passes
            const alertMessage = "🐈🐕--Te has Registrado Correctamente --🐈🐕";
            showAlertAccount("success", alertMessage);
  
            const isVip= document.getElementById('memberVipCheck').checked;
            if (isVip){
              showAlertErrorOne("info", "Gracias por ser parte del Club PawPalandia Vip");
            }
  
            const url = `http://localhost:8080/api/v3/post-user`;
            
            const user = {
              // Increment the currentId property
              name: document.getElementById('registerName').value,
              middleName: document.getElementById('registerMidleName').value,
              lastName: document.getElementById('registerLastName').value,
              birthDay: document.getElementById('registerBirthDay').value,
              phoneNumber: document.getElementById('registerPhone').value,
              email: document.getElementById('registerEmail').value,
              password: document.getElementById('registerPassword').value,
              isVip: document.getElementById('memberVipCheck').checked, //add
              privacyPolicyAccepted: document.getElementById('acceptTermsCheck').checked //add
              //id: this.currentId++,
          };
  
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log('Guardado', data)
                })
                .catch(error => {
                    console.error(error);
                })
  
  
            const registro = new SignUpUser();
            // console.log(document.getElementById('registerName'));
            registro.agregarUsuario(
              document.getElementById('registerName').value, 
              document.getElementById('registerMidleName').value, 
              document.getElementById('registerLastName').value, 
              document.getElementById('registerBirthDay').value, 
              document.getElementById('registerPhone').value, 
              document.getElementById('registerEmail').value, 
              document.getElementById('registerPassword').value, 
              document.getElementById('memberVipCheck').checked,
              document.getElementById('acceptTermsCheck').checked
            );
            //console.log(registro.items); 
            /*---------------Almacenar datos en el Local Storage-----*/  
            const userObjectJSON = JSON.stringify(registro.items);
            localStorage.setItem('newUser',userObjectJSON);
            console.log(userObjectJSON);
            // //Redirigir a inicio con un retraso de 10 segundos
            setTimeout(function(){
              window.location.href = 'log-in.html';
            }, 5000);
        }
      });
    }
   }
  });

function validateNewUser() {
  const name = document.getElementById('registerName').value;
  const middleName = document.getElementById('registerMidleName').value;
  const lastName = document.getElementById('registerLastName').value;
  const email = document.getElementById('registerEmail').value;
  const telephone = document.getElementById('registerPhone').value;
  const password = document.getElementById('registerPassword').value;
  const ageUser = document.getElementById('registerBirthDay').value;
  const termsCondUser = document.getElementById('acceptTermsCheck').checked;
  
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerHTML = ''; // Clear previous error messages

  // Validation checks 
  const isNameValid = validateName (name)? true : (showAlertErrorOne("danger", "Se requiere un nombre válido.<br>"), false);
  const isMiddleName = validateMiddleName (middleName)? true : (showAlertErrorOne("danger", "Se requiere un apellido válido.<br>"), false);
  const isLastName = validateLastName(lastName) ? true : (showAlertErrorOne("danger", "Se requiere un apellido válido.<br>"), false);
  const isEmailValid = validateEmail(email) ? true : (showAlertErrorOne("danger", "Formato de email no válido"), false);
  const isTelephoneValid = validateTelephone(telephone) ? true : (showAlertErrorOne("danger", "Formato de teléfono no válido"), false);
  const isPasswordValid = validatePassword(password) ? true : (showAlertErrorOne("danger", "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico."), false);
  const isAgeValid = validateAge(ageUser) ? true : false;
  const isTermsCondValid = termsCondUser ? true : (showAlertErrorOne("danger", "Debes aceptar nuestros términos y condiciones para registrarte"), false);
  
  return isNameValid && isMiddleName && isLastName && isEmailValid && isTelephoneValid && isPasswordValid && isAgeValid && isTermsCondValid; // All validations passed
}
function validateName(name) {
  const namePattern = /^.{4,}$/;
  return namePattern.test(name);
}
function validateMiddleName(middlename) {
  const namePattern = /^.{4,}$/;
  return namePattern.test(middlename);
}
function validateLastName(lastname) {
  const namePattern = /^.{4,}$/;
  return namePattern.test(lastname);
}
function validatePassword(password) {
  const passwordPattern = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
  return passwordPattern.test(password);
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateAge(birthday) {
  const hoy = new Date();
  const nacimiento = new Date(birthday);
  if (nacimiento.getFullYear()<1900){
    showAlertErrorOne("danger", "Fecha de nacimiento no válida.");
    return false;
  }
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  if (edad<18){
    showAlertErrorOne("danger", "Tienes que ser mayor de edad para poder registrarte.");
    return false;
  }
  return  true;
}

function validateTelephone(telephone) { 
  const telPattern = /^[0-9]{10}$/; 
  return telPattern.test(telephone);
}

function showAlertAccount(type, message) {
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}
// Create a ItemsController class
class SignUpUser {
  // Set up the items and currentId property in the contructor
  constructor(currentId = 0) {
      this.items = [];
      this.currentId = currentId;
  }
  // Create the addItem method
  
  agregarUsuario(name1, middlename, lastname, datebirthday, phone, email, password,isVip, acceptTerms) {
      const user = {
          // Increment the currentId property
          name: name1,
          middlename: middlename,
          lastname: lastname,
          datebirthday: datebirthday,
          phone: phone,
          email: email,
          password: password,
          isVip: isVip, //add
          acceptTerms:acceptTerms, //add
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
  }, 3000);
}

/* ----------------------------------------
            Header Menu
------------------------------------------- */
function headerMenu() {
  const menu = document.querySelector(".js-header-menu"),
    backdrop = document.querySelector(".js-header-backdrop"),
    menuCollapseBreakpoint = 991;

  function toggleMenu() {
    menu.classList.toggle("open");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  }

  document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  // Closing Menu by clicking outside of it.
  backdrop.addEventListener("click", toggleMenu);
  
  function collapse() {
    menu.querySelector(".active .js-sub-menu").removeAttribute("style");
    menu.querySelector(".active").classList.remove("active");
  }

  menu.addEventListener("click", (event) => {
    const { target } = event;

    if (
      target.classList.contains("js-toggle-sub-menu") &&
      window.innerWidth <= menuCollapseBreakpoint
    ) {
      // Prevent Default Anchor Click Behavior
      event.preventDefault();

      // If The Item is already expanded, collapse it and exit
      if (target.parentElement.classList.contains("active")) {
        collapse();
        return;
      }

      // Collapse The Other Expanded Menu Item IF it exists.
      if (menu.querySelector(".active")) {
        collapse();
      }

      // Expand New Menu-Item
      target.parentElement.classList.add("active");
      target.nextElementSibling.style.maxHeight =
        target.nextElementSibling.scrollHeight + "px";
    }
  });

  // When resizing window...
  window.addEventListener("resize", function () {
    if (
      this.innerWidth > menuCollapseBreakpoint &&
      menu.classList.contains("open")
    ) {
      toggleMenu();
    }

    if (
      this.innerWidth > menuCollapseBreakpoint &&
      menu.querySelector(".active")
    ) {
      collapse();
    }
  });
}
headerMenu();

/* ----------------------------------------
            Style Switcher
------------------------------------------- */
function styleSwitcherToggle() {
  const styleSwitcher = document.querySelector(".js-style-switcher"),
    styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

  styleSwitcherToggler.addEventListener("click", function () {
    styleSwitcher.classList.toggle("open");
    this.querySelector("i").classList.toggle("fa-times");
    this.querySelector("i").classList.toggle("fa-cog");
  });
}
styleSwitcherToggle();

/* ----------------------------------------
            Theme Colors
------------------------------------------- */
function themeColors() {
  const colorStyle = document.querySelector(".js-color-style"),
    themeColorsContainer = document.querySelector(".js-theme-colors");

  themeColorsContainer.addEventListener("click", ({ target }) => {
    if (target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColor();
    }
  });

  function setColor() {
    let path = colorStyle.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorStyle.setAttribute(
      "href",
      path.join("/") + "/" + localStorage.getItem("color") + ".css"
    );

    if (document.querySelector(".js-theme-color-item.active")) {
      document
        .querySelector(".js-theme-color-item.active")
        .classList.remove("active");
    }
    document
      .querySelector(
        "[data-js-theme-color=" + localStorage.getItem("color") + "]"
      )
      .classList.add("active");
  }

  if (localStorage.getItem("color") !== null) {
    setColor();
  } else {
    const defaultColor = colorStyle
      .getAttribute("href")
      .split("/")
      .pop()
      .split(".")
      .shift();
    document
      .querySelector("[data-js-theme-color=" + defaultColor + "]")
      .classList.add("active");
  }
}
themeColors();

/* ----------------------------------------
            Light & Dark Mode
------------------------------------------- */
function themeLightDark() {
  const darkModeCheckbox = document.querySelector(".js-dark-mode");

  darkModeCheckbox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("theme-dark", "true");
    } else {
      localStorage.setItem("theme-dark", "false");
    }
    themeMode();
  });

  function themeMode() {
    if (localStorage.getItem("theme-dark") === "false") {
      document.body.classList.remove("t-dark");
    } else {
      document.body.classList.add("t-dark");
    }
  }
  if (localStorage.getItem("theme-dark") !== null) {
    themeMode();
  }

  if (document.body.classList.contains("t-dark")) {
    darkModeCheckbox = true;
  }
}
themeLightDark();

/* ----------------------------------------
            Glass Effect
------------------------------------------- */
function themeGlassEffect() {
  const glassEffectCheckbox = document.querySelector(".js-glass-effect"),
    glassStyle = document.querySelector(".js-glass-style");

  glassEffectCheckbox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("glass-effect", "true");
    } else {
      localStorage.setItem("glass-effect", "false");
    }
    glass();
  });

  function glass() {
    if (localStorage.getItem("glass-effect") === "true") {
      glassStyle.removeAttribute("disabled");
    } else {
      glassStyle.disabled = true;
    }
  }

  if (localStorage.getItem("glass-effect") !== null) {
    glass();
  }

  if (!glassStyle.hasAttribute("disabled")) {
    glassEffectCheckbox.checked = true;
  }
}
themeGlassEffect();


/* ----------------------------------------
            Switch Cats and Dogs selector
------------------------------------------- */

function perros(){
  document.getElementById("perros").style.display = "block";
  document.getElementById("gatos").style.display = "none";

  document.getElementById("perrosButton").classList.add("active");
  document.getElementById("gatosButton").classList.remove("active");
}

function gatos(){
  document.getElementById("gatos").style.display = "block";
  document.getElementById("perros").style.display = "none";

  document.getElementById("gatosButton").classList.add("active");
  document.getElementById("perrosButton").classList.remove("active");
}


/* ----------------------------------------
            Product Registration Form
------------------------------------------- */
document.addEventListener('DOMContentLoaded',function(){
  if (document.body.classList.contains('product-registration-page')) {
      const form= document.getElementById('productRegistrationForm');
      if (form){
          form.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent the form from submitting the default way
      
          // Validate the input fields
          if (validateNewProduct()) {
              // Succes if validation passes
              const alertMessage = "🐈🐕--Producto Registrado Correctamente --🐈🐕";
              showAlertProduct("success", alertMessage);
    
              const registro = new newProduct();
              // console.log(document.getElementById('registerName'));
              registro.agregarProductObject(
               document.getElementById('productCode').value,
                document.getElementById('productName').value, 
                document.getElementById('productDescription').value, 
                document.getElementById('productImage').value, 
                document.getElementById('productPrice').value, 
                document.getElementById('productPriceVIP').value, 
                document.getElementById('productDepartment').value, 
                document.getElementById('productInventoryCheck').checked,
                document.getElementById('productAmount').value||0,
                document.getElementById('productAmountMin').value||0
              );

              //--- Recuperar Datos productos (Incio)---
              const url = `http://localhost:8080/api/v4/post-product`;
          
          const user = {
            // Increment the currentId property
            code: document.getElementById('productCode').value,
            productName: document.getElementById('productName').value,
            description:document.getElementById('productDescription').value,
            url: document.getElementById('productImage').value,
            price:document.getElementById('productPrice').value,
            pricePawpal: document.getElementById('productPriceVIP').value ,
            category: document.getElementById('productDepartment').value, 
            isInventoried: document.getElementById('productInventoryCheck').checked,
            quantity: document.getElementById('productAmount').value||0,
            quantityMinimum: document.getElementById('productAmountMin').value||0
            //id: this.currentId++,
        };

          fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
          })
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  console.log('Guardado', data)
              })
              .catch(error => {
                  console.error(error);
              })
              //--- Recuperar Datos productos (Final)---

              //console.log(registro.items); 
    /*---------------Almacenar datos en el Local Storage-----*/  
              const productObjectJSON = JSON.stringify(registro.items);
              localStorage.setItem('newProduct',productObjectJSON);
              console.log(productObjectJSON);
                  //Redirigir a inicio con un retraso de 20 segundos
              setTimeout(function(){
                  window.location.href = 'ListaItems.html';
              }, 5000);
          }
       });
    }
  }
});
    function validateNewProduct() {
      const pCode = document.getElementById('productCode').value;
      const pName = document.getElementById('productName').value;
      const pDescription = document.getElementById('productDescription').value;
      const pImage = document.getElementById('productImage').value;
      const pPrice = document.getElementById('productPrice').value;
      const pPriceVip = document.getElementById('productPriceVIP').value;
      const pDepartment = document.getElementById('productDepartment').value;
      const pInventoryCheck = document.getElementById('productInventoryCheck').checked;
      const pAmount = document.getElementById('productAmount').value;
      const pAmountMin = document.getElementById('productAmountMin').value;
      
      const errorMessage = document.getElementById('errorMessage'); 
      errorMessage.innerHTML = '';
      // Validation checks 
      const isPCodeValid = validatePCode (pCode)? true : (showAlertErrorTwo("danger", "Se requiere ingresar un código de barras de 13 dígitos.<br>"), false);
      const isPNameValid = validatePName (pName)? true : (showAlertErrorTwo("danger", "Ingrese un nombre de producto válido.<br>"), false);
      const isPDescriptionValid = validatePDescription(pDescription) ? true : (showAlertErrorTwo("danger", "Falta agregar una descripción del producto.<br>"), false);
      const isPPriceValid = validatePPrice(pPrice) ? true : (showAlertErrorTwo("danger", "Ingresa precio del producto"), false);
      const isPPriceVIPValid = validatePPriceVIP(pPriceVip,pPrice) ? true : (showAlertErrorTwo("danger", "Ingresa precio del producto con descuento VIP"), false);
      const isPDepartmentValid = validatePDepartment(pDepartment) ? true : (showAlertErrorTwo("danger", "Ingresa el departamento al que pertenece el producto."), false);
      
      let isPImageValid= true;
      if (pImage){
        isPImageValid=validatePImage(pImage)? true: (showAlertErrorTwo("danger", "URL de la imagen no válida."), false);
      }
      let isInventoryValid=true;
      if (pInventoryCheck) { 
        const isPAmountValid = validatePAmount(pAmount) ? true : (showAlertErrorTwo("danger", "Ingrese cantidad en almacén."), false); 
        const isPAmountMinValid = validatePAmountMin(pAmountMin) ? true : (showAlertErrorTwo("danger", "Ingrese cantidad mínima que debe haber en el almacén."), false); 
        isInventoryValid= isPAmountValid && isPAmountMinValid; 
      }
      return isPCodeValid && isPNameValid && isPDescriptionValid && isPImageValid && isPPriceValid && isPPriceVIPValid && isPDepartmentValid && (pInventoryCheck ? isInventoryValid: true); // All validations passed }
    }
    function validatePCode(code) {
      const codePattern = /^\d{13}$/;
      return codePattern.test(code);
    }
    
    
    function validatePName(name) {
      const namePattern = /^.{4,}$/;
      return namePattern.test(name);
    }
    
    function validatePDescription(description) {
      const descriptionPattern = /^.{8,}$/; //PONER UNA RESTRICCIÓN DE QUE DEBE TENER MÁS DE 2 PALABRAS;
      return descriptionPattern.test(description);
    }
    
    function validatePImage(image) {
      const imagePattern = /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?#][^\s]*)?$/;
      return imagePattern.test(image);
    }
    
    function validatePPrice(price) {
      // Expresión regular para verificar un precio en formato válido (por ejemplo, $12.34)
      const pricePattern = /^(?!0(\.0+)?$).+$/;
    
      // Verifica si el precio coincide con el patrón y no es $0.00
      return pricePattern.test(price) && price !== "$0.00";
    }
    
    function validatePPriceVIP(priceVIP, price) {
      if (parseFloat(priceVIP)>= parseFloat(price)){
        showAlertErrorTwo ("danger", "EL precio VIP debe ser menor que el precio normal.");
        return false;
      }
      const pricePattern = /^(?!0(\.0+)?$).+$/;
      // Verifica que el precio VIP cumpla el patrón, no sea $0.00, y sea menor o igual al precio normal
      return (
        pricePattern.test(priceVIP) &&
        priceVIP !== "$0.00" &&
        parseFloat(priceVIP) <= parseFloat(price)
      );
    }
    
    function validatePDepartment(department) {
      const departmentPattern = /^.{4,}$/; //
      return departmentPattern.test(department);
    }
  
    function validateInventory(inventoryCheck) { 
      return inventoryCheck; 
      } 
    function validatePAmount(amount) { 
      const amountPattern = /^\d+$/; 
      return amountPattern.test(amount); 
      } 
    function validatePAmountMin(amountMin) { 
      const amountMinPattern = /^\d+$/; 
      return amountMinPattern.test(amountMin);  
      }
    
    function showAlertProduct(type, message) {
      const alertContainer = document.getElementById('alertContainer2');
      alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
    
    
    class newProduct {
      // Set up the items and currentId property in the contructor
      constructor(currentId = 0) {
          this.items = [];
          this.currentId = currentId;
      }
  
      // Create the addItem method
      
      agregarProductObject(code,name,description,image,price,priceVIP,department,inventoryCheck,amount,amountMin) {
          const product = {
              // Increment the currentId property
              code: code,
              name: name,
              description: description,
              image:image,
              price: price,
              priceVIP: priceVIP,
              department: department,
              inventoryCheck: inventoryCheck,
              amount: amount, //add
              amountMin:amountMin,
              id: this.currentId++,
          };
          
          // Push the item to the items property
          this.items.push(product);
          localStorage.clear();
      }
  } // Function to show the alerts. Alerts clean up after a certain time
function showAlertErrorTwo(type, message) {
      const alertContainer = document.getElementById('alertContainer2');
      alertContainer.insertAdjacentHTML('beforeend', `
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
      `);
      
      setTimeout(function() {
          alertContainer.innerHTML = '';
      }, 3000);
  }

  //Slidebar chatbot

  function toggleChat() {
    const chatSidebar = document.getElementById('chatSidebar');
    chatSidebar.classList.toggle('open');
}