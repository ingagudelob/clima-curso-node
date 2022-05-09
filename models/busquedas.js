const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

// const urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${long}}&appid={${process.env.OPENWEATHER_KEY}}`;
class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    //TODO: leer DB si existe
    this.leerBd();
  }

  get CapitalizarHistorial() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" "); // split corta
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));
      return palabras.join(" "); // join une
    });
  }

  get getParams() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get getParamsTemp() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  // Peticion Http; es asincrona
  async ciudad(lugar = "") {
    try {
      //const dataCiudad = await axios.get(urlApi);
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.getParams,
      });

      // LLamar la instancia
      const dataCiudad = await instance.get();
      const datosDesc = dataCiudad.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lat: lugar.center[1],
        long: lugar.center[0],
      }));

      return datosDesc; //Retornar un array de los lugares que coincidan con el lugar solicitado
    } catch (error) {
      console.log(error);
    }
  }

  async tempCiudad(lat = "", long = "") {
    try {
      const dataTemp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.OPENWEATHER_KEY}&units=metric&lang=es`
      );
      return dataTemp;
    } catch (error) {
      console.log(error.code);
    }
  }

  addHistory(lugar = "") {
    // TODO: Prevenir duplicados

    if (this.historial.includes(lugar.toLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0, 4);
    // El metodo splice(muestra el array desde la posicion 0 hasta la 4)

    this.historial.unshift(lugar.toLocaleLowerCase());
    this.guardarDb(); //unshift añade al inicio del array

    // Grabar en archivo de txt
  }

  guardarDb() {
    // Por su hya mas propiedades por grabar
    const pathHist = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(pathHist));
  }

  leerBd() {
    if (!fs.existsSync(this.dbPath)) {
      return;
    }

    const info = fs.readFileSync(this.dbPath, {
      encoding: "utf-8",
    });

    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}

module.exports = Busquedas;
