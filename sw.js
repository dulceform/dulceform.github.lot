// asignar un nombre y versión al cache
const  CACHE_NAME  =  'v1_pwa_app_cache' ,
  urlsToCache  =  [
    './' ,
    'css / estilo.css' ,
    'disp / CtrlDispositivo.js' ,
    'disp / ProxyEntrada.js' ,
    'disp / ProxyHistorial.js' ,
    'disp / ProxySalida.js' ,
    'disp / ReseInt.js' ,
    'disp / utilIoT.js' ,
    'js / CtrlHistorial.js' ,
    'js / CtrlMovil.js' ,
    'js / init.js' ,
    'js / script.js' ,
    'js / tipos.js' ,
    'lib / fabrica.js' ,
    'lib / tiposFire.js' ,
    'lib / util.js' ,
    'dispositivo.html' ,
    'favicon.ico' ,
    'historial.html' ,
    'index.html'
  ]

// durante la fase de instalación, generalmente se almacena en caché los activos estáticos
yo . addEventListener ( 'instalar' ,  e  =>  {
  e . esperar hasta (
    cachés . abrir ( CACHE_NAME )
      . entonces ( cache  =>  {
        retorno de  caché . addAll ( urlsToCache )
          . luego ( ( )  =>  self . skipWaiting ( ) )
      } )
      . catch ( err  =>  console . log ( 'Falló registro de cache' ,  err ) )
  )
} )

// una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
yo . addEventListener ( 'activar' ,  e  =>  {
  const  cacheWhitelist  =  [ CACHE_NAME ]

  e . esperar hasta (
    cachés . llaves ( )
      . luego ( cacheNames  =>  {
         Promesa de devolución . todos (
          cacheNames . mapa ( cacheName  =>  {
            // Eliminamos lo que ya no se necesita en cache
            if  ( cacheWhitelist . indexOf ( cacheName )  ===  - 1 )  {
              devolver  cachés . eliminar ( cacheName )
            }
          } )
        )
      } )
      // Le indica al SW activar el cache actual
      . entonces ( ( )  =>  auto . clientes . reclamo ( ) )
  )
} )

// cuando el navegador recupera una url
yo . addEventListener ( 'buscar' ,  e  =>  {
  // Responder ya sea con el objeto en caché o continuar y buscar la url real
  e . responder con (
    cachés . coincidencia ( p . solicitud )
      . entonces ( res  =>  {
        if  ( res )  {
          // recuperar del cache
          volver  res
        }
        // recuperar de la petición a la url
        return  fetch ( p . ej . solicitud )
      } ) . catch ( err  =>  console . log ( 'Falló algo al solicitar recursos' ,  err ) )
  )
} )
