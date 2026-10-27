# La Granja · maqueta HTML responsive

Maqueta del sistema de gestión de **Fruta Congelada «La Granja»** (SENA · Análisis y Desarrollo de Software, ficha 3389056).
Corresponde al entregable C de la guía GA5-220501095-AA1 (EV04 y EV08).

**Aprendiz:** Raúl Julián Cáceres Salgado

## Cómo verla

Abre `index.html` en un navegador o visita la versión publicada en GitHub Pages. No necesita instalación ni conexión a internet.

## Pantallas

| Archivo | Pantalla | Caso de uso |
|---|---|---|
| `index.html` | 1. Iniciar sesión | CU-06 |
| `registrar-cliente.html` | 2. Registrar cliente | CU-04 |
| `registrar-cliente-errores.html` | 3. Errores de validación | CU-04 |
| `inventario.html` | 4. Inventario | CU-02 |
| `registrar-venta.html` | 5. Registrar venta | CU-04 |
| `reportes.html` | 6. Reportes | CU-05 |
| `en-construccion.html` | Página de apoyo para secciones fuera del prototipo | — |

## Tecnologías

- HTML5 semántico (`header`, `nav`, `main`, `footer`), con etiquetas en todos los campos.
- Una sola hoja de estilos (`css/estilos.css`) con enfoque *mobile first* y cortes en 768, 1024 y 1280 px.
- JavaScript mínimo (`js/app.js`): menú móvil, ver contraseña, validación simulada y detalle de venta.
- Tipografía Inter incluida en `fonts/`.

## Probada en

360 px (móvil), 768 px (tablet) y 1280 px (escritorio).
