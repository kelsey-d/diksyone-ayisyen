"use client";
import { Search, Info } from "lucide-react";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface SearchBarProps {
  placeholder: string;
}

export function SearchBar({ placeholder }: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  useEffect(() => {
    async function fetchWords() {
      const { data, error } = await supabase
        .from('translations')
        .select('english')
        .order('english', { ascending: true });
      
      if (error) {
        console.error("Error fetching words for search suggestions:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
      } else if (data) {
        setAvailableWords(data.map(item => item.english));
      }
    }
    fetchWords();
  }, []);

  const handleWordClick = (word: string) => {
    setSearchTerm(word);
    router.push(`/translate/${word}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/translate/${searchTerm}`);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-md mx-auto">
      <form
        id="search-form"
        onSubmit={handleSearch}
        className="relative flex-1"
      >
        <Input
          id="search-term"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-2 border-[#00209F] focus:border-[#CE1126] rounded-full transition-colors"
        />
        <Search className="absolute rounded-full left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
      </form>

      <Popover>
        <PopoverTrigger asChild>
          <button className="flex-shrink-0 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <Info className="h-4 w-4 text-white" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-64 p-3">
          <div className="space-y-3">
            <p className="font-medium text-sm text-[#001669]">
              Mo ki disponib yo:
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {availableWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word)}
                  className="text-xs text-left p-1 rounded hover:bg-[#001669] hover:text-white transition-colors text-slate-600"
                >
                  {word}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 border-t pt-2">
              Klike sou yon mo pou chèche li
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
