const express = require('express');
const cors = require('cors');
const http = require('http');
const socketMiddleware = require('./middlewares/socketMiddleware');
const { sendColorToESP32 } = require('./controllers/colorController');

const app = express();
const port = process.env.PORT || 3003;
const server = http.createServer(app);

app.use(cors());
app.use(express.static('build'));

socketMiddleware(server);

const serverInstance = server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  serverInstance.close(() => {
    console.log('Server shut down.');
    process.exit();
  });
});