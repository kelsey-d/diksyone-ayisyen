import { Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { PoemExample } from "./PoemExample";
import { Translation } from "../data/dictionary-data";

interface DictionaryEntryProps {
  translation: Translation;
}

export function DictionaryEntry({ translation }: DictionaryEntryProps) {
  const handlePlayAudio = () => {
    // Mock audio playback - in a real app this would play actual audio
    const utterance = new SpeechSynthesisUtterance(translation.creole);
    utterance.lang = 'ht'; // Haitian Creole language code
    speechSynthesis.speak(utterance);
  };

  return (
    <Card className="border-2 border-[#00209F] bg-gradient-to-br from-blue-50 to-red-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[#00209F]">{translation.english}</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#CE1126]">{translation.creole}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayAudio}
                className="border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-slate-600 italic">{translation.phonetic}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <PoemExample 
          line={translation.poemExample.line}
          poemTitle={translation.poemExample.poemTitle}
          author={translation.poemExample.author}
          fullPoem={translation.poemExample.fullPoem}
        />
      </CardContent>
    </Card>
  );
}