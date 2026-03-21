import { SearchBar } from "@/components/SearchBar";
import { WordOfTheDay } from "@/components/WordOfTheDay";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 flex items-center justify-center">
      <div className="space-y-8">
        {/* Search Section */}
        <div className="min-w-112">
          <SearchBar placeholder="Search in engish or creole" />
        </div>

        {/* Word of the Day Section 
        <div className="text-center py-12">
          <WordOfTheDay />
        </div>*/}
      </div>
    </main>
  );
}
