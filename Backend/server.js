const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const clientApp = express();
const cors = require('cors');
const path = require('path');

// Настройка CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5500', 'http://localhost:3000','http://localhost:3001', 'http://localhost:3002'], // Массив разрешенных источников
    credentials: true,
};

app.use(cors(corsOptions));
clientApp.use(cors(corsOptions));
clientApp.use(express.static('../frontend/dist'));

// Middleware для установки заголовков CORS для всех маршрутов API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || corsOptions.origin[0]);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// URL для микросервисов
const JS_SERVICE_URL = 'http://localhost:3001';  // Микросервис на JS
const GO_SERVICE_URL = 'http://localhost:3002';  // Микросервис на Go

// Прокси для JS микросервиса
app.use('/js-service', createProxyMiddleware({
    target: JS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/js-service': '',
    },
    // onProxyReq: function (proxyReq, req, res) {
    //     proxyReq.setHeader('Origin', req.headers.origin);  // Устанавливаем Origin вручную
    // },
    // onProxyRes: function (proxyRes, req, res) {
    //     proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || corsOptions.origin[0];  // Установка заголовка для разрешенного источника
    //     proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    //     proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
    //     proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    // }
}));

// Прокси для Go микросервиса
app.use('/rest-api-service', createProxyMiddleware({
    target: GO_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/rest-api-service': '',
    },
    // onProxyReq: function (proxyReq, req, res) {
    //     proxyReq.setHeader('Origin', req.headers.origin);  // Устанавливаем Origin вручную
    // },
    // onProxyRes: function (proxyRes, req, res) {
    //     proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || corsOptions.origin[0];  // Установка заголовка для разрешенного источника
    //     proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    //     proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
    //     proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    // }
}));


// Запуск API Gateway
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway запущен на порту ${PORT}`);
});

clientApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Возвращает index.html для всех маршрутов
});