import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  MapPin,
  Sparkles,
  Loader2,
  Check,
  Clock,
  DollarSign,
  Mountain,
  Building,
  Palmtree,
  Church
} from "lucide-react";
import { generateChatResponse } from "@/lib/gemini";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string;
  accommodation: string;
}

const TripPlanner = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    travelers: "",
    interests: "",
    budget: "moderate"
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!formData.destination || !formData.days) {
      alert("Please fill in at least destination and number of days");
      return;
    }

    setIsGenerating(true);
    setShowResults(false);
    setError(null);

    try {
      const prompt = `Create a detailed ${formData.days}-day travel itinerary for ${formData.destination}, India for ${formData.travelers || '2'} travelers with a ${formData.budget} budget. 
      
Interests: ${formData.interests || 'general sightseeing, culture, local cuisine'}

IMPORTANT: You must respond ONLY with a valid JSON object. Do not include any conversational text before or after the JSON.
Wrap the JSON in a markdown code block.

Required JSON Structure:
{
  "summary": "brief overview of the trip",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": ["activity 1", "activity 2", "activity 3"],
      "meals": "meal suggestions",
      "accommodation": "hotel type recommendation"
    }
  ]
}`;

      console.log("[TripPlanner] Generating itinerary with prompt:", prompt);
      const response = await generateChatResponse(prompt, "Travel planning for Indian destinations. Respond ONLY with JSON.", []);
      console.log("[TripPlanner] AI raw response received:", response);

      // Parse the response
      try {
        // Try to find JSON in a code block first, then fallback to any curly braces
        const jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || response.match(/(\{[\s\S]*\})/);

        if (jsonMatch) {
          const jsonString = jsonMatch[1];
          const data = JSON.parse(jsonString);

          // Validation
          if (!data.summary || !Array.isArray(data.days)) {
            throw new Error("Missing required fields in AI response");
          }

          // Ensure each day has required fields to prevent render errors
          const validatedDays = data.days.map((d: any, idx: number) => ({
            day: d.day || (idx + 1),
            title: d.title || `Day ${idx + 1}`,
            activities: Array.isArray(d.activities) ? d.activities : ["Explore local sites"],
            meals: d.meals || "Local restaurants",
            accommodation: d.accommodation || "Recommended stay"
          }));

          setSummary(data.summary);
          setItinerary(validatedDays);
          setShowResults(true);
          console.log("[TripPlanner] Successfully parsed and validated itinerary");
        } else {
          throw new Error("No JSON found in response");
        }
      } catch (parseError) {
        console.error("[TripPlanner] JSON Parse Error:", parseError, "Raw response was:", response);
        // Fallback: create a simple itinerary from text response
        const days = parseInt(formData.days);
        const simpleDays: ItineraryDay[] = [];
        for (let i = 1; i <= days; i++) {
          simpleDays.push({
            day: i,
            title: `Day ${i} - Exploring ${formData.destination}`,
            activities: [
              "Visit major tourist attractions",
              "Explore local markets and culture",
              "Try authentic local cuisine"
            ],
            meals: "Local restaurants and street food",
            accommodation: `${formData.budget === 'luxury' ? 'Luxury' : formData.budget === 'budget' ? 'Budget-friendly' : 'Mid-range'} hotel`
          });
        }
        setSummary(`Discover the wonders of ${formData.destination} over ${days} days, immersing yourself in its rich culture, heritage, and cuisine.`);
        setItinerary(simpleDays);
        setShowResults(true);
      }
    } catch (error: any) {
      console.error("[TripPlanner] API Error:", error);
      const errorMessage = error?.message || String(error);
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const budgetIcons = {
    budget: <DollarSign className="w-4 h-4" />,
    moderate: <DollarSign className="w-4 h-4" />,
    luxury: <Sparkles className="w-4 h-4" />
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <Card className="p-8 bg-card/60 backdrop-blur border-primary/20">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">AI Trip Planner</h3>
            </div>
            <p className="text-muted-foreground">
              Let AI create a personalized itinerary for your Indian adventure
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg space-y-2">
              <h4 className="text-destructive font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                AI Communication Error
              </h4>
              <p className="text-sm text-destructive font-mono overflow-auto max-h-40 p-2 bg-black/5 rounded">
                {error}
              </p>
              <p className="text-xs text-muted-foreground">
                Please check your internet connection and verify that your Gemini API key in <strong>public/env.js</strong> is valid and not restricted.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Destination
              </Label>
              <Input
                id="destination"
                placeholder="e.g., Rajasthan, Kerala, Himachal..."
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="border-primary/20"
              />
            </div>

            {/* Number of Days */}
            <div className="space-y-2">
              <Label htmlFor="days" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Number of Days
              </Label>
              <Input
                id="days"
                type="number"
                min="1"
                max="30"
                placeholder="e.g., 5"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                className="border-primary/20"
              />
            </div>

            {/* Number of Travelers */}
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Number of Travelers
              </Label>
              <Input
                id="travelers"
                type="number"
                min="1"
                placeholder="e.g., 2"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="border-primary/20"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Budget Level
              </Label>
              <div className="flex gap-2">
                {['budget', 'moderate', 'luxury'].map((level) => (
                  <Button
                    key={level}
                    type="button"
                    variant={formData.budget === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, budget: level })}
                    className="flex-1 capitalize"
                  >
                    {budgetIcons[level as keyof typeof budgetIcons]}
                    <span className="ml-1">{level}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label htmlFor="interests" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Interests & Preferences (Optional)
            </Label>
            <Textarea
              id="interests"
              placeholder="e.g., adventure activities, historical sites, beaches, wildlife, food tours..."
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              className="border-primary/20 min-h-[80px]"
            />
          </div>

          {/* Quick Tags */}
          <div className="space-y-2">
            <Label className="text-sm">Quick Tags:</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Mountain className="w-3 h-3" />, label: "Adventure" },
                { icon: <Building className="w-3 h-3" />, label: "Heritage" },
                { icon: <Palmtree className="w-3 h-3" />, label: "Beach" },
                { icon: <Church className="w-3 h-3" />, label: "Spiritual" }
              ].map((tag) => (
                <Badge
                  key={tag.label}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => {
                    const current = formData.interests;
                    const newInterest = current ? `${current}, ${tag.label.toLowerCase()}` : tag.label.toLowerCase();
                    setFormData({ ...formData, interests: newInterest });
                  }}
                >
                  {tag.icon}
                  <span className="ml-1">{tag.label}</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            size="lg"
            className="w-full text-lg h-14 bg-primary hover:bg-primary/90 shadow-lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Your Perfect Trip...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Itinerary
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-primary/20">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Your Personalized Itinerary</h4>
                <p className="text-muted-foreground">{summary}</p>
              </div>
            </div>
          </Card>

          {/* Day-by-Day Itinerary */}
          <div className="space-y-4">
            {itinerary.map((day, index) => (
              <Card
                key={day.day}
                className="p-6 bg-card/60 backdrop-blur border-primary/20 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  {/* Day Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{day.day}</span>
                      </div>
                      <h4 className="text-xl font-semibold">{day.title}</h4>
                    </div>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Full Day
                    </Badge>
                  </div>

                  {/* Activities */}
                  <div>
                    <h5 className="text-sm font-semibold text-primary mb-2">Activities:</h5>
                    <ul className="space-y-2">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meals & Accommodation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                    <div>
                      <h5 className="text-sm font-semibold text-secondary mb-1">Meals:</h5>
                      <p className="text-sm text-muted-foreground">{day.meals}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-accent mb-1">Stay:</h5>
                      <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Download/Share Actions */}
          <Card className="p-6 bg-card/60 backdrop-blur border-primary/20">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  const shareText = `${summary}\n\n${itinerary.map(day =>
                    `Day ${day.day}: ${day.title}\n${day.activities.join('\n')}`
                  ).join('\n\n')}`;

                  if (navigator.share) {
                    navigator.share({
                      title: `Trip to ${formData.destination}`,
                      text: shareText
                    }).catch(() => { });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    alert('Itinerary copied to clipboard!');
                  }
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Trip
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  const printContent = `
                    <html>
                      <head>
                        <title>Trip to ${formData.destination}</title>
                        <style>
                          body { font-family: Arial, sans-serif; padding: 40px; }
                          h1 { color: #333; }
                          h2 { color: #666; margin-top: 30px; }
                          .day { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
                          .activities { margin: 10px 0; }
                          .activities li { margin: 5px 0; }
                        </style>
                      </head>
                      <body>
                        <h1>${formData.days}-Day Trip to ${formData.destination}</h1>
                        <p><strong>Travelers:</strong> ${formData.travelers || '2'} | <strong>Budget:</strong> ${formData.budget}</p>
                        <p>${summary}</p>
                        ${itinerary.map(day => `
                          <div class="day">
                            <h2>Day ${day.day}: ${day.title}</h2>
                            <h3>Activities:</h3>
                            <ul class="activities">
                              ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
                            </ul>
                            <p><strong>Meals:</strong> ${day.meals}</p>
                            <p><strong>Stay:</strong> ${day.accommodation}</p>
                          </div>
                        `).join('')}
                      </body>
                    </html>
                  `;

                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                    printWindow.document.write(printContent);
                    printWindow.document.close();
                    setTimeout(() => {
                      printWindow.print();
                    }, 250);
                  }
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </Button>
              <Button
                className="gap-2"
                onClick={() => {
                  setShowResults(false);
                  setItinerary([]);
                  setSummary("");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Sparkles className="w-4 h-4" />
                Generate New Plan
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
