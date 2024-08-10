import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }
  return {
    user: session.user,
    userId: session.id,
  };

  // try {
  // } catch (error) {
  //   console.error(error);
  //   return null;
  // }
};
