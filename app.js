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
        const { nombre, lat, long } = datosDesc.find((l) => l.id === id);
        // Clima

        // Mostar Resultados
        if (id) {
          console.log("\nInformación de la ciudad\n".green);
          console.log("Ciudad: ", `${nombre}`.green);
          console.log("Lat: ", `${lat}`.green);
          console.log("Long; ", `${long}`.green);
        }

        //console.log("Temp: ", `${datosDesc.name}`.green);
        //console.log("Min: ", `${datosDesc.name}`.green);
        //console.log("Max: ", `${datosDesc.name}`.green);

        break;

      case 2:
        console.log("=============================".green);
        console.log("   Historial de busquedas");
        console.log("=============================\n".green);

        break;
    }
    opt !== 0 && (await pausa());
  } while (opt !== 0);
};

main();
