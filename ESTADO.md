# ESTADO DEL PROYECTO — nodo-web

> Última actualización: 2026-05-25

---

## Archivos en el repo (`main`)

| Archivo | Descripción |
|---|---|
| `index.html` | Landing page completa — HTML + CSS + JS en un solo fichero |
| `README.md` | Vacío (placeholder inicial del repo) |
| `ESTADO.md` | Este archivo |

**Pendiente de subir:**
- `PNG blanco.png` — logo NODO en blanco (sobre fondos oscuros). Usado en nav (efecto metallic), footer y hero fallback.
- `PNG_negro.png` — logo NODO en negro (sobre fondos blancos). Referenciado para uso futuro.

> Nota: el nombre del logo blanco tiene espacio: `PNG blanco.png` (no guión bajo). El efecto WebGL usa ese nombre exacto como `imageSrc`.

---

## Secciones del `index.html`

### 1. NAV
- Fondo negro, sticky (`position: fixed`)
- Logo: canvas WebGL2 animado (efecto Metallic Paint) que reemplaza el texto `NODO` en `#nav-logo`
- Fallback si WebGL2 no disponible o PNG no existe: texto `NODO` en Bebas Neue
- CTA derecha: `"Solicitar diagnóstico"` → enlaza a `https://tally.so` (placeholder)

### 2. HERO
- Fondo negro, `min-height: 100svh`, contenido centrado verticalmente (`justify-content: center`)
- Eyebrow: `["Ingeniería Conductual"]` en Space Grotesk 11px uppercase
- Título: `NODO` en Bebas Neue `clamp(120px, 20vw, 300px)`
- Subtítulo: "Ayudo a personas a cambiar sus hábitos y conductas para lograr su objetivo en 60 días."
- CTA: `"Solicitar diagnóstico →"` → `https://tally.so` (placeholder)
- Animación: fade-up con stagger (delay × 140ms + 100ms)

### 3. EL PROBLEMA
- Fondo blanco
- Titular: "La información / no cambia / la conducta." en Bebas Neue `clamp(56px, 9vw, 120px)`
- Grid 2×2 con bordes negros de 1px. Sin bullets.
  - Los cursos no funcionan
  - La motivación no funciona
  - El coaching genérico no funciona
  - NODO trabaja sobre conducta observable

### 4. EL PROCESO
- Fondo blanco, borde superior negro
- Eyebrow: `[ El proceso ]`
- 4 pasos en lista vertical, grid 50/50:
  - `01` Diagnóstico
  - `02` Diseño
  - `03` Intervención
  - `04` Consolidación
- Número fantasma de fondo: Bebas Neue `clamp(180px, 24vw, 280px)`, `opacity: .04`

### 5. PLANES
- Fondo negro
- Eyebrow: `[ Planes de intervención ]`
- Grid 3 columnas separadas por líneas finas `rgba(255,255,255,.16)`. Sin cajas.
  - **Plan A** — `1.197 € / mes` — Seguimiento 5 días/semana, 2 llamadas Zoom, prioridad absoluta
  - **Plan B** — `797 € / mes` — Seguimiento 3 días/semana, 1 llamada Zoom, revisión métricas
  - **Plan C** — `497 € / mes` — Seguimiento 2 días/semana, sin llamadas
- CTA por plan: `"Solicitar plaza →"` → `https://tally.so` (placeholder)

### 6. CTA FINAL
- Fondo negro
- Frase central: **"La intención / no es / conducta."** en Bebas Neue `clamp(64px, 11vw, 160px)`
- 4 condiciones de acceso en lista con borde, prefijo `—`
- CTA: `"Solicitar diagnóstico gratuito →"` → `https://tally.so` (placeholder)

### 7. FOOTER
- Fondo negro
- Logo: texto `NODO` en Bebas Neue (fallback hasta que se suba el PNG)
- Derecha: `@nodo.system` (Instagram) + `nodo.conductual@gmail.com`

---

## Decisiones de diseño

### Tipografía
| Rol | Fuente | Pesos |
|---|---|---|
| Display / títulos | **Bebas Neue** (Google Fonts) | 400 (único disponible) |
| Body / UI | **Space Grotesk** (Google Fonts) | 300, 400, 500 |

- Bebas Neue: hero, titulares de sección, nombres de plan, CTA final, pasos del proceso, números fantasma
- Space Grotesk: eyebrows, cuerpo de texto, precios, features, links, nav, footer

### Paleta
- Negro: `#000000` — único color
- Blanco: `#FFFFFF` — único color
- Sin grises, sin colores de acento, sin degradados

### Layout
- Padding horizontal base: `--pad: 48px` (desktop) / `24px` (≤880px)
- Secciones blancas: El problema, El proceso
- Secciones negras: Nav, Hero, Planes, CTA final, Footer
- Sin bordes redondeados, sin sombras, sin decoración

### Animaciones
- `[data-fade]`: `opacity 0 → 1` + `translateY(20px → 0)`, curva `cubic-bezier(.16,1,.3,1)` 0.8s
- Hero: disparo en `DOMContentLoaded` con stagger por `data-delay`
- Resto de secciones: `IntersectionObserver` con `threshold: 0.1`

### Efecto Metallic Paint (nav logo)
- **Motor:** WebGL2, canvas `1000 × dpr px`, CSS `width: 180px; height: auto`
- **Shader:** Simplex noise 2D → FBM 5 octavas → flow animado + wave + contour + fresnel rim
- **Máscara:** alpha del PNG `PNG blanco.png`; fallback: texto NODO dibujado en canvas 2D con Bebas Neue
- **Parámetros activos:** `seed:42 / scale:4 / refraction:.01 / blur:.015 / liquid:.75 / speed:.15 / brightness:2 / contrast:.6 / patternSharpness:1.8 / waveAmplitude:1 / noiseScale:.5 / distortion:1 / contour:.2 / fresnel:1`
- **Colores:** `lightColor:#ffffff / darkColor:#000000 / tintColor:#ffffff`
- **Degradación:** si WebGL2 no está disponible, permanece el texto NODO estático

---

## Cambios pendientes

### Urgente
- [ ] **Subir `PNG blanco.png`** al repo — activa el efecto metallic sobre la silueta real del logo
- [ ] **Reemplazar URLs `https://tally.so`** por los enlaces definitivos del formulario Tally (nav CTA, hero CTA, 3 CTAs de planes, CTA final)

### Opcional / mejoras futuras
- [ ] Subir `PNG_negro.png` si se necesita logo sobre fondos blancos (actualmente no se usa)
- [ ] Actualizar `README.md` con instrucciones del proyecto
- [ ] Añadir `favicon.ico` / `<link rel="icon">` en el `<head>`
- [ ] Meta OG tags (`og:title`, `og:description`, `og:image`) para compartir en redes
- [ ] Considerar sección de testimonios o resultados cuando haya casos reales
- [ ] Pausa del RAF loop de WebGL cuando `document.hidden === true` (optimización batería móvil)
