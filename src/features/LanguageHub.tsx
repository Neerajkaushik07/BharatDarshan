import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Volume2, Languages, BookOpen } from "lucide-react";

interface Phrase {
    original: string;
    translation: string;
    pronunciation: string;
}

interface Category {
    id: string;
    name: string;
    phrases: Phrase[];
}

const HINDI_PHRASES: Category[] = [
    {
        id: "greetings",
        name: "Greetings",
        phrases: [
            { original: "Hello / Namaste", translation: "Namaste", pronunciation: "nuh-mUH-stay" },
            { original: "How are you?", translation: "Aap kaise hain?", pronunciation: "aap kay-say hain" },
            { original: "I am fine", translation: "Main theek hoon", pronunciation: "main theek hoon" },
            { original: "My name is...", translation: "Mera naam ... hai", pronunciation: "may-rah naam ... hey" },
            { original: "Nice to meet you", translation: "Aapse milkar khushi hui", pronunciation: "aap-say mil-kar khu-shee hui" }
        ]
    },
    {
        id: "essentials",
        name: "Essentials",
        phrases: [
            { original: "Yes", translation: "Haan", pronunciation: "haan" },
            { original: "No", translation: "Nahi", pronunciation: "na-hee" },
            { original: "Thank you", translation: "Dhanyavaad / Shukriya", pronunciation: "dhun-yuh-vaad / shuk-ree-yah" },
            { original: "Please", translation: "Kripya", pronunciation: "krip-yah" },
            { original: "Excuse me / Sorry", translation: "Maaf kijiye", pronunciation: "maaf kee-jee-yay" }
        ]
    },
    {
        id: "travel",
        name: "Travel & Directions",
        phrases: [
            { original: "Where is the bathroom?", translation: "Bathroom kahan hai?", pronunciation: "bathroom ka-haan hey" },
            { original: "How much is this?", translation: "Yeh kitne ka hai?", pronunciation: "yeh kit-nay ka hey" },
            { original: "Too expensive", translation: "Bahut mehenga hai", pronunciation: "ba-hut meh-hen-ga hey" },
            { original: "Where is the train station?", translation: "Railway station kahan hai?", pronunciation: "railway station ka-haan hey" },
            { original: "I want to go to...", translation: "Mujhe ... jaana hai", pronunciation: "muj-hay ... jaa-na hey" }
        ]
    },
    {
        id: "food",
        name: "Food & Dining",
        phrases: [
            { original: "I am vegetarian", translation: "Main shakahari hoon", pronunciation: "main sha-ka-haa-ree hoon" },
            { original: "Water please", translation: "Paani dijiye", pronunciation: "paa-nee dee-jee-yay" },
            { original: "It is delicious", translation: "Yeh swadisht hai", pronunciation: "yeh swaa-disht hey" },
            { original: "Spicy", translation: "Teekha", pronunciation: "tee-kha" },
            { original: "Check/Bill please", translation: "Bill dijiye", pronunciation: "bill dee-jee-yay" }
        ]
    }
];

// Placeholder for other languages to show extensibility
const TAMIL_PHRASES: Category[] = [
    {
        id: "greetings",
        name: "Greetings",
        phrases: [
            { original: "Hello", translation: "Vanakkam", pronunciation: "va-na-kkam" },
            { original: "How are you?", translation: "Eppadi irukkeenga?", pronunciation: "ep-pa-di i-ruk-keen-ga" },
            { original: "Thank you", translation: "Nandri", pronunciation: "nan-dri" },
        ]
    }
];

interface LanguageHubProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const LanguageHub = ({ open, onOpenChange }: LanguageHubProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState("hindi");
    const [activeTab, setActiveTab] = useState("greetings");

    const getPhrases = () => {
        switch (selectedLanguage) {
            case "hindi": return HINDI_PHRASES;
            case "tamil": return TAMIL_PHRASES;
            default: return HINDI_PHRASES;
        }
    };

    const currentPhrases = getPhrases();

    // Text-to-speech function
    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to set correct voice if available, otherwise default
            // Note: Browser support for specific Indian languages varies
            utterance.lang = selectedLanguage === 'hindi' ? 'hi-IN' : 'ta-IN';
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {!open && onOpenChange === undefined && (
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                        <Languages className="h-4 w-4" />
                        <span>Language Hub</span>
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-2xl bg-white max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <BookOpen className="h-6 w-6 text-primary" />
                        Language Essentials
                    </DialogTitle>
                </DialogHeader>

                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    <Button
                        variant={selectedLanguage === 'hindi' ? "default" : "outline"}
                        onClick={() => setSelectedLanguage('hindi')}
                        className="rounded-full"
                    >
                        Hindi
                    </Button>
                    <Button
                        variant={selectedLanguage === 'tamil' ? "default" : "outline"}
                        onClick={() => setSelectedLanguage('tamil')}
                        className="rounded-full"
                    >
                        Tamil
                    </Button>
                    {/* Add more buttons as placeholders */}
                    <Button variant="ghost" disabled className="rounded-full opacity-50">More coming soon...</Button>
                </div>

                <Tabs defaultValue="greetings" value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col overflow-hidden">
                    <TabsList className="w-full justify-start overflow-x-auto">
                        {currentPhrases.map(category => (
                            <TabsTrigger key={category.id} value={category.id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="flex-1 overflow-hidden mt-4 bg-slate-50 rounded-lg border">
                        <ScrollArea className="h-full max-h-[50vh] p-4">
                            {currentPhrases.map(category => (
                                <TabsContent key={category.id} value={category.id} className="mt-0 space-y-4">
                                    {category.phrases.map((phrase, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center group hover:border-primary/50 transition-colors">
                                            <div className="space-y-1">
                                                <p className="font-medium text-slate-500 text-sm">{phrase.original}</p>
                                                <h4 className="text-lg font-bold text-gray-800">{phrase.translation}</h4>
                                                <p className="text-xs text-primary font-mono bg-primary/5 inline-block px-2 py-0.5 rounded">
                                                    {phrase.pronunciation}
                                                </p>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="rounded-full hover:bg-primary/10 hover:text-primary"
                                                onClick={() => speak(phrase.translation)}
                                                title="Listen"
                                            >
                                                <Volume2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    ))}
                                </TabsContent>
                            ))}
                        </ScrollArea>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default LanguageHub;
