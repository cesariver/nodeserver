const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tareas = [];

function agregarTarea(indicador, descripcion, completada = false) {
  tareas.push({ indicador, descripcion, completada });
}

function eliminarTarea(indice) {
  tareas.splice(indice, 1);
}

function marcarTareaCompletada(indice) {
  tareas[indice].completada = true;
}

function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach((tarea, indice) => {
    console.log(`${indice + 1}. [${tarea.completada ? 'X' : ' '}] ${tarea.indicador}: ${tarea.descripcion}`);
  });
}

rl.question('¿Qué función quieres ejecutar? ', (answer) => {
  switch (answer) {
    case 'agregar':
      rl.question('Indicador: ', (indicador) => {
        rl.question('Descripción: ', (descripcion) => {
          agregarTarea(indicador, descripcion);
          console.log('Tarea agregada');
          rl.close();
        });
      });
      break;
    case 'eliminar':
      rl.question('Índice de la tarea a eliminar: ', (indice) => {
        eliminarTarea(indice - 1);
        console.log('Tarea eliminada');
        rl.close();
      });
      break;
    case 'completar':
      rl.question('Índice de la tarea a marcar como completada: ', (indice) => {
        marcarTareaCompletada(indice - 1);
        console.log('Tarea marcada como completada');
        rl.close();
      });
      break;
    case 'mostrar':
      mostrarTareas();
      rl.close();
      break;
    default:
      console.log('Función no válida');
      rl.close();
      break;
  }
});
