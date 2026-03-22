const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Массив товаров (кроссовок)
let sneakers = [
    {
        id: 1,
        name: "Nike Air Force 1",
        price: 8990,
        description: "Классические белые кроссовки"
    },
    {
        id: 2,
        name: "Adidas Stan Smith",
        price: 7500,
        description: "Легендарные теннисные кроссовки"
    },
    {
        id: 3,
        name: "Puma RS-X",
        price: 10990,
        description: "Стильные ретро-кроссовки"
    }
];

// ====================== МАРШРУТЫ ======================

// Главная страница
app.get('/', (req, res) => {
    res.send(`
        <h1>🛍️ API Магазина кроссовок</h1>
        <p>Практика №2 — Express.js</p>
        <p><a href="/sneakers">Посмотреть все кроссовки →</a></p>
    `);
});

// GET /sneakers — получить все товары
app.get('/sneakers', (req, res) => {
    res.json(sneakers);
});

// GET /sneakers/:id — получить один товар по id
app.get('/sneakers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sneaker = sneakers.find(s => s.id === id);
    
    if (!sneaker) {
        return res.status(404).json({ error: "Кроссовки не найдены" });
    }
    res.json(sneaker);
});

// POST /sneakers — добавить новый товар
app.post('/sneakers', (req, res) => {
    const { name, price, description } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ error: "Название и цена обязательны" });
    }
    
    const newSneaker = {
        id: Date.now(),           // простой уникальный id
        name: name.trim(),
        price: Number(price),
        description: description || "Без описания"
    };
    
    sneakers.push(newSneaker);
    res.status(201).json(newSneaker);
});

// PATCH /sneakers/:id — обновить товар
app.patch('/sneakers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sneaker = sneakers.find(s => s.id === id);
    
    if (!sneaker) {
        return res.status(404).json({ error: "Кроссовки не найдены" });
    }
    
    const { name, price, description } = req.body;
    
    if (name) sneaker.name = name.trim();
    if (price) sneaker.price = Number(price);
    if (description) sneaker.description = description;
    
    res.json(sneaker);
});

// DELETE /sneakers/:id — удалить товар
app.delete('/sneakers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = sneakers.length;
    
    sneakers = sneakers.filter(s => s.id !== id);
    
    if (sneakers.length === initialLength) {
        return res.status(404).json({ error: "Кроссовки не найдены" });
    }
    
    res.json({ message: "Товар успешно удалён" });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
    console.log(`📋 API доступно по адресу: http://localhost:${port}/sneakers`);
});