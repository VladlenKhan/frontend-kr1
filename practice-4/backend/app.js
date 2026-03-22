const express = require('express');
const cors = require('cors');           
const app = express();
const port = 3001;

app.use(cors());                      
app.use(express.json());

let sneakers = [
    { id: 1, name: "Nike Air Force 1", price: 8990, description: "Классические белые" },
    { id: 2, name: "Adidas Stan Smith", price: 7500, description: "Легендарные" },
    { id: 3, name: "Puma RS-X", price: 10990, description: "Ретро стиль" }
];

app.get('/', (req, res) => res.send('<h1>Backend API кроссовок (порт 3001)</h1>'));

app.get('/sneakers', (req, res) => res.json(sneakers));
app.get('/sneakers/:id', (req, res) => {
    const sneaker = sneakers.find(s => s.id === parseInt(req.params.id));
    sneaker ? res.json(sneaker) : res.status(404).json({error: "Не найдено"});
});

app.post('/sneakers', (req, res) => {
    const { name, price, description } = req.body;
    const newSneaker = { id: Date.now(), name, price: Number(price), description };
    sneakers.push(newSneaker);
    res.status(201).json(newSneaker);
});

app.patch('/sneakers/:id', (req, res) => {
    const sneaker = sneakers.find(s => s.id === parseInt(req.params.id));
    if (!sneaker) return res.status(404).json({error: "Не найдено"});
    Object.assign(sneaker, req.body);
    res.json(sneaker);
});

app.delete('/sneakers/:id', (req, res) => {
    sneakers = sneakers.filter(s => s.id !== parseInt(req.params.id));
    res.json({message: "Удалено"});
});

app.listen(port, () => console.log(`✅ Backend запущен: http://localhost:${port}`));