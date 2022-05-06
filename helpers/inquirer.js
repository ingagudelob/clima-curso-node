const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea realizar?",
    choices: [
      { value: 1, name: `${"1.".green} Buscar ciudad` },
      { value: 2, name: `${"2.".green} Historial de busqueda` },
      { value: 0, name: `${"0.".green} Salir` },
    ],
  },
];

const menuInquirer = async () => {
  console.clear();
  console.log("=============================".green);
  console.log("    Seleccione una opción    ");
  console.log("=============================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  console.log("\n");
  const { opc } = await inquirer.prompt([
    {
      type: "input",
      name: "opc",
      message: `Presione ${"ENTER".green} para continuar\n`,
    },
  ]);
};

const leerInput = async (mensaje) => {
  const questionInput = [
    {
      type: "input",
      name: "desc",
      message: mensaje,
      validate(value) {
        if (value.length === 0) {
          return "¡ERROR! Debes ingresar un lugar";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(questionInput);
  return desc;
};

const listarLugares = async (lugares = []) => {
  // preguntas para eliminar una tarea, afectando el choices
  const choices = lugares.map((lugar, i) => {
    const index = `${i + 1}.`.green;

    return {
      value: lugar.id,
      name: `${index} ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0".green + " Cancelar",
  });

  const preguntasListar = [
    {
      type: "list",
      name: "lugar",
      message: "Decripción",
      choices,
    },
  ];
  const { lugar } = await inquirer.prompt(preguntasListar);
  return lugar;
};

module.exports = {
  menuInquirer,
  pausa,
  leerInput,
  listarLugares,
};
