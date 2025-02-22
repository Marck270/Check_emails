const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Base de datos temporal para almacenar eventos
const emailStatus = {};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Configuración de Nodemailer con MailHog
const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false
});

// Ruta para enviar correos con seguimiento
app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
    const emailId = Date.now(); // Generamos un ID único

    // Guardamos el correo en la base de datos temporal
    emailStatus[emailId] = { opened: false, clicked: false };

    const trackingPixel = `<img src="http://localhost:3000/opened/${emailId}" width="1" height="1" style="display:none;">`;
    const trackedLink = `<a href="http://localhost:3000/clicked/${emailId}" target="_blank">Haz clic aquí</a>`;

    try {
        await transporter.sendMail({
            from: "test@mailhog.local",
            to,
            subject,
            html: `${text} <br><br> ${trackingPixel} <br><br> ${trackedLink}`
        });

        res.status(200).json({ message: "Correo enviado correctamente" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ error: "Error al enviar correo" });
    }
});

// Ruta para registrar que un correo fue abierto
app.get("/opened/:id", (req, res) => {
    const emailId = req.params.id;
    if (emailStatus[emailId]) {
        emailStatus[emailId].opened = true;
    }
    res.sendFile(__dirname + "/public/pixel.png"); // Retorna una imagen vacía
});

// Ruta para registrar que se hizo clic en un enlace
app.get("/clicked/:id", (req, res) => {
    const emailId = req.params.id;
    if (emailStatus[emailId]) {
        emailStatus[emailId].clicked = true;
    }
    res.send("<h1>¡Gracias por hacer clic!</h1>");
});

// Ruta para obtener los correos con su estado real
app.get("/emails", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:8025/api/v2/messages");
        const emails = response.data.items.map(email => {
            const id = Object.keys(emailStatus).find(key => email.Content.Headers.Subject[0].includes(key)) || "0";
            return {
                id,
                subject: email.Content.Headers.Subject[0],
                from: email.Content.Headers.From[0],
                timestamp: email.Created,
                opened: emailStatus[id]?.opened || false,
                clicked: emailStatus[id]?.clicked || false
            };
        });
        res.json(emails);
    } catch (error) {
        console.error("Error al obtener correos:", error);
        res.status(500).json({ error: "Error al obtener correos" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
