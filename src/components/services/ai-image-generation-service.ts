/**
 * AI Image Generation Service for DivinityAGI
 * 
 * This service handles generating spiritual guide avatars using AI image generation APIs.
 * Supports multiple providers with fallback options.
 * 
 * Supported Providers:
 * - Stable Diffusion (Stability AI) - Recommended for production
 * - DALL-E 3 (OpenAI) - High quality, more expensive
 * - Unsplash - Fallback for development/testing
 */

export interface GuideImagePrompt {
  role: string;  // Advisor, Healer, Scholar, Celebrant
  faith: string;  // Christianity, Buddhism, Islam, etc.
  agePreference: string;  // young, middle-aged, elder
  gender?: 'male' | 'female' | 'non-binary';
}

/**
 * Build a detailed prompt for AI image generation based on guide characteristics
 */
export const buildGuideImagePrompt = (guide: GuideImagePrompt): string => {
  // Age descriptors
  const ageMap: Record<string, string> = {
    'young': 'youthful, vibrant',
    'middle-aged': 'mature, experienced',
    'elder': 'wise elder, venerable',
  };
  
  const ageDesc = ageMap[guide.agePreference] || 'timeless';
  
  // Role descriptors
  const roleMap: Record<string, string> = {
    'Advisor': 'contemplative and wise, emanating guidance',
    'Healer': 'compassionate and nurturing, radiating healing energy',
    'Scholar': 'intelligent and scholarly, embodying wisdom',
    'Celebrant': 'joyful and celebratory, expressing divine joy',
  };
  
  const roleDesc = roleMap[guide.role] || 'serene and peaceful';
  
  // Faith-specific styling
  const faithMap: Record<string, string> = {
    'Christianity': 'gentle features, peaceful countenance, warm glow, traditional robes',
    'Buddhism': 'serene expression, meditative pose, saffron and gold accents, lotus symbolism',
    'Hinduism': 'vibrant spiritual presence, traditional attire, sacred symbols, divine aura',
    'Islam': 'dignified bearing, modest appearance, noble features, geometric patterns',
    'Judaism': 'wise thoughtful face, traditional head covering, scroll imagery',
    'Taoism': 'natural harmonious features, simple robes, yin-yang balance, flowing energy',
    'Sikhism': 'strong compassionate presence, turban, khanda symbol, warrior-saint bearing',
    'Shinto': 'pure essence, traditional Japanese features, shrine aesthetics, sacred presence',
    'Jainism': 'ascetic serenity, pure white garments, non-violence symbolism',
    'Confucianism': 'scholarly appearance, traditional Chinese robes, book imagery',
    'Baha\'i': 'universal features, nine-pointed star, unity symbolism',
    'Polytheism': 'ancient mystical presence, multiple cultural elements, cosmic energy',
  };
  
  const faithDesc = faithMap[guide.faith] || 'spiritual essence with universal divine light';
  
  // Construct the full prompt
  const prompt = `Professional portrait of a ${ageDesc} spiritual guide, ${roleDesc}, ${faithDesc}, divine light emanating, ethereal atmosphere, cosmic background with subtle sacred geometry, highly detailed facial features, photorealistic, 8k quality, centered composition, soft golden lighting, peaceful expression, eyes full of wisdom and compassion`;
  
  // Negative prompt to avoid unwanted elements
  const negativePrompt = 'cartoon, anime, illustration, painting, low quality, blurry, distorted, deformed, text, watermark, signature';
  
  return prompt;
};

/**
 * Generate guide avatar using Stable Diffusion API
 * 
 * Stability AI API: https://platform.stability.ai/docs/api-reference
 * Get API key from: https://platform.stability.ai/account/keys
 */
