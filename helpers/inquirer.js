const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tarea`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const pauseOpts = [
  {
    type: "input",
    name: "opcion",
    message: `presiona ${"ENTER".green} para seguir`,
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log("===========================");
  console.log("Selecciona una opcion");
  console.log("===========================");

  const { opcion } = await inquirer.prompt(menuOpts);

  return opcion;
};

const pauseMenu = async () => {
  const pause = await inquirer.prompt(pauseOpts);
  return pause;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listadoTareaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const index = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. cancelar".green,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const index = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
      checked: tarea.completadoEn ? true: false,
    }; 
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);

  return ids;
};

module.exports = {
  inquirerMenu,
  pauseMenu,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostarListadoChecklist,
};
