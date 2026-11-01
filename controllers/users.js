const User = require("../models/user");

const getUsers = (request, response) => {
  return User.find({})
    .then((users) => {
      response.status(200).send(users);
    })
    .catch(() => {
      response.status(500).send({ message: "Что-то пошло не так" });
    });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  return User.findById(user_id)
    .then((user) => {
      if (!user) {
        response.status(404).send({ message: "Пользователь не найден" });
        return;
      }
      response.status(200).send(user);
    })
    .catch(() => {
      response.status(404).send({ message: "Пользователь не найден" });
    });
};

const createUser = (request, response) => {
  const { name, surname, username } = request.body;
  return User.create({ name, surname, username })
    .then((user) => {
      response.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        response.status(400).send({ message: err.message });
        return;
      }
      response.status(500).send({ message: "Что-то пошло не так" });
    });
};

const updateUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndUpdate(
    user_id,
    { ...request.body },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        response.status(404).send({ message: "Пользователь не найден" });
        return;
      }
      response.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        response.status(400).send({ message: err.message });
        return;
      }
      response.status(404).send({ message: "Пользователь не найден" });
    });
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndDelete(user_id)
    .then((user) => {
      if (!user) {
        response.status(404).send({ message: "Пользователь не найден" });
        return;
      }
      response.status(204).send();
    })
    .catch(() => {
      response.status(404).send({ message: "Пользователь не найден" });
    });
};

const takeBook = (request, response) => {
  const { user_id } = request.params;
  const { book_id } = request.body;
  return User.findByIdAndUpdate(
    user_id,
    { $addToSet: { books: book_id } },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        response.status(404).send({ message: "Пользователь не найден" });
        return;
      }
      response.status(200).send(user);
    })
    .catch(() => {
      response.status(404).send({ message: "Пользователь не найден" });
    });
};

const returnBook = (request, response) => {
  const { user_id, book_id } = request.params;
  return User.findByIdAndUpdate(
    user_id,
    { $pull: { books: book_id } },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        response.status(404).send({ message: "Пользователь не найден" });
        return;
      }
      response.status(204).send();
    })
    .catch(() => {
      response.status(404).send({ message: "Пользователь не найден" });
    });
};

const getUserBooks = (request, response) => {
    const { user_id } = request.params;
    return User.findById(user_id)
        .populate('books')
        .then((user) => {
            if (!user) {
                response.status(404).send({ message: 'Пользователь не найден' });
                return;
            }
            response.status(200).send(user.books);
        })
        .catch(() => {
            response.status(404).send({ message: 'Пользователь не найден' });
        });
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, takeBook, returnBook, getUserBooks };
