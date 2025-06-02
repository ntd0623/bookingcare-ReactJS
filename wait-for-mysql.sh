#!/bin/sh

echo "⏳ Đợi MySQL sẵn sàng..."
until mysqladmin ping -h"$DB_HOST" --silent; do
  sleep 2
done

echo "✅ MySQL đã sẵn sàng!"

echo "🚀 Chạy migrate Sequelize..."
npx sequelize-cli db:migrate

echo "✅ Migrate xong. Khởi động backend..."

npm run build-src

node build/server.js

