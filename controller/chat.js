import Message from "../schema/Message.js";

async function SendMessage(req, res) {
  try {
    const { id, to, message } = req.body;

    const myMessage = Message({
      message,
      from: id,
      to: to,
    });
    await myMessage.save();
    res.status(201).json({ message: "saved" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Unexpected Error" });
  }
}

async function GetChat(req, res) {
  const userone = req.params.userid;
  const usertwo = req.body.id;

  const messages = await Message.find({
    $or: [
      { from: userone, to: usertwo },
      { from: usertwo, to: userone },
    ],
  }).exec();

  res.json(messages);
}
export { GetChat, SendMessage };
