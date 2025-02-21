require('total4');
const nodemailer = require('nodemailer');

PORT = 8000;

// Configurar el transporte SMTP con MailHog
const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false
});

// Ruta para enviar un correo
ROUTE('GET /send-email', function() {
    let self = this;

    let mailOptions = {
        from: 'noreply@example.com',
        to: 'test@local.com',
        subject: 'Correo de prueba',
        text: '¡Hola! Este es un correo de prueba enviado desde Total.js usando MailHog.'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            self.json({ status: 'error', message: error.toString() });
        } else {
            self.json({ status: 'success', message: 'Correo enviado correctamente', info });
        }
    });
});

// Iniciar el servidor
HTTP('debug');
