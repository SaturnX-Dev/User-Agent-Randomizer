// ==UserScript==
// @name         User Agent Youtube
// @namespace    https://github.com/SaturnX-Dev/User-Agent-Youtube
// @version      0.1
// @description  Cambia el User-Agent en YouTube, excepto en music.youtube
// @author       Saturnx-dev
// @match        *://www.youtube.com/*
// @exclude      *://music.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const userAgentURL = 'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20List.txt';

    // Verifica si la URL actual no es music.youtube
    if (!window.location.href.includes('music.youtube')) {
        // Descarga la lista de User-Agents
        GM_xmlhttpRequest({
            method: 'GET',
            url: userAgentURL,
            onload: function(response) {
                if (response.status === 200) {
                    const userAgents = response.responseText.split('\n').filter(Boolean);
                    const usedUserAgents = GM_getValue('usedUserAgents', []);

                    // Filtra User-Agents que ya se han utilizado
                    const availableUserAgents = userAgents.filter(agent => !usedUserAgents.includes(agent));

                    // Si no hay User-Agents disponibles, reinicia la lista de utilizados
                    if (availableUserAgents.length === 0) {
                        GM_setValue('usedUserAgents', []);
                    } else {
                        // Elige aleatoriamente un User-Agent no utilizado
                        const selectedUserAgent = availableUserAgents[Math.floor(Math.random() * availableUserAgents.length)];

                        // Almacena el User-Agent seleccionado en la lista de utilizados
                        usedUserAgents.push(selectedUserAgent);
                        GM_setValue('usedUserAgents', usedUserAgents);

                        // Cambia el User-Agent
                        Object.defineProperty(navigator, 'userAgent', {
                            value: selectedUserAgent,
                            writable: false,
                            configurable: false,
                            enumerable: true
                        });
                    }
                } else {
                    console.error('Error al cargar la lista de User-Agents');
                }
            },
            onerror: function(error) {
                console.error('Error al cargar la lista de User-Agents', error);
            }
        });
    }
})();
