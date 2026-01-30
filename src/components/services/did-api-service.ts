/**
 * D-ID API Service for DivinityAGI
 * 
 * D-ID specializes in creating AI-powered talking avatar videos from static images.
 * This service enables:
 * - Animating guide avatars with realistic facial movements
 * - Text-to-speech with natural AI voices
 * - Multi-language support for global spiritual guidance
 * - Live streaming for real-time conversations
 * 
 * IMPORTANT: D-ID does NOT generate images from scratch. It ANIMATES existing images.
 * For image generation, use services like DALL-E, Stable Diffusion, or Midjourney first,
 * then pass those images to D-ID for animation.
 * 
 * API Documentation: https://docs.d-id.com/reference/get-started
 * API Credentials: c3BtbXVzaWNiaXpAZ21haWwuY29t:ahK-3Mm72ZXwIpwZ_sBZb
 */

// D-ID API Configuration
const DID_API_BASE_URL = 'https://api.d-id.com';
const DID_API_CREDENTIALS = 'c3BtbXVzaWNiaXpAZ21haWwuY29t:ahK-3Mm72ZXwIpwZ_sBZb';

// Create authorization header
const getAuthHeaders = () => ({
  'Authorization': `Basic ${btoa(DID_API_CREDENTIALS)}`,
  'Content-Type': 'application/json',
});

/**
 * Voice options for different spiritual contexts
 */
export const SPIRITUAL_VOICES = {
  // English voices
  'en-US-female-calm': { voice_id: 'en-US-JennyNeural', name: 'Jenny (Calm Female)' },
  'en-US-male-wise': { voice_id: 'en-US-GuyNeural', name: 'Guy (Wise Male)' },
  'en-GB-female-serene': { voice_id: 'en-GB-SoniaNeural', name: 'Sonia (Serene Female)' },
  
  // Multilingual options
  'es-ES-female': { voice_id: 'es-ES-ElviraNeural', name: 'Elvira (Spanish)' },
  'hi-IN-female': { voice_id: 'hi-IN-SwaraNeural', name: 'Swara (Hindi)' },
  'ar-SA-male': { voice_id: 'ar-SA-HamedNeural', name: 'Hamed (Arabic)' },
  'zh-CN-female': { voice_id: 'zh-CN-XiaoxiaoNeural', name: 'Xiaoxiao (Chinese)' },
  'ja-JP-female': { voice_id: 'ja-JP-NanamiNeural', name: 'Nanami (Japanese)' },
};

/**
 * Interface for talk creation
 */
export interface CreateTalkRequest {
  source_url: string;  // URL of the image to animate
  script: {
    type: 'text' | 'audio';
    input: string;  // Text to speak or audio URL
    provider?: {
      type: string;
      voice_id: string;
    };
  };
  config?: {
    fluent?: boolean;
    pad_audio?: string;
    driver_expressions?: {
      expressions?: Array<{ start_frame: number; expression: string; intensity: number }>;
    };
    stitch?: boolean;
  };
}

/**
 * Interface for talk response
 */
export interface TalkResponse {
  id: string;
  status: 'created' | 'started' | 'done' | 'error';
  result_url?: string;
  error?: {
    kind: string;
    description: string;
  };
}

/**
 * Create a talking avatar video from a guide's image
 * 
 * @param imageUrl - URL of the guide's avatar image
 * @param message - Text message for the guide to speak
 * @param voiceId - Optional voice ID (defaults to calm female English)
 * @returns Talk creation response with video URL when ready
 */
export const createTalkingAvatar = async (
  imageUrl: string,
  message: string,
  voiceId: string = 'en-US-JennyNeural'
): Promise<TalkResponse> => {
  try {
    const requestBody: CreateTalkRequest = {
      source_url: imageUrl,
      script: {
        type: 'text',
        input: message,
        provider: {
          type: 'microsoft',
          voice_id: voiceId,
        },
      },
      config: {
        fluent: true,
        pad_audio: '0.0',
        stitch: true,
      },
    };

    const response = await fetch(`${DID_API_BASE_URL}/talks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`D-ID API Error: ${errorData.error?.description || response.statusText}`);
    }

    const data: TalkResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating talking avatar:', error);
    throw error;
  }
};

/**
 * Get the status of a talk video
 * 
 * @param talkId - The ID of the talk to check
 * @returns Talk status and result URL if ready
 */
export const getTalkStatus = async (talkId: string): Promise<TalkResponse> => {
  try {
    const response = await fetch(`${DID_API_BASE_URL}/talks/${talkId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`D-ID API Error: ${errorData.error?.description || response.statusText}`);
    }

    const data: TalkResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting talk status:', error);
    throw error;
  }
};

