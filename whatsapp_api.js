const { Client } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');

const app = express();
const client = new Client();

client.on('qr', qr => {
    console.log("Scan the QR Code below to log in:");
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Web API is ready!');
});

client.initialize();

app.get('/getProfilePic', async (req, res) => {
    const number = req.query.number;  // Example: 1234567890
    const chatId = number + "@c.us";

    try {
        const url = await client.getProfilePicUrl(chatId);
        if (url) {
            res.json({ success: true, profile_picture: url });
        } else {
            res.json({ success: false, message: "No profile picture found" });
        }
    } catch (err) {
        res.json({ success: false, message: "Error fetching profile picture" });
    }
});

app.listen(3000, () => {
    console.log("WhatsApp API is running on port 3000");
});
