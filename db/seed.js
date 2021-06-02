const mongoose = require("mongoose");

const Budget = require("../models/Budget.model");

const datasArray = [
  {
    month: "june",
    income: {
      passive: 5,
      active: 5,
      otherIncome: 5,
    },
    expenses: {
      fixed: 5,
      variable: 5,
      periodic: 5,
      otherExpenses: 5,
    },
  },
  {
    month: "july",
    income: {
      passive: 5,
      active: 5,
      otherIncome: 5,
    },
    expenses: {
      fixed: 5,
      variable: 5,
      periodic: 5,
      otherExpenses: 5,
    },
  },
  {
    month: "august",
    income: {
      passive: 5,
      active: 5,
      otherIncome: 5,
    },
    expenses: {
      fixed: 5,
      variable: 5,
      periodic: 5,
      otherExpenses: 5,
    },
  },
];

mongoose.connect("mongodb://localhost/my-personal-budget").then(() => {
  console.log("CONNECTED WITH STUFF");
  Budget.insertMany(datasArray).then(() => {
    console.log("ADDED STUFF");
    mongoose.disconnect();
    console.log("DISCONNECTED STUFF");
  });
});
