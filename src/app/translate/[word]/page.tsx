"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "@/lib/actions";
import { DictionaryEntry } from "@/components/DictionaryEntry";
import { Translation } from "@/data/dictionary-data";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TranslationPage() {
  const params = useParams();
  const word = params.word as string;
  const decodedWord = decodeURIComponent(word).toLowerCase();

  const [results, setResults] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'database' | 'ai' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTranslation() {
      setLoading(true);
      const res = await getTranslation(decodedWord);

      if (res.error) {
        setError(res.error);
      } else if (res.data) {
        // Map database results to the Translation interface
        const items = Array.isArray(res.data) ? res.data : [res.data];
        const formattedResults = items.map((item: any) => ({
          english: item.english,
          creole: item.creole,
          phonetic: item.pronunciation || item.phonetic,
          part_of_speech: item.part_of_speech,
          poemExample: {
            line: item.example_sentence,
            poemTitle: item.poems?.title || 'Unknown',
            author: item.poems?.author || 'Unknown',
            fullPoem: item.poems?.content || ''
          }
        }));
        setResults(formattedResults);
        setSource(res.source as any);
      }
      setLoading(false);
    }

    fetchTranslation();
  }, [decodedWord]);

  if (loading) {
    return (
      <div className="flex-1 bg-brand-muted-blue">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center space-y-6 text-white flex-1">
          <div className="relative">
            <Loader2 className="h-16 w-16 text-[#CE1126] animate-spin" />
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-[#00209F] animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Researching "{decodedWord}"</h2>
            <p className="text-slate-400 max-w-sm">
              Our linguists are identifying grammatical senses and searching for literary context...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 flex-1">
      <div className="max-w-2xl mx-auto w-full">
        <Link href="/" passHref>
          <Button variant="ghost" className="text-white hover:text-[#CE1126] hover:bg-white/10 mb-4 p-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to search
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-2xl font-bold text-white text-center">
          Results for: "{decodedWord}"
        </h2>
        {source === 'ai' && (
          <span className="text-xs bg-[#00209F] text-white px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
            <Sparkles className="h-3 w-3" /> New entries added by AI
          </span>
        )}
      </div>

      {error ? (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-white/10 rounded-lg p-8 border border-[#CE1126]/50 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-white mb-2">Notice</h2>
            <p className="text-slate-300">{error}</p>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-8">
          {results.map((result, index) => (
            <DictionaryEntry key={`${result.creole}-${index}`} translation={result} />
          ))}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12 text-center text-white">
          <p>No results found.</p>
        </div>
      )}
    </div>
  );
}
