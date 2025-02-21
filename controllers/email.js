const Mail = require('total4/mail');

exports.sendEmail = function($) {
    const email = new Mail();
    
    email.to = 'destinatario@example.com'; // Cambia por cualquier correo de prueba
    email.from = 'remitente@example.com';
    email.subject = 'Correo de prueba desde Total4';
    email.body = 'Este es un mensaje de prueba enviado desde Total4 usando MailHog.';

    email.send($.callback); // Enviar email
};
