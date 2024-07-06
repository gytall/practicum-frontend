# Используем официальный образ Node.js с Alpine Linux
FROM node:14-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY practicum-frontend/package.json practicum-frontend/package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все исходные файлы из директории practicum-frontend в контейнер
COPY practicum-frontend/ .

# Собираем приложение React
RUN npm run build

# Экспонируем порт 3000 для внешнего доступа
EXPOSE 3000

# Команда для запуска приложения React в контейнере
CMD ["npm", "start"]
