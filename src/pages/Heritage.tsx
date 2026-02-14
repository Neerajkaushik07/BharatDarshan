import Timeline, { TimelineEvent } from "@/features/Timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UnescoSite {
  title: string;
  description: string;
}

const HISTORICAL_EVENTS: TimelineEvent[] = [
  {
    title: "Indus Valley Civilization",
    year: "3300-1300 BCE",
    description: "One of the world's earliest major civilizations, known for complex urban planning, baked brick houses, elaborate drainage systems, water supply systems, and large non-residential buildings.",
    significance: "Pioneered urban sanitation, standardized weights and measures, and metallurgy.",
    category: "Civilization"
  },
  {
    title: "Ramayana",
    year: "Treta Yuga (Ancient)",
    description: "The Ramayana is an ancient Sanskrit epic that follows Prince Rama's quest to rescue his wife Sita from the demon king Ravana. Written by sage Valmiki, it contains 24,000 verses across seven books (kandas).",
    significance: "Beyond being a tale of good versus evil, the Ramayana serves as a guide to Hindu dharma, teaching values like duty, loyalty, righteousness, and ideal relationships.",
    category: "Epic"
  },
  {
    title: "Mahabharata",
    year: "Dwapara Yuga (Ancient)",
    description: "The world's longest epic poem, containing 100,000 verses, tells the story of the Kurukshetra War between the Pandavas and Kauravas. It includes the sacred Bhagavad Gita.",
    significance: "Contains philosophical and moral teachings that remain relevant today. The Bhagavad Gita especially is considered one of the most important philosophical texts in Hinduism.",
    category: "Epic"
  },
  {
    title: "Mauryan Empire",
    year: "322-185 BCE",
    description: "One of ancient India's largest and most powerful dynasties, established by Chandragupta Maurya and reaching its peak under Emperor Ashoka. Known for its advanced administration, art, and architecture.",
    significance: "Ashoka's pillars and rock edicts spread Buddhist teachings across Asia. The period saw significant developments in art, architecture, and governance systems.",
    category: "Dynasty"
  },
  {
    title: "Chola Dynasty",
    year: "300 BCE - 1279 CE",
    description: "One of the longest-ruling dynasties in world history. Known for their naval power, temple architecture, and bronze sculptures like Nataraja.",
    significance: "Established a powerful maritime empire in South Asia and Southeast Asia. Built the Great Living Chola Temples (UNESCO Site).",
    category: "Dynasty"
  },
  {
    title: "Vijayanagara Empire",
    year: "1336-1646 CE",
    description: "A major South Indian empire based in the Deccan Plateau. It rose to prominence as a culmination of attempts by the southern powers to ward off Islamic invasions.",
    significance: "Fostered the reconstruction of Hindu life and administration after the disorders and disunities of the 12th and 13th centuries.",
    category: "Dynasty"
  },
  {
    title: "Mughal Empire",
    year: "1526-1857 CE",
    description: "An early modern empire that controlled much of South Asia. Known for its centralized administration, Persianate culture, and monumental architecture.",
    significance: "Left a lasting legacy in art, cuisine, language (Urdu), and architecture (Taj Mahal, Red Fort).",
    category: "Dynasty"
  },
  {
    title: "Third Battle of Panipat",
    year: "1761 CE",
    description: "A pivotal battle between the Maratha Empire and the coalition forces of the Afghan ruler Ahmad Shah Durrani. One of the largest battles of the 18th century.",
    significance: "Changed the course of Indian history by halting Maratha expansion and weakening the Mughal Empire, indirectly paving the way for British colonization.",
    category: "War"
  },
  {
    title: "Indian Independence Movement",
    year: "1857-1947 CE",
    description: "A series of historic events with the ultimate aim of ending British rule in India. It spanned from the Rebellion of 1857 to India's independence in 1947.",
    significance: "Showcased the power of non-violent resistance (Satyagraha) led by Mahatma Gandhi, inspiring civil rights movements across the globe.",
    category: "Movement"
  }
];

// ... rest of imports (UnescoSite, etc.)

