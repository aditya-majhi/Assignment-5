import { Copy, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Strategy } from "@/types/types";

const demoStrategies: Strategy[] = [
  {
    id: 1,
    name: "Moving Average Crossover",
    status: "Active",
    createdAt: "2025-03-15",
    description: "Strategy based on 50 and 200 EMA crossover",
  },
  {
    id: 2,
    name: "RSI Reversal Strategy",
    status: "Submitted",
    createdAt: "2025-03-10",
    description: "Buy when RSI crosses above 30, sell when crosses below 70",
  },
  {
    id: 3,
    name: "Bollinger Band Bounce",
    status: "Draft",
    createdAt: "2025-03-05",
    description: "Enter when price touches lower band with confirmation",
  },
  {
    id: 4,
    name: "Fibonacci Retracement",
    status: "Active",
    createdAt: "2025-03-01",
    description: "Target key Fibonacci levels for entries and exits",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Strategy Dashboard</h1>

        <div className="flex items-center space-x-4">
          <Button onClick={() => navigate("/create-strategy")}>
            Create New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoStrategies.map((strategy) => (
          <Card key={strategy.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{strategy.name}</CardTitle>
                <Badge
                  variant={
                    strategy.status === "Active"
                      ? "default"
                      : strategy.status === "Draft"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {strategy.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Created: {strategy.createdAt}
              </p>
              <p className="text-sm">{strategy.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center cursor-pointer"
              >
                <Copy className="mr-1 h-4 w-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center cursor-pointer"
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
