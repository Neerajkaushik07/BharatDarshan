import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Calculator, Loader2 } from "lucide-react";

const CURRENCIES = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
];

// Fallback rates (approximate) - in a real app, use an API like ExchangeRate-API or Open Exchange Rates
const FALLBACK_RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.5,
    AUD: 1.52,
    CAD: 1.36,
    SGD: 1.35,
    JPY: 151.5,
    AED: 3.67,
};

interface CurrencyConverterProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const CurrencyConverter = ({ open, onOpenChange }: CurrencyConverterProps) => {
    const [amount, setAmount] = useState<string>("1");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined;
    const finalOpen = isControlled ? open : internalOpen;
    const finalOnOpenChange = isControlled ? onOpenChange : setInternalOpen;

    // Convert on change
    useEffect(() => {
        handleConvert();
    }, [amount, fromCurrency, toCurrency]);

    const handleConvert = () => {
        if (!amount || isNaN(Number(amount))) {
            setResult(null);
            return;
        }

        setLoading(true);

        // Simulate API delay for better UX feeling
        setTimeout(() => {
            const fromRate = FALLBACK_RATES[fromCurrency];
            const toRate = FALLBACK_RATES[toCurrency];

            // Convert to USD base first, then to target currency
            // Amount in USD = Amount / FromRate
            // Result = Amount in USD * ToRate
            const val = Number(amount);
            const converted = (val / fromRate) * toRate;

            setResult(converted);
            setLoading(false);
        }, 300);
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <Dialog open={finalOpen} onOpenChange={finalOnOpenChange}>
            {!isControlled && (
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                        <Calculator className="h-4 w-4" />
                        <span>Converter</span>
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Calculator className="h-5 w-5 text-primary" />
                        Currency Converter
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="text-lg"
                        />
                    </div>

                    <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
                        <div className="flex flex-col gap-2">
                            <Label>From</Label>
                            <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {CURRENCIES.map((c) => (
                                        <SelectItem key={c.code} value={c.code}>
                                            <span className="font-semibold">{c.code}</span> - {c.symbol}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button variant="ghost" size="icon" className="mb-0.5" onClick={handleSwap}>
                            <ArrowRightLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex flex-col gap-2">
                            <Label>To</Label>
                            <Select value={toCurrency} onValueChange={setToCurrency}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {CURRENCIES.map((c) => (
                                        <SelectItem key={c.code} value={c.code}>
                                            <span className="font-semibold">{c.code}</span> - {c.symbol}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg text-center mt-2">
                        {loading ? (
                            <div className="flex justify-center py-1">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        ) : result !== null ? (
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    {Number(amount).toLocaleString()} {fromCurrency} =
                                </p>
                                <p className="text-3xl font-bold text-primary">
                                    {CURRENCIES.find(c => c.code === toCurrency)?.symbol}
                                    {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    1 {fromCurrency} = {(FALLBACK_RATES[toCurrency] / FALLBACK_RATES[fromCurrency]).toFixed(4)} {toCurrency}
                                </p>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">Enter an amount to convert</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CurrencyConverter;
