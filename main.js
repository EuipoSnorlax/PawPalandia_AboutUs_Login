//

window.addEventListener("load", () => {
  /* ----------------------------------------
            Page Loader
    ------------------------------------------- */
  document.querySelector(".js-page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".js-page-loader").style.display = "none";
  }, 600);
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

if (document.body.classList.contains('registration-page')) {
  document.getElementById('userRegistrationForm').addEventListener('submit', function(event) {
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
          //Redirigir a inicio con un retraso de 10 segundos
 setTimeout(function(){
   window.location.href = 'index.html'
 }, 10000);
}
  });
}

function validateNewUser() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const telephone = document.getElementById('registerPhone').value;
  const password = document.getElementById('registerPassword').value;
  const ageUser = document.getElementById('registerBirthDay').value;
  const termsCondUser = document.getElementById('acceptTermsCheck').checked;
  const errorMessage = document.getElementById('errorMessage');
  
  errorMessage.innerHTML = ''; // Clear previous error messages

  // Validation checks
  const isNameValid = name ? true : ((errorMessage.innerHTML += 'Se requiere un nombre.<br>'), false);
  const isEmailValid = validateEmail(email) ? true : (showAlertErrorOne("danger", "Formato de email no válido"), false);
  const isTelephoneValid = validateTelephone(telephone) ? true : (showAlertErrorOne("danger", "Formato de teléfono no válido"), false);
  const isPasswordValid = validatePassword(password) ? true : (showAlertErrorOne("danger", "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico."), false);
  const isAgeValid = validateAge(ageUser) ? true : (showAlertErrorOne("danger", "Tienes que ser mayor de edad para poderte registrar"), false);
  const isTermsCondValid = termsCondUser ? true : (showAlertErrorOne("danger", "Debes aceptar nuestros términos y condiciones para registrarte"), false);
  
  return isNameValid && isEmailValid && isTelephoneValid && isPasswordValid && isAgeValid && isTermsCondValid; // All validations passed
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
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad >= 18;
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

function productRegistrationForm() {
  const productObject = {
    code: "",
    name: "",
    description: "",
    image: "",
    price: "",
    priceVIP: "",
    department: "",
    inventoryCheck: "",
    amount: "",
    amountMin: "",
  };

  const productForm = document.querySelector("#productRegistrationForm");
  const code = document.querySelector("#productCode");
  const name = document.querySelector("#productImage");
  const description = document.querySelector("#productDescription");
  const image = document.querySelector("#productImage");
  const price = document.querySelector("#productPrice");
  const priceVIP = document.querySelector("#productPriceVIP");
  const department = document.querySelector("#productDepartment");
  const inventoryCheck = document.querySelector("#productInventoryCheck");
  const amount = document.querySelector("#productAmount");
  const amountMin = document.querySelector("#productMin");
// modificado 13-11
  // productForm.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   productObject.code = code.value;
  //   productObject.name = name.value;
  //   productObject.description = description.value;
  //   // productObject.image = image.value;
  //   productObject.price = price.value;
  //   productObject.priceVIP = priceVIP.value;
  //   productObject.department = department.value;
  //   // productObject.inventoryCheck = inventoryCheck.value;
  //   // productObject.amount = amount.value;
  //   // productObject.amountMin = amountMin.value;

  //   const productObjectJSON = JSON.stringify(productObject);
  //   console.log(productObjectJSON);
  // });
}
productRegistrationForm();



/* ----------------------------------------
    Product Registration Validation Form
------------------------------------------- */
if (document.body.classList.contains("product-registration-page")) {
  document
    .getElementById("productRegistrationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting the default way

      // Validate the input fields
      if (validateProductRegisrationForm()) {
        alertMessage = "¡Producto agregado correctamente!";
        showAlert("success", alertMessage);
        // -- AQUÍ SE PUEDE PONER UNA FUNCIÓN PARA AGREGAR LOS DATOS EN EL ARCHIVO PRODUCTS.JSON
      }
    });
}

/* ----------------------------------------
Clean Product Registration Validation Form
------------------------------------------- */

const formulario = document.getElementById("productRegistrationForm");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  clearForm();

});

function clearForm() {
  formulario.reset();
}



