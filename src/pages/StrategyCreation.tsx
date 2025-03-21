import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { useNavigate } from "react-router-dom";
import { FormData } from "@/types/types";

const initialFormData: FormData = {
  scanner: {
    exchange: "",
    instrument: "",
    indicators: [],
    customFilter: "",
  },
  buy: {
    entryType: "",
    priceLevel: "",
    stopLoss: "",
    limitOrder: false,
  },
  sell: {
    exitType: "",
    profitTarget: "",
    trailingStop: false,
    timeBasedExit: "",
  },
  simulation: {
    initialCapital: "",
    positionSize: "",
    backtest: false,
    name: "",
  },
};

const CreateStrategyPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const steps = ["Scan", "Buy", "Sell", "Simulation"];

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 0:
        if (!formData.scanner.exchange)
          newErrors.exchange = "Exchange is required";
        if (!formData.scanner.instrument)
          newErrors.instrument = "Instrument is required";
        break;
      case 1:
        if (!formData.buy.entryType)
          newErrors.entryType = "Entry type is required";
        if (!formData.buy.priceLevel)
          newErrors.priceLevel = "Price level is required";
        break;
      case 2:
        if (!formData.sell.exitType)
          newErrors.exitType = "Exit type is required";
        if (!formData.sell.profitTarget)
          newErrors.profitTarget = "Profit target is required";
        break;
      case 3:
        if (!formData.simulation.initialCapital)
          newErrors.initialCapital = "Initial capital is required";
        if (!formData.simulation.name)
          newErrors.name = "Strategy name is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        alert("Strategy created successfully!");
        navigate("/dashboard");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (section: keyof FormData, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create Trading Strategy</h1>

      <div className="mb-8">
        <Progress
          value={((currentStep + 1) / steps.length) * 100}
          className="h-2"
        />
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-sm font-medium ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-bold text-lg">
            {steps[currentStep]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Scanner Step */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="exchange">Exchange</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange("scanner", "exchange", value)
                  }
                  value={formData.scanner.exchange}
                >
                  <SelectTrigger
                    id="exchange"
                    className={errors.exchange ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forex">NSE</SelectItem>
                    <SelectItem value="stocks">BSE</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
                {errors.exchange && (
                  <p className="text-red-500 text-sm mt-1">{errors.exchange}</p>
                )}
              </div>

              <div>
                <Label htmlFor="instrument">Instrument</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange("scanner", "instrument", value)
                  }
                  value={formData.scanner.instrument}
                >
                  <SelectTrigger
                    id="instrument"
                    className={errors.instrument ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I1">Instrument 1</SelectItem>
                    <SelectItem value="I2">Instrument 2</SelectItem>
                    <SelectItem value="I3">Instrument 3</SelectItem>
                  </SelectContent>
                </Select>
                {errors.instrument && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instrument}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="customFilter">Custom Filter (Optional)</Label>
                <Input
                  id="customFilter"
                  placeholder="E.g., Volume > 1M AND Price > 200MA"
                  value={formData.scanner.customFilter}
                  onChange={(e) =>
                    handleChange("scanner", "customFilter", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* Buy Step */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="entryType">Entry Type</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange("buy", "entryType", value)
                  }
                  value={formData.buy.entryType}
                >
                  <SelectTrigger
                    id="entryType"
                    className={errors.entryType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select entry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                  </SelectContent>
                </Select>
                {errors.entryType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.entryType}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="priceLevel">Price Level</Label>
                <Input
                  id="priceLevel"
                  placeholder="Enter price level"
                  value={formData.buy.priceLevel}
                  onChange={(e) =>
                    handleChange("buy", "priceLevel", e.target.value)
                  }
                  className={errors.priceLevel ? "border-red-500" : ""}
                />
                {errors.priceLevel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.priceLevel}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="stopLoss">Stop Loss</Label>
                <Input
                  id="stopLoss"
                  placeholder="Enter stop loss level"
                  value={formData.buy.stopLoss}
                  onChange={(e) =>
                    handleChange("buy", "stopLoss", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="limitOrder"
                  checked={formData.buy.limitOrder}
                  onCheckedChange={(checked) =>
                    handleChange("buy", "limitOrder", checked)
                  }
                />
                <Label htmlFor="limitOrder">Use limit order for entries</Label>
              </div>
            </div>
          )}

          {/* Sell Step */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="exitType">Exit Type</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange("sell", "exitType", value)
                  }
                  value={formData.sell.exitType}
                >
                  <SelectTrigger
                    id="exitType"
                    className={errors.exitType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select exit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="takeProfit">Take Profit</SelectItem>
                    <SelectItem value="trailingStop">Trailing Stop</SelectItem>
                    <SelectItem value="indicatorBased">
                      Indicator Based
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.exitType && (
                  <p className="text-red-500 text-sm mt-1">{errors.exitType}</p>
                )}
              </div>

              <div>
                <Label htmlFor="profitTarget">Profit Target</Label>
                <Input
                  id="profitTarget"
                  placeholder="Enter profit target"
                  value={formData.sell.profitTarget}
                  onChange={(e) =>
                    handleChange("sell", "profitTarget", e.target.value)
                  }
                  className={errors.profitTarget ? "border-red-500" : ""}
                />
                {errors.profitTarget && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profitTarget}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="trailingStop"
                  checked={formData.sell.trailingStop}
                  onCheckedChange={(checked) =>
                    handleChange("sell", "trailingStop", checked)
                  }
                />
                <Label htmlFor="trailingStop">Use trailing stop</Label>
              </div>

              <div>
                <Label htmlFor="timeBasedExit">
                  Time-Based Exit (Optional)
                </Label>
                <Input
                  id="timeBasedExit"
                  placeholder="E.g., Exit after 5 days"
                  value={formData.sell.timeBasedExit}
                  onChange={(e) =>
                    handleChange("sell", "timeBasedExit", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* Simulation Step */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Strategy Name</Label>
                <Input
                  id="name"
                  placeholder="Enter strategy name"
                  value={formData.simulation.name}
                  onChange={(e) =>
                    handleChange("simulation", "name", e.target.value)
                  }
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="initialCapital">Initial Capital</Label>
                <Input
                  id="initialCapital"
                  placeholder="Enter initial capital"
                  value={formData.simulation.initialCapital}
                  onChange={(e) =>
                    handleChange("simulation", "initialCapital", e.target.value)
                  }
                  className={errors.initialCapital ? "border-red-500" : ""}
                />
                {errors.initialCapital && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.initialCapital}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="positionSize">Position Size (%)</Label>
                <Input
                  id="positionSize"
                  placeholder="Enter position size percentage"
                  value={formData.simulation.positionSize}
                  onChange={(e) =>
                    handleChange("simulation", "positionSize", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="backtest"
                  checked={formData.simulation.backtest}
                  onCheckedChange={(checked) =>
                    handleChange("simulation", "backtest", checked)
                  }
                />
                <Label htmlFor="backtest">Run backtest after creation</Label>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button onClick={handleNext} className="flex items-center">
            {currentStep === steps.length - 1 ? (
              <>
                Create Strategy
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateStrategyPage;
