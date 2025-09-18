# Ссыллки

```markdown
Todo list - https://gordondev.ru
```

```markdown
API - https://gordondev.ru/api/
```

```markdown
API Документация - https://gordondev.ru/api/docs
```

# Клиент

## Установка

```markdown
 npm install
```

## Настройка

Создайте файл `.env` в корне проекта и добавьте в него следующие переменные окружения:

```
VITE_API_URL=http://localhost:5000
```

## Запуск в режиме разработки

```bash
npm run dev
```

## Сборка проекта

```bash
npm run build
```

# Сервер

## Установка

```markdown
npm install
```
## Запуск сервера

### В режиме разработки (с автоматической перезагрузкой)

Создайте файл `.development.env` в корне проекта и добавьте в него следующие переменные:
```
PORT=5000
MONGODB_URL=ваш_адрес_подключения_к_MongoDB
JWT_ACCESS_SECRET=ваш_секрет_для_access_токена
JWT_REFRESH_SECRET=ваш_секрет_для_refresh_токена
JWT_ACCESS_EXPIRATION='15 days'
JWT_REFRESH_EXPIRATION='30 days'
```

```bash
npm run start:dev
```

### В режиме продакшн

Создайте файл `.production.env` в корне проекта и добавьте в него следующие переменные:

```
PORT=5000
MONGODB_URL=ваш_адрес_подключения_к_MongoDB
JWT_ACCESS_SECRET=ваш_секрет_для_access_токена
JWT_REFRESH_SECRET=ваш_секрет_для_refresh_токена
JWT_ACCESS_EXPIRATION='15 days'
JWT_REFRESH_EXPIRATION='30 days'
```

```bash
npm run build
npm run start:prod
```

## Аутентификация

- Используется JWT токен и Passport JWT strategy
- Токены хранятся на клиенте и передаются в заголовках для защиты маршрутов

## Хранение пользователей

- Пользователи сохраняются и аутентифицируются в базе данных MongoDB

