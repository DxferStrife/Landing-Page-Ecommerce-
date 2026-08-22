document.addEventListener("DOMContentLoaded", () => {
  const detalles = document.querySelectorAll<HTMLDetailsElement>(".proyecto-historia details");
  if (!detalles.length) return;

  const mq = window.matchMedia("(min-width: 900px)");

  function sincronizar(): void {
    detalles.forEach((detalle) => {
      detalle.open = mq.matches;
    });
  }

  sincronizar();
  mq.addEventListener("change", sincronizar);
});
