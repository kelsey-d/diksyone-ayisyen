import { Search, Info } from "lucide-react";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { dictionaryData } from "../data/dictionary-data";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  const availableWords = dictionaryData.map(item => item.english).sort();

  const handleWordClick = (word: string) => {
    onChange(word);
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <Search className="absolute rounded-full left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 border-2 border-[#00209F] focus:border-[#CE1126] rounded-full transition-colors"
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex-shrink-0 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <Info className="h-4 w-4 text-white" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-64 p-3">
          <div className="space-y-3">
            <p className="font-medium text-sm text-[#001669]">Mo ki disponib yo:</p>
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