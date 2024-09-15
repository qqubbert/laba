const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
app.use(express.json());

const proxy = httpProxy.createProxyServer();

// Пример маршрута для микросервиса на Node.js
app.use('/service-node', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001' });
});

// Пример маршрута для микросервиса на Golang
app.use('/service-go', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3002' });
});

app.post('/post', (req, res) => {
    const { dickLen } = req.body;
    if (dickLen > 15) {
        res.json({ penisSize: "BIG", coolness: "MEGA COOL", sex: "YES"});
    } else {
        res.json({ penisSize: "small", coolness: "SUPER MEGA HYPER poop", sex: "NO" });
    }
});

app.listen(3000, () => {
    console.log('API Gateway is running on http://localhost:3000');
});

//pipaxuy