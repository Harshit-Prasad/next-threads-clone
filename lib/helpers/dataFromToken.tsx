import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function dataFromToken() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decodedToken.id) {
      return decodedToken;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
