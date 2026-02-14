import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowRight, Star } from "lucide-react";
import { STATES_DATA } from "@/pages/States";
import StateDialog from "@/features/StateDialog";
import { TouristPlace, StateInfo } from "@/types/states";

const DailyFeaturedDestination = () => {
    const [featuredPlace, setFeaturedPlace] = useState<{ place: TouristPlace; state: string } | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStateData, setSelectedStateData] = useState<StateInfo | null>(null);

    useEffect(() => {
        // Deterministic selection based on date so it remains same for the day for all users (client-side)
        const today = new Date();
        // Create a seed from the date: YYYYMMDD
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        // Flatten all places to pick one
        const allPlaces: { place: TouristPlace; state: StateInfo }[] = [];
        STATES_DATA.forEach(state => {
            state.touristPlaces.forEach(place => {
                allPlaces.push({ place, state });
            });
        });

        if (allPlaces.length > 0) {
            const index = seed % allPlaces.length;
            const selected = allPlaces[index];
            setFeaturedPlace({ place: selected.place, state: selected.state.name });
            setSelectedStateData(selected.state);
        }
    }, []);

    if (!featuredPlace) return null;

    return (
        <>
            <section className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    <h2 className="text-3xl font-bold text-gray-800">Destination of the Day</h2>
                </div>

                <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-gray-50 group hover:shadow-2xl transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-96 overflow-hidden">
                            <img
                                src={featuredPlace.place.imageUrl}
                                alt={featuredPlace.place.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 text-primary hover:bg-white text-sm font-semibold shadow-sm backdrop-blur-sm">
                                    {featuredPlace.state}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="p-8 flex flex-col justify-center">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                                    {featuredPlace.place.name}
                                </h3>

                                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-primary/70" />
                                        <span className="text-sm">{featuredPlace.place.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-primary/70" />
                                        <span className="text-sm">Best time: {featuredPlace.place.bestTimeToVisit}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
                                    {featuredPlace.place.description}
                                </p>

                                <Button
                                    size="lg"
                                    className="rounded-full gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Explore Destination <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </section>

            {selectedStateData && (
                <StateDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    stateName={selectedStateData.name}
                    places={selectedStateData.touristPlaces}
                    festivals={selectedStateData.festivals}
                />
            )}
        </>
    );
};

export default DailyFeaturedDestination;
