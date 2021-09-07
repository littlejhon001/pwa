;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_programador_fitness',
    urlsToCache = [
        './',
        // 'https://fonts.googleapis.com/css?family=Raleway:400,700',
        // 'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
        // 'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
        // 'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
        './css/css_1.css',
        './css/css_2.css',
        './css/css_3.css',
        './css/css_4.css',
        './css/css_5.css',
        './css/css.css',
        './css/main.c6c13258.chunk',
        './css/view.0.0.58.css',
        './static/css/slideThumbnail.f6039df4.chunk.css',
        './static/charts.8e3137a0.chunk.js',
        './static/main.a01dc958.chunk.js',
        './static/offline-runtime-main.ba243a27.js',
        './static/scriptSW.js',
        './static/sketch.f9fa0959.chunk.js',
        './static/slideThumbnail.0392a1d5.chunk.js',
        './static/tableChart.7d4c1bfc.chunk.js',
        './static/tableChart.7d4c1bfc.chunk.js',
        './static/vendors~sketch.f8921bf0.chunk.js',
        './static/',
        './static/',



        // './script.js',
        // './img/ProgramadorFitness.png',
        // './img/favicon.png'
    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
        })
    )
})