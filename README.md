# MuFase — Portal de canje de códigos (GitHub Pages)

Web responsive **sin build, sin frameworks y lista para GitHub Pages**. Usa los logos y las capturas que proporcionaste. Tiene un validador de 20 códigos de acceso y un archivo de prueba para descargar.

## 1. Publicar en GitHub Pages

1. Descomprime `MuFase-GitHub-Pages.zip`.
2. Crea un repositorio en GitHub (por ejemplo `mufase-redeem`).
3. Sube **el contenido** de la carpeta `mufase-github-pages` a la raíz del repositorio: `index.html`, `styles.css`, `app.js`, `codes-hashes.js`, `assets/`, `downloads/` y `.nojekyll`.
4. Abre `Settings → Pages → Build and deployment`.
5. En **Source**, elige `Deploy from a branch`; selecciona `main` y carpeta `/(root)`, y guarda.
6. La URL habitual es `https://TU-USUARIO.github.io/mufase-redeem/` (usa el nombre real del repo).

**Importante:** NO subas `mufase-20-codigos-PRIVADOS.txt`: contiene los 20 códigos completos. Se entrega por separado del ZIP para evitar publicarlos por error.

## 2. Probar códigos

- Abre la web publicada con HTTPS e ingresa cualquiera de los 20 códigos del archivo privado.
- El código habilita el botón de descarga de `downloads/MuFase-ICONO-DE-PRUEBA.png`.
- Prueba también una clave falsa para ver el estado de error.
- Para desarrollo local puedes levantar un servidor desde esta carpeta, por ejemplo `python -m http.server 8080` y abrir `http://localhost:8080`. En navegadores modernos `localhost` se considera un contexto seguro para Web Crypto.

## 3. Reemplazar el ícono por el programa (.rar)

1. Sube tu archivo `.rar` en la carpeta `downloads`, por ejemplo `downloads/MuFase-Windows.rar`.
2. Abre `app.js` y al principio modifica:

```js
const DOWNLOAD = Object.freeze({
  path: 'downloads/MuFase-Windows.rar',
  name: 'MuFase-Windows.rar',
  displayName: 'MuFase — Windows',
  displayType: 'Archivo RAR · instalador'
});
```

3. Borra opcionalmente `downloads/MuFase-ICONO-DE-PRUEBA.png`.
4. Sube los cambios a GitHub.

**Límites de GitHub:** GitHub advierte sobre archivos mayores de 50 MiB y bloquea archivos mayores de 100 MiB mediante Git normal. Si el RAR supera ese tamaño, no podrás guardarlo directamente en el repositorio: utiliza almacenamiento externo y una URL de descarga (y, si buscas acceso privado, un backend que proteja ese archivo).

## 4. Limitación de seguridad IMPORTANTE

GitHub Pages es alojamiento **estático y público**. Los códigos se verifican localmente comparando su hash SHA-256 (los 20 códigos originales no se incluyen en el JS). Esto evita exponer las claves en texto plano, pero **no es una protección de descargas**: cualquiera que conozca la ruta del archivo público puede descargarlo sin ingresar un código. Los códigos también se pueden reutilizar y no pueden consumirse globalmente.

Para 20 códigos de un solo uso, revocación real, conteo de usos o descargas privadas se necesita un servicio adicional (por ejemplo, Cloudflare Workers + D1 + almacenamiento privado R2 o un backend equivalente). **No uses esta variante estática como DRM o control de licencias real.**

## Contenido

```
index.html              Diseño y contenido
styles.css              Estilos responsive
app.js                  Validación y configuración de descarga
codes-hashes.js         Hashes, no claves originales
assets/                 Logos, splash, capturas y favicon
 downloads/             Archivo temporal de prueba
.nojekyll               Desactiva el procesamiento Jekyll
README.md               Estas instrucciones
```
