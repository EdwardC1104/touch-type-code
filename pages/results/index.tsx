import DataCard from "components/DataCard";
import KeyboardHeatMap from "components/KeyboardHeatMap";
import Rating from "components/Rating";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  wpm: number;
  accuracy: number;
  heatmap: [];
}

const Profile: NextPage<Props> = ({ wpm, accuracy, rating }) => {
  const router = useRouter();

  const onTryAgain = () => {
    router.back();
  };

  const onContinue = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Results</title>
      </Head>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl text-center mb-6">
          {rating > 2 ? "Well done!!" : "Practice makes perfect!"}
        </h2>
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
              value={accuracy * 100}
              unit="%"
            />
          </div>
        </div>
        <div>
          <KeyboardHeatMap />
          <div className="flex justify-between mt-12">
            <button
              onClick={onTryAgain}
              className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center w-56 h-11"
            >
              Try Again
            </button>
            <button
              onClick={onContinue}
              className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center w-56 h-11"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);

  if (
    query?.hasOwnProperty("rating") &&
    query?.hasOwnProperty("wpm") &&
    query?.hasOwnProperty("accuracy") //&&
    // query?.hasOwnProperty("heatmap")
  )
    return {
      props: { ...query },
    };
  else
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
};

export default Profile;
