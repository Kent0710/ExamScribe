import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface DashboardSummaryCardProps {
    title: string;
    mainText: string;
    description: string;
}
const DashboardSummaryCard: React.FC<DashboardSummaryCardProps> = ({
    title,
    mainText,
    description,
}) => {
    return (
        <Card>
            <CardContent>
                <div className="flex flex-row items-center justify-between mb-2">
                    <CardTitle className="text-sm font-medium">
                        {title}
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold"> {mainText} </div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
};

export default DashboardSummaryCard;
