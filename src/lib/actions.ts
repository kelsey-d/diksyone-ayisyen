"use server";

import { generateText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

// Define schema for the Linguist
const senseSchema = z.object({
  english: z.string(),
  creole: z.string(),
  pronunciation: z.string(),
  part_of_speech: z.string(),
  example_sentence: z.string(),
});

const translationSchema = z.object({
  senses: z.array(senseSchema),
});

export interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
  created_at?: string;
}

export interface Sense {
  english: string;
  creole: string;
  pronunciation: string;
  part_of_speech: string;
  example_sentence: string;
}

export interface TranslationResult {
  english: string;
  creole: string;
  pronunciation: string;
  part_of_speech: string;
  example_sentence: string | null;
  poem_id: string | null;
  poems: Poem | null;
}

export async function getTranslation(word: string): Promise<{ data?: TranslationResult[], source?: string, error?: string }> {
  const normalizedWord = word.trim().toLowerCase();

  console.log(`[getTranslation] Searching for: ${normalizedWord}`);

  // 1. Try to find the translation in the database
  const { data: existing, error: fetchError } = await supabase
    .from('translations')
    .select(`*, poems (*)`)
    .or(`english.ilike.${normalizedWord},creole.ilike.${normalizedWord}`);

  if (fetchError) {
    console.error("[getTranslation] Fetch error:", fetchError);
  }

  if (existing && existing.length > 0) {
    console.log("[getTranslation] Found in database");
    return { data: existing as TranslationResult[], source: 'database' };
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("[getTranslation] CRITICAL: GROQ_API_KEY is missing.");
    return { error: "Lexicographer is currently unavailable." };
  }

  try {
    // 2. THE LINGUIST: Get multiple core translation senses with tailored example sentences
    console.log("[getTranslation] Consulting Linguist for translation senses...");
    const result = await generateText({
      model: groq("openai/gpt-oss-120b"),
      output: Output.object({
        schema: translationSchema
      }),
      system: `You are an expert Haitian Creole linguist. 
               Identify all common grammatical senses (noun, verb, adjective, etc.) for the given word.
               - Provide the English-Creole translation, part of speech, pronunciation, and an authentic Haitian Creole example sentence demonstrating the word used specifically in this grammatical sense.
               - Respond in valid JSON matching the schema (an object containing a 'senses' array).
               - IMPORTANT: Use bare word forms for English. NEVER include the particle "to " before verbs. 
                 Example: use "plant" instead of "to plant", "fight" instead of "to fight".
               - IMPORTANT: Keep english, creole, and part of speech text lowercase. The example_sentence should be a natural sentence in Haitian Creole with proper capitalization and punctuation.`,
      prompt: `Translate the word: "${normalizedWord}"`,
    });

    const senses: Sense[] = result.output.senses.map((s: Sense) => ({
      ...s,
      english: s.english.toLowerCase().replace(/^to\s+/i, '').trim(),
      creole: s.creole.toLowerCase().trim(),
      example_sentence: s.example_sentence.trim()
    }));
    console.log(`[getTranslation] Linguist returned ${senses.length} senses.`);

    const savedResults: TranslationResult[] = [];

    for (const coreData of senses) {
      // 3. Save each sense with its generated example sentence to the database
      const { data: savedTranslation, error: saveError } = await supabase
        .from('translations')
        .insert({
          english: coreData.english.toLowerCase(),
          creole: coreData.creole.toLowerCase(),
          pronunciation: coreData.pronunciation,
          part_of_speech: coreData.part_of_speech,
          example_sentence: coreData.example_sentence,
          poem_id: null
        })
        .select(`*, poems (*)`)
        .single();

      if (saveError) {
        // If it's a conflict, just skip or refetch
        if (saveError.code === '23505') {
          const { data: refetch } = await supabase
            .from('translations')
            .select('*, poems(*)')
            .eq('english', coreData.english.toLowerCase())
            .eq('creole', coreData.creole.toLowerCase())
            .single();
          if (refetch) savedResults.push(refetch as TranslationResult);
          continue;
        }
        throw saveError;
      }
      
      if (savedTranslation) savedResults.push(savedTranslation as TranslationResult);
    }

    console.log("[getTranslation] Successfully processed all senses.");
    revalidatePath(`/translate/${word}`);
    return { data: savedResults, source: 'ai' };

  } catch (error) {
    console.error("[getTranslation] Error:", error);
    return { error: "The lexicographer could not process this word at this time." };
  }
}

export async function getWordOfTheDay(): Promise<{ data?: { english: string, creole: string }, error?: string }> {
  try {
    const { data: allWords, error: fetchError } = await supabase
      .from('translations')
      .select('english, creole');

    if (fetchError) throw fetchError;

    if (allWords && allWords.length > 0) {
      // Use today's date string (YYYY-MM-DD) as a seed
      const today = new Date().toISOString().split('T')[0];
      
      // Simple hash function to turn the date string into a consistent number
      let hash = 0;
      for (let i = 0; i < today.length; i++) {
        hash = ((hash << 5) - hash) + today.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      // Use the absolute hash to pick a consistent index
      const randomIndex = Math.abs(hash) % allWords.length;
      const selected = allWords[randomIndex];

      return { data: { english: selected.english, creole: selected.creole } };
    }
    
    return { error: "No words available" };
  } catch (err) {
    console.error("Error in getWordOfTheDay action:", err);
    return { error: "Failed to fetch word of the day" };
  }
}
