const express = require("express"); //creando un servidor con la yauda de un framework express ~~~tailwind
// el path es para escribir todo el codigo en el browser en el navegador
const path = require("path"); // me trae la ruta del servidor donde esta el todo.json 
const fs = require("fs/promises");
const app = express(); // app backend para aplicativos moviles, respuesta con el framework express 
//llamando al json:
app.use(express.json()); //atiendo las peticiones get path, delete y post, solo cuando estoy registrado, te valida token y formularios (como en el banco)
const jsonPath = path.resolve("./file/todo.json"); // me rutea el todo

//obtener funcion asincrona:
app.get('/tasks', async (req, res) => {
  const jsonFile = await fs.readFile(jsonPath, 'utf-8'); //leer en el lenguaje del browser o del navegador
  res.send(jsonFile);
});

app.post('/tasks', async (req, res) => { //para postear en redes, lo que se pide y lo que se da
  const jsonPost = req.body //lo que se pide en el body,
  const arrayToodos = JSON.parse(await fs.readFile(jsonPath, 'utf-8')); //porque await? funcion asyncrona:para detener y que pueda leer, cuando node va tardar en realizar una tarea la delega aun hilo en el sistema, await, que termine de leerlo me lo devuelva , es un formato que lee del navegador
  console.log(arrayToodos);
  // dandole un id
  const id = arrayToodos.length + 1; // codigo dieguito mazamorra: arrayToodos[arrayToodos.length - 1].id + 1 
  arrayToodos.push({ id, ...jsonPost }) // desestructuracion de array
  await fs.writeFile(jsonPath, JSON.stringify(arrayToodos)) // node se va tardar , cuando lo resuevas dame el archivo
  console.log(jsonPost);
  res.send('se logro postear con exito')
})

app.put('/tasks', async (req, res) => { // el put es para modificar , le agrega un endpoint a la api
  // const { status, id } = req.body // destructurando todo el array para conseguir el status y id, en el cliente
  // const jsonPut = JSON.parse(await fs.readFile(jsonPath, 'utf-8'))
  // const putId = jsonPut.findIndex((toodos) => toodos.id === id)
  // if (putId >= 0) {
  //   jsonPut[putId].status = status
  // }
  // await fs.writeFile(jsonPath, JSON.stringify(jsonPut))
  // res.send('se logro modificar con exito')
  const task = req.body;
  const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
  const taskEdited = taskArray.map((e) => {
    if (e.id === task.id) {
      e = task
    }
    return e
  })
  await fs.writeFile(jsonPath, JSON.stringify(taskEdited));
  res.send('se logro modificar con exito');
})

app.delete('/tasKs', async (req, res) => { // req y res es toma que te doy
  const deletejson = JSON.parse(await fs.readFile(jsonPath, 'utf-8')) // ya esta en formato json , lo convierte en formato javascript
  const { id } = req.body
  const deleteId = deletejson.findIndex((toodos) => toodos.id === id)
  if (deleteId >= 0) {
    deletejson.splice(deleteId, 1)
  }
  await fs.writeFile(jsonPath, JSON.stringify(deletejson)) // lo convierte a formato json y lo escribe y lo junta
  res.send('se logro eliminar el id correctamente')
})
//other-solutions:
// const task = req.body;
// const tasksArray = JSON.parse(await fs.readFile(jsonPath, 'utf-8'))
// const tasksFiltered = tasksArray.filter((el) => {
// return el.id !== task.id
// })
// await fs.writeFile(jsonPath, JSON.stringify(tasksFiltered))
// res.end();

const PORT = 8000;
app.listen(PORT, () => { console.log(`servidor escuchando en el puerto ${PORT}`) });