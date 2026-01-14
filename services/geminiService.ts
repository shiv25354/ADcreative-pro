
import { GoogleGenAI, Type } from "@google/genai";
import { AdStrategy, UserInput, UGCStyle } from "../types";

export const generateAdStrategy = async (input: UserInput): Promise<AdStrategy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const isUGC = input.adType === 'UGC';
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `
      Act as a senior advertising agency creative director and strategist. 
      Convert the following product experience into an agency-quality advertising system.

      USER INPUTS:
      - Experience: ${input.experience}
      - Category: ${input.category}
      - Ad Type: ${input.adType}
      ${isUGC ? `- UGC STYLE: ${input.ugcStyle}` : ''}
      - Product Link: ${input.productLink}

      STRICT STORYBOARD REQUIREMENTS (15 SECONDS TOTAL):
      1. Exactly 5 scenes, each exactly 3 seconds long.
      2. TIMING FORMAT: You MUST use cumulative ranges (00:00 - 00:03, etc).
      
      UGC AUTHENTICITY & RAW ENERGY REQUIREMENTS (IF AD TYPE IS UGC):
      - CREATOR PERSONA: Define a relatable character (e.g., "The Tired Tech Founder", "The Honest Skincare Enthusiast").
      - AUTHENTICITY CHECKLIST: Provide 3-4 "raw" production tips (e.g., "Film in a car for natural reverb", "Keep the background slightly messy", "Stumble slightly on word X").
      - STYLE ADAPTATION:
        * ${input.ugcStyle === UGCStyle.GREEN_SCREEN ? 'Include visual directions for pointing at background elements/product screenshots.' : ''}
        * ${input.ugcStyle === UGCStyle.UNBOXING ? 'Focus on ASMR sounds of packaging and genuine "wow" moments.' : ''}
        * ${input.ugcStyle === UGCStyle.AESTHETIC_VLOG ? 'Focus on soft lighting, relaxed pacing, and voiceover while the creator performs a routine (like skincare or morning prep).' : ''}
        * ${input.ugcStyle === UGCStyle.STITCH_BAIT ? 'Start with a high-tension reaction or a split-screen vibe that invites engagement.' : ''}
        * ${input.ugcStyle === UGCStyle.DITL ? 'Show product integration into a busy, realistic daily routine.' : ''}
        * ${input.ugcStyle === UGCStyle.TIPS_TRICKS ? 'Start with "Did you know...?" and show a fast-paced montage of unexpected benefits or features.' : ''}
        * ${input.ugcStyle === UGCStyle.STORYTIME ? 'Deliver a direct-to-camera confessional about a specific problem the product solved.' : ''}
      - AUDIO: Use conversational language, slang where appropriate, and a high-energy "thumb-stopping" hook.

      OUTPUT STRUCTURE:
      - Purpose: core hook, strategic goal, tone, creatorPersona.
      - ugcStyle: include the style if UGC.
      - authenticityChecklist: array of 3-5 raw production tips.
      - Storyboard: 5 scenes with timing, visual, cameraAngle, moodLighting, text, audio, and creatorInstruction.
      - ImagePrompt: A 9:16 reference image prompt.
      - CTA: copy, linkPlacement, exampleLink.
      - Tips: 3 scaling suggestions.

      OUTPUT FORMAT: JSON only.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          purpose: {
            type: Type.OBJECT,
            properties: {
              core: { type: Type.STRING },
              goal: { type: Type.STRING },
              tone: { type: Type.STRING },
              creatorPersona: { type: Type.STRING }
            },
            required: ['core', 'goal', 'tone', 'creatorPersona']
          },
          ugcStyle: { type: Type.STRING },
          authenticityChecklist: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          storyboard: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timing: { type: Type.STRING },
                visual: { type: Type.STRING },
                cameraAngle: { type: Type.STRING },
                moodLighting: { type: Type.STRING },
                text: { type: Type.STRING },
                audio: { type: Type.STRING },
                creatorInstruction: { type: Type.STRING }
              },
              required: ['timing', 'visual', 'cameraAngle', 'moodLighting', 'text', 'audio', 'creatorInstruction']
            }
          },
          imagePrompt: { type: Type.STRING },
          cta: {
            type: Type.OBJECT,
            properties: {
              copy: { type: Type.STRING },
              linkPlacement: { type: Type.STRING },
              exampleLink: { type: Type.STRING }
            }
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['purpose', 'authenticityChecklist', 'storyboard', 'imagePrompt', 'cta', 'tips']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateAdImage = async (prompt: string, userImageBase64?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const contents: any[] = [{ text: `Generate a high-quality vertical 9:16 advertising lifestyle image. Prompt: ${prompt}. Cinematic lighting, premium aesthetic, realistic textures, no text, no watermarks.` }];
  
  if (userImageBase64) {
    contents.unshift({
      inlineData: {
        data: userImageBase64.split(',')[1],
        mimeType: 'image/png'
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: contents },
    config: { imageConfig: { aspectRatio: "9:16" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  
  throw new Error("Failed to generate image");
};
