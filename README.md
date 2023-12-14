# User-Agent Randomizer
Un script de Tampermonkey para cambiar el User-Agent de forma aleatoria en sitios web.

## Descripción del Proyecto

Este proyecto es un script de Tampermonkey diseñado para cambiar el User-Agent de manera aleatoria en sitios web. Esto puede ser útil para probar la compatibilidad de sitios con diferentes navegadores o sistemas operativos.

## Características

- **Cambio Aleatorio:** Cambia el User-Agent de forma aleatoria en cada solicitud.
- **Configuración Manual:** Permite configurar manualmente el User-Agent seleccionando de una lista.
- **Visualización Actual:** Muestra el User-Agent actual antes de cambiarlo.

## Funciones

### Cambio Aleatorio de User-Agent

- `getRandomUserAgent()`: Obtiene un User-Agent aleatorio de listas predefinidas.

### Configuración Manual

- `configureRandomUserAgent()`: Muestra una lista de próximos User-Agents y permite seleccionar uno.

### Visualización del User-Agent Actual

- `showCurrentAgent()`: Muestra el User-Agent actual.

## Requisitos

- [Tampermonkey](https://www.tampermonkey.net/) instalado en tu navegador.

## Instrucciones de Uso

1. Asegúrate de tener [Tampermonkey](https://www.tampermonkey.net/) instalado en tu navegador.

2. Haz clic para instalar el script automáticamente.

   [![Instalar con Tampermonkey](https://img.shields.io/badge/Instalar%20con-Tampermonkey-1abc9c.svg)](javascript:void((function(){var a=document.createElement('script');a.type='text/javascript';a.src='https://raw.githubusercontent.com/SaturnX-Dev/User-Agent-Randomizer/main/User-Agent-Randomizer.js';document.getElementsByTagName('head')[0].appendChild(a);}())))

4. Puedes configurar el User-Agent seleccionando la opción "Configurar User Agent (Aleatorio)" en el menú de Tampermonkey.

5. Disfruta de cambiar aleatoriamente tu User-Agent en sitios web.





## Contribuciones

Si deseas contribuir a este proyecto, siéntete libre de abrir un problema o enviar una solicitud de extracción. Estamos abiertos a mejoras y correcciones de errores.

## Autor

SaturnX-Dev

## Licencia

Este proyecto está bajo la Licencia [Licencia Pública General de GNU (GPL)]. Puedes consultar el archivo LICENSE para obtener más detalles.
