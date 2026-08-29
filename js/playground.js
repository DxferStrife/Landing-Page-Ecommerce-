"use strict";
document.addEventListener("DOMContentLoaded", () => {
    initDialogs();
    initMenus();
    initToasts();
});
/* ---------- Dialogs ---------- */
function initDialogs() {
    const dialogs = document.querySelectorAll(".c-dialog");
    dialogs.forEach((dialog) => {
        const dialogId = dialog.id;
        if (!dialogId)
            return;
        const trigger = document.querySelector(`[data-dialog-target="${dialogId}"]`);
        const cancelBtn = dialog.querySelector("[data-dialog-cancel]");
        const confirmBtn = dialog.querySelector("[data-dialog-confirm]");
        let lastFocused = null;
        trigger?.addEventListener("click", () => {
            lastFocused = document.activeElement;
            dialog.showModal();
        });
        cancelBtn?.addEventListener("click", () => {
            dialog.close();
        });
        confirmBtn?.addEventListener("click", () => {
            dialog.close();
        });
        dialog.addEventListener("close", () => {
            lastFocused?.focus();
        });
    });
}
/* ---------- Menús ---------- */
function initMenus() {
    const toggles = document.querySelectorAll(".c-menu-account-toggle");
    toggles.forEach((toggle) => {
        const menuId = toggle.getAttribute("aria-controls");
        if (!menuId)
            return;
        const menu = document.getElementById(menuId);
        if (!menu)
            return;
        const openMenu = () => {
            menu.hidden = false;
            toggle.setAttribute("aria-expanded", "true");
        };
        const closeMenu = (returnFocus) => {
            menu.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
            if (returnFocus)
                toggle.focus();
        };
        toggle.addEventListener("click", () => {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            if (isOpen) {
                closeMenu(false);
            }
            else {
                openMenu();
            }
        });
        menu.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu(true);
            }
        });
        document.addEventListener("click", (event) => {
            const target = event.target;
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            if (isOpen && !menu.contains(target) && !toggle.contains(target)) {
                closeMenu(false);
            }
        });
    });
}
/* ---------- Toasts ---------- */
const MAX_VISIBLE_TOASTS = 3;
const TOAST_DURATION_MS = 5000;
function initToasts() {
    const container = document.querySelector(".c-toast-container");
    if (!container)
        return;
    const demoTriggers = document.querySelectorAll("[data-toast-demo]");
    demoTriggers.forEach((button) => {
        button.addEventListener("click", () => {
            const variant = button.dataset.toastDemo === "error" ? "error" : "success";
            const message = variant === "error" ? "No se pudo guardar el cambio." : "Cambios guardados correctamente.";
            showToast(container, variant, message);
        });
    });
}
function showToast(container, variant, message) {
    const existing = container.querySelectorAll(".c-toast");
    if (existing.length >= MAX_VISIBLE_TOASTS) {
        existing[0]?.remove();
    }
    const toast = document.createElement("div");
    toast.className = `c-toast c-toast--${variant}`;
    toast.textContent = message;
    container.appendChild(toast);
    window.setTimeout(() => {
        toast.remove();
    }, TOAST_DURATION_MS);
}
