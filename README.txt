## Email Dashboard

### Descripción
Este proyecto es un dashboard para enviar correos electrónicos utilizando MailHog y visualizar los correos enviados, abiertos y los que han recibido clics.

### Funcionalidades
- **Enviar correos electrónicos** con un formulario que incluye:
  - Campo para el correo electrónico del destinatario
  - Campo para el contenido del correo
  - Botón de enviar
- **Visualización en tabla** con tres columnas:
  - Todos los correos enviados
  - Correos abiertos
  - Correos con clics

### Archivos y estructura
- `index.js` (Servidor en Node.js con Total.js)
- `public/index.html` (Interfaz gráfica del dashboard)
- `public/styles.css` (Estilos del dashboard)
- `public/script.js` (Lógica de frontend para manejo de la UI y consumo de API)

### Instalación
1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Iniciar MailHog con Docker:  
   ```sh
   docker run -d --name mailhog -p 1025:1025 -p 8025:8025 mailhog/mailhog
   ```
4. Ejecutar el servidor con `node index.js`.
5. Abrir `http://localhost:8000` en el navegador para acceder al dashboard.
