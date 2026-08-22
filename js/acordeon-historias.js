"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const detalles = document.querySelectorAll(".proyecto-historia details");
    if (!detalles.length)
        return;
    const mq = window.matchMedia("(min-width: 900px)");
    function sincronizar() {
        detalles.forEach((detalle) => {
            detalle.open = mq.matches;
        });
    }
    sincronizar();
    mq.addEventListener("change", sincronizar);
});
