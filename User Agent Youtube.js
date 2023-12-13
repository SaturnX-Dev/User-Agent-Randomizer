// ==UserScript==
// @name         User Agent Youtube
// @namespace    https://github.com/SaturnX-Dev/User-Agent-Youtube
// @version      0.1
// @description  Cambia el User-Agent en YouTube, excepto en music.youtube
// @author       Saturnx-dev
// @match        *://www.youtube.com/*
// @exclude      *://*music.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // Lista de URLs de archivos JSON en GitHub
    const userAgentURLs = [
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(1).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(2).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(3).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(4).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(5).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(6).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(7).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(8).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(9).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(10).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(11).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(12).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(13).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(14).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(15).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(16).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(17).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(18).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(19).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(20).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(21).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(22).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(23).json',
        'https://github.com/SaturnX-Dev/User-Agent-Youtube/blob/main/User%20Agents%20Lists/User_Agents%20(24).json'

    ];

    // Verifica si la URL actual no es music.youtube
    if (!window.location.href.includes('music.youtube')) {
        // Descarga las listas de User-Agents desde archivos JSON en GitHub
        userAgentURLs.forEach(url => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(response) {
                    if (response.status === 200) {
                        try {
                            const userAgentsData = JSON.parse(response.responseText);
                            const userAgents = userAgentsData.userAgents || [];
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
                        } catch (error) {
                            console.error('Error al analizar el archivo JSON', error);
                            // Puedes agregar una notificación o indicación visual aquí
                        }
                    } else {
                        console.error('Error al cargar el archivo JSON de User-Agents desde GitHub', url);
                        // Puedes agregar una notificación o indicación visual aquí
                    }
                },
                onerror: function(error) {
                    console.error('Error al cargar el archivo JSON de User-Agents desde GitHub', url, error);
                    // Puedes agregar una notificación o indicación visual aquí
                }
            });
        });
    }
})();
