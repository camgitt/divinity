// Lightweight avatar mapping for default guides
// Separated from saved-guides-context to avoid heavy imports in components

import popeImage from 'figma:asset/08703f745981cbf04ba9cef529022256063f6160.png';
import fatherBrianImage from 'figma:asset/4e7543e6a3986a83db0c3a2e941aaba01a0562bb.png';
import islamicGuideImage from 'figma:asset/c37a3e878b675cc69a1b2e3b8687a682107f5d44.png';
import jewishGuideImage from 'figma:asset/ef268f75ad551966f3af62b7c76d2d740e372be7.png';
import shaktiImage from 'figma:asset/ad52409fd304dfc7ba472dfc2851d8debfde00ac.png';
import venerableAnandaImage from 'figma:asset/90354abef63b88630b6dca67511d937e59ea284d.png';
import lamaDorjeImage from 'figma:asset/19d28cea72c5744469adbe42b1cf6f10b7b4e933.png';
import taoistGuideImage from 'figma:asset/94ffd1b9364891348a495038b259e2935f25b0e3.png';
import shintoGuideImage from 'figma:asset/2125c1928ea040e5b5d01616e638dc5f18c5e669.png';
import jainGuideImage from 'figma:asset/316b450d04c4813b36fa5dd52105523a742d74ad.png';
import sageGuideImage from 'figma:asset/eb11c945b71144fc2108b42c7b42c664c859f023.png';
import odinImage from 'figma:asset/2c928b9beaa35a721a6e3ec55dc9849e4863dad6.png';
import harjitSinghImage from 'figma:asset/11334387f8ba8aad50f5f81aa6283c5ed43c7ed9.png';
import leilaFarzanImage from 'figma:asset/6af6457672e5e89ce643e60a8e48a95c34e32b62.png';

export const GUIDE_AVATAR_MAP: Record<string, string> = {
  "Pope Francis": popeImage,
  "Father Brian": fatherBrianImage,
  "Sheikh Yusuf ibn Ahmad": islamicGuideImage,
  "Rabbi Miriam Levin": jewishGuideImage,
  "Anika": shaktiImage,
  "Venerable Ananda": venerableAnandaImage,
  "Lama Dorje": lamaDorjeImage,
  "Master Li Shen": taoistGuideImage,
  "Hikari no Mori": shintoGuideImage,
  "Ācārya Satyaprabha": jainGuideImage,
  "Kong Fuzi (Confucius)": sageGuideImage,
  "Odin Allfather": odinImage,
  "Bhai Harjit Singh": harjitSinghImage,
  "Dr. Leila Farzan": leilaFarzanImage
};