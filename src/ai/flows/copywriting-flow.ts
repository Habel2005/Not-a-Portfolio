'use server';
/**
 * @fileOverview A copywriting AI agent for high-fashion editorial tonality.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CopywritingInputSchema = z.object({
  context: z.string().describe('The section or topic (e.g., "About Studio", "Service Heading").'),
  tone: z.string().default('brutalist luxury').describe('The desired tonality.'),
});

const CopywritingOutputSchema = z.object({
  headline: z.string().describe('A massive, punchy headline.'),
  body: z.string().describe('Supporting text with an editorial, minimal rhythm.'),
});

export type CopywritingInput = z.infer<typeof CopywritingInputSchema>;
export type CopywritingOutput = z.infer<typeof CopywritingOutputSchema>;

export async function generateEditorialCopy(input: CopywritingInput): Promise<CopywritingOutput> {
  return copywritingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'editorialCopyPrompt',
  input: { schema: CopywritingInputSchema },
  output: { schema: CopywritingOutputSchema },
  prompt: `You are a creative director for a high-fashion editorial magazine. 
You specialize in writing copy that feels "expensive", "minimal", and "intentional".

Context: {{{context}}}
Tone: {{{tone}}}

Rules:
- Headlines must be aggressive, short, and often use contrast (e.g., "Silence as a Statement").
- Body text must be rhythm-driven, using precise language. Avoid generic marketing fluff.
- Emphasize the beauty of the void, architectural purity, and modernist elegance.`,
});

const copywritingFlow = ai.defineFlow(
  {
    name: 'copywritingFlow',
    inputSchema: CopywritingInputSchema,
    outputSchema: CopywritingOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);