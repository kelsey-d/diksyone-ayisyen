import { SearchBar } from "@/components/SearchBar";
import { WordOfTheDay } from "@/components/WordOfTheDay";
import { redirect } from "next/navigation";

export default function Home() {
  async function handleWordSearch(word: string) {
    "use server";
    redirect(`/translate/${encodeURIComponent(word)}`);
  }

  return (
    <main className="container mx-auto px-4 py-8 flex items-center justify-center flex-1">
      <div className="space-y-8 w-full max-w-lg">
        {/* Search Section */}
        <div className="w-full">
          <SearchBar placeholder="Search in English or Creole..." />
        </div>

        {/* Word of the Day Section */}
        <div className="text-center py-12">
          <WordOfTheDay onWordClick={handleWordSearch} />
        </div>
      </div>
    </main>
  );
}
