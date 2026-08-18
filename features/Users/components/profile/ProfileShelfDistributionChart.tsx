"use client"
import { Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ProfileStats } from "../../types/user.types";
import { Shelf } from "@/db/schema";

interface ProfileShelfDistributionChartProps{
    shelfDistribution: ProfileStats["shelfDistribution"];
}

const shelfConfigKey: Record<Shelf, string> = {
    "Read": "read",
    "Currently reading": "currentlyReading",
    "Want to read": "wantToRead",
};

export default function ProfileShelfDistributionChart({shelfDistribution} : ProfileShelfDistributionChartProps){
    const chartConfig = {
        read: {
            label: "Books read",
            color: "var(--primary)",
        },
        currentlyReading: {
            label: "Currently reading",
            color: "var(--secondary)",
        },
        wantToRead: {
            label: "Want to read",
            color: "var(--muted)"
        }
    } satisfies ChartConfig;

    const data = shelfDistribution.map((entry) => ({
        ...entry,
        fill: `var(--color-${shelfConfigKey[entry.shelf]})`,
    }));

    return (
        <ChartContainer config={chartConfig} className="min-h-50 w-full max-w-sm mx-auto aspect-square max-h-90">
            <PieChart>
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={data} dataKey="count" nameKey="shelf" innerRadius={90} strokeWidth={5} />
            </PieChart>
        </ChartContainer>
    )
}