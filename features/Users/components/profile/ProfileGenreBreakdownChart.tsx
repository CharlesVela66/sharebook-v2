"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ProfileStats } from "../../types/user.types";

interface ProfileGenreBreakdownChartProps{
    genreBreakdown: ProfileStats["genreBreakdown"];
}

export default function ProfileGenreBreakdownChart({genreBreakdown} : ProfileGenreBreakdownChartProps){
    const chartConfig = {
        count: {
            label: "Books read",
            color: "var(--primary)",
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer config={chartConfig} className="min-h-50 max-h-90 w-full">
            <BarChart accessibilityLayer data={genreBreakdown} layout="vertical">
                <CartesianGrid vertical />
                <XAxis type="number" tickLine={false}/>
                <YAxis dataKey="genre" type="category" tickLine={false} axisLine={false} width={100} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}