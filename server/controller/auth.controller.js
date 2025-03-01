import User from "../module/user.module.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errormsg } from "../utilzation/404.js";
import RegistrationModel from "../module/Registration.module.js";
import { sendRegistrationEmail } from "../utilzation/sendemail.js";
import Post from "../module/newpost.module.js";
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    next(errormsg(400, "All are required"));
  }
  const hashpassword = bcryptjs.hashSync(password, 10);
  const user = new User({
    name,
    email,
    password: hashpassword,
  });
  try {
    await user.save();
    res.json("signup successfully");
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errormsg(400, "All are required"));
  }
  try {
    const client = await User.findOne({ email });
    if (!client) {
      return next(errormsg(400, "User not exitisting"));
    }
    const vaildpassword = bcryptjs.compareSync(password, client.password);
    if (!vaildpassword) {
      return next(errormsg(400, "Invaild password"));
    }
    const usertoken = jwt.sign(
      { id: client._id, isAuth: client.isAuth },
      process.env.JWT_SECERT_KEY
    );
    const { password: pass, ...rest } = client._doc;
    res
      .status(200)
      .cookie("access_token", usertoken, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const googleprovider = async (req, res, next) => {
  const { email, name, photourl } = req.body;
  try {
    const client = await User.findOne({ email });
    if (client) {
      const usetoken = jwt.sign(
        { id: client._id, isAuth: client.isAuth },
        process.env.JWT_SECERT_KEY
      );
      const { password, ...rest } = client._doc;
      res
        .status(200)
        .cookie("access_token", usetoken, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatepassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashpassword = bcryptjs.hashSync(generatepassword, 10);
      const newclient = new User({
        name:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashpassword,
        profilephoto: photourl,
      });
      await newclient.save();
      const usetoken = jwt.sign(
        { id: newclient._id, isAuth: newclient.isAuth },
        process.env.JWT_SECERT_KEY
      );
      const { password, ...rest } = newclient._doc;
      res
        .status(200)
        .cookie("access_token", usetoken, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const registermailsubmit = async (req, res, next) => {
    try {
        const { name, email, workcollegename, contactnumber, postslug } = req.body;

        if (!name || !email || !workcollegename || !contactnumber || !postslug) {
            return next(errormsg(400, "All fields are required"));
        }

        const formattedSlug = postslug.trim().toLowerCase().replace(/\s+/g, "-");

        const post = await Post.findOne({ slug: formattedSlug });
        if (!post) {
            return next(errormsg(404, "Post not found"));
        }

        const existingRegistration = await RegistrationModel.findOne({ email, postslug: formattedSlug });
        if (existingRegistration) {
            return next(errormsg(400, "You are already registered for this course."));
        }
        const newRegistration = new RegistrationModel({
            name,
            email: email.toLowerCase(),
            workcollegename,
            contactnumber,
            postslug: formattedSlug,
        });

        await newRegistration.save();
        const emailSent = await sendRegistrationEmail(email, name, post.title);
        if (!emailSent) {
            return next(errormsg(500, "Registration successful, but email failed to send."));
        }

        return res.status(201).json({
            message: "Registration successful! Confirmation email sent.",
        });

    } catch (error) {
        console.error("Registration Error:", error);
        next(error);
    }
};