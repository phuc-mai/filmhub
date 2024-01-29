import { getServerSession } from "next-auth"
import { options } from "@app/api/auth/[...nextauth]/option"
import User from "@models/User";

export const fetchMyList = async () => {
  const session = await getServerSession(options)

  if (!session?.user?.email) {
    throw new Error('No user log in');
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  return user.favorites;
}