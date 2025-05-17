pip3 install -r requirements.txt

Analizador Log

Servicios: FTP &amp; Apache

R1: Abrir archivo de log
- Analizar el archivo de log y cargar en base de datos.
o Encontrar el patrón del archivo de log y separar en campos que puedan cargar
en la base de datos
- Mostrar en pantalla el archivo log (cargar de la base de datos)

R2: Copiar una fila del archivo log

R3: Seleccionar y copiar múltiples filas del archivo log mostrado en pantalla

R4: Buscador
- Búsqueda básica (ocurrencia de una cadena)
- Búsqueda avanzada
o Rango de fechas
o Usar operadores AND / OR

R5: Alertas
- Filtrar el log por líneas que representan errores

R6: Recargar Log
- Volver a analizar el archivo de log y cargar la información en la base de datos para
tener información actualizada

R7: Reporte
- Reporte estadístico
o Investigar la información que se puede extraer del archivo de log
Apache: usar de referencia el reporte generado por la aplicación goaccess
FTP: Ej. total archivos subidos, total archivos bajados, total errores de login,
peticiones por host, etc.
