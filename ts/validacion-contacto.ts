type CampoFormulario = HTMLInputElement | HTMLTextAreaElement;
type Validador = (valor: string) => string | null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_REGEX = /^[0-9+\s-]{7,15}$/;

function validarNombre(valor: string): string | null {
  const v = valor.trim();
  if (!v) return "Ingresa tu nombre.";
  if (v.length < 2) return "El nombre es demasiado corto.";
  return null;
}

function validarEmail(valor: string): string | null {
  const v = valor.trim();
  if (!v) return "Ingresa tu correo electrónico.";
  if (!EMAIL_REGEX.test(v)) return "Ingresa un correo electrónico válido.";
  return null;
}

function validarTelefono(valor: string): string | null {
  const v = valor.trim();
  if (!v) return "Ingresa tu número de teléfono.";
  if (!TELEFONO_REGEX.test(v)) return "Ingresa un número de teléfono válido.";
  return null;
}

function validarMensaje(valor: string): string | null {
  const v = valor.trim();
  if (!v) return "Cuéntanos brevemente sobre tu negocio.";
  if (v.length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres).";
  return null;
}

function obtenerElementoError(campo: CampoFormulario): HTMLElement {
  const siguiente = campo.nextElementSibling;
  if (siguiente instanceof HTMLElement && siguiente.classList.contains("form-error")) {
    return siguiente;
  }
  const error = document.createElement("span");
  error.className = "form-error";
  error.setAttribute("role", "alert");
  const describedById = campo.getAttribute("aria-describedby");
  if (describedById) error.id = describedById;
  campo.insertAdjacentElement("afterend", error);
  return error;
}

function marcarError(campo: CampoFormulario, mensaje: string | null): void {
  const errorEl = obtenerElementoError(campo);
  if (mensaje) {
    campo.setAttribute("aria-invalid", "true");
    campo.classList.add("is-invalid");
    errorEl.textContent = mensaje;
  } else {
    campo.removeAttribute("aria-invalid");
    campo.classList.remove("is-invalid");
    errorEl.textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>(".form-contacto");
  if (!form) return;

  const feedback = document.querySelector<HTMLElement>(".form-feedback");
  const nombre = form.querySelector<HTMLInputElement>("#nombre");
  const email = form.querySelector<HTMLInputElement>("#email");
  const telefono = form.querySelector<HTMLInputElement>("#telefono");
  const mensaje = form.querySelector<HTMLTextAreaElement>("#mensaje");

  if (!nombre || !email || !telefono || !mensaje) return;

  const campos: [CampoFormulario, Validador][] = [
    [nombre, validarNombre],
    [email, validarEmail],
    [telefono, validarTelefono],
    [mensaje, validarMensaje],
  ];

  campos.forEach(([campo, validar]) => {
    campo.addEventListener("blur", () => {
      marcarError(campo, validar(campo.value));
    });
    campo.addEventListener("input", () => {
      if (campo.classList.contains("is-invalid")) {
        marcarError(campo, validar(campo.value));
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const resultados = campos.map(([campo, validar]) => {
      const error = validar(campo.value);
      marcarError(campo, error);
      return { campo, error };
    });

    if (feedback) {
      feedback.classList.remove("is-success", "is-error");
    }

    const primerInvalido = resultados.find((r) => r.error !== null);

    if (primerInvalido) {
      if (feedback) {
        feedback.textContent = "Revisa los campos marcados antes de enviar.";
        feedback.classList.add("is-error");
      }
      primerInvalido.campo.focus();
      return;
    }

    if (feedback) {
      feedback.textContent = "¡Gracias! Recibimos tu mensaje y te contactaremos pronto.";
      feedback.classList.add("is-success");
    }
    form.reset();
    campos.forEach(([campo]) => marcarError(campo, null));
  });
});
