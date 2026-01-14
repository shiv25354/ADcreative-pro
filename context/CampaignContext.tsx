
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserInput, AdStrategy } from '../types';
import { generateAdStrategy, generateAdImage } from '../services/geminiService';

interface CampaignContextType {
  strategy: AdStrategy | null;
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  generateCampaign: (input: UserInput) => Promise<void>;
  resetCampaign: () => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [strategy, setStrategy] = useState<AdStrategy | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetCampaign = () => {
    setStrategy(null);
    setImageUrl(null);
    setError(null);
    setIsLoading(false);
  };

  const generateCampaign = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    setStrategy(null);
    setImageUrl(null);

    try {
      // Step 1: Core Strategy Generation
      const adStrategy = await generateAdStrategy(input);
      setStrategy(adStrategy);

      // Step 2: Visual Reference Generation (Async non-blocking)
      try {
        const url = await generateAdImage(adStrategy.imagePrompt, input.imageFile);
        setImageUrl(url);
      } catch (imgErr) {
        console.warn("Visual generation failed, proceeding with script only.", imgErr);
        // We don't set a global error here to allow the user to see the script
      }
    } catch (err: any) {
      console.error("Campaign Generation Error:", err);
      setError(err.message || "The agency engine encountered a strategic error. Please refine your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CampaignContext.Provider value={{
      strategy,
      imageUrl,
      isLoading,
      error,
      generateCampaign,
      resetCampaign
    }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
