# Многоэтапная сборка для оптимизации размера образа

# Этап 1: Установка зависимостей и сборка
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json для кэширования слоев
COPY package*.json ./

# Устанавливаем все зависимости (включая dev для сборки)
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап 2: Production образ с nginx
FROM nginx:alpine AS production

# Копируем собранное приложение из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]