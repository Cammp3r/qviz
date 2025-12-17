# QViz Backend Server

Простий Express.js backend для збереження вікторин та результатів у JSON-файлах.

## Встановлення

```powershell
cd server
npm install
```

## Запуск

### Production режим
```powershell
npm start
```

### Development режим (auto-restart при змінах)
```powershell
npm run dev
```

Сервер запуститься на `http://localhost:3001`

## API Endpoints

### Quizzes
- `GET /api/quizzes` — отримати всі вікторини
- `POST /api/quizzes` — створити нову вікторину (body: quiz object)
- `DELETE /api/quizzes/:id` — видалити вікторину за id

### Results
- `GET /api/results` — отримати всі результати
- `POST /api/results` — зберегти новий результат (body: result object)

## Структура даних

Дані зберігаються у JSON файлах:
- `server/data/quizzes.json` — список вікторин
- `server/data/results.json` — список результатів

## Запуск frontend + backend разом

1. Запустити backend (в одному терміналі):
```powershell
cd server
npm install
npm start
```

2. Запустити frontend (в іншому терміналі):
```powershell
cd ..
npm run dev
```

Frontend буде на `http://localhost:5173`, backend на `http://localhost:3001`.
