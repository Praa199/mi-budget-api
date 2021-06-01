const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  data: [
    {
      Object: {
        type: Schema.Types.ObjectId,
        ref: "Budget",
      },
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
