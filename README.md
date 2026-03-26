# X-API n8n Documentation

Proyecto React para documentación interactiva sobre la integración de la API de X (Twitter) con n8n bajo el modelo Pay-Per-Use implementado en 2026.

## Características

- **Interfaz moderna** con diseño oscuro y navegación intuitiva
- **Calculadora interactiva** para modelar escenarios de costos
- **Documentación estructurada** sobre la API de X y su integración con n8n
- **Diseño responsive** para desktop y móvil
- **Animaciones suaves** y transiciones elegantes

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## Construcción para Producción

```bash
npm run build
```

## Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Tailwind CSS** - Framework de estilos (configurado automáticamente)
- **Lucide React** - Iconos modernos
- **Create React App** - Configuración del proyecto

## Estructura del Proyecto

```
src/
├── App.js          # Componente principal con toda la lógica
├── index.js        # Punto de entrada
└── index.css       # Estilos globales y Tailwind
```

## Secciones de Documentación

1. Evolución del Paradigma API
2. Consola del Desarrollador
3. Costo por Tweet (Escrituras)
4. Economía de Lecturas
5. Operation Kill the Bots
6. Resumen de Costos (Tabla)
9. Sinergias xAI (Cashback)
11. Mitigación: Caché y Bases de Datos
13. Manejo de Errores y Fugas
14. Modelado y Simulador (Calculadora Interactiva)

## Nota sobre Tailwind CSS

Los warnings sobre `@tailwind` son normales en desarrollo. Tailwind CSS se instalará automáticamente cuando ejecutes `npm install` gracias a la configuración de Create React App.
