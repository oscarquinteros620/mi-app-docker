const express = require("express");
const app = express();

// Leer puerto desde variable de entorno
const port = process.env.PORT || 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("🚀 Bienvenido a mi segunda app con Docker y Renderr!");
});

// Ruta de prueba
app.get("/info", (req, res) => {
  res.json({
    message: "Esta es una ruta JSON",
    timestamp: new Date()
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

