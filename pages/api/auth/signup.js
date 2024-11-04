import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }
  try {
    await connectToDb();
    const { firstName, lastName, userName, email, password } = req.body;

    //Validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !userName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(422).json({ message: "Data is not valid" });
    }

    //1-isUser Exist
    //2-Hash Password
    //3-Generation Token
    //4-Create

    const isUserExist = await UserModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserExist) {
      return res
        .status(422)
        .json({ message: "This userName Or email exist already" });
    }

    const hashedPassword = await hashPassword(password);

    const token = generateToken({ email });
    const users = await UserModel.find({});

    await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
    });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
        })
      )
      .status(201)
      .json({ message: "User Join successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unknown Internal Server Error ", error });
  }
};
export default handler;
