// URL base de la API
const API_URL = 'https://jsonplaceholder.typicode.com';

// Referencias a elementos del DOM
const btnGet = document.getElementById('btnGet');
const btnPost = document.getElementById('btnPost');
const btnPut = document.getElementById('btnPut');
const btnDelete = document.getElementById('btnDelete');
const resultadoDiv = document.getElementById('resultado');
const consoleLogDiv = document.getElementById('consoleLog');
const resourceIdInput = document.getElementById('resourceId');

// Función para agregar logs a la consola visual
function addConsoleLog(message) {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  logEntry.innerHTML = `<span class="log-time">[${timestamp}]</span> ${message}`;
  
  // Si es el primer log, eliminar el empty-state
  const emptyState = consoleLogDiv.querySelector('.empty-state');
  if (emptyState) {
    consoleLogDiv.innerHTML = '';
  }
  
  consoleLogDiv.insertBefore(logEntry, consoleLogDiv.firstChild);
  
  // También registrar en la consola del navegador
  console.log(`[${timestamp}] ${message}`);
}

// Función para formatear JSON de manera legible
function formatJSON(data) {
  return JSON.stringify(data, null, 2);
}

// Función para obtener el ID del recurso del input
function getResourceId() {
  const id = resourceIdInput.value.trim();
  return id ? parseInt(id) : 1;
}

// Función genérica para realizar peticiones HTTP
async function realizarPeticion(metodo, endpoint, body = null) {
  const startTime = performance.now();
  
  // Configurar opciones de la petición
  const options = {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  
  // Agregar body si existe
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const url = `${API_URL}${endpoint}`;
  
  // Registrar en consola
  addConsoleLog(`🚀 Iniciando petición ${metodo} a ${url}`);
  console.log('Request Headers:', options.headers);
  
  try {
    // Realizar la petición
    const response = await fetch(url, options);
    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2);
    
    // Obtener datos de la respuesta
    const data = await response.json();
    
    // Registrar información en consola
    addConsoleLog(`✅ Petición completada - Código: ${response.status} - Tiempo: ${responseTime}ms`);
    console.log('Response Status:', response.status);
    
    // Convertir headers a objeto para análisis
    const headersObj = Object.fromEntries([...response.headers]);
    console.log('Response Headers:', headersObj);
    console.log('Response Data:', data);
    
    // Información sobre CORS - Verificar varios headers relacionados
    let corsInfo = response.headers.get('access-control-allow-origin') || 
                   response.headers.get('Access-Control-Allow-Origin');
    
    // Si la petición funcionó sin errores CORS, es porque CORS está permitido
    if (!corsInfo) {
      // JSONPlaceholder permite CORS pero algunos navegadores no exponen todos los headers
      corsInfo = '✓ CORS Permitido (Petición exitosa sin errores)';
    } else if (corsInfo === '*') {
      corsInfo = '* (Todos los orígenes permitidos)';
    }
    
    addConsoleLog(`🔒 CORS Policy: ${corsInfo}`);
    
    // Obtener headers adicionales de CORS si existen
    const corsHeaders = {
      'allow-origin': corsInfo,
      'allow-credentials': response.headers.get('access-control-allow-credentials') || 'N/A',
      'allow-methods': response.headers.get('access-control-allow-methods') || 'N/A',
      'allow-headers': response.headers.get('access-control-allow-headers') || 'N/A'
    };
    console.log('CORS Headers:', corsHeaders);
    
    // Mostrar resultado en la interfaz
    mostrarResultado({
      metodo,
      url,
      status: response.status,
      statusText: response.statusText,
      responseTime,
      corsInfo,
      data,
      headers: headersObj
    });
    
    return { success: true, data, response };
    
  } catch (error) {
    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2);
    
    // Registrar error en consola
    addConsoleLog(`❌ Error en petición ${metodo}: ${error.message}`);
    console.error('Error:', error);
    
    // Mostrar error en la interfaz
    mostrarError({
      metodo,
      url,
      responseTime,
      error: error.message
    });
    
    return { success: false, error };
  }
}

