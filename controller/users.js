import User from "../schema/User.js";

async function Users(req, res) {
  const users = await User.find();
  res.json(users);
}

async function SingleUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({ error: "No such user exist" });
  }
}
export { Users, SingleUser };
