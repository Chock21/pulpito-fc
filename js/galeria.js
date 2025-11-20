import PhotoSwipeLightbox from './js/photoswipe-lightbox.esm.js';

async function ensureGalleryImageSizes(selector = '#galeria') {
    const gallery = document.querySelector(selector);
    if (!gallery) return;
    const anchors = Array.from(gallery.querySelectorAll('a'));
    const promises = anchors.map(a => new Promise(resolve => {
        const img = a.querySelector('img');
        if (!img) return resolve();
        function setDims() {
            a.dataset.pswpWidth = img.naturalWidth;
            a.dataset.pswpHeight = img.naturalHeight;
            resolve();
        }
        if (img.complete) setDims();
        else img.addEventListener('load', setDims, { once: true });
    }));
    await Promise.all(promises);
}

async function cargarGaleria() {
    const response = await fetch('jugadores.json');
    const data = await response.json();

    const galeriaDiv = document.querySelector('#galeria');
    galeriaDiv.innerHTML = '';

    let galeria = [];

    for (let i = 1; i <= 75; i++) {
        galeria.push({
            img: `imgs/galeria/foto-${i}.jpg`
        });
    }

    galeria.forEach(item => {
        galeriaDiv.innerHTML += `
            <a href="${item.img}" class="w-full">
                <img src="${item.img}" class="w-full object-cover">
            </a>
        `;
    });
    

    // esperar los tamaños
    await ensureGalleryImageSizes('#galeria');

    // iniciar PhotoSwipe
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#galeria',
        children: 'a',
        pswpModule: () => import('./js/photoswipe.esm.js')
    });
    lightbox.init();
}

cargarGaleria();
