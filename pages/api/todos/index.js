import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import TodoModel from "@/models/Todo";

const handler = async (req, res) => {
  await connectToDb();
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "You are not login !!" });
  }
  const tokenPayload = verifyToken(token);
  if (!tokenPayload) {
    return res.status(401).json({ message: "You are not login !!" });
  }
  const user = await UserModel.findOne({
    email: tokenPayload.email,
  });

  if (req.method == "GET") {
    const todos = await TodoModel.find({user: user._id})
    return res.json(todos)
  } else if (req.method == "POST") {
    try {
      const { title, isCompleted } = req.body;
      const newTodo = {
        title,
        isCompleted,
        user: user._id,
      };
      await TodoModel.create(newTodo);

      return res.status(201).json({ message: "Todo Create Successfully :))" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Unknown Internal Server Error ", err });
    }
  } 
};
export default handler;
