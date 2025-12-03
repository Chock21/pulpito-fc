//Jugadores
fetch('jugadores.json')
    .then(response => response.json())
    .then(data => {
            const jugadoresDiv = document.querySelector('.jugadores');
            jugadoresDiv.innerHTML = '';
            data.jugadores.forEach(jugador => {
                jugadoresDiv.innerHTML += `
                    <div class="border border-gray-400">
                        <img src="${jugador.imagen}" alt="" class="w-full" style="with: 495px; height: 495px; object-fit: cover;">
                        <div class="jugador-linea w-full">
                            <div class="w-[50%]"></div>
                        </div>
                        <div class="flex justify-between py-3 px-4">
                            <div>
                                <p class="mb-0">${jugador.nombre}</p>
                                <p class="mb-0">${jugador.apellido}</p>
                            </div>
                            <div>
                                <p class="mb-0 jugador-num">${jugador.numero}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        });

//Partidos
fetch('jugadores.json')
    .then(response => response.json())
    .then(data => {
        const partidosDiv = document.querySelector('.partidos');
        if (Array.isArray(data.partidos)) {
            const htmlPartidos = data.partidos.map((p, idx) => {
                const id = p.id ?? `partido-${idx}`;
                const fecha = p.fecha ? p.fecha : 'Fecha desconocida';
                const formato = p.formato ? p.formato : 'Formato desconocido';
                const rival = p.rival ? p.rival : 'Rival desconocido';
                const imagen_rival = p.imagen_rival ? p.imagen_rival : 'imgs/default-rival.png';
                const resultado = p.resultado ? p.resultado : 'Resultado desconocido';
                const vod = p.victoria_derrota ? p.victoria_derrota : '';
                const dt = p.dt ? p.dt : 'DT desconocido';
                return `
                    <div class="border-b border-gray-400">
                        <button type="button" data-accordion-target="#accordion-body-${id}" aria-expanded="false" class="flex justify-between items-center border-b-gray-300 w-full p-3">
                            <div class="flex items-center justify-between w-full">
                                <div class="flex flex-col justify-end items-center w-1/3">
                                    <img src="imgs/pulpito_fc.svg" alt="escudo-pulpito" class="mx-2 w-10 h-10">
                                    <p class="my-2 text-sm font-bold text-lg">Pulpito F.C.</p>
                                </div>
                                
                                <div class="flex flex-col gap-2">
                                    <p class="text-gray-500 text-sm">${fecha}</p>
                                    <p class="px-2 py-1 my-1 mx-2 text-base font-bold text-white resultado ${vod}">${resultado}</p>
                                    <p class="text-gray-500 text-sm">${formato}</p>
                                </div>

                                <div class="flex flex-col items-center w-1/3">
                                    <img src="${imagen_rival}" alt="escudo-rival" class="mx-2 w-10 h-10">
                                    <p class="my-2 text-sm font-bold text-lg">${rival}</p>
                                </div>
                                <svg data-accordion-icon class="w-6 h-6 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div id="accordion-body-${id}" class="hidden">
                        <div class="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 border-b border-gray-300">
                            <div class="w-full md:w-1/3 pr-3 bg-white p-4 rounded-xl">
                                <p class="pb-3"><strong>DT: </strong>${dt}</p>
                                <p class="text-center border-t border-b border-gray-400 py-2 mb-3">Convocados</p>
                                <div class="flex w-full pb-2">
                                    <div class="w-1/2">
                                        ${p.convocados && p.convocados.length > 0 ? p.convocados.slice(0, Math.ceil(p.convocados.length / 2)).map(j => `<p class="m-0"><strong class="text-sm sm:text-base inline-block font-semibold convocados">${j.numero}.</strong> ${j.nombre}</p>`).join('') : '<p>No hay convocados</p>'}
                                    </div>
                                    <div class="w-1/2">
                                        ${p.convocados && p.convocados.length > 0 ? p.convocados.slice(Math.ceil(p.convocados.length / 2)).map(j => `<p class="m-0"><strong class="text-sm sm:text-base inline-block font-semibold convocados">${j.numero}.</strong> ${j.nombre}</p>`).join('') : ''}
                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/3 p-4 bg-white rounded-xl">
                                ${p.goleadores && p.goleadores.length > 0 ? p.goleadores.map(g => `<p class="flex items-center gap-1">${g.nombre} ${'<img src="imgs/football.png" alt="football" style="width: 14px; height: 14px;" /> '.repeat(g.goles || 0)} ${g.jmv ? '<strong class="border px-1">JMV</strong>' : ''}</p>`).join('') : '<p>No hay goles registrados</p>'}
                            </div>
                            <div class="flex items-center justify-center w-full md:w-1/3 p-4 bg-white rounded-xl">
                                <p>Video</p>
                            </div>
                        </div>
                    </div>
                    `;
            }).join('');
            partidosDiv.innerHTML = htmlPartidos;

                function initAccordion({ allowMultiple = false } = {}) {
                    const buttons = document.querySelectorAll('[data-accordion-target]');
                    buttons.forEach(btn => {
                        const targetSelector = btn.getAttribute('data-accordion-target');
                        const target = document.querySelector(targetSelector);
                        if (!target) return;
                        btn.setAttribute('aria-expanded', target.classList.contains('hidden') ? 'false' : 'true');

                        btn.addEventListener('click', () => {
                            const expanded = btn.getAttribute('aria-expanded') === 'true';

                            if (!allowMultiple) {
                                document.querySelectorAll('[data-accordion-target]').forEach(b => {
                                    if (b === btn) return;
                                    const sel = b.getAttribute('data-accordion-target');
                                    const t = document.querySelector(sel);
                                    if (t && !t.classList.contains('hidden')) {
                                        t.classList.add('hidden');
                                        b.setAttribute('aria-expanded', 'false');
                                        const ico = b.querySelector('[data-accordion-icon]');
                                        if (ico) ico.classList.remove('rotate-180');
                                    }
                                });
                            }

                            target.classList.toggle('hidden');
                            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');

                            const icon = btn.querySelector('[data-accordion-icon]');
                            if (icon) icon.classList.toggle('rotate-180');
                        });
                    });
                }

                initAccordion({ allowMultiple: false });
            } else {
                partidosDiv.innerHTML = '';
            }
        });

//Tabla
fetch('jugadores.json')
    .then(response => response.json())
    .then(data => {
        const grupoA = document.querySelector('.grupo-a');
        const grupoB = document.querySelector('.grupo-b');
        grupoA.innerHTML = '';
        grupoB.innerHTML = '';
        let tabla = data.tabla;
        let grupoa = [];
        let grupob = []
        if (Array.isArray(tabla)) {
            if (tabla.length > 0 && typeof tabla[0] === 'object') {
                grupoa = tabla[0].grupoa || tabla[0].grupA || [];
                grupob = tabla[0].grupob || tabla[0].grupB || [];
            }
        } else if (tabla && typeof tabla === 'object') {
            grupoa = tabla.grupoa || tabla.grupA || [];
            grupob = tabla.grupob || tabla.grupB || [];
        }
        grupoa.forEach(equipo => {
            grupoA.innerHTML += `
                <tr class="${equipo.posicion <= 8 ? 'bg-green-100' : 'bg-red-100'}">
                    <th>${equipo.posicion}</th>
                    <th class="font-normal text-left ${equipo.expulsado ? 'line-through' : ''}">${equipo.nombre}</th>
                    <th class="bg-[#370068] text-white">${3 * equipo.pg + equipo.pe}</th>
                    <th class="font-normal">${equipo.pj}</th>
                    <th class="font-normal">${equipo.pg}</th>
                    <th class="font-normal">${equipo.pe}</th>
                    <th class="font-normal">${equipo.pj - equipo.pg - equipo.pe}</th>
                    <th class="font-normal hidden lg:table-cell">${equipo.gf}</th>
                    <th class="font-normal hidden lg:table-cell">${equipo.gc}</th>
                    <th class="font-normal">${(equipo.gf - equipo.gc) > 0 ? '+' : ''}${equipo.gf - equipo.gc}</th>
                </tr>
            `;
        });
        grupob.forEach(equipo => {
            grupoB.innerHTML += `
                <tr class="${equipo.expulsado ? 'bg-red-200' : ''} ${equipo.posicion <= 8 ? 'bg-green-100' : 'bg-red-100'}">
                    <th>${equipo.posicion}</th>
                    <th class="font-normal text-left ms-5 ${equipo.expulsado ? 'line-through' : ''}">${equipo.nombre}</th>
                    <th class="bg-[#370068] text-white">${3 * equipo.pg + equipo.pe}</th>
                    <th class="font-normal">${equipo.pj}</th>
                    <th class="font-normal">${equipo.pg}</th>
                    <th class="font-normal">${equipo.pe}</th>
                    <th class="font-normal">${equipo.pj - equipo.pg - equipo.pe}</th>
                    <th class="font-normal hidden lg:table-cell">${equipo.gf}</th>
                    <th class="font-normal hidden lg:table-cell">${equipo.gc}</th>
                    <th class="font-normal">${(equipo.gf - equipo.gc) > 0 ? '+' : ''}${equipo.gf - equipo.gc}</th>
                </tr>
            `;
        });
    });
            