function validateProductRegisrationForm() {
  const code = document.getElementById("productCode").value;
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  // const image = document.getElementById("productImage").value;
  const price = document.getElementById("productPrice").value;
  const priceVIP = document.getElementById("productPriceVIP").value;
  const department = document.getElementById("productDepartment").value;
  //const inventoryCheck = document.getElementById("productInventoryCheck").value;
  // const amount = document.getElementById("productAmount").value;
  // const amountMin = document.getElementById("productAmountMin").value;

  const errorMessage = document.getElementById("errorMessage");

  errorMessage.innerHTML = ""; // Clear previous error messages

  // Validation checks
  const isCodeValid = code
    ? true
    : ((errorMessage.innerHTML += "Se requiere un número de serie.<br>"),
      false);
  const isnameValid = name
    ? true
    : ((errorMessage.innerHTML += "Nombre no válido.<br>"), false);
  const isDescriptionValid = description
    ? true
    : ((errorMessage.innerHTML += "Se requiere una descripción.<br>"), false);
  // const isImageValid = image
  //   ? true
  // : ((errorMessage.innerHTML += "Se requiere una imagen.<br>"), false);
  const isPriceValid = price
    ? true
    : ((errorMessage.innerHTML += "Se requiere un precio.<br>"), false);
  const isPriceVIPValid = priceVIP
    ? true
    : ((errorMessage.innerHTML += "Se requiere un precio VIP.<br>"), false);
  const isDepartmentValid = department
    ? true
    : ((errorMessage.innerHTML += "Se requiere un departamento.<br>"), false);
  // const isInventoryCheckValid = inventoryCheck
  //   ? true
  //   : ((errorMessage.innerHTML += "Se requiere un inventario.<br>"), false);
  // const isAmountValid = amount
  //   ? true
  //   : ((errorMessage.innerHTML += "Se requiere una cantidad.<br>"), false);
  // const isAmountMinValid = amountMin
  //   ? true
  //   : ((errorMessage.innerHTML += "Se requiere una cantidad mínima.<br>"),
  //     false);

  return (
    isCodeValid &&
    isnameValid &&
    isDescriptionValid &&
    // isImageValid &&
    isPriceValid &&
    isPriceVIPValid &&
    isDepartmentValid
    // isInventoryCheckValid &&
    // isAmountValid &&
    // isAmountMinValid
  ); // All validations passed
}

function validateCode(code) {
  const codePattern = /^\d{13}$/;
  return codePattern.test(code);
}


function validateName(name) {
  const namePattern = /^.{4,}$/;
  return namePattern.test(name);
}

function validateDescription(description) {
  const descriptionPattern = /^.{4,}$/; //PONER UNA RESTRICCIÓN DE QUE DEBE TENER MÁS DE 2 PALABRAS;
  return descriptionPattern.test(description);
}

function validateImage(image) {
  const imagePattern = /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?#][^\s]*)?$/;
  return imagePattern.test(image);
}

function validatePrice(price) {
  // Expresión regular para verificar un precio en formato válido (por ejemplo, $12.34)
  const pricePattern = /^(?!0(\.0+)?$).+$/;

  // Verifica si el precio coincide con el patrón y no es $0.00
  return pricePattern.test(price) && price !== "$0.00";
}

function validatePriceVIP(priceVIP, price) {
  const pricePattern = /^(?!0(\.0+)?$).+$/;

  // Verifica que el precio VIP cumpla el patrón, no sea $0.00, y sea menor o igual al precio normal
  return (
    pricePattern.test(priceVIP) &&
    priceVIP !== "$0.00" &&
    parseFloat(priceVIP.slice(1)) <= parseFloat(price.slice(1))
  );
}

function validateDepartament(departament) {
  const departmentPattern = /^.{4,}$/; //
  return departmentPattern.test(departament);
}

function registProduct() {
  const code = document.getElementById("code").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const price = document.getElementById("price").value;
  const priceVIP = document.getElementById("priceVIP").value;
  const department = document.getElementById("department").value;
  const inventoryCheck = document.getElementById("inventoryCheck").value;
  const amount = document.getElementById("amount").value;
  const amountMin = document.getElementById("amountMin").value;

  // Console
  console.log("Agregando la siguiente información:");
  console.log(`Código de barras: ${code}`);
  console.log(`Nombre del producto: ${name}`);
  console.log(`Descripción: ${description}`);
  console.log(`Imagen: ${image}`);
  console.log(`Precio: ${price}`);
  console.log(`Precio Club PawPal: ${priceVIP}`);
  console.log(`Departamento: ${department}`);
  console.log(`Usa inventario: ${inventoryCheck}`);
  console.log(`Cantidad actual: ${amount}`);
  console.log(`Mínimo: ${amountMin}`);

  // Clear the form after sending... Allons-y !!!
  //document.getElementById("productRegistrationForm").reset();
}

/* 45:25_35,100yards_Biotic_SeNt  ML_CerbAg_Opt_Perf   Warp, Overload & Slam */

// Validación del form

