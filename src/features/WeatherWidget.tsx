import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Wind, Droplets, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface WeatherWidgetProps {
    lat?: number;
    lng?: number;
    locationName: string;
}

interface WeatherData {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    humidity?: number; // Open-Meteo current_weather doesn't always have this, but hourly does. We'll stick to simple current_weather for now.
}

const getWeatherIcon = (code: number) => {
    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    if (code === 0) return <Sun className="h-8 w-8 text-yellow-500" />;
    if (code >= 1 && code <= 3) return <Cloud className="h-8 w-8 text-gray-400" />;
    if ((code >= 45 && code <= 48) || (code >= 51 && code <= 55)) return <Cloud className="h-8 w-8 text-gray-500" />;
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain className="h-8 w-8 text-blue-400" />;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow className="h-8 w-8 text-white" />;
    if (code >= 95 && code <= 99) return <CloudLightning className="h-8 w-8 text-purple-500" />;
    return <Sun className="h-8 w-8 text-yellow-500" />;
};

const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear sky";
    if (code >= 1 && code <= 3) return "Partly cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 55) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 80 && code <= 82) return "Showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Clear";
};

const WeatherWidget = ({ lat, lng, locationName }: WeatherWidgetProps) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!lat || !lng) {
            setLoading(false);
            return;
        }

        const fetchWeather = async () => {
            setLoading(true);
            setError(false);
            try {
                // Fetch current weather
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
                );
                const data = await response.json();

                if (data.current_weather) {
                    setWeather({
                        temperature: data.current_weather.temperature,
                        weatherCode: data.current_weather.weathercode,
                        windSpeed: data.current_weather.windspeed,
                    });
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch weather data", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lng]);

    if (!lat || !lng) return null;

    if (loading) {
        return (
            <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </CardContent>
            </Card>
        );
    }

    if (error || !weather) {
        return (
            <Card className="bg-white/90 backdrop-blur-sm border-red-100 shadow-sm">
                <CardContent className="p-4 flex items-center gap-2 text-red-500">
                    <RefreshCw className="h-4 w-4" />
                    <span className="text-sm">Weather unavailable</span>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm overflow-hidden">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Current Weather</span>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-3xl font-bold text-gray-900">{weather.temperature}°C</span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                            {getWeatherDescription(weather.weatherCode)}
                        </p>
                    </div>
                    <div className="p-2 bg-blue-100/50 rounded-full">
                        {getWeatherIcon(weather.weatherCode)}
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-blue-100/50">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Wind className="h-3.5 w-3.5 text-blue-400" />
                        <span>{weather.windSpeed} km/h wind</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-blue-50 text-blue-700 border-blue-200">
                        Live
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default WeatherWidget;
