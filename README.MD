# APP CLIMA

App de consola hecha en Node.Js que consume una API (MAPBOX) para conocer nombre de pais, region y tomar las coordenadas para consumir otra API donde obtenemos la temperatura, temp max y temp min.

# Paquete para identificar variables de entorno

require('dotenv').config
dotenv => npm install dotenv

Si tenemos un archivo llamado ".env" este paquete lo toma o lo identifica las variables que estés definidas de esta manera "DB_USER ó "MAPBOX_TOKEN", com variables de ENTORNO en el formato String.

Bastaria con llamar a: process.env.NOMBRE_VAR
