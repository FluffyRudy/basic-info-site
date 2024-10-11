const { body, validationResult } = require("express-validator");

const birthdatete = body("birthdate", "Must be valid date")
  .optional({
    values: "falsy",
  })
  .isISO8601();

console.log(birthdatete);
