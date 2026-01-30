import starCrescentImage from 'figma:asset/df9ac2b88e7f75002855a82d0ca7b003f6f961c4.png';
import crossSymbolImage from 'figma:asset/b44167e6091487c7bc1ff72e9a70c5c1154c0a0a.png';
import jewishStarImage from 'figma:asset/e2020c35261f80ef64b0d52af9babc23f58c0f26.png';
import dharmaWheelImage from 'figma:asset/4a1c4d32bad39322659f08685efcfd135dd2b561.png';
import toriiGateImage from 'figma:asset/bde1450d9d31d6ac819fc94a7943e467402ce923.png';
import ahimsaHandImage from 'figma:asset/7dc002689f83346c020bf1c6c800b3f09778f4cf.png';
import confucianSymbolImage from 'figma:asset/fb5ffdb7f71e1376c95a81fcec09a4046458e86a.png';
import hinduOmImage from 'figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png';
import yinYangImage from 'figma:asset/51a7d0e6d1a6647dca02517899785892471e556b.png';
import circularCrossImage from 'figma:asset/4bea3d46cd4bef578aa7fe848e2106b3b7e7b181.png';
import khandaSymbolImage from 'figma:asset/1cda2d7f6a67b44acf470f38cd964150e10093ee.png';
import ninePointedStarImage from 'figma:asset/a13a3708168a7e3e76185b69927e1442dff12a8c.png';

export interface FaithSymbolConfig {
  image: string;
  alt: string;
  bgColor: string;
  emoji: string;
  chatUrl: string;
}

export const faithSymbolsConfig: Record<string, FaithSymbolConfig> = {
  christian: {
    image: crossSymbolImage,
    alt: "Cross",
    bgColor: "bg-[#E53935]/20",
    emoji: "✝",
    chatUrl: "https://link.divinityagi.com/christian-1"
  },
  islamic: {
    image: starCrescentImage,
    alt: "Star and Crescent",
    bgColor: "bg-[#2E7D32]/20",
    emoji: "☪",
    chatUrl: "https://link.divinityagi.com/islam-1"
  },
  jewish: {
    image: jewishStarImage,
    alt: "Star of David",
    bgColor: "bg-[#1565C0]/20",
    emoji: "✡",
    chatUrl: "https://link.divinityagi.com/judaism-3"
  },
  buddhist: {
    image: dharmaWheelImage,
    alt: "Dharma Wheel",
    bgColor: "bg-[#F9A825]/20",
    emoji: "☸",
    chatUrl: "https://link.divinityagi.com/buddhism-1"
  },
  shinto: {
    image: toriiGateImage,
    alt: "Torii Gate",
    bgColor: "bg-[#E64A19]/20",
    emoji: "⛩",
    chatUrl: "https://link.divinityagi.com/shinto-1"
  },
  jain: {
    image: ahimsaHandImage,
    alt: "Ahimsa Hand",
    bgColor: "bg-[#FFB300]/20",
    emoji: "🕉",
    chatUrl: "https://link.divinityagi.com/jain-4"
  },
  sage: {
    image: confucianSymbolImage,
    alt: "Confucian Symbol",
    bgColor: "bg-[#5D4037]/20",
    emoji: "☯",
    chatUrl: "https://link.divinityagi.com/confu-4"
  },
  shakti: {
    image: hinduOmImage,
    alt: "Om Symbol",
    bgColor: "bg-[#F4511E]/20",
    emoji: "🕉",
    chatUrl: "https://link.divinityagi.com/hinduism-2"
  },
  taoist: {
    image: yinYangImage,
    alt: "Yin Yang",
    bgColor: "bg-[#212121]/30",
    emoji: "☯",
    chatUrl: "https://link.divinityagi.com/taoism-4"
  },
  polytheism: {
    image: circularCrossImage,
    alt: "Pantheon Symbol",
    bgColor: "bg-[#F59E0B]/20",
    emoji: "⚡",
    chatUrl: "https://link.divinityagi.com/poly-1"
  },
  sikhism: {
    image: khandaSymbolImage,
    alt: "Khanda Symbol",
    bgColor: "bg-[#F57F17]/20",
    emoji: "⚔️",
    chatUrl: "https://link.divinityagi.com/sikhism-1"
  },
  bahai: {
    image: ninePointedStarImage,
    alt: "Nine-Pointed Star",
    bgColor: "bg-[#9C27B0]/20",
    emoji: "✨",
    chatUrl: "https://link.divinityagi.com/bahai-1"
  }
};

export const getFaithSymbol = (guideId: string): FaithSymbolConfig => {
  return faithSymbolsConfig[guideId] || {
    image: '',
    alt: 'Symbol',
    bgColor: 'bg-purple-500/20',
    emoji: '✨',
    chatUrl: '#'
  };
};
