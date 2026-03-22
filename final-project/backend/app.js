const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Swagger (оставляем как было)
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Магазин кроссовок — Финальный проект', version: '2.0.0' },
        servers: [{ url: `http://localhost:${port}` }]
    },
    apis: ['./app.js']
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// Данные с полем image
let sneakers = [
    { 
        id: nanoid(8), 
        name: "Nike Air Force 1", 
        price: 8990, 
        description: "Классические белые", 
        image: "https://picsum.photos/id/1015/600/400" 
    },
    { 
        id: nanoid(8), 
        name: "Adidas Stan Smith", 
        price: 7500, 
        description: "Легендарные", 
        image: "" 
    }
];

// ==================== МАРШРУТЫ ====================

app.get('/sneakers', (req, res) => res.json(sneakers));

app.post('/sneakers', (req, res) => {
    const { name, price, description, image } = req.body;
    const newSneaker = {
        id: nanoid(8),
        name,
        price: Number(price),
        description: description || "",
        image: image || ""   // если пусто — потом покажем рандом
    };
    sneakers.push(newSneaker);
    res.status(201).json(newSneaker);
});

app.patch('/sneakers/:id', (req, res) => {
    const sneaker = sneakers.find(s => s.id === req.params.id);
    if (!sneaker) return res.status(404).json({ error: "Не найдено" });
    Object.assign(sneaker, req.body);
    res.json(sneaker);
});

app.delete('/sneakers/:id', (req, res) => {
    sneakers = sneakers.filter(s => s.id !== req.params.id);
    res.json({ message: "Удалено" });
});

app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
    console.log(`📖 Swagger: http://localhost:${port}/api-docs`);
});