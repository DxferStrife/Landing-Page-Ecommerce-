type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getCurrentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return getSystemTheme();
}

function syncToggleButtons(theme: Theme): void {
  const isDark = theme === "dark";
  document.querySelectorAll<HTMLButtonElement>(".theme-toggle").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
  });
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  syncToggleButtons(theme);
}

function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage puede no estar disponible (modo privado, storage deshabilitado); el
    // cambio de tema sigue funcionando en la página actual, solo no persiste.
  }
}

document.addEventListener("DOMContentLoaded", () => {
  syncToggleButtons(getCurrentTheme());

  document.querySelectorAll<HTMLButtonElement>(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
      setTheme(next);
    });
  });
});
