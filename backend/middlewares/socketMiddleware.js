// middlewares/socketMiddleware.js
const axios = require('axios');
const { sendColorToESP32 } = require('../controllers/colorController'); // Importez la fonction depuis le contrôleur

const socketMiddleware = (server) => {
  const io = require('socket.io')(server); // Déplacez l'importation de socket.io ici

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Émettre la couleur actuelle à chaque nouvel utilisateur connecté
    socket.emit('currentColor', { red: 0, green: 0, blue: 0 });

    socket.on('colorChange', (color) => {
      console.log('Color changed:', color);

      // Émettre la nouvelle couleur à tous les clients connectés
      io.emit('currentColor', color);

      // Envoyer la couleur à l'ESP32 via une requête HTTP
      sendColorToESP32(color); // Utilisez la fonction ici
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = socketMiddleware;