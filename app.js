const {
  leerInput,
  menuInquirer,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt = 0;
  const busqueda = new Busquedas();

  do {
    opt = await menuInquirer();
    switch (opt) {
      case 1:
        // Mostar mensaje
        console.clear();
        console.log("=============================".green);
        console.log("        Buscar ciudad        ");
        console.log("=============================\n".green);

        // Buscar Lugares
        const buscar = await leerInput("Ciudad:");
        const datosDesc = await busqueda.ciudad(buscar);

        // Seleccionar el lugar, se llama el id
        const id = await listarLugares(datosDesc);
        if (id === "0") continue;

        const { nombre, lat, long } = datosDesc.find((l) => l.id === id);

        // Guardar historial
        busqueda.addHistory(nombre);

        const temps = await busqueda.tempCiudad(lat, long);

        const { temp, temp_min, temp_max } = temps.data.main;
        const { description } = temps.data.weather[0];
        // Clima

        // Mostar Resultados
        if (id) {
          console.clear();
          console.log("=============================".green);
          console.log("  Información de la ciudad   ".green);
          console.log("=============================\n".green);
          console.log("Ciudad: ", `${nombre}`.green);
          console.log("Lat: ", `${lat}`.green);
          console.log("Long; ", `${long}`.green);
          console.log("Temp: ", `${temp} °C`.green);
          console.log("Temp Minima: ", `${temp_min} °C`.green);
          console.log("Temp Maxima: ", `${temp_max} °C`.green);
          console.log("Comentario: ", `${description}`.green);
        }

        break;

      case 2:
        console.log("=============================".green);
        console.log("   Historial de busquedas");
        console.log("=============================\n".green);

        busqueda.CapitalizarHistorial.map((i, ix) => {
          console.log(`${ix + 1}. ${i}`);
        });

        break;
    }
    opt !== 0 && (await pausa());
  } while (opt !== 0);
};

main();
