import DataCard from "components/DataCard";
import KeyboardHeatMap from "components/KeyboardHeatMap";
import { getServerSession } from "lib/getServerSession";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface Props {
  user: User;
}

const data = [
  {
    month: "Oct",
    value: 8,
  },
  {
    month: "Nov",
    value: 16,
  },
  {
    month: "Dec",
    value: 12,
  },
  {
    month: "Jan",
    value: 26,
  },
];

const Dashboard: NextPage<Props> = ({ user }) => {
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
            value={23}
            unit="days"
          />
          <DataCard
            title="Days Active"
            iconPath="/calendar-icon.svg"
            iconAlt="calendar icon"
            value={53}
            unit="days"
          />
          <DataCard
            title="Speed"
            iconPath="/progress-icon.svg"
            iconAlt="icon showing progress"
            value={27}
            unit="wpm"
            large
            graphColor="#FA5B8E"
            graphData={data}
          />
          <DataCard
            title="Average Rating"
            iconPath="/star-icon.svg"
            iconAlt="star icon"
            value={4}
            unit=""
            rating
          />
          <DataCard
            title="Completed"
            iconPath="/document-icon.svg"
            iconAlt="document icon"
            value={42}
            unit="lessons"
          />
          <DataCard
            title="Accuracy"
            iconPath="/tick-icon.svg"
            iconAlt="tick icon"
            value={89}
            unit="%"
            large
            graphColor="#7CE25C"
            graphData={data}
          />
        </div>
        <div className="mt-11 flex justify-center">
          <KeyboardHeatMap />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getServerSession(req);
  if (user)
    return {
      props: {
        user,
      },
    };
  else
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
};

export default Dashboard;
