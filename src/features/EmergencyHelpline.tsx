import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, ShieldAlert, Ambulance, Stethoscope, AlertTriangle } from "lucide-react";

interface EmergencyHelplineProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const EMERGENCY_NUMBERS = [
    {
        category: "National Emergency",
        numbers: [
            { name: "Police", number: "100", icon: <ShieldAlert className="h-5 w-5 text-blue-600" /> },
            { name: "Ambulance", number: "102", icon: <Ambulance className="h-5 w-5 text-red-600" /> },
            { name: "Fire", number: "101", icon: <AlertTriangle className="h-5 w-5 text-orange-600" /> },
            { name: "National Emergency Number", number: "112", icon: <Phone className="h-5 w-5 text-red-500" /> },
        ]
    },
    {
        category: "Tourist Specific",
        numbers: [
            { name: "Tourist Helpline", number: "1363", icon: <Phone className="h-5 w-5 text-green-600" /> },
            { name: "Women's Helpline", number: "1091", icon: <Phone className="h-5 w-5 text-purple-600" /> },
        ]
    },
    {
        category: "Services",
        numbers: [
            { name: "Railway Enquiry", number: "139", icon: <Phone className="h-5 w-5 text-slate-600" /> },
            { name: "Road Accident Emergency", number: "1073", icon: <Stethoscope className="h-5 w-5 text-red-600" /> },
        ]
    }
];

const EmergencyHelpline = ({ open, onOpenChange }: EmergencyHelplineProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-red-600">
                        <ShieldAlert className="h-6 w-6" />
                        Emergency Helpline
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-6">
                        {EMERGENCY_NUMBERS.map((group, idx) => (
                            <div key={idx} className="space-y-3">
                                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                                    {group.category}
                                </h3>
                                <div className="grid gap-3">
                                    {group.numbers.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-full shadow-sm">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-sm font-mono text-gray-600">{item.number}</p>
                                                </div>
                                            </div>
                                            <Button asChild size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                                <a href={`tel:${item.number}`}>
                                                    <Phone className="h-4 w-4 mr-1" />
                                                    Call
                                                </a>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-xs text-yellow-800 flex gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <p>
                        112 is the single emergency number in India for Pan-India Emergency Response Support System (ERSS).
                    </p>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default EmergencyHelpline;
