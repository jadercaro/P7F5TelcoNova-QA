"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


type ChartDataItem = {
  status: string;
  incidences: number;
  fill: string;
};

type Props = {
  chartData: ChartDataItem[];
};

export function OrderPieChart( { chartData}: Props) {
  return (
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="incidences" nameKey="status" />
          </PieChart>
        </ChartContainer>
  )
}