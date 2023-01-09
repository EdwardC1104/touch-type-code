import Database from "classes/server/Database";
import { NextApiRequest, NextApiResponse } from "next";

const addResult = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Adding lesson result");

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { userId, lessonId, rating, wpm, accuracy, dateStarted, keys } =
    req.body;

  if (
    !userId ||
    !lessonId ||
    !rating ||
    !wpm ||
    !accuracy ||
    !dateStarted ||
    !keys
  )
    return res.status(400).json({ error: "Missing required parameters" });

  await Database.addLessonResult(
    userId,
    lessonId,
    rating,
    wpm,
    accuracy,
    dateStarted,
    keys
  );

  console.log("Added lesson result");

  return res.status(200).json({ message: "Success" });
};

export default addResult;
