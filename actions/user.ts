import { getServerSession } from "next-auth"
import { options } from "@app/api/auth/[...nextauth]/option"
import User from "@models/User";
import { connectToDB } from "@lib/mongoDB";

export const fetchMyList = async () => {
  const session = await getServerSession(options)

  if (!session?.user?.email) {
    throw new Error('No user log in');
  }

  await connectToDB();
  
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  return user.favorites;
}