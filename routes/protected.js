const router = require("express").Router();
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Budget = require("../models/Budget.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/table", (req, res) => {
  // console.log("undefined?***", req.session);
  // we dont want to throw an error, and just maintain the user as null
  // if (!req.headers.authorization) {
  //   return res.json(null);
  // }

  // accessToken is being sent on every request in the headers
  // const accessToken = req.headers.authorization;

  Budget.find({})
    // .populate("budget")
    .then((response) => {
      console.log("budget**", response);
      if (!response) {
        //   return res
        //     .status(404)
        //     .json({ errorMessage: "Budget not not found***" });
      }
      return res.status(200).json(response);
    });
});

router.post("/form", isLoggedIn, (req, res, next) => {
  console.log("req**", req);
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

  Budget.findOne({ month }).then((found) => {
    if (found) {
      return res.render("posting/post-form", {
        errorMessage: "This post month exists already",
      });
    }
    PostingModel.create({
      month,
      passive,
      active,
      otherIncome,
      fixed,
      variable,
      periodic,
      otherExpenses,
      creator: req.session.user._id,
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

router.get("/:month/table", (req, res, next) => {
  let month = req.params.month;
  Budget.findOne({ month })
    .then((budget) => {
      console.log("budget", budget);
    })
    .catch((err) => {
      console.log("error showing budget***", err);
    });
});

module.exports = router;
