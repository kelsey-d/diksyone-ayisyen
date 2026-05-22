import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTranslation } from './actions';
import { supabase } from './supabase';
import { generateText } from 'ai';

// Mock dependencies
const mockMaybeSingle = vi.fn();
const mockSingle = vi.fn();
const mockInsert = vi.fn(() => ({
  select: vi.fn(() => ({
    single: mockSingle,
  })),
}));

vi.mock('./supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        or: vi.fn(() => ({
          maybeSingle: mockMaybeSingle,
        })),
        ilike: vi.fn(() => ({
          limit: vi.fn(() => ({
            maybeSingle: mockMaybeSingle,
          })),
        })),
      })),
      insert: mockInsert,
    })),
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
    // Mock DB not finding the word
    (supabase.from as any)().select().or().maybeSingle.mockResolvedValue({ data: null });
    (supabase.from as any)().select().ilike().limit().maybeSingle.mockResolvedValue({ data: null });

    // Mock AI returning multiple senses
    (generateText as any).mockResolvedValueOnce({
      object: [
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
    });

    // Mock DB Save
    (supabase.from as any)().insert().select().single.mockResolvedValue({
      data: {
        english: 'fight',
        creole: 'batay',
        part_of_speech: 'noun',
        poems: null
      }
    });

    const result = await getTranslation('fight');

    // This is expected to fail currently as getTranslation returns a single object
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toHaveLength(2);
  });
});
