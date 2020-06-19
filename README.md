# Backend trello


## Установка
Для установки требуется установленный Node.js и npm

1. Создайте папки у себя на компьютере
2. Скопируйте проект в вашу папку командой:   
```git clone https://github.com/prnmxm/backend-trello```
3. В корне проекта через консоль установите зависимости
```npm install```
4. Создайте .env файл в корне: 
```
NODE_ENV = production
JWT_SECRET = token
```

## Команды 
1. `npm run dev` для запуска сервера с хот релоудом
2. `npm start` для запуска сервера в прод

## Роуты 
### Работа с пользователем:
1. POST `/user/signup` - регистрация
2. POST `/user/signin` - авторизация
3. GET `/user/` - Профиль
### Работа с командой:
1. POST `/team` - создает команду
2. GET  `/team/:id` - вступить в команду
3. GET `/team` - команда если есть
4. POST `/leave` - выйти из команды
### Работа с задачами команды:
1. POST `/task/` - добавить задачу 
2. DELETE `/task/:id` - удалить задачу 
3. GET `/task` - все задачи команды
4. PATCH `/task/:id` - Изменение задачи