document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const productCode = document.getElementById("").value;
  const alertContainerCode = document.getElementById("alertContainerCode");

  alertContainerCode.innerHTML = "";

  if (!validateCode(productCode)) {
    alertContainerCode.innerHTML = `
      <div class="alert alert-danger" role="alert">
        El producto no se registró correctamente.
      </div>`;

    return false;

  } else {
    alertContainerCode.innerHTML = `
       <div class="alert alert-success" role="alert">
                  Producto agregado correctamente.
               </div>`;
  }
});

// Validación del código de barras (code)

document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const productCode = document.getElementById("productCode").value;
  const alertContainerCode = document.getElementById("alertContainerCode");

  alertContainerCode.innerHTML = "";

  if (!validateCode(productCode)) {
    alertContainerCode.innerHTML = `
          <div class="alert alert-danger" role="alert">
            El código de barras debe tener 13 caracteres númericos.
          </div>`;

    return false;

  }

});

// Validación del nombre del producto (name)

document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const productName = document.getElementById("productName").value;
  const alertContainerName = document.getElementById("alertContainerName");

  alertContainerName.innerHTML = "";

  if (!validateName(productName)) {
    alertContainerName.innerHTML = `
        <div class="alert alert-danger" role="alert">
         El nombre del producto debe tener al menos 4 caracteres.
        </div>`;

    return false;

  } else {
    alertContainerName.innerHTML = `
        <div class="alert alert-success" role="alert">
                    Producto registrado correctamente.
                </div>`;
  }
});

// Validación de la nombre del producto (name)

document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const productName = document.getElementById("productName").value;
  const alertContainerName = document.getElementById("alertContainerName");

  alertContainerName.innerHTML = "";

  if (!validateName(productName)) {
    alertContainerName.innerHTML = `
            <div class="alert alert-danger" role="alert">
             El nombre del producto debe tener al menos 4 caracteres.
            </div>`;

    return false;

    // } else{
    //     alertContainerName.innerHTML = `
    //     <div class="alert alert-success" role="alert">
    //                 Campo agregado correctamente.
    //             </div>`;
  }
});

// Validación del descripción del producto (description)

document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const productDescription = document.getElementById("productDescription").value;
  const alertContainerDescription = document.getElementById("alertContainerDescription");

  alertContainerDescription.innerHTML = "";

  if (!validateDescription(productDescription)) {
    alertContainerDescription.innerHTML = `
        <div class="alert alert-danger" role="alert">
         La descripción del producto debe tener al menos 4 caracteres.
        </div>`;

    return false;

    // } else{
    //     alertContainerDescription.innerHTML = `
    //     <div class="alert alert-success" role="alert">
    //                 Campo agregado correctamente.
    //             </div>`;
  }
});

// Validación de la imagen del producto (image) SE COMENTÓ PORQUE ES UN CAMPO OPCIONAL A LA HORA DE REGISTRAR PRODUCTO

//   document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
//     event.preventDefault();
//     const productImage = document.getElementById("productImage").value;
//     const alertContainerImage = document.getElementById("alertContainerImage");

//     alertContainerImage.innerHTML = "";

//     if (!validateImage(productImage)) {
//       alertContainerImage.innerHTML = `
//         <div class="alert alert-danger" role="alert">
//          ingrese una URL válida.
//         </div>`;

//       return false;

//     } else{
//         alertContainerImage.innerHTML = `
//         <div class="alert alert-success" role="alert">
//                     El producto se registró correctamente.
//                 </div>`;
//     }
//   });

// Validación del precio del producto (price)

// document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
//   event.preventDefault();
//   const productPrice = document.getElementById("productPrice").value;
//   const alertContainerPrice = document.getElementById("alertContainerPrice");

//   alertContainerPrice.innerHTML = "";

//   if (!validatePrice(productPrice)) {
//     alertContainerPrice.innerHTML = `
//         <div class="alert alert-danger" role="alert">
//          el precio no puede ser cero.
//         </div>`;

//     return false;

//     // } else{
//     //     alertContainerPrice.innerHTML = `
//     //     <div class="alert alert-success" role="alert">
//     //                 El producto se registró correctamente.
//     //             </div>`;
//   }
// });

// Validación del precio del producto Club PawPal (priceVIP)

document.getElementById("productRegistrationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // const productPriceVIP = document.getElementById("productPriceVIP").value;
  // const alertContainerPriceVIP = document.getElementById("alertContainerPriceVIP");

  // alertContainerPriceVIP.innerHTML = "";

  // if (!validatePrice(productPriceVIP)) {
  //   alertContainerPriceVIP.innerHTML = `
  //           <div class="alert alert-danger" role="alert">
  //            el precio no puede ser cero ni debe ser más caro que el precio normal.
  //           </div>`;

  //   return false;

    // } else{
    //     alertContainerPriceVIP.innerHTML = `
    //     <div class="alert alert-success" role="alert">
    //                 El producto se registró correctamente.
    //             </div>`;
  // }
});
