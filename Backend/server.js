const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const clientApp = express();
const cors = require('cors');
const path = require('path');

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5500', 'http://localhost:3000','http://localhost:3001', 'http://localhost:3002'], // Массив разрешенных источников
    credentials: true,
};

app.use(cors(corsOptions));
clientApp.use(cors(corsOptions));
clientApp.use(express.static('../frontend/dist'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || corsOptions.origin[0]);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

const JS_SERVICE_URL = 'http://localhost:3001';  // Микросервис на JS
const GO_SERVICE_URL = 'http://localhost:3002';  // Микросервис на Go

app.use('/js-service', createProxyMiddleware({
    target: JS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/js-service': '',
    },
}));

app.use('/rest-api-service', createProxyMiddleware({
    target: GO_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/rest-api-service': '',
    },
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway запущен на порту ${PORT}`);
});

clientApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});