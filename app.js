const { leerInput, menuInquirer, pausa } = require("./helpers/inquirer");
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
        const lugar = await leerInput("Ciudad:");
        const { data } = await busqueda.ciudad(lugar);
        console.log(data.features);
        // Seleccional el lugar

        // Clima

        // Mostar Resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ", `${lugar}`.red);
        console.log("Lat: ");
        console.log("Long; ");
        console.log("Temp: ");
        console.log("Min: ");
        console.log("Max: ");

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
