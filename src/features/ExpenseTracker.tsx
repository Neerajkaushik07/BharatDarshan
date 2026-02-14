import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Wallet, Plus, Trash2, PieChart, IndianRupee } from "lucide-react";

interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
}

interface ExpenseTrackerProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const CATEGORIES = ["Food", "Transport", "Accommodation", "Shopping", "Tickets", "Other"];

const ExpenseTracker = ({ open, onOpenChange }: ExpenseTrackerProps) => {
    const [expenses, setExpenses] = useState<Expense[]>(() => {
        // Load from local storage on init
        const saved = localStorage.getItem("travel_expenses");
        return saved ? JSON.parse(saved) : [];
    });

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Food");

    // Save to local storage whenever expenses change
    useEffect(() => {
        localStorage.setItem("travel_expenses", JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = () => {
        if (!amount || !description) return;

        const newExpense: Expense = {
            id: Date.now().toString(),
            description,
            amount: parseFloat(amount),
            category,
            date: new Date().toLocaleDateString()
        };

        setExpenses([newExpense, ...expenses]);
        setAmount("");
        setDescription("");
    };

    const deleteExpense = (id: string) => {
        setExpenses(expenses.filter(e => e.id !== id));
    };

    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white flex flex-col max-h-[85vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-primary">
                        <Wallet className="h-6 w-6" />
                        Trip Expense Tracker
                    </DialogTitle>
                </DialogHeader>

                {/* Total Summary */}
                <Card className="bg-primary/5 border-primary/20 p-4 flex justify-between items-center mb-4">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">Total Spent</p>
                        <h3 className="text-2xl font-bold text-primary flex items-center">
                            <IndianRupee className="h-5 w-5" />
                            {totalSpent.toLocaleString()}
                        </h3>
                    </div>
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <PieChart className="h-5 w-5 text-primary" />
                    </div>
                </Card>

                {/* Add Expense Form */}
                <div className="grid gap-4 mb-4 p-4 border rounded-lg bg-slate-50">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <Label className="text-xs">Amount (₹)</Label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Description</Label>
                        <Input
                            placeholder="e.g. Lunch at Jaipur"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-white"
                        />
                    </div>
                    <Button onClick={addExpense} className="w-full" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Expense
                    </Button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col">
                    <h4 className="font-semibold text-sm mb-2 px-1">Recent Transactions</h4>
                    {expenses.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-8">
                            <Wallet className="h-10 w-10 mb-2 opacity-20" />
                            <p className="text-sm">No expenses recorded yet</p>
                        </div>
                    ) : (
                        <ScrollArea className="flex-1 -mx-2 px-2">
                            <div className="space-y-2 pb-2">
                                {expenses.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                                        <div className="flex-1 min-w-0 mr-2">
                                            <p className="font-medium text-sm truncate">{expense.description}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded">{expense.category}</span>
                                                <span>{expense.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">₹{expense.amount.toLocaleString()}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-red-400 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => deleteExpense(expense.id)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ExpenseTracker;
