import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Must enter a password",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail) {
      return res
        .status(401)
        .json({ errorMessage: "email or password is invalid" });
    }

    //compares entered password to hashed password in database
    const isMatch = await bcrypt.compare(password, userWithEmail.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "email or password is invalid" });
    }
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    //create a JWT based on our payload and the algo we want
    //set expiration time too
    const token = await new jose.SignJWT({
      email: userWithEmail,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    return res.status(200).json({ token: token });
  }

  return res.status(404).json("Unknown Endpoint");
}
