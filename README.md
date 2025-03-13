<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" />
</p>



## IoT Data Management System

A Nestjs application that processes x-ray data from IoT devices using RabbitMQ, stores processed information, and provides API endpoints for data retrieval and analysis.



## Getting Started

1.Clone the `repo` using the following command:
   ```sh
   git clone https://github.com/alireza-msvi13/iot-dms.git
   ```
2.Install all required dependencies using npm:
   ```sh
   npm instal
   ```
3.Create .env file and set these
   ```sh
   # rabbitmq
   RABBITMQ_USERNAME=
   RABBITMQ_PASSWORD=
   RABBITMQ_URL=amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@rabbitmq:5672

   # mongo
   MONGO_URI=mongodb://mongo:27017/iot-dms
   MONGO_EXPRESS_USER=
   MONGO_EXPRESS_PASS=

   # apps port
   PRODUCER_PORT=4000
   CONSUMER_PORT=5000
     
   ```


3.Start Project with Docker:
   ```sh
   docker-compose up -d
   ```

## Api document

Swagger API documentation => `http://localhost:CONSUMER_PORT/v1/api-docs`

## Keep in touch with me

If you have any questions or find any 🪲 you can easily send me a message

<a href="https://t.me/Alireza_msvi13" target="blank"><img align="center" src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" height="30" width="40" /></a>
