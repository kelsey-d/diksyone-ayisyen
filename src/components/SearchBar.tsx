"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search for a word in English or Creole..." }: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/translate/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        id="search-form"
        onSubmit={handleSearch}
        className="relative"
      >
        <Input
          id="search-term"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-6 border-2 border-[#00209F] focus:border-[#CE1126] rounded-full transition-colors bg-white text-slate-900 placeholder:text-slate-500"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#00209F]" />
      </form>
    </div>
  );
}
