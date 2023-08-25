require("colors");

const mostrarMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();

    console.log("===========================");
    console.log("Selecciona una opcion");
    console.log("===========================");

    console.log(`${"1".green}. Crear una tarea`);
    console.log(`${"2".green}. Lista tareas`);
    console.log(`${"3".green}. Lista tareas completas`);
    console.log(`${"4".green}. Lista tareas pendientes`);
    console.log(`${"5".green}. Completar tarea(s)`);
    console.log(`${"6".green}. Borrar tareas`);
    console.log(`${"0".green}. Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let option = "";
    readline.question("Seleccione una opcion: ", (opt) => {
      resolve(opt);
      readline.close();
    });
  });
};

const pausa = () => {
    return new Promise((resolve, reject) => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          readline.question(`\nPresione ${"ENTER".green} para continuar`, (opt) => {
            resolve();
            readline.close();
          });
    })
  
};

module.exports = {
  pausa,
  mostrarMenu,
};
