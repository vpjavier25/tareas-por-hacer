require("colors");
const {
  inquirerMenu,
  pauseMenu,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const { guardarArchivo, leerDB } = require("./helpers/guardarArchivo");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarPendienteCompletadas();
        break;

      case "4":
        tareas.listarPendienteCompletadas(false);
        break;

      case "5":
        const ids = await mostarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        const id = await listadoTareaBorrar(tareas.listadoArr);
        
        if (id === '0') break;
        
        const ok = await confirmar("estas seguro ?");
        
        if (ok) {
          tareas.borrarTarea(id);
          console.log("tarea borrada");
        }

        break;

      default:
        break;
    }

    guardarArchivo(tareas.listadoArr);

    await pauseMenu();
  } while (opt !== "0");
};

main();
