import DataCard from "components/DataCard";
import Keyboard from "components/Keyboard";
import { getServerSession } from "lib/getServerSession";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const data: [] = [
  // {
  //   month: "Oct",
  //   value: 8,
  // },
  // {
  //   month: "Nov",
  //   value: 16,
  // },
  // {
  //   month: "Dec",
  //   value: 12,
  // },
  // {
  //   month: "Jan",
  //   value: 26,
  // },
];

const Dashboard: NextPage = () => {
  const [streak, setStreak] = useState(0);
  const [daysActive, setDaysActive] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [numberCompleted, setNumberCompleted] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setAverageRating(data.averageRating);
      setNumberCompleted(data.numberCompleted);
    };

    fetchDashboardData();
  }, []);

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
            graphData={data}
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
            value={accuracy}
            unit="%"
            large
            graphColor="#7CE25C"
            graphData={data}
          />
        </div>
        <div className="mt-11 flex justify-center">
          <Keyboard greenKeys={[]} orangeKeys={[]} redKeys={[]} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getServerSession(req);
  if (user)
    return {
      props: {},
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