export const generateImageWithStableDiffusion = async (
  prompt: string,
  apiKey: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1,
          },
          {
            text: 'cartoon, anime, illustration, painting, low quality, blurry, distorted',
            weight: -1,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
        style_preset: 'photographic',
      }),
    });

    if (!response.ok) {
      throw new Error(`Stable Diffusion API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.artifacts && data.artifacts.length > 0) {
      // Convert base64 to blob URL
      const base64Image = data.artifacts[0].base64;
      const blob = base64ToBlob(base64Image, 'image/png');
      return URL.createObjectURL(blob);
    }

    throw new Error('No image generated');
  } catch (error) {
    console.error('Stable Diffusion generation error:', error);
    throw error;
  }
};

/**
 * Generate guide avatar using DALL-E 3 API
 * 
 * OpenAI API: https://platform.openai.com/docs/guides/images/introduction
 * Get API key from: https://platform.openai.com/api-keys
 */
export const generateImageWithDALLE = async (
  prompt: string,
  apiKey: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
        style: 'natural',
      }),
    });

    if (!response.ok) {
      throw new Error(`DALL-E API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      return data.data[0].url;
    }

    throw new Error('No image generated');
  } catch (error) {
    console.error('DALL-E generation error:', error);
    throw error;
  }
};

/**
 * Generate guide avatar using Unsplash as fallback
 * (Free, no API key required for development)
 */
export const generateImageWithUnsplash = async (guide: GuideImagePrompt): Promise<string> => {
  try {
    const genderHint = guide.agePreference === 'young' ? 'youthful' : 
                       guide.agePreference === 'middle-aged' ? 'mature' : 'wise elder';
    
    const searchQuery = `${genderHint} spiritual meditation portrait peaceful`;
    
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchQuery)}&client_id=4GS-cAxubs7qhILu6vYwMs3M_XezqR8rSWRursSwf0U`
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.urls.regular;
    }
    
    throw new Error('Unsplash fetch failed');
  } catch (error) {
    console.error('Unsplash generation error:', error);
    throw error;
  }
};

/**
 * Main function to generate guide avatar
 * Tries providers in order: Stable Diffusion -> DALL-E -> Unsplash
 */
export const generateGuideAvatar = async (
  guide: GuideImagePrompt,
  config?: {
    stableDiffusionKey?: string;
    dalleKey?: string;
    preferredProvider?: 'stability' | 'dalle' | 'unsplash';
  }
): Promise<string> => {
  const prompt = buildGuideImagePrompt(guide);
  console.log('Generating guide avatar with prompt:', prompt);

  // If preferred provider specified, try that first
  if (config?.preferredProvider === 'stability' && config.stableDiffusionKey) {
    try {
      return await generateImageWithStableDiffusion(prompt, config.stableDiffusionKey);
    } catch (error) {
      console.warn('Stable Diffusion failed, trying fallback...');
    }
  }

  if (config?.preferredProvider === 'dalle' && config.dalleKey) {
    try {
      return await generateImageWithDALLE(prompt, config.dalleKey);
    } catch (error) {
      console.warn('DALL-E failed, trying fallback...');
    }
  }

  // Try Stable Diffusion first if key provided
  if (config?.stableDiffusionKey) {
    try {
      return await generateImageWithStableDiffusion(prompt, config.stableDiffusionKey);
    } catch (error) {
      console.warn('Stable Diffusion failed, trying DALL-E...');
    }
  }

  // Try DALL-E if key provided
  if (config?.dalleKey) {
    try {
      return await generateImageWithDALLE(prompt, config.dalleKey);
    } catch (error) {
      console.warn('DALL-E failed, falling back to Unsplash...');
    }
  }

  // Fallback to Unsplash (always works, no API key needed)
  console.log('Using Unsplash fallback for guide avatar');
  return await generateImageWithUnsplash(guide);
};

/**
 * Helper: Convert base64 to Blob
 */
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
};

export default {
  generateGuideAvatar,
  buildGuideImagePrompt,
  generateImageWithStableDiffusion,
  generateImageWithDALLE,
  generateImageWithUnsplash,
};
