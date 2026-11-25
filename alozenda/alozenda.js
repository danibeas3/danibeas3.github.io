const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#mobile-menu");
function closeMenu() {
  menu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menu.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
menu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const previewObserver = new ResizeObserver((entries) => {
  for (const { target, contentRect } of entries) {
    target.querySelector("iframe").style.transform =
      `scale(${contentRect.width / 1440})`;
  }
});
document
  .querySelectorAll("[data-preview]")
  .forEach((frame) => previewObserver.observe(frame));
const tabs = [...document.querySelectorAll('[role="tab"]')];
const featureScreen = document.querySelector("#feature-screen");
const labels = {
  calendario: "Calendario de reservas",
  reserva: "Ficha de una reserva",
  empresa: "Opciones de empresa y apartamentos",
};
function selectTab(tab) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  document
    .querySelector("#feature-panel")
    .setAttribute("aria-labelledby", tab.id);
  featureScreen.src = `./preview/${tab.dataset.screen}.html`;
  featureScreen.title = labels[tab.dataset.screen];
  document.querySelector("#screen-label").textContent =
    labels[tab.dataset.screen];
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (["ArrowDown", "ArrowRight"].includes(event.key))
      next = (index + 1) % tabs.length;
    if (["ArrowUp", "ArrowLeft"].includes(event.key))
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    }
  });
});
const privacy = document.querySelector("#privacy-dialog");
document
  .querySelectorAll("#privacy-open,[data-privacy]")
  .forEach((button) =>
    button.addEventListener("click", () => privacy.showModal()),
  );
privacy
  .querySelector(".dialog-close")
  .addEventListener("click", () => privacy.close());
privacy.addEventListener("click", (event) => {
  if (event.target === privacy) {
    const r = privacy.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      privacy.close();
  }
});

const form = document.querySelector("#enquiry-form");
const submit = document.querySelector("#enquiry-submit");
const resultBox = document.querySelector("#enquiry-result");
const status = document.querySelector("#enquiry-status");
const api = "https://portaldoc-contact.dani-ruizporcel.workers.dev";
let widgetId;
let sending = false;
let completed = false;
function feedback(message, state = "error") {
  status.textContent = message;
  resultBox.dataset.state = state;
  resultBox.hidden = false;
}
async function initialiseContact() {
  if (["localhost", "127.0.0.1"].includes(location.hostname)) {
    submit.textContent = "Solicitar Alozenda";
    feedback(
      "Vista previa local. El formulario se habilita en la web pública.",
      "preview",
    );
    return;
  }
  try {
    const response = await fetch(`${api}/config`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("config");
    const { siteKey } = await response.json();
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
    document.querySelector("#contact-verification").hidden = false;
    widgetId = window.turnstile.render("#contact-verification", {
      sitekey: siteKey,
      action: "contact",
      theme: "light",
      size: "flexible",
      callback: () => {
        if (!sending && !completed) {
          submit.disabled = false;
          submit.textContent = "Solicitar Alozenda";
        }
      },
      "expired-callback": () => {
        if (completed) return;
        submit.disabled = true;
        submit.textContent = "Verificando…";
        window.turnstile.reset(widgetId);
      },
      "error-callback": () => {
        submit.disabled = true;
        feedback(
          "No se ha podido verificar el formulario. Recarga la página o escribe a contacto@daniruiz.com.",
        );
      },
    });
    submit.textContent = "Verificando…";
  } catch {
    submit.textContent = "Envío no disponible";
    feedback(
      "El envío directo no está disponible temporalmente. Puedes escribir a contacto@daniruiz.com.",
    );
  }
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sending || completed || !form.reportValidity()) return;
  const token = window.turnstile?.getResponse(widgetId);
  if (!token) {
    feedback("Completa la verificación antispam antes de enviar.");
    return;
  }
  const values = new FormData(form);
  const data = Object.fromEntries(
    ["name", "email", "company", "apartments", "message", "website"].map(
      (key) => [key, String(values.get(key) || "").trim()],
    ),
  );
  data.token = token;
  sending = true;
  submit.disabled = true;
  submit.textContent = "Enviando solicitud…";
  form.setAttribute("aria-busy", "true");
  resultBox.hidden = true;
  try {
    const response = await fetch(`${api}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(25000),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true)
      throw new Error(result.error || "No se ha podido confirmar el envío.");
    completed = true;
    feedback(
      "Tu solicitud de Alozenda se ha enviado. Te responderemos en el correo que has indicado.",
      "success",
    );
    submit.textContent = "Solicitud enviada";
    form
      .querySelectorAll("input,select,textarea")
      .forEach((field) => (field.disabled = true));
  } catch (error) {
    feedback(
      ["TimeoutError", "TypeError"].includes(error.name)
        ? "La conexión se ha interrumpido. No podemos confirmar el envío. Espera antes de repetirlo o escribe a contacto@daniruiz.com."
        : error.message,
    );
    window.turnstile.reset(widgetId);
    submit.textContent = "Verificando…";
  } finally {
    sending = false;
    form.removeAttribute("aria-busy");
    status.focus({ preventScroll: true });
  }
});
initialiseContact();
