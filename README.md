# Vitrina — Landing Page (Proyecto Universitario)

Landing page para **Vitrina**, un servicio ficticio de creación de tiendas de e-commerce a medida. Proyecto académico centrado en maquetación responsive, accesibilidad, SEO técnico y validación de formularios con TypeScript.

## Estructura del proyecto

```
├── index.html                 # Página principal (Hero, Servicios, Caso de éxito, Confianza, Sobre nosotros, Contacto)
├── proyectos.html              # Portafolio de proyectos
├── precios.html                 # Planes y precios
├── css/
│   └── styles.css              # Estilos (tokens, layout, componentes, responsive)
├── ts/
│   ├── theme.ts                 # Selector de modo claro/oscuro
│   └── validacion-contacto.ts   # Validación del formulario de contacto
├── js/                          # Salida compilada de /ts (generada por tsc, no editar a mano)
├── img/                          # Imágenes y SVG del sitio
├── robots.txt                    # Directivas para crawlers
├── sitemap.xml                   # Mapa del sitio
└── tsconfig.json                 # Configuración del compilador TypeScript
```

## Cómo ejecutar

No requiere servidor ni build para ver el sitio: basta con abrir `index.html` en el navegador.

Para compilar TypeScript a JavaScript (necesario si se modifica algo en `/ts`):

```bash
npm install
npm run build
```

Esto ejecuta `tsc` y regenera los archivos en `/js` a partir de `tsconfig.json`.

## Checklist de requisitos cubiertos

### Layout responsive (Flexbox + Grid)
- **Grid** para estructuras de cuadrícula: `.hero-inner`, `.servicios-grid`, `.precios-grid`, `.proyectos-grid`, `.caso`, `.nosotros`, `.footer-grid`, `.confianza-list`, `.store-preview`, `.mock-grid`.
- **Flexbox** para alineación en una dimensión: header, navegación, botones, `.contacto-actions`, `.form-contacto`, `.caso-stats`.

### CSS con variables (design tokens)
Definidos en `:root` en [css/styles.css](css/styles.css):
- **Color**: `--paper`, `--ink`, `--gold`, `--teal`, `--line`, `--error`, etc. (con set alterno para modo oscuro).
- **Espaciado**: escala `--space-3xs` → `--space-7xl`, usada en `gap`, `padding` y `margin` de los bloques estructurales (header, nav, hero, grids, formulario, footer).
- **Tipografía**: `--font-display`, `--font-body`, `--font-mono`.
- **Radios**: `--radius-sm`, `--radius-md`, `--radius-lg`.

### Mobile-first con media queries
Los estilos base (sin media query) son los de móvil; se amplían progresivamente con `min-width: 640px` y `min-width: 900px` al final de `styles.css` (navegación en drawer → barra horizontal, grids de una columna → múltiples columnas, etc.).

### Accesibilidad (ARIA)
- `skip-link` para saltar al contenido principal.
- `aria-label` en logo, botones de menú/tema y enlaces con contexto ambiguo.
- `aria-hidden="true"` en elementos puramente decorativos (íconos, fondos).
- `aria-pressed` en el botón de modo oscuro/claro.
- Formulario de contacto: cada campo tiene `aria-describedby` apuntando al `id` de su mensaje de error (`nombre-error`, `email-error`, `mensaje-error`), y cada error se marca con `role="alert"` para que el lector de pantalla lo anuncie automáticamente. El estado inválido se refleja con `aria-invalid="true"` vía TypeScript.
- Contenedor de feedback del formulario con `role="status"` y `aria-live="polite"`.

### SEO técnico
- `robots.txt` con `Allow: /` y referencia al `sitemap.xml`.
- `sitemap.xml` con las 3 páginas del sitio.
- `<link rel="canonical">` en cada página.
- **Open Graph**: `og:type`, `og:url`, `og:title`, `og:description`, `og:image` (+ `og:image:alt`), `og:locale` en `index.html`, `proyectos.html` y `precios.html`.
- **Twitter Card**: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`.

> Nota: las URLs absolutas de `og:url`/`og:image` usan el dominio de ejemplo `https://www.vitrina.com` (el mismo ya usado en `sitemap.xml`/`robots.txt`), ya que el proyecto no está desplegado en un dominio real. Al publicarlo, reemplazar por la URL final.

### Formulario de contacto con validación en TypeScript
Implementado en [ts/validacion-contacto.ts](ts/validacion-contacto.ts) (compilado a `js/validacion-contacto.js`):
- **Campos requeridos**: nombre, correo y mensaje se validan como obligatorios, con validación tanto en `blur` (al salir del campo) como en `submit`.
- **Validación de formato**: correo electrónico validado contra una expresión regular (`EMAIL_REGEX`); el mensaje además exige un mínimo de 10 caracteres para evitar envíos vacíos de contenido.
- **Mensajes de error claros y accesibles**: cada error se muestra en un `<span class="form-error" role="alert">` asociado a su campo mediante `aria-describedby`, y al enviar el formulario con errores el foco se mueve automáticamente al primer campo inválido.
- El envío es simulado (no hay backend): al validar correctamente muestra un mensaje de éxito y resetea el formulario, ya que el objetivo del ejercicio es la validación en el cliente.

## Modo oscuro
Bonus no solicitado pero presente: selector de tema claro/oscuro persistido en `localStorage` ([ts/theme.ts](ts/theme.ts)), con fallback a la preferencia del sistema (`prefers-color-scheme`).
