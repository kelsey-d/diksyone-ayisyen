"use client";

import { useEffect, useState } from "react";
import { getWordOfTheDay } from "@/lib/actions";

interface WordOfTheDayProps {
  onWordClick: (word: string) => void;
}

interface DailyWord {
  english: string;
  creole: string;
}

export function WordOfTheDay({ onWordClick }: WordOfTheDayProps) {
  const [dailyWord, setDailyWord] = useState<DailyWord | null>(null);
  const [loading, setLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  });

  useEffect(() => {
    async function fetchDailyWord() {
      setLoading(true);
      const res = await getWordOfTheDay();
      if (res.data) {
        setDailyWord(res.data);
      }
      setLoading(false);
    }
    fetchDailyWord();
  }, []);

  const handleWordClick = () => {
    if (dailyWord) {
      onWordClick(dailyWord.english);
    }
  };

  if (loading || !dailyWord) {
    return (
      <div className="max-w-md mx-auto animate-pulse">
        <div className="bg-slate-800 h-14 rounded-t-[10px]" />
        <div className="bg-slate-700 h-20 rounded-b-[10px]" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Top section with date - black background with top rounded corners */}
      <div className="bg-black text-white px-6 py-4 rounded-t-[10px]">
        <p className="text-center text-sm">{currentDate}</p>
        <h2 className="text-center text-lg font-medium">word of the day</h2>
      </div>
      
      {/* Bottom section with word - light blue background with bottom rounded corners */}
      <div 
        className="bg-[#9CA6CA] text-[#001669] px-6 py-6 rounded-b-[10px] cursor-pointer hover:bg-[#8B9BC4] transition-colors"
        onClick={handleWordClick}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{dailyWord.creole} → {dailyWord.english}</div>
        </div>
      </div>
    </div>
  );
}
