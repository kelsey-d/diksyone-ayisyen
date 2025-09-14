"use client";
import { useState, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { DictionaryEntry } from "./DictionaryEntry";
import { WordOfTheDay } from "./WordOfTheDay";
import { dictionaryData } from "@/data/dictionary-data";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return dictionaryData.filter(
      (item) =>
        item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.creole.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleWordOfTheDayClick = (word: string) => {
    setSearchTerm(word);
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="flex flex-col items-center space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Chèche"
        />
        <p className="text-sm text-white text-center max-w-md">
          Tape yon mo nan Anglè pou w jwenn tradiksyon an nan Kreyòl Ayisyen ak
          yon egzanp nan powèm.
        </p>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {searchTerm.trim() === "" ? (
          <div className="text-center py-12">
            <WordOfTheDay onWordClick={handleWordOfTheDayClick} />
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Rezilta yo ({filteredResults.length})
            </h2>
            {filteredResults.map((translation, index) => (
              <DictionaryEntry key={index} translation={translation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/80 rounded-lg p-8 border border-[#CE1126]/20 max-w-md mx-auto">
              <p className="text-lg text-slate-700">
                Nou pa jwenn okenn mo ki kòresponn ak "{searchTerm}".
              </p>
              <p className="text-sm text-slate-600 mt-2">
                Eseye chèche ak yon lòt mo oswa verifye òtograf la.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
