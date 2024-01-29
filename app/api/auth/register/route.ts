import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from "@lib/mongoDB"
import User from "@models/User"
import { hash } from "bcryptjs"

export const POST = async (req: NextApiRequest) => {
  try {
    await connectToDB()
    
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
      return new Response("User already exists!", { status: 409 })
    }

    const hashedPassword = await hash(password, 12)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return new Response(JSON.stringify(newUser), { status: 200 })    
  } catch (err) {
    console.log(err)
    return new Response("Failed to create a new user", { status: 500 })
  }
}