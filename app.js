const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Webhook de Twilio para mensajes entrantes
app.post('/twilio-hook', (req, res) => {
    const { From, To, Body } = req.body;

    console.log('📨 Mensaje recibido:');
    console.log(`De: ${From}`);
    console.log(`Para: ${To}`);
    console.log(`Texto: ${Body}`);

    // Creando la respuesta TwiML
    const twiml = new twilio.twiml.MessagingResponse();

    // Respuesta que se enviará al número de WhatsApp o SMS
    twiml.message(`Gracias por tu mensaje: "${Body}". Estamos procesando tu solicitud.`);

    // Enviar la respuesta TwiML
    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
});

// Inicia el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Webhook de Twilio escuchando en http://localhost:${PORT}/twilio-hook`);
});
