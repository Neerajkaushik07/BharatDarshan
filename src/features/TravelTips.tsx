import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Info, AlertTriangle, CheckCircle, Backpack, Camera, Utensils, Globe } from "lucide-react";


const TIPS = [
    {
        category: "Cultural Etiquette",
        icon: <Globe className="h-5 w-5 text-blue-500" />,
        items: [
            "Dress modestly when visiting religious sites (cover shoulders and knees).",
            "Remove footwear before entering temples, mosques, and some homes.",
            "Use your right hand for eating and passing objects."
        ]
    },
    {
        category: "Safety & Health",
        icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
        items: [
            "Drink bottled or filtered water only.",
            "Carry a small medical kit with essentials.",
            "Be cautious of street food hygiene; eat where locals eat."
        ]
    },
    {
        category: "Practical Advice",
        icon: <Backpack className="h-5 w-5 text-green-500" />,
        items: [
            "Carry cash (small denominations) for local markets and transport.",
            "Install local ride-hailing apps like Ola or Uber.",
            "Get a local SIM card for connectivity."
        ]
    },
    {
        category: "Responsible Tourism",
        icon: <Camera className="h-5 w-5 text-purple-500" />,
        items: [
            "Ask for permission before taking photos of people.",
            "Do not litter; carry a trash bag.",
            "Respect local customs and traditions."
        ]
    }
];

const TravelTips = () => {
    return (
        <section className="py-12 bg-orange-50/50 rounded-3xl my-8">
            <div className="container">
                <div className="flex flex-col items-center text-center mb-10">
                    <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 border-none px-4 py-1.5 text-sm uppercase tracking-wider">
                        Smart Travel
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
                        Essential Travel Tips
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Make your journey smoother and more enjoyable with these practical tips for traveling in India.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TIPS.map((section, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                                    {section.icon}
                                    {section.category}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {section.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed">
                                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Helper for badge since I didn't import it
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
        {children}
    </span>
);

export default TravelTips;
