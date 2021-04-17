const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const UserSchema = require("../models/schemas/user");

function createToken(user) {
  const payload = {
    subject: user.emai,
    username: user.name,
  };

  const options = {
    expiresIn: "1d",
  };

  const result = jwt.sign(payload, process.env.SECRET, options);

  return result;
}

function routes() {
  router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    const newUser = new UserSchema(user);

    newUser
      .save()
      .then((saved) => {
        const token = createToken(user);

        res.status(201).json({
          success: true,
          user: {
            name: saved.name,
            email: saved.email,
            age: saved.age,
            token,
          },
        });
      })
      .catch((err) =>
        res.status(500).json({ success: false, error: err.message })
      );
  });

  router.post("/login", async (req, res) => {
    try {
      let user = req.body;
      const existingUser = await UserSchema.findOne({ email: user.email });

      if (!existingUser) {
        res.status(400).json({ success: false, error: "User does not exist" });
      }

      const passwordsMatch = await bcrypt.compare(
        user.password,
        existingUser.password
      );

      if (!passwordsMatch) {
        res.status(400).json({ success: false, error: "Bad Credentials" });
      }

      const token = createToken(existingUser);

      res.status(200).json({
        success: true,
        user: {
          name: existingUser.name,
          email: existingUser.email,
          age: existingUser.age,
          token,
        },
      });
    } catch (e) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}

module.exports = routes;
