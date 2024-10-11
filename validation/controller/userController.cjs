const { body, validationResult } = require("express-validator");
const userStorage = require("../storage/userStorage.cjs");

const alphaError = "must only contain letters.";
const lengthError = "must be between 2 to 10 characters.";
const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First Name ${alphaError}`)
    .isLength({ min: 2, max: 10 })
    .withMessage(`First Name ${lengthError}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`First Name ${alphaError}`)
    .isLength({ min: 2, max: 10 })
    .withMessage(`First Name ${lengthError}`),
];

exports.userListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: userStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", { title: "Create User" });
};

exports.userCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("createUser", { title: "Create User", errors: errors.array() });
    } else {
      const { firstName, lastName } = req.body;
      userStorage.addUser({ firstName, lastName });
      res.redirect("/");
    }
  },
];

exports.userUpdateGet = (req, res) => {
  const id = req.params.id;
  const user = userStorage.getUser(id);
  if (!user) {
    res.status(404).render("404");
  } else {
    const { firstName, lastName } = userStorage.getUser(id);

    res.render("updateUser", {
      title: "Update User",
      id: id,
      firstName: firstName,
      lastName: lastName,
    });
  }
};

exports.userUpdatePost = [
  validateUser,
  (req, res) => {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "updateUser",
        id: id,
        firstName: firstName,
        lastName: lastName,
        errors: errors.array(),
      });
    } else {
      userStorage.updateUser(id, { firstName, lastName });
      res.redirect("/");
    }
  },
];

exports.userDeletePost = (req, res) => {
  const userId = req.params.id;
  userStorage.deleteUser(userId);
  res.redirect("/");
};
