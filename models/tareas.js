const Tarea = require("./tarea");

class Tareas {
  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareas(lista = []) {
    lista.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    let tareas = this.listadoArr;
    for (let i = 0; i < tareas.length; i++) {
      console.log(
        `${String(i + 1).green}. ${tareas[i].desc} :: ${
          tareas[i].completadoEn ? "completado".green : "pendiente".red
        }`
      );
    }
  }

  listarPendienteCompletadas(completadas = true) {
    let count = 0;
    this.listadoArr.forEach((tarea) => {
      let { desc, completadoEn } = tarea;
      const statusLog = completadoEn ? "completado".green : "pendiente".red;

      if (!completadas && !completadoEn) {
        count += 1;
        console.log(`${String(count).green}. ${desc} ${statusLog}`);
      } else if (completadas && completadoEn) {
        count += 1;
        console.log(`${String(count).green}. ${desc} ${statusLog}`);
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    
    for (let idTarea in this._listado){
      const tarea = this._listado[idTarea];
      if (!ids.includes(tarea.id)){
        tarea.completadoEn = null;
      }
    }
  }
}

module.exports = Tareas;
