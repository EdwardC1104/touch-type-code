import Database from "database/Database";
import { getServerSession } from "lib/getServerSession";
import round from "lib/round";
import { NextApiRequest, NextApiResponse } from "next";

const dashboard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const user = await getServerSession(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const lessons = await Database.getLessons(undefined, user.id);

  let averageRating = 0;
  let numberCompleted = 0;
  for (const lesson of lessons) {
    if (typeof lesson.rating !== "undefined") {
      averageRating += lesson.rating;
      numberCompleted += 1;
    }
  }
  averageRating = round(averageRating / numberCompleted);

  return res.status(200).json({
    averageRating,
    numberCompleted,
  });
};

export default dashboard;
