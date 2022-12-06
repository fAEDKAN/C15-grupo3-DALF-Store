const $ = (element) => document.getElementById(element);

const exRegs = {
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
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

// Email
$("email").addEventListener("blur", async function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("emailError", "El campo no puede estar vacío", target);
            break;
        case !exRegs.exRegEmail.test(this.value):
            msgError(
                "emailError",
                "Ingresá un email válido",
                target
            );
            break;
        default:
            validField("emailError", target);
            break;
    }
});

// Contraseña
$("password").addEventListener("blur", async function ({ target }) {
    switch (true) {
        case !this.value.trim():
            msgError("passwordError", "El campo no puede estar vacío", target);
            break;
        default:
            validField("passwordError", target);
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