// Requiriendo el módulo 'express', 'cors' y 'body-parser'
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Requiriendo la conexión a BD gestor (MySQL)
const connection = require("./configBD");

// Creando una nueva aplicación Express.
const app = express();
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use("/public", express.static(path.join(__dirname, "public")));

// Establecer EJS como el Motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Definiendo mi ruta Home
app.get("/", (req, res) => {
  res.render("inicio", {
    rutaActual: "/",
  });
});

// Ruta para mostrar el formulario
app.get("/form-estudiante", (req, res) => {
  res.render("pages/form", {
    rutaActual: "/form-estudiante",
  });
});

// Procesando formulario
app.post("/procesar-formulario", async (req, res) => {
  console.log(req.body);

  // Verificar campos vacíos
  for (const campo in req.body) {
    if (!req.body[campo]) {
      res.send(`Error: El campo ${campo} está vacío.`);
      return;
    }
  }

  const {
    nombre_alumno,
    email_alumno,
    curso_alumno,
    num_calificacion,
    num_cedula,
    numero_telefono,
    descripcion_at,
    edad_pr,
    genero_pr,
    poblacion_pr,
    zona_pr,
    tipo
  } = req.body;

  try {
    const query = `
      INSERT INTO estudiantes 
      (nombre_alumno, email_alumno, curso_alumno, num_calificacion, num_cedula, numero_telefono, descripcion_at, edad_pr, genero_pr, poblacion_pr, zona_pr, tipo, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await connection.execute(query, [
      nombre_alumno,
      email_alumno,
      curso_alumno,
      num_calificacion,
      num_cedula,
      numero_telefono,
      descripcion_at,
      edad_pr,
      genero_pr,
      poblacion_pr,
      zona_pr,
      tipo,
      new Date(),
    ]);

    res.render("inicio", {
      rutaActual: "/",
    });
  } catch (error) {
    console.error("Error al insertar en la base de datos: ", error);
    res.send("Error al procesar el formulario");
  }
});

// Insert segunda forma
app.post("/procesar-formulario2", (req, res) => {
  console.log(req.body);

  const {
    nombre_alumno,
    email_alumno,
    curso_alumno,
    num_calificacion,
    num_cedula,
    numero_telefono,
    descripcion_at,
    edad_pr,
    genero_pr,
    poblacion_pr,
    zona_pr,
    tipo
  } = req.body;

  try {
    const query = `
      INSERT INTO estudiantes 
      (nombre_alumno, email_alumno, curso_alumno, num_calificacion, num_cedula, numero_telefono, descripcion_at, edad_pr, genero_pr, poblacion_pr, zona_pr, tipo, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      query,
      [
        nombre_alumno,
        email_alumno,
        curso_alumno,
        num_calificacion,
        num_cedula,
        numero_telefono,
        descripcion_at,
        edad_pr,
        genero_pr,
        poblacion_pr,
        zona_pr,
        tipo,
        new Date(),
      ],
      (error, result) => {
        if (error) {
          console.error("Error al insertar en la base de datos: ", error);
          res.send("Error al procesar el formulario");
          return;
        }

        if (result && result.affectedRows > 0) {
          res.send("¡Formulario procesado correctamente!");
        } else {
          res.send("Error al procesar el formulario");
        }
      }
    );
  } catch (error) {
    console.error("Error al insertar en la base de datos: ", error);
    res.send("Error al procesar el formulario");
  }
});

// Iniciar el servidor con Express
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
