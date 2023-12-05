// Importamos los módulos necesarios
const readline = require('readline');
const chalk = require('chalk');

// Creamos una interfaz de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creamos una variable para guardar las tareas
let tasks = [];

// Creamos una función para añadir una tarea
function addTask(description) {
  // Creamos un objeto con la información de la tarea
  let task = {
    id: tasks.length + 1, // El id es el número de elementos en el arreglo más uno
    description: description, // El description es el valor que recibe la función
    completed: false // El completed es un valor booleano que indica si la tarea está completada o no
  };
  // Añadimos la tarea al arreglo
  tasks.push(task);
  // Mostramos un mensaje de éxito
  console.log(`Se ha añadido la tarea: ${task.description}`);
}

// Creamos una función para eliminar una tarea
function removeTask(id) {
  // Buscamos el índice de la tarea con el id que recibe la función
  let index = tasks.findIndex(task => task.id === id);
  // Si el índice es válido, eliminamos la tarea del arreglo
  if (index !== -1) {
    // Guardamos la tarea eliminada en una variable
    let task = tasks[index];
    // Eliminamos la tarea del arreglo
    tasks.splice(index, 1);
    // Mostramos un mensaje de éxito
    console.log(`Se ha eliminado la tarea: ${task.description}`);
  } else {
    // Si el índice no es válido, mostramos un mensaje de error
    console.log(`No se ha encontrado la tarea con el id: ${id}`);
  }
}

// Creamos una función para completar una tarea
function completeTask(id) {
  // Buscamos el índice de la tarea con el id que recibe la función
  let index = tasks.findIndex(task => task.id === id);
  // Si el índice es válido, cambiamos el valor de completed a true
  if (index !== -1) {
    // Cambiamos el valor de completed a true
    tasks[index].completed = true;
    // Mostramos un mensaje de éxito
    console.log(`Se ha completado la tarea: ${tasks[index].description}`);
  } else {
    // Si el índice no es válido, mostramos un mensaje de error
    console.log(`No se ha encontrado la tarea con el id: ${id}`);
  }
}

// Creamos una función para mostrar las tareas
function showTasks() {
  // Recorremos el arreglo de tareas
  for (let task of tasks) {
    // Creamos una variable para guardar el símbolo de la tarea
    let symbol;
    // Creamos una variable para guardar el color de la tarea
    let color;
    // Si la tarea está completada, usamos el símbolo ✔ y el color verde
    if (task.completed) {
      symbol = '✔';
      color = chalk.green;
    } else {
      // Si la tarea está pendiente, usamos el símbolo ✘ y el color rojo
      symbol = '✘';
      color = chalk.red;
    }
    // Mostramos la tarea por consola con el formato [id] - description
    console.log(color(`[${task.id}] - ${task.description} ${symbol}`));
  }
}

// Creamos una función para preguntar la opción al usuario
function askOption() {
  // Preguntamos al usuario qué opción quiere ejecutar
  rl.question('¿Qué opción quieres ejecutar? (Añadir, Eliminar, Completar, Mostrar, Salir) ', option => {
    // Convertimos la opción a minúsculas para facilitar la comparación
    option = option.toLowerCase();
    // Evaluamos la opción elegida
    switch (option) {
      // Si la opción es añadir, preguntamos la descripción de la tarea y llamamos a la función addTask
      case 'añadir':
        rl.question('¿Qué tarea quieres añadir? ', description => {
          addTask(description);
          // Volvemos a preguntar la opción
          askOption();
        });
        break;
      // Si la opción es eliminar, preguntamos el id de la tarea y llamamos a la función removeTask
      case 'eliminar':
        rl.question('¿Qué tarea quieres eliminar? (Escribe el id) ', id => {
          // Convertimos el id a número
          id = Number(id);
          removeTask(id);
          // Volvemos a preguntar la opción
          askOption();
        });
        break;
      // Si la opción es completar, preguntamos el id de la tarea y llamamos a la función completeTask
      case 'completar':
        rl.question('¿Qué tarea quieres completar? (Escribe el id) ', id => {
          // Convertimos el id a número
          id = Number(id);
          completeTask(id);
          // Volvemos a preguntar la opción
          askOption();
        });
        break;
      // Si la opción es mostrar, llamamos a la función showTasks y volvemos a preguntar la opción
      case 'mostrar':
        showTasks();
        askOption();
        break;
      // Si la opción es salir, terminamos el programa
      case 'salir':
        console.log('Adiós');
        rl.close();
        break;
      // Si la opción no es válida, mostramos un mensaje de error y volvemos a preguntar la opción
      default:
        console.log('Opción no válida');
        askOption();
        break;
    }
  });
}

// Llamamos a la función askOption para iniciar el programa
askOption();

