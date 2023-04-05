import DataCard from "components/DataCard";
import Keyboard from "components/Keyboard";
import Rating from "components/Rating";
import addColorsToKeyboardLayout from "helpers/client/addColorsToKeyboardLayout";
import getBlankKeyboard from "helpers/server/getBlankKeyboard";
import round from "helpers/shared/round";
import Link from "next/link";

interface SearchParams {
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  wpm?: string;
  accuracy?: string;
  incorrectKeys?: string[];
  correctKeys?: string[];
  lessonName?: string;
  courseName?: string;
}

/**
 * @Path /results
 */
export default async function Results({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const rating = searchParams?.rating ?? 0;
  const wpm = searchParams?.wpm ?? "0";
  const accuracy = parseInt(searchParams?.accuracy ?? "0");
  const incorrectKeys: string[] = searchParams?.incorrectKeys ?? [];
  const correctKeys: string[] = searchParams?.correctKeys ?? [];
  const lessonName = searchParams?.lessonName ?? "";
  const courseName = searchParams?.courseName ?? "";

  const keyboardLayout = await getBlankKeyboard();

  const coloredKeyboardLayout = addColorsToKeyboardLayout(
    keyboardLayout,
    correctKeys,
    undefined,
    incorrectKeys
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl text-center mb-6">
          {rating > 2 ? "Well done!!" : "Practice makes perfect!"}
        </h1>
        <div className="flex mb-12">
          <Rating value={rating} size="large" />
        </div>
        <div className="flex justify-between w-[620px] mb-8">
          <div className="w-60">
            <DataCard
              title="Speed"
              iconPath="/progress-icon.svg"
              iconAlt="icon showing progress"
              value={wpm}
              unit="wpm"
            />
          </div>
          <div className="w-60">
            <DataCard
              title="Accuracy"
              iconPath="/tick-icon.svg"
              iconAlt="tick icon"
              value={round(accuracy * 100).toString()}
              unit="%"
            />
          </div>
        </div>
        <div>
          <Keyboard layout={coloredKeyboardLayout} />
          <div className="flex justify-between mt-12">
            <Link
              href={`/courses/${courseName}/${lessonName}`}
              className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center w-56 h-11 flex items-center justify-center"
            >
              Try Again
            </Link>
            <Link
              href={`/courses/${courseName}`}
              className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center w-56 h-11 flex items-center justify-center"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
