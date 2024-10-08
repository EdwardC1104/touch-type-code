"use client";

import StarRating from "components/StarRating";
import fetchBestLessonResult from "data/fetchBestLessonResult";
import { useAuthContext } from "hooks/useAuthContext";
import Link from "next/link";
import { use } from "react";

interface Props {
  uid: string;
  name: number;
  description: string;
  background: string;
  courseName: string;
}

const LessonCard = ({
  name,
  description,
  background,
  uid,
  courseName,
}: Props) => {
  const { user } = useAuthContext();

  let result = null;
  if (user) result = use(fetchBestLessonResult(user?.uid, uid, courseName));
  const rating = result?.rating ?? null;

  return (
    <div
      key={name}
      className="bg-neutral-900 rounded-2xl sm:w-[16rem] w-full my-4 drop-shadow-lg flex flex-col mx-12"
    >
      <div
        className="w-full flex justify-center items-center flex-col rounded-t-3xl rounded-b-lg shadow-md"
        style={{ background }}
      >
        <h2 className="font-bold font-mono text-9xl mt-6 mb-1 text-white/50 text-center">
          {name}
        </h2>
        <h3 className="font-bold font-mono text-xl text-white/50 mb-4 text-center">
          {description}
        </h3>
      </div>
      <div className="flex justify-between items-center py-3 px-4 flex-row-reverse">
        <Link
          href={`/courses/${courseName}/${name}`}
          className="font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 py-0.5 px-5 rounded-lg text-center max-w-fit self-end"
        >
          {rating ? "Repeat" : "Begin"}
        </Link>
        {typeof rating === "number" && <StarRating rating={rating} />}
      </div>
    </div>
  );
};

export default LessonCard;
