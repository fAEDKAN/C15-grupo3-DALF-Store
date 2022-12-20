const $ = (element) => document.getElementById(element);

console.log("productEdit.js connected!");

const exRegs = {
    noSymbols: /^[0-9]+(.[0-9]{1,2})?$/,
    discount: /^([1-9]\d{0,1}|100)$/,
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegNum: /[0-9]/,
    exRegImg: /\.(jpg|jpeg|png|raw|webp)$/i,
};

const msgError = (element, msg, target) => {
    $(element).innerText = msg;
    target.classList.add("is-invalid");
};

const validField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove("is-invalid");
    target.classList.add("is-valid");
};

$("name").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("errorName", "Es obligatorio establecer un nombre", target);
            this.classList.add("is-invalid");
            break;
        case this.value.trim().length < 5:
            msgError("errorName", "El minimo es de 5 caracteres", target);
            break;
        default:
            validField("errorName", target);
            break;
    }
});

$("price").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value:
            msgError("errorPrice", "Es obligatorio establecer un precio", target);
            this.classList.add("is-invalid");
            break;
        case !exRegs.exRegNum.test(this.value):
            msgError("errorPrice", "Esta campo solo acepta numeros", target);
            break;
        case this.value < 1:
            msgError("errorPrice", "El precio tiene que ser mayor a 0", target);
            break;
        default:
            validField("errorPrice", target);
            break;
    }
});

$("discount").addEventListener("blur", function ({ target }) {
    switch (true) {
        case exRegs.exRegAlfa.test(this.value):
            msgError("errorDiscount", "Ésta campo solo acepta numeros", target);
            this.classList.add("is-invalid");
            break;
        case this.value < 0 || this.value > 100:
            msgError("errorDiscount", "El descuento no puede ser menor a 0 y no puede ser mayor a 100", target);
            break;
        default:
            validField("errorDiscount", target);
            break;
    }
});

$("stock").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value:
            msgError("errorStock", "Este campo es obligatorio", target);
            this.classList.add("is-invalid");
            break;
        case !exRegs.exRegNum.test(this.value):
            msgError("errorStock", "Esta campo solo acepta numeros", target);
            break;
        case this.value < 1 || this.value > 1000:
            msgError("errorStock", "El stock tien que ser entre 1 y 1000", target);
            break;
        default:
            validField("errorStock", target);
            break;
    }
});

$("category").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("errorCategory", "Es obligatorio establecer una categoría", target);
            this.classList.add("is-invalid");
            break;
        default:
            validField("errorCategory", target);
            break;
    }
});

$("section").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("errorSection", "Es obligatorio establecer una sección", target);
            this.classList.add("is-invalid");
            break;
        default:
            validField("errorSection", target);
            break;
    }
});


$("company").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("errorCompany", "Es obligatorio establecer una compania", target);
            this.classList.add("is-invalid");
            break;
        default:
            validField("errorCompany", target);
            break;
    }
});


$("description").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("errorDescription", "Es obligatorio establecer una descripción", target);
            this.classList.add("is-invalid");
            break;
        case this.value.length < 10:
            msgError("errorDescription", "La descripción tiene que tener entre 10 y 250 caracteres", target)
            break;
        case this.value.length > 3000:
            msgError("errorDescription", "La descripción tiene que tener entre 10 y 3000 caracteres", target)
            break;
        default:
            validField("errorDescription", target);
            break;
    }
});

$("image").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !exRegs.exRegImg.test(this.value):
            msgError("errorImage", "El formato de imagen no es compatible", target);
            this.classList.add("is-invalid");
            break;
        default:
            validField("errorImage", target);
            break;
    }
});

$("form-productEdit").addEventListener("submit", function (e) {
    e.preventDefault();
    let error = false;
    const elements = this.elements;
    for (let i = 0; i < elements.length - 2; i++) {
        if (!elements[i].value.trim() || elements[i].classList.contains('is-invalid')) {
            elements[i].classList.add('is-invalid')
            $('msgError').innerText = 'Hay campos con errores o están vacíos';
            error = true;
        }
    }
    !error && this.submit()
});


