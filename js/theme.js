"use strict";
const STORAGE_KEY = "theme";
function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function getCurrentTheme() {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark")
        return attr;
    return getSystemTheme();
}
function syncToggleButtons(theme) {
    const isDark = theme === "dark";
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(isDark));
        btn.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
    });
}
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    syncToggleButtons(theme);
}
function setTheme(theme) {
    applyTheme(theme);
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    }
    catch {
        // localStorage puede no estar disponible (modo privado, storage deshabilitado); el
        // cambio de tema sigue funcionando en la página actual, solo no persiste.
    }
}
document.addEventListener("DOMContentLoaded", () => {
    syncToggleButtons(getCurrentTheme());
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
            const next = getCurrentTheme() === "dark" ? "light" : "dark";
            setTheme(next);
        });
    });
});
