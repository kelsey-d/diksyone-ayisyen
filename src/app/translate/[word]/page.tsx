import { supabase } from "@/lib/supabase";
import { DictionaryEntry } from "@/components/DictionaryEntry";
import { Translation } from "@/data/dictionary-data";

export default async function TranslationPage({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  const { word } = await params;
  const decodedWord = decodeURIComponent(word).toLowerCase();

  // Fetch from translations and join with poems
  const { data, error } = await supabase
    .from("translations")
    .select(
      `
      *,
      poems (
        title,
        author,
        content
      )
    `,
    )
    .or(`english.ilike.%${decodedWord}%,creole.ilike.%${decodedWord}%`);

  if (error) {
    console.error("Error fetching translations:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }

  console.log("Fetched translations:", data);

  // Map database results to the Translation interface used by DictionaryEntry
  const filteredResults: Translation[] = (data || []).map((item) => ({
    english: item.english,
    creole: item.creole,
    phonetic: item.pronunciation,
    poemExample: {
      line: item.example_sentence,
      poemTitle: item.poems?.title || "Unknown",
      author: item.poems?.author || "Unknown",
      fullPoem: item.poems?.content || "",
    },
  }));

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">
        Rezilta pou: "{decodedWord}"
      </h2>

      {filteredResults.length > 0 ? (
        <div className="grid gap-6 max-w-2xl mx-auto">
          {filteredResults.map((translation, index) => (
            <DictionaryEntry key={index} translation={translation} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/80 rounded-lg p-8 border border-[#CE1126]/20 max-w-md mx-auto">
            <p className="text-lg text-slate-700">
              Nou pa jwenn okenn mo ki kòresponn ak "{decodedWord}".
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Eseye chèche ak yon lòt mo oswa verifye òtograf la.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
