"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // La bombilla de "cómo trabajamos" se enciende al entrar en pantalla. Va antes de los
    // guards de GSAP para que también funcione si la CDN no cargó; con movimiento reducido,
    // el CSS deja la luz encendida sin animarla.
    const bombilla = document.querySelector(".bombilla");
    if (bombilla) {
        if (typeof IntersectionObserver === "undefined") {
            bombilla.classList.add("is-visible");
        }
        else {
            const observador = new IntersectionObserver((entradas) => {
                if (!entradas.some((entrada) => entrada.isIntersecting))
                    return;
                bombilla.classList.add("is-visible");
                observador.disconnect();
            }, { threshold: 0.2 });
            observador.observe(bombilla);
        }
    }
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
        return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
    gsap.registerPlugin(ScrollTrigger);
    // Tarjetas: entran en secuencia desde abajo, en cualquier tamaño de pantalla.
    document
        .querySelectorAll(".servicios-grid, .proceso-grid, .testimonios-grid, .precios-grid, .faq-list")
        .forEach((grupo) => {
        const tarjetas = Array.from(grupo.children);
        if (!tarjetas.length)
            return;
        gsap.set(tarjetas, { y: 48, opacity: 0 });
        ScrollTrigger.batch(tarjetas, {
            start: "top 88%",
            once: true,
            onEnter: (elementos) => gsap.to(elementos, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12 }),
        });
    });
    // Bloques "caso" (caso de éxito, detalle de planes): el texto siempre entra desde abajo.
    document.querySelectorAll(".caso-copy").forEach((copy) => {
        gsap.from(copy, {
            y: 48,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: copy, start: "top 85%", once: true },
        });
    });
    const mm = gsap.matchMedia();
    // Móvil/tablet: la imagen del bloque "caso" entra igual que las tarjetas, desde abajo.
    mm.add("(max-width: 899px)", () => {
        document.querySelectorAll(".caso-figure").forEach((figura) => {
            gsap.from(figura, {
                y: 48,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: figura, start: "top 88%", once: true },
            });
        });
    });
    // Escritorio: la imagen entra deslizándose desde su borde más cercano.
    mm.add("(min-width: 900px)", () => {
        document.querySelectorAll(".caso-figure").forEach((figura) => {
            const esReversa = figura.closest(".caso--reverse") !== null;
            gsap.from(figura, {
                x: esReversa ? -90 : 90,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: figura, start: "top 85%", once: true },
            });
        });
    });
});
