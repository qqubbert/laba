const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Укажите фронтенд адрес (React-приложение)
    credentials: true,               // Разрешить передачу куки
}));

// URL для микросервисов
const JS_SERVICE_URL = 'http://localhost:3001';  // Микросервис на JS
const GO_SERVICE_URL = 'http://localhost:3002';  // Микросервис на Go

// Перенаправление запросов на микросервис на JS
app.use('/js-service', createProxyMiddleware({
    target: JS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/js-service': '',  // Удаляет "/js-service" из пути
    },
}));

// Перенаправление запросов на микросервис на Go
app.use('/go-service', createProxyMiddleware({
    target: GO_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/go-service': '',  // Удаляет "/go-service" из пути
    },
}));

// Запуск API Gateway
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway запущен на порту ${PORT}`);
});