/**
 * Poll for talk completion and return the video URL
 * 
 * @param talkId - The ID of the talk to poll
 * @param maxAttempts - Maximum polling attempts (default: 30)
 * @param intervalMs - Polling interval in milliseconds (default: 2000)
 * @returns Video URL when ready
 */
export const waitForTalkCompletion = async (
  talkId: string,
  maxAttempts: number = 30,
  intervalMs: number = 2000
): Promise<string> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const status = await getTalkStatus(talkId);

    if (status.status === 'done' && status.result_url) {
      return status.result_url;
    }

    if (status.status === 'error') {
      throw new Error(`Talk generation failed: ${status.error?.description || 'Unknown error'}`);
    }

    // Wait before next attempt
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  throw new Error('Talk generation timed out');
};

/**
 * Create and wait for a talking avatar video (convenience function)
 * 
 * @param imageUrl - URL of the guide's avatar image
 * @param message - Text message for the guide to speak
 * @param voiceId - Optional voice ID
 * @returns Video URL of the completed talking avatar
 */
export const generateTalkingAvatarVideo = async (
  imageUrl: string,
  message: string,
  voiceId?: string
): Promise<string> => {
  try {
    // Create the talk
    const talk = await createTalkingAvatar(imageUrl, message, voiceId);
    
    if (!talk.id) {
      throw new Error('Failed to create talk: No ID returned');
    }

    // Wait for completion
    const videoUrl = await waitForTalkCompletion(talk.id);
    
    return videoUrl;
  } catch (error) {
    console.error('Error generating talking avatar video:', error);
    throw error;
  }
};

/**
 * Get available voices from D-ID
 * 
 * @returns List of available voices
 */
export const getAvailableVoices = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${DID_API_BASE_URL}/voices`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.statusText}`);
    }

    const data = await response.json();
    return data.voices || [];
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
};

/**
 * Select appropriate voice based on guide's faith and characteristics
 * 
 * @param faith - The spiritual tradition
 * @param gender - Preferred gender
 * @param language - Preferred language code
 * @returns Voice ID
 */
export const selectVoiceForGuide = (
  faith: string,
  gender: 'male' | 'female' = 'female',
  language: string = 'en-US'
): string => {
  // Map faiths to languages
  const faithLanguageMap: Record<string, string> = {
    'Islam': 'ar-SA',
    'Hinduism': 'hi-IN',
    'Buddhism': 'zh-CN',
    'Taoism': 'zh-CN',
    'Shinto': 'ja-JP',
    'Sikhism': 'hi-IN',
  };

  const targetLanguage = faithLanguageMap[faith] || language;

  // Return appropriate voice
  if (targetLanguage === 'ar-SA') {
    return 'ar-SA-HamedNeural';
  } else if (targetLanguage === 'hi-IN') {
    return 'hi-IN-SwaraNeural';
  } else if (targetLanguage === 'zh-CN') {
    return 'zh-CN-XiaoxiaoNeural';
  } else if (targetLanguage === 'ja-JP') {
    return 'ja-JP-NanamiNeural';
  } else {
    // Default English voices
    return gender === 'female' ? 'en-US-JennyNeural' : 'en-US-GuyNeural';
  }
};

/**
 * IMPORTANT NOTE ON IMAGE GENERATION:
 * 
 * D-ID does NOT generate images. For the guide creation process, you need to:
 * 
 * 1. Generate the avatar image using an AI image generation service:
 *    - OpenAI DALL-E 3: https://platform.openai.com/docs/guides/images
 *    - Stability AI (Stable Diffusion): https://platform.stability.ai/docs/api-reference
 *    - Midjourney API: https://docs.midjourney.com/
 * 
 * 2. Once you have the generated image URL, use D-ID to animate it for:
 *    - Video responses in chat
 *    - "FaceTime" style interactions
 *    - Welcome messages from guides
 * 
 * Example workflow:
 *   const imageUrl = await generateImageWithDALLE(prompt);
 *   const videoUrl = await generateTalkingAvatarVideo(imageUrl, "Welcome, seeker");
 */

export default {
  createTalkingAvatar,
  getTalkStatus,
  waitForTalkCompletion,
  generateTalkingAvatarVideo,
  getAvailableVoices,
  selectVoiceForGuide,
  SPIRITUAL_VOICES,
};
