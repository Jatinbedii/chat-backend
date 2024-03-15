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
async function ChangePFP(req, res) {
  try {
    const { id, image } = req.body;
    const user = await User.findById(id);
    user.profile = image;
    await user.save();

    res.json(user);
  } catch (error) {
    res.json({ error: "unexpected error" });
  }
}
export { ChangePFP, Users, SingleUser };
