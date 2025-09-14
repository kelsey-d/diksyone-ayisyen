import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface Poem {
  title: string;
  author: string;
  number: number;
}

const favoritePoems: Poem[] = [
  { number: 1, title: "Peyi Bèl la", author: "Oswald Durand" },
  { number: 2, title: "Sak Pase", author: "Jean-Jacques Dessalines" },
  { number: 3, title: "Zanmi mwen", author: "Marie Laveau" }
];

export function PoemsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white text-center">Powèm pi renmen yo</h2>
      
      <div className="space-y-3">
        {favoritePoems.map((poem) => (
          <div key={poem.number} className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center text-slate-800 font-medium">
              {poem.number}.
            </div>
            <div className="flex-1">
              <div className="font-medium">{poem.title}</div>
              <div className="text-sm text-slate-300">pa {poem.author}</div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-end pt-2">
          <Button 
            variant="ghost" 
            className="text-white hover:text-slate-200 hover:bg-white/10 text-sm"
          >
            wè plis powèm
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}