const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
  },
  books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'book',
        },
    ],
});

module.exports = model("user", userSchema);
