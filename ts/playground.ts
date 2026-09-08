document.addEventListener("DOMContentLoaded", () => {
  initDialogs();
  initMenus();
  initToasts();
});

/* ---------- Dialogs ---------- */

function initDialogs(): void {
  const dialogs = document.querySelectorAll<HTMLDialogElement>(".c-dialog");

  dialogs.forEach((dialog) => {
    const dialogId = dialog.id;
    if (!dialogId) return;

    const trigger = document.querySelector<HTMLButtonElement>(
      `[data-dialog-target="${dialogId}"]`
    );
    const cancelBtn = dialog.querySelector<HTMLButtonElement>("[data-dialog-cancel]");
    const confirmBtn = dialog.querySelector<HTMLButtonElement>("[data-dialog-confirm]");

    let lastFocused: HTMLElement | null = null;

    trigger?.addEventListener("click", () => {
      lastFocused = document.activeElement as HTMLElement | null;
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

function initMenus(): void {
  const toggles = document.querySelectorAll<HTMLButtonElement>(".c-menu-account-toggle");

  toggles.forEach((toggle) => {
    const menuId = toggle.getAttribute("aria-controls");
    if (!menuId) return;

    const menu = document.getElementById(menuId) as HTMLUListElement | null;
    if (!menu) return;

    const openMenu = (): void => {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = (returnFocus: boolean): void => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      if (returnFocus) toggle.focus();
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    menu.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as Node;
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

function initToasts(): void {
  const container = document.querySelector<HTMLDivElement>(".c-toast-container");
  if (!container) return;

  const demoTriggers = document.querySelectorAll<HTMLButtonElement>("[data-toast-demo]");

  demoTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      const variant = button.dataset.toastDemo === "error" ? "error" : "success";
      const message =
        variant === "error" ? "No se pudo guardar el cambio." : "Cambios guardados correctamente.";
      showToast(container, variant, message);
    });
  });
}

function showToast(container: HTMLDivElement, variant: "success" | "error", message: string): void {
  const existing = container.querySelectorAll<HTMLDivElement>(".c-toast");
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
