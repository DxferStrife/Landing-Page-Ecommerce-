"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const tarjeta = document.querySelector(".hero-media");
    if (!tarjeta)
        return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
    const GRADOS_MAX = 3;
    function alMoverMouse(evento) {
        const rect = tarjeta.getBoundingClientRect();
        const x = (evento.clientX - rect.left) / rect.width;
        const y = (evento.clientY - rect.top) / rect.height;
        const rotY = (x - 0.5) * 2 * GRADOS_MAX;
        const rotX = (0.5 - y) * 2 * GRADOS_MAX;
        tarjeta.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        tarjeta.style.setProperty("--brillo-x", `${x * 100}%`);
        tarjeta.style.setProperty("--brillo-y", `${y * 100}%`);
    }
    function alSalir() {
        tarjeta.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
    tarjeta.addEventListener("mousemove", alMoverMouse);
    tarjeta.addEventListener("mouseleave", alSalir);
});
