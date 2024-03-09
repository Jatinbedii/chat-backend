import User from "../schema/User.js";

async function Users(req, res) {
  const users = await User.find();
  res.json(users);
}

export { Users };
