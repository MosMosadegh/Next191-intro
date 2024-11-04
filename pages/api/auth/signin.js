import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import { generateToken, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    await connectToDb();
    const { identifier, password } = req.body;

    //Validation
    if (!identifier.trim() || !password.trim()) {
      return res.status(422).json({ message: "Data is not valid" });
    }

    //1-isUser Exist
    //3-Generation Token
    //4-Create

    const user = await UserModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(422).json({ message: "User not found" });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(422)
        .json({ message: "userName or password is not correct !!" });
    }
    const token = generateToken({ email: user.email });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
        })
      )
      .status(200)
      .json({ message: "User Logged In successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error Login User ", error });
  }
};
export default handler;
