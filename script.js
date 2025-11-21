// URL base de la API
const API_URL = 'https://rickandmortyapi.com/api';

// Estado de la aplicación
let currentResource = 'character';

// Configuración de recursos
const resourceConfig = {
  character: {
    name: 'Personaje',
    plural: 'Personajes',
    max: 826,
    icon: 'fa-user',
    hint: 'Ingresa un número entre 1 y 826'
  },
  location: {
    name: 'Ubicación',
    plural: 'Ubicaciones',
    max: 126,
    icon: 'fa-map-marker-alt',
    hint: 'Ingresa un número entre 1 y 126'
  },
  episode: {
    name: 'Episodio',
    plural: 'Episodios',
    max: 51,
    icon: 'fa-tv',
    hint: 'Ingresa un número entre 1 y 51'
  }
};

// Referencias a elementos del DOM
const resourceButtons = document.querySelectorAll('.resource-btn');
const btnGetResource = document.getElementById('btnGetResource');
const btnGetAll = document.getElementById('btnGetAll');
const resultadoDiv = document.getElementById('resultado');
const consoleLogDiv = document.getElementById('consoleLog');
const resourceIdInput = document.getElementById('resourceId');
const labelResource = document.getElementById('labelResource');
const inputHint = document.getElementById('inputHint');
const infoText = document.getElementById('infoText');

// Event listeners para selector de recursos
resourceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remover clase active de todos los botones
    resourceButtons.forEach(b => b.classList.remove('active'));
    // Agregar clase active al botón clickeado
    btn.classList.add('active');
    
    // Actualizar recurso actual
    currentResource = btn.dataset.resource;
    updateResourceUI();
  });
});

