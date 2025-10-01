# 👥 Users Service — Сервис управления пользователями 🔑🚀

Users Service — это REST API для работы с пользователями: регистрация, авторизация, роли (USER/ADMIN) и управление доступом.  
Проект выполнен на **TypeScript + Express + Prisma + PostgreSQL**.  

---

## 🚀 О проекте
Сервис позволяет:
- 📝 Регистрировать пользователей  
- 🔐 Авторизовываться через JWT  
- 🔎 Получать данные о пользователях (себя или всех — в зависимости от роли)  
- ⛔ Блокировать пользователей (админ может всех, пользователь только себя)  

Это тестовое задание, но структура и код оформлены с учётом лучших практик. 💻✨

---

## 🔥 Ключевые возможности
- 🆕 Регистрация пользователей с валидацией Email (уникальность)  
- 🔑 Авторизация через **JWT**  
- 👤 Роли: **USER** и **ADMIN**  
- 📋 Получение списка пользователей (только для админов)  
- 📴 Блокировка пользователей (админ или сам пользователь)  
- ⚡ Чистая структура проекта и работа с БД через **Prisma ORM**  

---

## 🛠️ Технологии
| 🧰 Технология | 📋 Назначение |
|---------------|--------------|
| ⚡ Express | Web-фреймворк для Node.js |
| 📝 TypeScript | Статическая типизация |
| 🗄 Prisma ORM | Работа с PostgreSQL |
| 🐘 PostgreSQL | Реляционная база данных |
| 🔐 JWT | Авторизация и аутентификация |

---

## 📦 Установка и запуск

### 1️⃣ Клонировать репозиторий
    git clone https://github.com/Killerka769/test-task2
    cd users-service
### 2️⃣ Установить зависимости
    npm install
### 3️⃣ Настроить окружение
Создайте файл .env в корне проекта и укажите свои данные:

    DATABASE_URL="postgresql://postgres:123123@localhost:5432/tz?schema=public"
    JWT_SECRET="supersecretkey123"
    PORT=4000
### 4️⃣ Накатить миграции
    npx prisma migrate dev --name init
### 5️⃣ Запустить сервер
    npm run dev
    
Сервис будет доступен по адресу:
👉 http://localhost:4000

## 🔗 API Endpoints
📝 Регистрация

    curl -X POST http://localhost:4000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"fullName":"Иван Иванов","birthDate":"2005-01-01","email":"ivan@example.com","password":"secret123"}'

🔑 Авторизация (логин)

    curl -X POST http://localhost:4000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"ivan@example.com","password":"secret123"}'

👤 Получение пользователя по ID

    curl -H "Authorization: Bearer <TOKEN>" \
    http://localhost:4000/api/users/<USER_ID>

📋 Получение списка пользователей (только админ)

    curl -H "Authorization: Bearer <ADMIN_TOKEN>" \
    http://localhost:4000/api/users

⛔ Блокировка пользователя

    curl -X POST -H "Authorization: Bearer <TOKEN>" \
    http://localhost:4000/api/users/<USER_ID>/block

## 🚩 Роли

👤 USER — может видеть и блокировать только себя

🛡 ADMIN — полный доступ к пользователям

## 📌 Дополнительно

🔧 Файл .env.example в проекте поможет быстро настроить окружение

📖 В README.md описаны все шаги для запуска

🗄 Схема БД в prisma/schema.prisma

🔥 Проект выполнен как тестовое задание для **Effective Mobile**, но может быть расширен в боевое приложение.


