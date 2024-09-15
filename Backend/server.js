const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
app.use(express.json());

const PORT = 3000;
const proxy = httpProxy.createProxyServer();

// Пример маршрута для микросервиса на Node.js
app.use('/service-node', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001' });
});

// Пример маршрута для микросервиса на Golang
app.use('/service-go', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3002' });
});

app.listen(PORT, () => {
    console.log('API Gateway is running on http://localhost:3000');
});

//sanyahuyanya