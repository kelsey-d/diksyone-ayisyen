import { ArrowRight } from "lucide-react";
import { Card } from "./ui/card";

interface TranslationCardProps {
  english: string;
  creole: string;
  date?: string;
}

export function TranslationCard({ english, creole, date }: TranslationCardProps) {
  const currentDate = new Date().toLocaleDateString('ht-HT', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <Card className="bg-slate-200 p-4 space-y-3">
      {date && (
        <div className="text-sm text-slate-600 text-center">
          {date}
        </div>
      )}
      <div className="bg-slate-100 rounded-lg p-4">
        <div className="text-center space-y-2">
          <div className="text-xl text-slate-700 font-medium">{creole}</div>
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <ArrowRight className="h-4 w-4" />
          </div>
          <div className="text-lg text-slate-800 font-medium">{english}</div>
        </div>
      </div>
    </Card>
  );
}