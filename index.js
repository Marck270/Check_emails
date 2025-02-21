const total4 = require('total4');

const framework = new total4.Application();

framework.route('/send', function($) {
    const Mail = require('total4/mail');
    const email = new Mail();

    email.to = 'destinatario@example.com';
    email.from = 'remitente@example.com';
    email.subject = 'Correo de prueba desde Total4';
    email.body = 'Este es un mensaje de prueba enviado desde Total4 usando MailHog.';

    email.send(err => {
        if (err) {
            $.callback(err);
        } else {
            $.success();
        }
    });
});

framework.start(8000);
console.log('Servidor corriendo en http://localhost:8000');
