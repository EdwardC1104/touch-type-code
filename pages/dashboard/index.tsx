import DataCard from "components/DataCard";
import Keyboard from "components/Keyboard";
import generateKeyboardHeatmap from "helpers/server/generateKeyboardHeatmap";
import getDashboardData from "helpers/server/getDashboardData";
import { getServerSession } from "helpers/server/getServerSession";
import round from "helpers/shared/round";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface Props {
  streak: number;
  daysActive: number;
  speed: number;
  averageRating: number;
  numberCompleted: number;
  accuracy: number;
  speedGraphData: { month: string; value: number }[];
  accuracyGraphData: { month: string; value: number }[];
  keyboardLayout: Key[][];
}

const Dashboard: NextPage<Props> = ({
  streak,
  daysActive,
  speed,
  averageRating,
  numberCompleted,
  accuracy,
  speedGraphData,
  accuracyGraphData,
  keyboardLayout,
}) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <div className="grid grid-cols-4 grid-flow-col gap-10">
          <DataCard
            title="Streak"
            iconPath="/clock-icon.svg"
            iconAlt="clock icon"
            value={streak}
            unit="days"
          />
          <DataCard
            title="Days Active"
            iconPath="/calendar-icon.svg"
            iconAlt="calendar icon"
            value={daysActive}
            unit="days"
          />
          <DataCard
            title="Speed"
            iconPath="/progress-icon.svg"
            iconAlt="icon showing progress"
            value={speed}
            unit="wpm"
            large
            graphColor="#FA5B8E"
            graphData={speedGraphData}
          />
          <DataCard
            title="Average Rating"
            iconPath="/star-icon.svg"
            iconAlt="star icon"
            value={averageRating}
            unit=""
            rating
          />
          <DataCard
            title="Completed"
            iconPath="/document-icon.svg"
            iconAlt="document icon"
            value={numberCompleted}
            unit="lessons"
          />
          <DataCard
            title="Accuracy"
            iconPath="/tick-icon.svg"
            iconAlt="tick icon"
            value={round(accuracy * 100)}
            unit="%"
            large
            graphColor="#7CE25C"
            graphData={accuracyGraphData}
          />
        </div>
        <div className="mt-11 flex justify-center">
          <Keyboard layout={keyboardLayout} />
        </div>
      </div>
    </>
  );
};

// Server-side
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getServerSession(req);
  if (!user)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const data = await getDashboardData(user.id);
  const keyboardLayout = await generateKeyboardHeatmap(user.id);

  return {
    props: { ...data, keyboardLayout },
  };
};

export default Dashboard;
