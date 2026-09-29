# Quiz Arena

¡Bienvenido a **Quiz Arena**! Una aplicación web interactiva de preguntas y respuestas (Trivia) diseñada para poner a prueba tus conocimientos en múltiples disciplinas. Supera cada categoría sin cometer errores para alzarte con la victoria y completar la Arena.

## 🚀 Características Principales

*   **Sistema de Identificación:** Accede con tu nombre de jugador para mantener un registro personalizado de tu progreso.
*   **6 Categorías Desafiantes:**
    *   🌍 General
    *   🎵 Música
    *   🎬 Películas
    *   💻 Programación
    *   🎮 Videojuegos
    *   🏅 Deportes
*   **Gamificación y Progreso:** 
    *   Las preguntas se cargan de forma dinámica y aleatoria (shuffle) para que cada partida sea única.
    *   Feedback visual inmediato en cada respuesta (aciertos en verde, fallos en rojo).
    *   Sistema de estadísticas al final de cada ronda (precisión, aciertos, fallos).
*   **Persistencia de Datos (Local Storage):** La aplicación recuerda qué categorías has completado con éxito (Perfect) y las marca con un sello de **"✔ COMPLETADO"** en tu menú principal, permitiendo que retomes tu progreso cuando quieras.
*   **Efectos Visuales:** Disfruta de un diseño moderno y oscuro (Dark Mode nativo) con animaciones CSS fluidas y lluvia de confeti al ganar.

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido íntegramente con tecnologías web nativas, sin frameworks pesados, para garantizar un rendimiento óptimo:

*   **HTML5** (Semántico)
*   **CSS3** (Variables nativas, Flexbox, CSS Grid, Animaciones y Diseño Modular)
*   **JavaScript (ES6)** (Uso de Módulos `import/export`, manipulación del DOM, Fetch API para carga de JSON, Web Storage API).
*   **canvas-confetti**: Librería externa ligera para las animaciones de celebración.

## 📥 Cómo descargar y ejecutar en local

Dado que la aplicación utiliza **Módulos de JavaScript (ES6 Modules)**, los navegadores modernos por motivos de seguridad (CORS) bloquean su ejecución si abres el archivo `index.html` directamente haciendo doble clic (con el protocolo `file://`). 

Para ejecutar el juego correctamente, necesitas un servidor web local. Sigue estos pasos:

### 1. Clonar el repositorio
Abre tu terminal y ejecuta:
```bash
git clone https://github.com/nkaryoli/caso404.git
cd caso404
```
*(Opcionalmente, puedes descargar el ZIP desde GitHub y extraerlo).*

### 2. Levantar un servidor local

1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server** (si no la tienes).
3. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"**.


---
*Desarrollado como práctica de Entorno Cliente (2DAW).*