// Función para mostrar los resultados en la interfaz
function mostrarResultado(info) {
  // Eliminar empty-state si existe
  const emptyState = resultadoDiv.querySelector('.empty-state');
  if (emptyState) {
    resultadoDiv.innerHTML = '';
  }
  
  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  
  const statusClass = `status-${info.status}`;
  
  resultCard.innerHTML = `
    <h3>Respuesta de Petición ${info.metodo}</h3>
    <div class="result-info">
      <div class="info-item">
        <span class="info-label">URL</span>
        <span class="info-value">${info.url}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Método</span>
        <span class="info-value">${info.metodo}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Código de Estado</span>
        <span class="info-value ${statusClass}">${info.status} ${info.statusText}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tiempo de Respuesta</span>
        <span class="info-value">${info.responseTime} ms</span>
      </div>
      <div class="info-item">
        <span class="info-label">CORS Policy</span>
        <span class="info-value">${info.corsInfo}</span>
      </div>
    </div>
    
    <div class="info-item mb-2">
      <span class="info-label">Response Headers (principales)</span>
      <div class="result-data">
        <pre>${formatJSON({
          'content-type': info.headers['content-type'] || 'N/A',
          'access-control-allow-origin': info.headers['access-control-allow-origin'] || 'N/A',
          'cache-control': info.headers['cache-control'] || 'N/A',
          'server': info.headers['server'] || 'N/A'
        })}</pre>
      </div>
    </div>
    
    <div class="info-item">
      <span class="info-label">Datos de Respuesta</span>
      <div class="result-data">
        <pre>${formatJSON(info.data)}</pre>
      </div>
    </div>
  `;
  
  resultadoDiv.insertBefore(resultCard, resultadoDiv.firstChild);
}

// Función para mostrar errores
function mostrarError(info) {
  const emptyState = resultadoDiv.querySelector('.empty-state');
  if (emptyState) {
    resultadoDiv.innerHTML = '';
  }
  
  const errorCard = document.createElement('div');
  errorCard.className = 'result-card';
  errorCard.style.borderLeft = '4px solid var(--color-danger)';
  
  errorCard.innerHTML = `
    <h3 style="color: var(--color-danger);">Error en Petición ${info.metodo}</h3>
    <div class="result-info">
      <div class="info-item">
        <span class="info-label">URL</span>
        <span class="info-value">${info.url}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Método</span>
        <span class="info-value">${info.metodo}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tiempo de Respuesta</span>
        <span class="info-value">${info.responseTime} ms</span>
      </div>
      <div class="info-item">
        <span class="info-label">Error</span>
        <span class="info-value text-danger">${info.error}</span>
      </div>
    </div>
  `;
  
  resultadoDiv.insertBefore(errorCard, resultadoDiv.firstChild);
}

// Manejadores de eventos para cada botón

// GET - Obtener un recurso
btnGet.addEventListener('click', async () => {
  btnGet.disabled = true;
  const originalContent = btnGet.innerHTML;
  btnGet.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Cargando...</span>';
  
  const resourceId = getResourceId();
  await realizarPeticion('GET', `/posts/${resourceId}`);
  
  btnGet.disabled = false;
  btnGet.innerHTML = originalContent;
});

// POST - Crear un nuevo recurso
btnPost.addEventListener('click', async () => {
  btnPost.disabled = true;
  const originalContent = btnPost.innerHTML;
  btnPost.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Cargando...</span>';
  
  const nuevoPost = {
    title: 'Nuevo Post de Prueba',
    body: 'Este es el contenido del post creado mediante una petición POST.',
    userId: 1
  };
  
  addConsoleLog(`📤 Body de la petición POST: ${JSON.stringify(nuevoPost)}`);
  await realizarPeticion('POST', '/posts', nuevoPost);
  
  btnPost.disabled = false;
  btnPost.innerHTML = originalContent;
});

// PUT - Actualizar un recurso completo
btnPut.addEventListener('click', async () => {
  btnPut.disabled = true;
  const originalContent = btnPut.innerHTML;
  btnPut.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Cargando...</span>';
  
  const resourceId = getResourceId();
  const postActualizado = {
    id: resourceId,
    title: 'Post Actualizado',
    body: 'Este es el contenido actualizado mediante una petición PUT.',
    userId: 1
  };
  
  addConsoleLog(`📤 Body de la petición PUT: ${JSON.stringify(postActualizado)}`);
  await realizarPeticion('PUT', `/posts/${resourceId}`, postActualizado);
  
  btnPut.disabled = false;
  btnPut.innerHTML = originalContent;
});

// DELETE - Eliminar un recurso
btnDelete.addEventListener('click', async () => {
  btnDelete.disabled = true;
  const originalContent = btnDelete.innerHTML;
  btnDelete.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Cargando...</span>';
  
  const resourceId = getResourceId();
  await realizarPeticion('DELETE', `/posts/${resourceId}`);
  
  btnDelete.disabled = false;
  btnDelete.innerHTML = originalContent;
});

// Log inicial
addConsoleLog('✨ Aplicación iniciada. Listo para realizar peticiones HTTP.');
console.log('%c¡Bienvenido a la práctica de HTTP/REST!', 'color: #3498db; font-size: 16px; font-weight: bold;');
console.log('%cAbre la pestaña Network de las DevTools para observar las peticiones en detalle.', 'color: #2ecc71; font-size: 12px;');
