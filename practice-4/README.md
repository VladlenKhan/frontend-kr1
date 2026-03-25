# Практика №4 — API + React

**Тема:** Магазин кроссовок (CRUD через React + Express)

**Что реализовано:**
- Backend: Express API на порту 3001 (полный CRUD)
- Frontend: React + fetch (список, добавление, редактирование, удаление)
- Красивые карточки товаров
- Форма добавления/редактирования
- React (функциональные компоненты + хуки)
- `useState`, `useEffect`
- `fetch` для взаимодействия с backend
- Компонентная архитектура (SneakerCard, SneakerForm, SneakerList)

**Где и как использовалось:**
- `App.jsx` — главный компонент, загрузка данных, состояние корзины
- `SneakerCard.jsx` — отображение карточки и кнопки действий
- `SneakerForm.jsx` — форма добавления/редактирования

**Результат:** Полноценный фронтенд, подключённый к Express API.


**Как запустить:**

```bash
# 1. Backend
cd backend
npm install
npm start

# 2. В новом терминале — Frontend
cd frontend
npm start