# 🇮🇳 Bharat Darshan: Explore the Soul of India

**Bharat Darshan** is a comprehensive, modern web application designed to showcase India's rich cultural heritage, diverse states, vibrant festivals, and unique arts & crafts. Built with a premium UI and integrated with advanced AI capabilities, it serves as a one-stop digital companion for tourists and culture enthusiasts.

---

## 🤖 Featured: Bharat AI (Gemini Integration)
The crown jewel of this project is **Bharat AI**, a state-of-the-art tourism assistant powered by **Google Gemini**.

- **Context-Aware Assistance:** Bharat AI is tuned with the specific data of this project, allowing it to guide users directly to relevant state pages, festivals, or heritage sites.
- **Robust Implementation:** Features a sophisticated model fallback and rotation system in `lib/gemini.ts` to ensure high availability and reliability.
- **Natural Language Interaction:** Ask about the best time to visit anywhere in India or historical backstories of famous monuments.

---

## ✨ Key Features

### 🗺️ Explore Indian States
- Comprehensive data for all Indian states.
- Detailed tourist destinations with images, coordinates, and "Best Time to Visit" guides.
- **One-click Travel Links:** Integrated hotel booking and Google Maps links for every destination.

### 📅 Cultural Hub
- **Festivals:** A dedicated page exploring India's vibrant celebrations, categorized by month and region.
- **Arts & Crafts:** Detailed insights into traditional handicrafts, textiles, and local art forms.
- **Heritage Sites:** Explore UNESCO World Heritage sites and historical monuments.

### 🛠️ Smart Travel Tools (Dashboard)
- **📍 Trip Planner:** Create and manage personalized itineraries for your next adventure.
- **💰 Expense Tracker:** Keep track of your travel budget and spending in real-time.
- **💱 Currency Converter:** Instant conversion for international travelers.
- **☀️ Weather Widget:** Real-time weather updates for your destinations.
- **🎒 Packing Assistant:** Smart checklist to ensure you never forget the essentials.

### 🔐 Secure User Experience
- Full authentication system (Login/Register/Password Recovery) powered by **Firebase**.
- Personalized user profiles and travel dashboards.

---

## 🛠️ Technical Stack

- **Frontend:** [React](https://reactjs.org/) (Function Components & Hooks)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed for reliability)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **AI Engine:** [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Backend/Auth:** [Firebase](https://firebase.google.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Lucide React Icons](https://lucide.dev/)

---

## 📂 Architecture Overview

```text
src/
├── components/     # Reusable UI & Layout components
├── contexts/       # Authentication & User State management
├── data/           # Core site data and static information
├── features/       # Complex modules (AI Chat, Trip Planner, etc.)
├── lib/            # External API configurations (Gemini, Utils)
├── pages/          # Individual route page implementations
└── types/          # Global TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/bharat-darshan.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root and add:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   VITE_FIREBASE_CONFIG=your_config_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🛣️ Future Roadmap
- [ ] Multilingual support (Hindi, Marathi, Tamil, etc.).
- [ ] Offline access for trip itineraries.
- [ ] Integration with real-time transport APIs (trains/flights).
- [ ] Community forum for travel stories.

---

## 👤 Author
**Neeraj Kaushik**
- **LinkedIn:** [neeraj-kaushik1007](https://www.linkedin.com/in/neeraj-kaushik1007)
- **GitHub:** [Neerajkaushik07](https://github.com/Neerajkaushik07)
- **Email:** [Neerajkaushik.1007@gmail.com](mailto:Neerajkaushik.1007@gmail.com)

---

<p align="center">
  Made with ❤️ by <b>Neeraj Kaushik</b><br/>
  <i>Exploring and Preserving India's Diverse Heritage</i>
</p>
