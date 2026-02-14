import { useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    significance: string;
    category: string;
}

interface TimelineProps {
    events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
    return (
        <div className="relative py-10">
            {/* Central Line (Desktop) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />

            {/* Lateral Line (Mobile) */}
            <div className="absolute left-4 h-full w-1 bg-primary/20 md:hidden" />

            <div className="space-y-12">
                {events.map((event, index) => (
                    <TimelineItem key={index} event={event} index={index} />
                ))}
            </div>
        </div>
    );
};

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center md:justify-between ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            {/* Content Side */}
            <div className="w-full md:w-[45%] pl-12 md:pl-0">
                <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10 group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                {event.year}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                                {event.category}
                            </Badge>
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                            {event.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                            {event.description}
                        </p>
                        <div className="bg-secondary/10 p-3 rounded-lg border border-secondary/20">
                            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Significance</p>
                            <p className="text-sm italic text-muted-foreground">
                                {event.significance}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Center Point */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background border-4 border-primary z-10 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>

            {/* Empty Side for layout balance */}
            <div className="hidden md:block w-[45%]" />
        </motion.div>
    );
};

export default Timeline;
