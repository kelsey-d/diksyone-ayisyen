"use server";

import { generateText, Output } from "ai";
import { groq, type GroqLanguageModelOptions } from "@ai-sdk/groq";
import { z } from "zod";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

// Define schema for the Linguist
const translationSchema = z.object({
  english: z.string(),
  creole: z.string(),
  pronunciation: z.string(),
  part_of_speech: z.string(),
});

interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
  created_at?: string;
}

export async function getTranslation(word: string) {
  const normalizedWord = word.trim().toLowerCase();

  console.log(`[getTranslation] Searching for: ${normalizedWord}`);

  // 1. Try to find the translation in the database
  const { data: existing } = await supabase
    .from('translations')
    .select(`*, poems (*)`)
    .or(`english.ilike.${normalizedWord},creole.ilike.${normalizedWord}`)
    .maybeSingle();

  if (existing) {
    console.log("[getTranslation] Found in database");
    return { data: existing, source: 'database' };
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("[getTranslation] CRITICAL: GROQ_API_KEY is missing.");
    return { error: "Lexicographer is currently unavailable." };
  }

  try {
    // 2. THE LINGUIST: Get core translation data
    console.log("[getTranslation] Consulting Linguist for translation...");
    const result = await generateText({
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      output: Output.object({
        schema: translationSchema
      }),
      system: `You are an expert Haitian Creole linguist. 
               Provide the English-Creole translation, part of speech, and pronunciation.
               - Respond in valid JSON matching the schema.
               - Keep the case lowercase.`,
      prompt: `Translate the word: "${normalizedWord}"`,
    });

    const coreData = result.output;
    console.log("[getTranslation] Linguist returned:", coreData.creole);

    // 3. Search local poem archive for the CREOLE translation
    console.log(`[getTranslation] Searching for poems containing: "${coreData.creole}"`);
    const { data } = await supabase
      .from('poems')
      .select('*')
      .ilike('content', `%${coreData.creole}%`)
      .limit(1)
      .maybeSingle();
    
    const matchedPoem = data as Poem | null;

    let exampleSentence = null;
    let poemId = null;

    if (matchedPoem) {
      console.log(`[getTranslation] Match found in poem: ${matchedPoem.title}`);
      poemId = matchedPoem.id;
      
      const lines = matchedPoem.content.split(/\r?\n/);
      const searchWord = coreData.creole.toLowerCase();

      // Find the specific line containing the word as a whole word
      exampleSentence = lines.find(line => {
        const regex = new RegExp(`\\b${searchWord}\\b`, 'i');
        return regex.test(line);
      })?.trim() || lines.find(line => line.toLowerCase().includes(searchWord))?.trim() || null;
    }

    // 4. Save to database
    const { data: savedTranslation, error: saveError } = await supabase
      .from('translations')
      .insert({
        english: coreData.english.toLowerCase(),
        creole: coreData.creole.toLowerCase(),
        pronunciation: coreData.pronunciation,
        part_of_speech: coreData.part_of_speech,
        example_sentence: exampleSentence,
        poem_id: poemId
      })
      .select(`*, poems (*)`)
      .single();

    if (saveError) {
      if (saveError.code === '23505') {
        const { data: refetch } = await supabase
          .from('translations')
          .select('*, poems(*)')
          .eq('english', coreData.english.toLowerCase())
          .single();
        return { data: refetch, source: 'database' };
      }
      throw saveError;
    }

    console.log("[getTranslation] Successfully saved to database.");
    revalidatePath(`/translate/${word}`);
    return { data: savedTranslation, source: 'ai' };

  } catch (error) {
    console.error("[getTranslation] Error:", error);
    return { error: "The lexicographer could not process this word at this time." };
  }
}

export async function getWordOfTheDay() {
  try {
    const today = new Date();
    const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())).toISOString();
    const endOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1)).toISOString();

    const { data: existingWord, error: fetchError } = await supabase
      .from('translations')
      .select('english, creole')
      .gte('word_of_day', startOfToday)
      .lt('word_of_day', endOfToday)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existingWord) {
      return { data: existingWord };
    } else {
      const { data: allWords, error: allWordsError } = await supabase
        .from('translations')
        .select('id, english, creole');

      if (allWordsError) throw allWordsError;

      if (allWords && allWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * allWords.length);
        const selected = allWords[randomIndex];

        await supabase
          .from('translations')
          .update({ word_of_day: startOfToday })
          .eq('id', selected.id);

        return { data: { english: selected.english, creole: selected.creole } };
      }
    }
    return { error: "No words available" };
  } catch (err) {
    console.error("Error in getWordOfTheDay action:", err);
    return { error: "Failed to fetch word of the day" };
  }
}
