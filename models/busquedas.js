const axios = require("axios");
require("dotenv").config();

const urlOpenWeather =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
class Busquedas {
  historial = ["Bogotá", "Madrid", "Miami"];

  constructor() {
    //TODO: leer DB si existe
  }

  get getParams() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
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
}

module.exports = Busquedas;
