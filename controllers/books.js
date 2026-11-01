const Book = require("../models/book");

const getBooks = (request, response) => {
  return Book.find({})
    .then((books) => {
      response.status(200).send(books);
    })
    .catch(() => {
      response.status(500).send({ message: "Что-то пошло не так" });
    });
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findById(book_id)
    .then((book) => {
      if (!book) {
        response.status(404).send({ message: "Книга не найдена" });
        return;
      }
      response.status(200).send(book);
    })
    .catch(() => {
      response.status(404).send({ message: "Книга не найдена" });
    });
};

const createBook = (request, response) => {
  const { title, author, year } = request.body;
  return Book.create({ title, author, year })
    .then((book) => {
      response.status(201).send(book);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        response.status(400).send({ message: err.message });
        return;
      }
      response.status(500).send({ message: "Что-то пошло не так" });
    });
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndUpdate(
    book_id,
    { ...request.body },
    { new: true, runValidators: true },
  )
    .then((book) => {
      if (!book) {
        response.status(404).send({ message: "Книга не найдена" });
        return;
      }
      response.status(200).send(book);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        response.status(400).send({ message: err.message });
        return;
      }
      response.status(404).send({ message: "Книга не найдена" });
    });
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) {
        response.status(404).send({ message: "Книга не найдена" });
        return;
      }
      response.status(204).send();
    })
    .catch(() => {
      response.status(404).send({ message: "Книга не найдена" });
    });
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
