import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import User from "@models/User";

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error("Not signed in");
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      throw new Error("User not found");
    }

    return res.status(200).json(currentUser);

  } catch (error) {
    console.error(error);
    return res.status(500).end()
  }
};

export default getCurrentUser;
