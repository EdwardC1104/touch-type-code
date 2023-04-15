"use client";

import DataCard from "components/DataCard";
import Keyboard from "components/Keyboard";
import generateKeyboardHeatmap from "helpers/generateKeyboardHeatmap";
import getDashboardData from "helpers/getDashboardData";
import round from "helpers/round";
import { useAuthContext } from "hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { use } from "react";

/**
 * @Path /dashboard
 */
const Dashboard = () => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  if (!user && !isLoading) router.replace("/login");
  if (!user) return null;

  const {
    averageRating,
    numberCompleted,
    daysActive,
    streak,
    speed,
    accuracy,
    speedGraphData,
    accuracyGraphData,
  } = use(getDashboardData(user.uid));

  const keyboardLayout = use(generateKeyboardHeatmap(user.uid));

  return (
    <>
      <div>
        <div className="grid grid-cols-4 grid-flow-col gap-10">
          <DataCard
            title="Streak"
            iconPath="/clock-icon.svg"
            iconAlt="clock icon"
            value={streak.toString()}
            unit="days"
          />
          <DataCard
            title="Days Active"
            iconPath="/calendar-icon.svg"
            iconAlt="calendar icon"
            value={daysActive.toString()}
            unit="days"
          />
          <DataCard
            title="Speed"
            iconPath="/progress-icon.svg"
            iconAlt="icon showing progress"
            value={speed.toString()}
            unit="wpm"
            large
            graphColor="#FA5B8E"
            graphData={speedGraphData}
          />
          <DataCard
            title="Average Rating"
            iconPath="/star-icon.svg"
            iconAlt="star icon"
            value={averageRating.toString()}
            unit=""
            rating
          />
          <DataCard
            title="Completed"
            iconPath="/document-icon.svg"
            iconAlt="document icon"
            value={numberCompleted.toString()}
            unit="lessons"
          />
          <DataCard
            title="Accuracy"
            iconPath="/tick-icon.svg"
            iconAlt="tick icon"
            value={round(accuracy * 100).toString()}
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

export default Dashboard;
