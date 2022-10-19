import Rating from "components/Rating";
import Image from "next/image";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Graph from "./Graph";

interface Props {
  title: string;
  iconPath: string;
  iconAlt: string;
  value: number;
  unit: string;
  large?: boolean;
  rating?: boolean;
  graphData?: {
    month: string;
    value: number;
  }[];
  graphColor?: string;
}

const DataCard = ({
  title,
  iconPath,
  iconAlt,
  value,
  unit,
  large,
  rating,
  graphData,
  graphColor,
}: Props) => {
  return (
    <div className={`relative ${large ? "row-span-2" : ""}`}>
      <div className="absolute top-3 right-5">
        <Image src={iconPath} width={37} height={37} alt={iconAlt} />
      </div>
      <div
        className={`rounded-xl glass-background backdrop-blur-2xl drop-shadow-xl ${
          large ? "h-[360px]" : "h-40"
        }`}
      >
        <div className="h-40 px-5 py-3 flex flex-col">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-medium mt-2">{title}</h2>
            <Image src={iconPath} width={37} height={37} alt={iconAlt} />
          </div>
          <div className="flex-1 flex items-center">
            {rating ? (
              <div className="flex justify-center flex-1">
                <Rating value={value} size="medium" />
              </div>
            ) : (
              <p className="text-5xl font-medium">
                {value}
                <span className="font-normal text-xl text-neutral-400 ">
                  {" "}
                  {unit}
                </span>
              </p>
            )}
          </div>
        </div>
        {large && graphData && graphColor && (
          <div className="h-[200px] pl-3 pr-5 pb-8 flex flex-col">
            <Graph id={title} data={graphData} color={graphColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard;
