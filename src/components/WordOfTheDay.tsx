"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

  const currentDate = new Date().toLocaleDateString('fr-HT', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  });

  useEffect(() => {
    async function getWordOfTheDay() {
      try {
        setLoading(true);
        // 1. Check for a word with word_of_day timestamp equal to today (UTC)
        const today = new Date();
        const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())).toISOString();
        const endOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1)).toISOString();

        const { data: existingWord, error: fetchError } = await supabase
          .from('translations')
          .select('english, creole')
          .gte('word_of_day', startOfToday)
          .lt('word_of_day', endOfToday)
          .maybeSingle();

        if (fetchError) {
          console.error("Error fetching daily word:", {
            message: fetchError.message,
            details: fetchError.details,
            hint: fetchError.hint,
            code: fetchError.code
          });
          throw fetchError;
        }

        if (existingWord) {
          setDailyWord(existingWord);
        } else {
          // 2. If no word for today, pick a random word and update its word_of_day
          const { data: allWords, error: allWordsError } = await supabase
            .from('translations')
            .select('id, english, creole');

          if (allWordsError) {
            console.error("Error fetching all words for random selection:", {
              message: allWordsError.message,
              details: allWordsError.details,
              hint: allWordsError.hint,
              code: allWordsError.code
            });
            throw allWordsError;
          }

          if (allWords && allWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * allWords.length);
            const selected = allWords[randomIndex];

            const { error: updateError } = await supabase
              .from('translations')
              .update({ word_of_day: new Date().toISOString() })
              .eq('id', selected.id);

            if (updateError) {
              console.error("Error updating word of the day:", {
                message: updateError.message,
                details: updateError.details,
                hint: updateError.hint,
                code: updateError.code
              });
              throw updateError;
            }
            setDailyWord(selected);
          }
        }
      } catch (err) {
        console.error("Critical error in WordOfTheDay:", err);
      } finally {
        setLoading(false);
      }
    }

    getWordOfTheDay();
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
        <h2 className="text-center text-lg font-medium">mo jounen an</h2>
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
