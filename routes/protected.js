const router = require("express").Router();
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Budget = require("../models/Budget.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/table/:budgets", (req, res) => {
  const userId = req.params.budgets;
  console.log("req.params***", userId);
  // we dont want to throw an error, and just maintain the user as null
  // if (!req.headers.authorization) {
  //   return res.json(null);
  // }

  // accessToken is being sent on every request in the headers
  // const accessToken = req.headers.authorization;

  Budget.find({ user: userId })
    // .populate("budget")
    .then((response) => {
      console.log("budgets**", response);
      if (!response) {
        //   return res
        //     .status(404)
        //     .json({ errorMessage: "Budget not not found***" });
      }
      return res.status(200).json(response);
    });
});

router.get("/table/single/:singleBudget", (req, res, next) => {
  let id = req.params.singleBudget;
  console.log("req.params ln 34**", req.params.singleBudget);
  Budget.findById(id)
    .populate("income")
    .then((single) => {
      console.log("single**", single);
      res.json(true);
    })
    .catch((err) => {
      console.log("error showing budget***", err);
    });
});

router.post("/form", (req, res, next) => {
  // console.log("req**", req.body.user.budget);
  const {
    month,
    passive,
    active,
    otherIncome,
    fixed,
    variable,
    periodic,
    otherExpenses,
  } = req.body;
  console.log("month**", req.body);

  Budget.findOne({ month }).then((found) => {
    if (found) {
      return res.json(found);
    }
    Budget.create({
      // month: month,
      // passive: passive,
      // active: active,
      // otherIncome: otherIncome,
      // fixed: fixed,
      // variable: variable,
      // periodic: periodic,
      // otherExpenses: otherExpenses,
      // user: req.body.user._id,
      // month,
      // passive,
      // active,
      // otherIncome,
      // fixed,
      // variable,
      // periodic,
      // otherExpenses,
      month,
      income: {
        passive,
        active,
        otherIncome,
      },
      expenses: {
        fixed,
        variable,
        periodic,
        otherExpenses,
      },
      user: req.body.user._id,
    })
      .then((createdBudget) => {
        console.log("createdBudget**", createdBudget);
        // res.redirect(`/profile`);
      })
      .catch((err) => {
        console.log("createdBudget error***", err);
      });
  });
});

module.exports = router;
