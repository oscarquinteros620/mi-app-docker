<!--
Portal de Transparencia Institucional - Prototipo HTML + JavaScript puro

Instrucciones:
1. Guarda este código como "index.html".
2. Ábrelo en tu navegador.

Este prototipo permite:
- Enviar y listar solicitudes de información.
- Publicar y visualizar datos abiertos.
- Mostrar resumen legal de la Ley de Acceso a la Información Pública (LAIP).

Todo se guarda temporalmente en memoria (sin backend real).
-->

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portal de Transparencia - Prototipo</title>
<style>
  body { font-family: Arial, sans-serif; margin: 0; background: #f5f5f5; }
  header { background: #0052cc; color: white; padding: 15px; }
  nav button { background: white; border: none; margin-right: 10px; padding: 8px 12px; cursor: pointer; border-radius: 5px; }
  nav button.active { background: #e6e6e6; }
  main { padding: 20px; }
  .card { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1); margin-bottom: 20px; }
  input, textarea, select { width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px; }
  button { cursor: pointer; }
  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid #ccc; padding: 8px; }
  th { background: #eee; }
</style>
</head>
<body>
<header>
  <h1>Portal de Transparencia Institucional</h1>
  <nav>
    <button id="btnSolicitudes">Solicitudes</button>
    <button id="btnDatos">Datos Abiertos</button>
    <button id="btnLegal">Legal (LAIP)</button>
  </nav>
</header>

<main id="contenido"></main>

<script>
let solicitudes = [
  { id: 1, nombre: 'María Pérez', email: 'maria@example.com', asunto: 'Presupuesto 2024', descripcion: 'Detalle del presupuesto anual.', fecha: '2025-11-01', estado: 'En revisión' }
];

let datasets = [
  { id: 1, titulo: 'Gastos 2024', descripcion: 'Gastos por departamento', filas: [['Departamento','Monto'], ['Salud','120000'], ['Educación','230000']] }
];

const cont = document.getElementById('contenido');

document.getElementById('btnSolicitudes').onclick = mostrarSolicitudes;
document.getElementById('btnDatos').onclick = mostrarDatos;
document.getElementById('btnLegal').onclick = mostrarLegal;

function mostrarSolicitudes() {
  cont.innerHTML = `
    <div class='card'>
      <h2>Enviar Solicitud de Información</h2>
      <form id='formSolicitud'>
        <input type='text' id='nombre' placeholder='Nombre' required>
        <input type='email' id='email' placeholder='Email' required>
        <input type='text' id='asunto' placeholder='Asunto' required>
        <textarea id='descripcion' placeholder='Descripción'></textarea>
        <button type='submit'>Enviar</button>
      </form>
    </div>
    <div class='card'>
      <h2>Solicitudes Recibidas</h2>
      <table><tr><th>Nombre</th><th>Asunto</th><th>Fecha</th><th>Estado</th></tr>
        ${solicitudes.map(s => `<tr><td>${s.nombre}</td><td>${s.asunto}</td><td>${s.fecha}</td><td>${s.estado}</td></tr>`).join('')}
      </table>
    </div>`;

  document.getElementById('formSolicitud').onsubmit = e => {
    e.preventDefault();
    const nueva = {
      id: solicitudes.length + 1,
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      asunto: document.getElementById('asunto').value,
      descripcion: document.getElementById('descripcion').value,
      fecha: new Date().toISOString().slice(0,10),
      estado: 'Recibida'
    };
    solicitudes.unshift(nueva);
    alert('Solicitud enviada');
    mostrarSolicitudes();
  };
}

function mostrarDatos() {
  cont.innerHTML = `
    <div class='card'>
      <h2>Publicar Datos Abiertos</h2>
      <form id='formDataset'>
        <input type='text' id='titulo' placeholder='Título del dataset' required>
        <input type='text' id='descripcion' placeholder='Descripción'>
        <button type='submit'>Publicar</button>
      </form>
    </div>
    <div class='card'>
      <h2>Datasets Publicados</h2>
      <ul>${datasets.map(d => `<li><b>${d.titulo}</b>: ${d.descripcion} <button onclick='verDataset(${d.id})'>Ver</button></li>`).join('')}</ul>
      <div id='preview'></div>
    </div>`;

  document.getElementById('formDataset').onsubmit = e => {
    e.preventDefault();
    const nuevo = {
      id: datasets.length + 1,
      titulo: document.getElementById('titulo').value,
      descripcion: document.getElementById('descripcion').value,
      filas: [['Col1','Col2'],['Ejemplo1','123'],['Ejemplo2','456']]
    };
    datasets.unshift(nuevo);
    alert('Dataset agregado');
    mostrarDatos();
  };
}

function verDataset(id) {
  const d = datasets.find(x => x.id === id);
  let tabla = '<table>';
  d.filas.forEach((fila,i) => {
    tabla += `<tr>${fila.map(c => `<td${i===0? ' style=\'font-weight:bold;background:#eee\'' : ''}>${c}</td>`).join('')}</tr>`;
  });
  tabla += '</table>';
  document.getElementById('preview').innerHTML = `<h3>Vista previa: ${d.titulo}</h3>${tabla}`;
}

function mostrarLegal() {
  cont.innerHTML = `
    <div class='card'>
      <h2>Ley de Acceso a la Información Pública (LAIP) - Resumen</h2>
      <p>La LAIP garantiza el derecho ciudadano a acceder a la información pública. Las instituciones deben publicar información proactiva y responder solicitudes dentro de los plazos legales.</p>
      <h3>Obligaciones</h3>
      <ul>
        <li>Publicar presupuesto, contrataciones, auditorías, estructura institucional, etc.</li>
        <li>Atender solicitudes en un plazo máximo de 15 días hábiles.</li>
        <li>Designar una unidad de acceso a la información.</li>
      </ul>
      <h3>Sanciones por incumplimiento</h3>
      <ul>
        <li>Amonestaciones y multas administrativas.</li>
        <li>Obligación de publicar la información omitida.</li>
        <li>Responsabilidad disciplinaria en casos graves.</li>
      </ul>
      <p style='font-size:small;color:gray;'>*Este texto es orientativo para fines educativos.</p>
    </div>`;
}

// Vista inicial
mostrarSolicitudes();
</script>
</body>
</html>
