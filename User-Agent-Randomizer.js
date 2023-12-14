// ==UserScript==
// @name         User Agent Randomizer
// @namespace    https://github.com/SaturnX-Dev/User-Agent-Randomizer
// @author       Saturnx-dev
// @version      1.0
// @description  Cambia el User-Agent de forma aleatoria y permite configurarlo manualmente. También muestra el próximo User-Agent antes de cambiarlo.
// @connect      github.com
// @connect      raw.githubusercontent.com
// @downloadURL  https://raw.githubusercontent.com/SaturnX-Dev/User-Agent-Randomizer/main/User%20Agent%20Randomizer.js
// @updateURL    https://raw.githubusercontent.com/SaturnX-Dev/User-Agent-Randomizer/main/User%20Agent%20Randomizer.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';
  
    // URLs de archivos de texto en GitHub
    const userAgentURLs = [
      'https://raw.githubusercontent.com/SaturnX-Dev/User-Agent-Randomizer/main/User%20Agents%20List/MacOsX.txt',
      'https://raw.githubusercontent.com/SaturnX-Dev/User-Agent-Randomizer/main/User%20Agents%20List/Windows.txt'
    ];
  
    // Función para obtener la lista de User-Agents desde el archivo de texto
    async function fetchUserAgents(url) {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: 'GET',
          url: url,
          onload: function (response) {
            if (response.status === 200) {
              const userAgents = response.responseText.split('\n').filter(Boolean);
              resolve(userAgents);
            } else {
              reject(new Error(`Error al obtener User-Agents desde ${url}`));
            }
          },
          onerror: function (error) {
            reject(error);
          }
        });
      });
    }
  
    // Función para obtener un User-Agent aleatorio de las listas
    async function getRandomUserAgent() {
      const usedUserAgents = GM_getValue('usedUserAgents', []);
      
      // Elegir una lista aleatoria si aún no se ha elegido
      if (!GM_getValue('selectedList')) {
        GM_setValue('selectedList', userAgentURLs[Math.floor(Math.random() * userAgentURLs.length)]);
      }
  
      let allUserAgents = [];
      try {
        // Obtener User-Agents de la lista seleccionada
        allUserAgents = await fetchUserAgents(GM_getValue('selectedList'));
      } catch (error) {
        console.error(error);
      }
  
      // Eliminar User-Agents usados
      const availableUserAgents = allUserAgents.filter(agent => !usedUserAgents.includes(agent));
  
      // Elegir un User-Agent aleatorio de los disponibles
      const randomIndex = Math.floor(Math.random() * availableUserAgents.length);
      const selectedUserAgent = availableUserAgents[randomIndex];
  
      // Almacenar el User-Agent utilizado
      usedUserAgents.push(selectedUserAgent);
      GM_setValue('usedUserAgents', usedUserAgents);
  
      return selectedUserAgent;
    }
  
    // Función para mostrar el User-Agent actual
    function showCurrentAgent() {
      const currentAgent = GM_getValue('userAgent', 'No configurado');
      alert(`User-Agent actual: ${currentAgent}`);
    }
  
    // Función para configurar el User-Agent de forma aleatoria
    async function configureRandomUserAgent() {
      const nextUserAgents = [];
      for (let i = 0; i < 10; i++) {
        nextUserAgents.push(await getRandomUserAgent());
      }
  
      const userAgentsList = nextUserAgents.map((agent, index) => `${index + 1}. ${agent}`).join('\n');
      const selectedAgent = prompt(`Próximos User-Agents:\n${userAgentsList}\n\nSeleccione el número del User-Agent deseado:`, GM_getValue('userAgent', ''));
  
      if (selectedAgent !== null && !isNaN(selectedAgent)) {
        const index = parseInt(selectedAgent) - 1;
        if (index >= 0 && index < nextUserAgents.length) {
          GM_setValue('userAgent', nextUserAgents[index] || 'No configurado');
        }
      }
    }
  
    // Cambia el User-Agent en cada solicitud
    GM_registerMenuCommand('Configurar User Agent (Aleatorio)', configureRandomUserAgent);
    GM_registerMenuCommand('Mostrar User Agent Actual', showCurrentAgent);
  
    const originalFetch = window.fetch;
  
    window.fetch = function (url, options) {
      const modifiedOptions = options || {};
      modifiedOptions.headers = modifiedOptions.headers || {};
      const customUserAgent = GM_getValue('userAgent', getRandomUserAgent());
      modifiedOptions.headers['User-Agent'] = customUserAgent;
      return originalFetch(url, modifiedOptions);
    };
  })();
  