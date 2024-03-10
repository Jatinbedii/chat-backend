import User from "../schema/User.js";
import argon2 from "argon2";
import { createToken } from "../utils/jwt.js";

async function LoginController(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ error: "Fill all the fields" });
  }

  try {
    const user = await User.findOne({ username });
    if (await argon2.verify(user.password, password)) {
      const jwt = createToken(user._id);
      res.status(201).json({ user, jwt });
    } else {
      res.json({ error: "Invalid details" });
    }
  } catch (error) {
    res.json({ error: "Invalid details" });
  }
}

async function RegisterController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ error: "fill all the fields" });
  }

  let pattern = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
  if (pattern.test(username)) {
    return res.json({ error: "Username must include only A-Z to 0-9 letters" });
  }
  const byusername = await User.findOne({ username });
  if (byusername) {
    return res.json({ error: "Username already exist" });
  }
  const byemail = await User.findOne({ email });
  if (byemail) {
    return res.json({ error: "Mail already exist" });
  }
  const hashed = await argon2.hash(password);
  try {
    const user = User({
      password: hashed,
      username,
      email,
    });

    const savedUser = await user.save();
    const token = createToken(savedUser._id);

    res.status(201).json({ user: savedUser, jwt: token });
  } catch (error) {
    res.json({ error: "Unexpected error" });
  }
}
async function SendUser(req, res) {
  const { id } = req.body;
  const user = await User.findById(id);
  res.json(user);
}
export { LoginController, RegisterController, SendUser };
