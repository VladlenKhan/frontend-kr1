const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// ====================== SWAGGER НАСТРОЙКИ ======================
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Магазина кроссовок',
            version: '1.0.0',
            description: 'Полное CRUD API для кроссовок (Практика 5)',
        },
        servers: [
            { url: `http://localhost:${port}`, description: 'Локальный сервер' }
        ],
    },
    apis: ['./app.js'], // все JSDoc комментарии берутся из этого файла
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ====================== ДАННЫЕ ======================
let sneakers = [
    { id: 1, name: "Nike Air Force 1", price: 8990, description: "Классические белые" },
    { id: 2, name: "Adidas Stan Smith", price: 7500, description: "Легендарные" },
    { id: 3, name: "Puma RS-X", price: 10990, description: "Ретро стиль" }
];

// ====================== МАРШРУТЫ С SWAGGER ДОКУМЕНТАЦИЕЙ ======================

/**
 * @swagger
 * components:
 *   schemas:
 *     Sneaker:
 *       type: object
 *       required: [name, price]
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный ID
 *         name:
 *           type: string
 *           description: Название модели
 *         price:
 *           type: number
 *           description: Цена
 *         description:
 *           type: string
 *           description: Описание
 */

/**
 * @swagger
 * /sneakers:
 *   get:
 *     summary: Получить все кроссовки
 *     tags: [Sneakers]
 *     responses:
 *       200:
 *         description: Список всех товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sneaker'
 */
app.get('/sneakers', (req, res) => res.json(sneakers));

/**
 * @swagger
 * /sneakers:
 *   post:
 *     summary: Добавить новые кроссовки
 *     tags: [Sneakers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Товар создан
 */
app.post('/sneakers', (req, res) => {
    const { name, price, description } = req.body;
    const newSneaker = { id: Date.now(), name, price: Number(price), description };
    sneakers.push(newSneaker);
    res.status(201).json(newSneaker);
});

/**
 * @swagger
 * /sneakers/{id}:
 *   get:
 *     summary: Получить кроссовки по ID
 *     tags: [Sneakers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Товар найден }
 *       404: { description: Не найдено }
 */
app.get('/sneakers/:id', (req, res) => {
    const sneaker = sneakers.find(s => s.id === parseInt(req.params.id));
    sneaker ? res.json(sneaker) : res.status(404).json({ error: "Не найдено" });
});

/**
 * @swagger
 * /sneakers/{id}:
 *   patch:
 *     summary: Обновить кроссовки
 *     tags: [Sneakers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *     responses:
 *       200: { description: Обновлено }
 */
app.patch('/sneakers/:id', (req, res) => {
    const sneaker = sneakers.find(s => s.id === parseInt(req.params.id));
    if (!sneaker) return res.status(404).json({ error: "Не найдено" });
    Object.assign(sneaker, req.body);
    res.json(sneaker);
});

/**
 * @swagger
 * /sneakers/{id}:
 *   delete:
 *     summary: Удалить кроссовки
 *     tags: [Sneakers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Удалено }
 */
app.delete('/sneakers/:id', (req, res) => {
    sneakers = sneakers.filter(s => s.id !== parseInt(req.params.id));
    res.json({ message: "Удалено" });
});

app.listen(port, () => {
    console.log(`✅ Backend запущен: http://localhost:${port}`);
    console.log(`📖 Swagger документация: http://localhost:${port}/api-docs`);
});