# User-Agent-Youtube
Un script de Tampermonkey para cambiar el user agent de youtube 

## Descripción del Proyecto

Este proyecto es un script de gestión de archivos y carpetas que automatiza tareas comunes, como la limpieza de nombres, el renombrado y la organización de archivos y carpetas en un directorio específico. El objetivo principal es mantener la estructura de archivos ordenada y asegurarse de que los nombres de carpetas y archivos sean coherentes.

## Características

- **Limpieza de Nombres:** El script elimina caracteres no deseados y palabras específicas de los nombres de carpetas y archivos, manteniendo únicamente caracteres alfanuméricos y acentos.

- **Renombrado Automático:** Puede renombrar carpetas y archivos de acuerdo con reglas específicas, como reemplazar guiones bajos con espacios, eliminar caracteres no deseados y más.

- **Organización de Carpetas:** Mueve archivos desde una carpeta de origen (por ejemplo, "Y:\\Archives") a carpetas de destino en función de su nombre o similitud con carpetas existentes.

- **Combinación de Carpetas:** Combina carpetas similares o con nombres incorrectos en una única carpeta para mantener una estructura organizada.

## Funciones

### Limpieza y Renombrado de Nombres

- `limpiar_nombre(nombre, expresion_regular)`: Limpia el nombre de una carpeta o archivo eliminando caracteres no deseados y duplicados.

- `renombrar(nombre, transformaciones)`: Renombra una carpeta o archivo aplicando transformaciones personalizadas, como eliminar espacios dobles o caracteres específicos.

- `renombrar_carpetas_en_ubicacion(ubicacion)`: Renombra carpetas en una ubicación específica según las reglas de limpieza y renombrado.

- `renombrar_archivos_en_ubicacion(ubicacion)`: Renombra archivos en una ubicación específica según las reglas de limpieza y renombrado.

### Organización de Carpetas

- `mover_archivo(archivo, carpeta_origen, carpeta_destino)`: Mueve un archivo de una ubicación de origen a una ubicación de destino.

- `renombrar_y_combinar_por_caracteres(carpeta_principal, caracter)`: Combina carpetas con un carácter específico en su nombre y renombra según las reglas de limpieza.

### Combinación de Carpetas

- `es_similar(nombre1, nombre2, umbral)`: Verifica si dos nombres de carpetas son similares según un umbral de similitud.

- `combinar_carpetas(carpeta_principal)`: Combina carpetas con nombres duplicados o similares en una ubicación principal.

- `combinar_carpetas_similares(carpeta_principal, umbral_similitud)`: Combina carpetas similares en una ubicación principal según el umbral de similitud especificado.

## Requisitos

- Python 3.x
- Módulos de Python: os, unicodedata, re, shutil, difflib, tqdm

## Instrucciones de Uso

1. Clona o descarga este repositorio en tu máquina local.

2. Asegúrate de tener Python 3.x instalado en tu sistema.

3. Instala los módulos de Python requeridos. Puedes hacerlo utilizando el siguiente comando:

4. Ejecuta el script `gestor_de_archivos.py`. Puedes hacerlo desde la línea de comandos con el siguiente comando: `python gestor_de_archivos.py`

5. El script realizará automáticamente las tareas de limpieza, renombrado, organización y combinación de carpetas y archivos en el directorio especificado.

## Personalización

Puedes personalizar el comportamiento del script modificando las funciones dentro del archivo `gestor_de_archivos.py`. Asegúrate de revisar el código y las funciones antes de realizar cambios significativos.

## Contribuciones

Si deseas contribuir a este proyecto, siéntete libre de abrir un problema o enviar una solicitud de extracción. Estamos abiertos a mejoras y correcciones de errores.

## Autor

SaturnX-Dev

## Licencia

Este proyecto está bajo la Licencia [Licencia Pública General Simplificada (GPLS)]. Puedes consultar el archivo LICENSE para obtener más detalles.