// Actualizar interfaz según recurso seleccionado
function updateResourceUI() {
  const config = resourceConfig[currentResource];
  labelResource.textContent = `ID del ${config.name}`;
  inputHint.textContent = config.hint;
  resourceIdInput.max = config.max;
  resourceIdInput.placeholder = `1-${config.max}`;
  infoText.textContent = `Explora ${config.plural.toLowerCase()} usando peticiones GET`;
  
  // Limpiar resultados anteriores
  if (!resultadoDiv.querySelector('.empty-state')) {
    resultadoDiv.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>Sin resultados</p>
        <small>Realiza una petición para ver los resultados</small>
      </div>
    `;
  }
  
  addConsoleLog(`📋 Recurso cambiado a: ${config.plural}`);
}

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
  const config = resourceConfig[currentResource];
  const numId = id ? parseInt(id) : 1;
  
  // Validar que esté en el rango
  if (numId < 1 || numId > config.max) {
    addConsoleLog(`⚠️ ID inválido. Debe estar entre 1 y ${config.max}`);
    return 1;
  }
  
  return numId;
}

// Función genérica para realizar peticiones HTTP GET
async function realizarPeticion(endpoint, isList = false) {
  const startTime = performance.now();
  const url = `${API_URL}${endpoint}`;
  
  // Registrar en consola
  addConsoleLog(`🚀 Iniciando petición GET a ${url}`);
  
  try {
    // Realizar la petición
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2);
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Obtener datos de la respuesta
    const data = await response.json();
    
    // Registrar información en consola
    addConsoleLog(`✅ Petición completada - Código: ${response.status} - Tiempo: ${responseTime}ms`);
    console.log('Response Status:', response.status);
    
    // Convertir headers a objeto para análisis
    const headersObj = Object.fromEntries([...response.headers]);
    console.log('Response Headers:', headersObj);
    console.log('Response Data:', data);
    
    // Información sobre CORS
    let corsInfo = response.headers.get('access-control-allow-origin') || 
                   response.headers.get('Access-Control-Allow-Origin');
    
    if (!corsInfo) {
      corsInfo = '✓ CORS Permitido (Petición exitosa)';
    } else if (corsInfo === '*') {
      corsInfo = '* (Todos los orígenes permitidos)';
    }
    
    addConsoleLog(`🔒 CORS Policy: ${corsInfo}`);
    
    // Mostrar resultado en la interfaz
    if (isList) {
      mostrarResultadoLista(data, url, response.status, response.statusText, responseTime, corsInfo, headersObj);
    } else {
      mostrarResultado({
        metodo: 'GET',
        url,
        status: response.status,
        statusText: response.statusText,
        responseTime,
        corsInfo,
        data,
        headers: headersObj
      });
    }
    
    return { success: true, data, response };
    
  } catch (error) {
    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2);
    
    // Registrar error en consola
    addConsoleLog(`❌ Error en petición GET: ${error.message}`);
    console.error('Error:', error);
    
    // Mostrar error en la interfaz
    mostrarError({
      metodo: 'GET',
      url,
      responseTime,
      error: error.message
    });
    
    return { success: false, error };
  }
}

// Función para mostrar los resultados individuales
function mostrarResultado(info) {
  // Eliminar empty-state si existe
  const emptyState = resultadoDiv.querySelector('.empty-state');
  if (emptyState) {
    resultadoDiv.innerHTML = '';
  }
  
  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  
  const statusClass = `status-${info.status}`;
  const config = resourceConfig[currentResource];
  
  // Crear vista específica según el tipo de recurso
  let dataHTML = '';
  
  if (currentResource === 'character') {
    dataHTML = crearVistaPersonaje(info.data);
  } else if (currentResource === 'location') {
    dataHTML = crearVistaUbicacion(info.data);
  } else if (currentResource === 'episode') {
    dataHTML = crearVistaEpisodio(info.data);
  }
  
  resultCard.innerHTML = `
    <h3><i class="fas ${config.icon}"></i> Respuesta: ${config.name}</h3>
    <div class="result-info">
      <div class="info-item">
        <span class="info-label">URL</span>
        <span class="info-value">${info.url}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Método</span>
        <span class="info-value">GET</span>
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
    
    ${dataHTML}
    
    <div class="info-item mt-2">
      <span class="info-label">JSON Completo</span>
      <div class="result-data">
        <pre>${formatJSON(info.data)}</pre>
      </div>
    </div>
  `;
  
  resultadoDiv.insertBefore(resultCard, resultadoDiv.firstChild);
}

// Función para mostrar resultados de lista
function mostrarResultadoLista(data, url, status, statusText, responseTime, corsInfo, headers) {
  const emptyState = resultadoDiv.querySelector('.empty-state');
  if (emptyState) {
    resultadoDiv.innerHTML = '';
  }
  
  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  
  const config = resourceConfig[currentResource];
  const items = data.results || [];
  const info = data.info || {};
  
  let itemsHTML = '';
  
  if (currentResource === 'character') {
    itemsHTML = items.slice(0, 10).map(char => `
      <div class="list-item">
        <img src="${char.image}" alt="${char.name}" class="list-item-image">
        <div class="list-item-info">
          <strong>${char.id}. ${char.name}</strong>
          <span>${char.species} - ${char.status}</span>
        </div>
      </div>
    `).join('');
  } else if (currentResource === 'location') {
    itemsHTML = items.slice(0, 10).map(loc => `
      <div class="list-item">
        <div class="list-item-icon"><i class="fas fa-map-marker-alt"></i></div>
        <div class="list-item-info">
          <strong>${loc.id}. ${loc.name}</strong>
          <span>${loc.type} - ${loc.dimension}</span>
        </div>
      </div>
    `).join('');
  } else if (currentResource === 'episode') {
    itemsHTML = items.slice(0, 10).map(ep => `
      <div class="list-item">
        <div class="list-item-icon"><i class="fas fa-tv"></i></div>
        <div class="list-item-info">
          <strong>${ep.id}. ${ep.name}</strong>
          <span>${ep.episode} - ${ep.air_date}</span>
        </div>
      </div>
    `).join('');
  }
  
  resultCard.innerHTML = `
    <h3><i class="fas fa-list"></i> Lista de ${config.plural}</h3>
    <div class="result-info">
      <div class="info-item">
        <span class="info-label">Total de ${config.plural}</span>
        <span class="info-value">${info.count || 0}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Páginas</span>
        <span class="info-value">${info.pages || 0}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Código de Estado</span>
        <span class="info-value status-${status}">${status} ${statusText}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tiempo de Respuesta</span>
        <span class="info-value">${responseTime} ms</span>
      </div>
    </div>
    
    <div class="info-item mt-2">
      <span class="info-label">Primeros 10 resultados</span>
      <div class="list-container">
        ${itemsHTML}
      </div>
    </div>
    
    <div class="info-item mt-2">
      <span class="info-label">Información de Paginación</span>
      <div class="result-data">
        <pre>${formatJSON(info)}</pre>
      </div>
    </div>
  `;
  
  resultadoDiv.insertBefore(resultCard, resultadoDiv.firstChild);
}

// Crear vista específica para personaje
function crearVistaPersonaje(char) {
  return `
    <div class="resource-detail">
      <div class="resource-image">
        <img src="${char.image}" alt="${char.name}">
      </div>
      <div class="resource-info-grid">
        <div class="info-item">
          <span class="info-label">Nombre</span>
          <span class="info-value">${char.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Estado</span>
          <span class="info-value status-badge status-${char.status.toLowerCase()}">${char.status}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Especie</span>
          <span class="info-value">${char.species}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Género</span>
          <span class="info-value">${char.gender}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Origen</span>
          <span class="info-value">${char.origin.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Ubicación</span>
          <span class="info-value">${char.location.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Episodios</span>
          <span class="info-value">${char.episode.length} apariciones</span>
        </div>
      </div>
    </div>
  `;
}

// Crear vista específica para ubicación
function crearVistaUbicacion(loc) {
  return `
    <div class="resource-detail">
      <div class="resource-info-grid">
        <div class="info-item">
          <span class="info-label">Nombre</span>
          <span class="info-value">${loc.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Tipo</span>
          <span class="info-value">${loc.type}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Dimensión</span>
          <span class="info-value">${loc.dimension}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Residentes</span>
          <span class="info-value">${loc.residents.length} personajes</span>
        </div>
        <div class="info-item">
          <span class="info-label">Fecha de Creación</span>
          <span class="info-value">${new Date(loc.created).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

// Crear vista específica para episodio
function crearVistaEpisodio(ep) {
  return `
    <div class="resource-detail">
      <div class="resource-info-grid">
        <div class="info-item">
          <span class="info-label">Nombre</span>
          <span class="info-value">${ep.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Episodio</span>
          <span class="info-value">${ep.episode}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Fecha de Emisión</span>
          <span class="info-value">${ep.air_date}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Personajes</span>
          <span class="info-value">${ep.characters.length} apariciones</span>
        </div>
        <div class="info-item">
          <span class="info-label">Fecha de Creación</span>
          <span class="info-value">${new Date(ep.created).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
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
    <h3 style="color: var(--color-danger);"><i class="fas fa-exclamation-triangle"></i> Error en Petición GET</h3>
    <div class="result-info">
      <div class="info-item">
        <span class="info-label">URL</span>
        <span class="info-value">${info.url}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Método</span>
        <span class="info-value">GET</span>
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

// Event listeners para botones

// GET - Obtener un recurso específico
btnGetResource.addEventListener('click', async () => {
  btnGetResource.disabled = true;
  const originalHTML = btnGetResource.innerHTML;
  btnGetResource.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Cargando...</span>';
  
  const resourceId = getResourceId();
  const config = resourceConfig[currentResource];
  
  addConsoleLog(`🔍 Solicitando ${config.name.toLowerCase()} con ID: ${resourceId}`);
  await realizarPeticion(`/${currentResource}/${resourceId}`);
  
  btnGetResource.disabled = false;
  btnGetResource.innerHTML = originalHTML;
});

// GET - Obtener lista de recursos
btnGetAll.addEventListener('click', async () => {
  btnGetAll.disabled = true;
  const originalHTML = btnGetAll.innerHTML;
  btnGetAll.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Cargando...</span>';
  
  const config = resourceConfig[currentResource];
  
  addConsoleLog(`📋 Solicitando lista de ${config.plural.toLowerCase()}`);
  await realizarPeticion(`/${currentResource}`, true);
  
  btnGetAll.disabled = false;
  btnGetAll.innerHTML = originalHTML;
});

// Log inicial
addConsoleLog('✨ Rick and Morty API Explorer iniciado');
addConsoleLog('ℹ️ Explora personajes, ubicaciones y episodios usando peticiones GET');
console.log('%c🚀 ¡Bienvenido a Rick and Morty API Explorer!', 'color: #3498db; font-size: 16px; font-weight: bold;');
console.log('%cAbre la pestaña Network de las DevTools para observar las peticiones en detalle.', 'color: #2ecc71; font-size: 12px;');
console.log('%c📖 Documentación: https://rickandmortyapi.com/documentation', 'color: #9b59b6; font-size: 12px;');
