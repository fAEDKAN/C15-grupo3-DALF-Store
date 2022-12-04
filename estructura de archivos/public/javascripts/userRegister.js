const $ = (element) => document.getElementById(element);
const inputs = document.querySelectorAll('#register__form input');

const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,25}/,
    exRegMayu: /[A-Z]/,
    exRegMinu: /[a-z]/,
    exRegNum: /[0-9]/,
    exRegEsp: /[$@$!%*?&]/,
    exRegMin: /.{8,}/,
    exRegMax: /.{25}/,
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

const validPass = (element, exReg, value) => {
    if (!exReg.test(value)) {
        $(element).classList.add("input__pass--denied");
        $(element).classList.remove("input__pass--granted");
    } else {
        $(element).classList.add("input__pass--granted");
        $(element).classList.remove("input__pass--denied");
    }
};

const verifyUserName = async (userName) => {
    try {
        let response = await fetch("/api/users/verify-username", {
            method: "POST",
            body: JSON.stringify({
                userName: userName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await response.json();
        console.log(result);
        return result.verified;
    } catch (error) {
        console.log(error);
    }
}

const verifyEmail = async (email) => {
    try {
        let response = await fetch("/api/users/verify-email", {
            method: "POST",
            body: JSON.stringify({
                email: email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await response.json();
        console.log(result);
        return result.verified;
    } catch (error) {
        console.log(error);
    }
}

// Nombre de usuario
$("userName").addEventListener("blur", async function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("userNameError", "Éste campo es obligatorio", target);
            break;
        case this.value.trim().length < 3:
            msgError(
                "userNameError",
                "El nombre de usuario debe contener entre 3 y 15 caracteres",
                target
            );
            break;
        case !exRegs.exRegAlfa.test(this.value):
            msgError("userNameError", "Sólo caracteres alfabéticos", target);
            break;
        case await verifyUserName(this.value):
            msgError("userNameError", "El nombre de usuario ya se encuentra registrado", target);
            break;
        default:
            validField("userNameError", target);
            break;
    }
});

// Email
$("email").addEventListener("blur", async function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("emailError", "Éste campo es obligatorio", target);
            break;
        case !exRegs.exRegEmail.test(this.value):
            msgError(
                "emailError",
                "Ingresá un email válido",
                target
            );
            break;
        case await verifyEmail(this.value):
            msgError("emailError", "El email ya se encuentra registrado", target);
            break;
        default:
            validField("emailError", target);
            break;
    }
});

// Contraseña
$("password").addEventListener("focus", () => {
    $("passMsg").hidden = false;
});

$("password").addEventListener("blur", function ({ target }) {
    $("passMsg").hidden = true;
    switch (true) {
        case !this.value.trim():
            msgError("passwordError", "Éste campo es obligatorio", target);
            break;
        case !exRegs.exRegPass.test(this.value):
            msgError(
                "passwordError",
                "1 mayúscula - 1 minúscula - 1 número - 1 caracter especial ($@$!%*?&) - 8 a 25 caracteres",
                target
            );
            break;
        default:
            validField("passwordError", target);
            break;
    }
});

$("password").addEventListener("keyup", function ({ target }) {
    validPass("mayus", exRegs.exRegMayu, target.value);
    validPass("minus", exRegs.exRegMinu, target.value);
    validPass("num", exRegs.exRegNum, target.value);
    validPass("esp", exRegs.exRegEsp, target.value);
    validPass("min", exRegs.exRegMin, target.value);
    validPass("max", exRegs.exRegMax, target.value);
});

// Validar contraseña
$("repass").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("repassError", "Éste campo es obligatorio", target);
            break;
        case this.value.trim() !== $("password").value.trim():
            msgError("repassError", "Las contraseñas no coinciden", target);
            break;
        default:
            validField("repassError", target);
            break;
    }
});

$("register__form").addEventListener("submit", function (e) {
    
    e.preventDefault();
    let error = false;

    const elements = this.elements;
    for (let i = 0; i < elements.length - 1; i++) {
        if (
            !elements[i].value.trim() ||
            elements[i].classList.contains("is-invalid")
        ) {
            elements[i].classList.add("is-invalid");
            $("msgError").innerText = "¡Completá los campos correctamente!";
            error = true;
        }
    }

    !error && this.submit()
});