import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTranslation, TranslationResult } from './actions';
import { supabase } from './supabase';
import { generateText } from 'ai';
import { Mock } from 'vitest';

// Mock dependencies
vi.mock('./supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

vi.mock('ai', () => ({
  generateText: vi.fn(),
  Output: {
    object: vi.fn(),
  },
}));

vi.mock('@ai-sdk/groq', () => ({
  groq: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('getTranslation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GROQ_API_KEY = 'mock-key';
  });

  it('should return multiple senses for the word "fight"', async () => {
    // 1. Mock DB check (not found)
    const mockOr = vi.fn().mockResolvedValue({ data: null });
    const mockSelectExisting = vi.fn().mockReturnValue({ or: mockOr });
    
    // 2. Mock Poem check (not found)
    const mockMaybeSinglePoem = vi.fn().mockResolvedValue({ data: null });
    const mockLimit = vi.fn().mockReturnValue({ maybeSingle: mockMaybeSinglePoem });
    const mockIlike = vi.fn().mockReturnValue({ limit: mockLimit });
    const mockSelectPoem = vi.fn().mockReturnValue({ ilike: mockIlike });

    // 3. Mock Insert
    const mockSingleInsert = vi.fn().mockResolvedValue({
      data: {
        english: 'fight',
        creole: 'batay',
        part_of_speech: 'noun',
        poems: null
      }
    });
    const mockSelectInsert = vi.fn().mockReturnValue({ single: mockSingleInsert });
    const mockInsert = vi.fn().mockReturnValue({ select: mockSelectInsert });

    (supabase.from as Mock).mockImplementation((table: string) => {
      if (table === 'translations') {
        return { select: mockSelectExisting, insert: mockInsert };
      }
      if (table === 'poems') {
        return { select: mockSelectPoem };
      }
      return {};
    });

    // 4. Mock AI returning multiple senses
    (generateText as Mock).mockResolvedValueOnce({
      output: {
        senses: [
          {
            english: 'fight',
            creole: 'batay',
            pronunciation: 'ba-tay',
            part_of_speech: 'noun',
          },
          {
            english: 'fight',
            creole: 'goumen',
            pronunciation: 'gou-men',
            part_of_speech: 'verb',
          },
        ],
      }
    });

    const result = await getTranslation('fight');

    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toHaveLength(2);
    if (result.data) {
        expect((result.data as TranslationResult[])[0].creole).toBe('batay');
    }
  });
});
