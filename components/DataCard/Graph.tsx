"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  id: string;
  data: {
    month: string;
    value: number;
  }[];
  color: string;
}

const Graph = ({ data, color, id }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        id={Math.random().toString()}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: -20,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="month"
          strokeWidth={0}
          tickSize={14}
          style={{ fontSize: 14, color: "#A7A7A7" }}
        />
        <YAxis
          strokeWidth={0}
          tickSize={14}
          style={{ fontSize: 14, color: "#A7A7A7" }}
          domain={[0, "datamax"]}
        />
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="natural"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          fill={`url(#${id})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
