"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ProfileStats } from "../../types/user.types";

interface ProfileYearChartProps{
    booksReadByYear: ProfileStats["booksReadByYear"];
}

export default function ProfileYearChart({booksReadByYear} : ProfileYearChartProps){
    const chartConfig = {
        count: {
            label: "Books read",
            color: "var(--secondary)",
        },
    } satisfies ChartConfig;

    const data = Object.entries(booksReadByYear).map(([year, months]) => ({
        year,
        count: months.reduce((total, monthCount) => total + monthCount, 0),
    }));

    return (
        <ChartContainer config={chartConfig} className="min-h-50 max-h-90 w-full">
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false}/>
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={30} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}