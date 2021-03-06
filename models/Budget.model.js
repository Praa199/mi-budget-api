const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const budgetModel = new Schema({
  month: String,
  income: {
    passive: Number,
    active: Number,
    otherIncome: Number,
  },
  expenses: {
    fixed: Number,
    variable: Number,
    periodic: Number,
    otherExpenses: Number,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Budget = model("Budget", budgetModel);

module.exports = Budget;
