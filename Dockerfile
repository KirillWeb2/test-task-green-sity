# образ
FROM node:20.16.0

# рабочая директория
WORKDIR /app

# копируем указанные файлы в корень контейнера
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

# устанавливаем зависимости
RUN pnpm install

# копируем остальные файлы в корень контейнера
COPY . .

# устанавливаем переменную
ENV NODE_ENV=production

# выполняем сборку приложения
RUN pnpm run build

# выставляем порт
EXPOSE 3000

# запускаем приложение
CMD ["npm", "start"]