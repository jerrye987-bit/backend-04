const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

dotenv.config();

const PORT = process.env.PORT || 3005;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/backend04";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log(`Ошибка подключения к MongoDB: ${err}`));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRouter);
app.use(bookRouter);

app.use((request, response) => {
  response.status(404).send({ message: "Роут не найден" });
});

app.use((err, request, response, next) => {
  response.status(500).send({ message: "Что-то пошло не так" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});
