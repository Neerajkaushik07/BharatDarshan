import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Backpack, CheckCircle, Sun, CloudRain, Snowflake, Briefcase, Palmtree, Mountain } from "lucide-react";

interface PackingItem {
    id: string;
    name: string;
    category: string;
    checked: boolean;
}

interface PackingAssistantProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const PackingAssistant = ({ open, onOpenChange }: PackingAssistantProps) => {
    const [tripType, setTripType] = useState<string>("city");
    const [season, setSeason] = useState<string>("summer");
    const [items, setItems] = useState<PackingItem[]>([]);
    const [progress, setProgress] = useState(0);

    // Generate list based on selection
    useEffect(() => {
        generateList();
    }, [tripType, season]);

    // Update progress when items change
    useEffect(() => {
        if (items.length === 0) return;
        const checkedCount = items.filter(i => i.checked).length;
        setProgress(Math.round((checkedCount / items.length) * 100));
    }, [items]);

    const generateList = () => {
        const newItems: PackingItem[] = [
            // Essentials (Always included)
            { id: "e1", name: "ID / Passport", category: "Essentials", checked: false },
            { id: "e2", name: "Wallet / Cash / Cards", category: "Essentials", checked: false },
            { id: "e3", name: "Phone & Charger", category: "Essentials", checked: false },
            { id: "e4", name: "Tickets / Booking Confirmations", category: "Essentials", checked: false },
            { id: "e5", name: "Toiletries Kit", category: "Essentials", checked: false },
        ];

        // Season specific
        if (season === "winter") {
            newItems.push(
                { id: "w1", name: "Heavy Jacket / Coat", category: "Clothing", checked: false },
                { id: "w2", name: "Thermals", category: "Clothing", checked: false },
                { id: "w3", name: "Woolen Socks", category: "Clothing", checked: false },
                { id: "w4", name: "Gloves & Beanie", category: "Clothing", checked: false }
            );
        } else if (season === "monsoon") {
            newItems.push(
                { id: "m1", name: "Raincoat / Umbrella", category: "Clothing", checked: false },
                { id: "m2", name: "Waterproof Shoes", category: "Clothing", checked: false },
                { id: "m3", name: "Quick-dry Clothes", category: "Clothing", checked: false },
                { id: "m4", name: "Mosquito Repellent", category: "Health", checked: false }
            );
        } else {
            // Summer
            newItems.push(
                { id: "s1", name: "Cotton Clothes", category: "Clothing", checked: false },
                { id: "s2", name: "Sunglasses", category: "Accessories", checked: false },
                { id: "s3", name: "Hat / Cap", category: "Accessories", checked: false },
                { id: "s4", name: "Sunscreen", category: "Health", checked: false }
            );
        }

        // Trip Type specific
        if (tripType === "beach") {
            newItems.push(
                { id: "b1", name: "Swimwear", category: "Clothing", checked: false },
                { id: "b2", name: "Flip Flops", category: "Footwear", checked: false },
                { id: "b3", name: "Beach Towel", category: "Accessories", checked: false }
            );
        } else if (tripType === "mountain") {
            newItems.push(
                { id: "mt1", name: "Hiking Shoes", category: "Footwear", checked: false },
                { id: "mt2", name: "Backpack", category: "Gear", checked: false },
                { id: "mt3", name: "Water Bottle", category: "Gear", checked: false }
            );
        } else if (tripType === "business") {
            newItems.push(
                { id: "biz1", name: "Formal Wear", category: "Clothing", checked: false },
                { id: "biz2", name: "Laptop & Charger", category: "Work", checked: false },
                { id: "biz3", name: "Business Cards", category: "Work", checked: false }
            );
        }

        setItems(newItems);
    };

    const toggleItem = (id: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    // Group items by category
    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, PackingItem[]>);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {!open && onOpenChange === undefined && (
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                        <Backpack className="h-4 w-4" />
                        <span>Packing Assistant</span>
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-md bg-white max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Backpack className="h-5 w-5 text-primary" />
                        Smart Packing List
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Dest. Type</Label>
                        <Select value={tripType} onValueChange={setTripType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="city">
                                    <div className="flex items-center gap-2"><Briefcase className="w-3 h-3" /> City / Leisure</div>
                                </SelectItem>
                                <SelectItem value="beach">
                                    <div className="flex items-center gap-2"><Palmtree className="w-3 h-3" /> Beach</div>
                                </SelectItem>
                                <SelectItem value="mountain">
                                    <div className="flex items-center gap-2"><Mountain className="w-3 h-3" /> Mountains</div>
                                </SelectItem>
                                <SelectItem value="business">
                                    <div className="flex items-center gap-2"><Briefcase className="w-3 h-3" /> Business</div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Season</Label>
                        <Select value={season} onValueChange={setSeason}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="summer">
                                    <div className="flex items-center gap-2"><Sun className="w-3 h-3" /> Summer</div>
                                </SelectItem>
                                <SelectItem value="winter">
                                    <div className="flex items-center gap-2"><Snowflake className="w-3 h-3" /> Winter</div>
                                </SelectItem>
                                <SelectItem value="monsoon">
                                    <div className="flex items-center gap-2"><CloudRain className="w-3 h-3" /> Monsoon</div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Packed</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1 -mx-6 px-6">
                    <div className="space-y-6">
                        {Object.entries(groupedItems).map(([category, categoryItems]) => (
                            <div key={category} className="space-y-2">
                                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider sticky top-0 bg-white py-1 z-10">
                                    {category}
                                </h3>
                                <div className="space-y-2">
                                    {categoryItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${item.checked ? "bg-primary/5" : "hover:bg-slate-50"
                                                }`}
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={item.checked}
                                                onCheckedChange={() => toggleItem(item.id)}
                                            />
                                            <label
                                                htmlFor={item.id}
                                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 ${item.checked ? "text-muted-foreground line-through decoration-primary/50" : "text-slate-700"
                                                    }`}
                                            >
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="pt-4 border-t flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => generateList()}>
                        Reset List
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PackingAssistant;