const UNESCO_SITES: UnescoSite[] = [
  {
    title: "Taj Mahal",
    description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife, the Taj Mahal is the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage."
  },
  {
    title: "Ajanta Caves",
    description: "The first Buddhist cave monuments at Ajanta date from the 2nd and 1st centuries B.C. During the Gupta period (5th and 6th centuries A.D.), many more richly decorated caves were added to the original group. The paintings and sculptures of Ajanta, considered masterpieces of Buddhist religious art, have had a considerable artistic influence."
  },
  {
    title: "Ellora Caves",
    description: "These 34 monasteries and temples, extending over more than 2 km, were dug side by side in the wall of a high basalt cliff, not far from Aurangabad, in Maharashtra. Ellora, with its uninterrupted sequence of monuments dating from A.D. 600 to 1000, brings the civilization of ancient India to life. Not only is the Ellora complex a unique artistic creation and a technological exploit but, with its sanctuaries devoted to Buddhism, Hinduism and Jainism, it illustrates the spirit of tolerance that was characteristic of ancient India."
  },
  {
    title: "Sun Temple, Konârak",
    description: "On the shores of the Bay of Bengal, bathed in the rays of the rising sun, the temple at Konarak is a monumental representation of the sun god Surya's chariot; its 24 wheels are decorated with symbolic designs and it is led by a team of six horses. Built in the 13th century, it is one of India's most famous Brahman sanctuaries."
  },
  {
    title: "Group of Monuments at Mahabalipuram",
    description: "This group of sanctuaries, founded by the Pallava kings, was carved out of rock along the Coromandel coast in the 7th and 8th centuries. It is known especially for its rathas (temples in the form of chariots), mandapas (cave sanctuaries), giant open-air reliefs such as the famous 'Descent of the Ganges', and the temple of Rivage, with thousands of sculptures to the glory of Shiva."
  },
  {
    title: "Kaziranga National Park",
    description: "In the heart of Assam, this park is one of the last areas in eastern India undisturbed by a human presence. It is inhabited by the world's largest population of one-horned rhinoceroses, as well as many mammals, including tigers, elephants, panthers and bears, and thousands of birds."
  }
];

const Heritage = () => {
  // ... useEffect

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Cultural Heritage
          </span>
          <h1 className="text-4xl md:text-5xl font-bold">
            India's Rich Heritage
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Discover the timeless traditions, ancient wisdom, and cultural treasures that make India a living museum of human civilization.
          </p>
        </div>

        <section className="space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Historical Timeline</h2>
            <p className="text-muted-foreground">A journey through the ages that shaped the subcontinent.</p>
          </div>

          <Timeline events={HISTORICAL_EVENTS} />
        </section>


        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Ancient Architecture</h2>
              <p className="text-muted-foreground">
                From the intricate temples of Khajuraho to the rock-cut caves of Ajanta and Ellora, India's architectural heritage spans millennia. These monuments showcase advanced engineering, artistic excellence, and deep spiritual significance.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Classical Arts</h2>
              <p className="text-muted-foreground">
                India's classical traditions include dance forms like Bharatanatyam and Kathak, musical traditions like Carnatic and Hindustani, and various theatrical arts that have been preserved and passed down through generations.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Traditional Knowledge</h2>
              <p className="text-muted-foreground">
                Ancient texts like the Vedas, Upanishads, and Arthashastra contain profound knowledge about philosophy, science, mathematics, and governance. Traditional practices like Ayurveda and Yoga continue to benefit millions worldwide.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Living Traditions</h2>
              <p className="text-muted-foreground">
                India's heritage lives on through its festivals, rituals, customs, and social practices. These traditions adapt while maintaining their core values, creating a unique blend of ancient and modern.
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">UNESCO World Heritage Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UNESCO_SITES.map((site) => (
              <Card key={site.title} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold">{site.title}</h3>
                <p className="text-muted-foreground">{site.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Cultural Legacy</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            These historical events and epics continue to influence Indian culture, art, literature, and philosophy. Their teachings and values remain relevant in modern times, serving as a bridge between ancient wisdom and contemporary life. Through these stories and events, India's cultural heritage has transcended boundaries and continues to inspire people worldwide.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Heritage;