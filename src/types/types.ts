interface Strategy {
    id: number;
    name: string;
    status: 'Draft' | 'Submitted' | 'Active';
    createdAt: string;
    description: string;
}

interface FormData {
    scanner: {
        exchange: string;
        instrument: string;
        indicators: string[];
        customFilter: string;
    };
    buy: {
        entryType: string;
        priceLevel: string;
        stopLoss: string;
        limitOrder: boolean;
    };
    sell: {
        exitType: string;
        profitTarget: string;
        trailingStop: boolean;
        timeBasedExit: string;
    };
    simulation: {
        initialCapital: string;
        positionSize: string;
        backtest: boolean;
        name: string;
    };
}

export type { Strategy, FormData };