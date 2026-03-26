import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface Props {
    username: string;
}

export default function ContributionCalendar({ username }: Props) {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const recentYears = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">Contributions</h2>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="text-xs bg-background border border-border rounded px-2 py-1"
                >
                    {recentYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <GitHubCalendar
                username={username}
                year={selectedYear}
                colorScheme="dark"
                fontSize={12}
            />
        </div>
    );
}
