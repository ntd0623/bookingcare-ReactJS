# Phiên bản nodeJS
FROM node:14-alpine

# Thư mục làm việc
WORKDIR /dohocit/backend

# Cài curl và mysql-client để kiểm tra kết nối DB
RUN apk add --update npm curl mysql-client

# Copy package.json & cài dependencies
COPY package*.json ./
RUN npm install

# Cài babel nếu có dùng
RUN npm install -g @babel/core @babel/cli

# Copy toàn bộ mã nguồn
COPY . .

# Copy file shell script
COPY wait-for-mysql.sh ./wait-for-mysql.sh
RUN chmod +x ./wait-for-mysql.sh

# Gọi script khởi động backend
CMD ["./wait-for-mysql.sh"]
