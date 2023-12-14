// ==UserScript==
// @name         User Agent Youtube
// @namespace    https://github.com/SaturnX-Dev/User-Agent-Youtube
// @version      0.2
// @description  Cambia el User-Agent en YouTube, excepto en music.youtube
// @author       Saturnx-dev
// @match        *://www.youtube.com/*
// @exclude      *://*music.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @downloadURL  https://raw.githubusercontent.com/SaturnX-Dev/User-Agent-Youtube/main/User%20Agent%20Youtube.js
// @updateURL    https://raw.githubusercontent.com/SaturnX-Dev/User-Agent-Youtube/main/User%20Agent%20Youtube.js
// ==/UserScript==

(function() {
    'use strict';

    // Lista de URLs de archivos de texto en GitHub
    const userAgentURLs = [
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20List/MacOsX.txt',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20List/Windows.txt'
    ];

    // Verifica si la URL actual no es music.youtube
    if (!window.location.href.includes('music.youtube')) {
        // Descarga las listas de User-Agents desde archivos de texto en GitHub
        userAgentURLs.forEach(url => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(response) {
                    if (response.status === 200) {
                        try {
                            // Dividir el contenido del archivo de texto en líneas
                            const userAgents = response.responseText.split('\n');
                            const usedUserAgents = GM_getValue('usedUserAgents', []);

                            // Filtra User-Agents que ya se han utilizado
                            const availableUserAgents = userAgents.filter(agent => !usedUserAgents.includes(agent.trim()));

                            // Si no hay User-Agents disponibles, reinicia la lista de utilizados
                            if (availableUserAgents.length === 0) {
                                GM_setValue('usedUserAgents', []);
                            } else {
                                // Elige aleatoriamente un User-Agent no utilizado
                                const selectedUserAgent = availableUserAgents[Math.floor(Math.random() * availableUserAgents.length)].trim();

                                // Almacena el User-Agent seleccionado en la lista de utilizados
                                usedUserAgents.push(selectedUserAgent);
                                
                                // Limita la lista de utilizados a las últimas 20 entradas
                                if (usedUserAgents.length > 20) {
                                    usedUserAgents.shift();
                                }

                                GM_setValue('usedUserAgents', usedUserAgents);

                                // Cambia el User-Agent
                                Object.defineProperty(navigator, 'userAgent', {
                                    value: selectedUserAgent,
                                    writable: false,
                                    configurable: false,
                                    enumerable: true
                                });
                            }
                        } catch (error) {
                            console.error('Error al procesar el archivo de texto', error);
                            // Puedes agregar una notificación o indicación visual aquí
                        }
                    } else {
                        console.error('Error al cargar el archivo de texto de User-Agents desde GitHub', url);
                        // Puedes agregar una notificación o indicación visual aquí
                    }
                },
                onerror: function(error) {
                    console.error('Error al cargar el archivo de texto de User-Agents desde GitHub', url, error);
                    // Puedes agregar una notificación o indicación visual aquí
                }
            });
        });
    }
})();
