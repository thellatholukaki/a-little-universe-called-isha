export type CelebrationStage = 
  | 'welcome'
  | 'cake'
  | 'chocolates'
  | 'gifts'
  | 'sketches'
  | 'letter'
  | 'finale';

export interface CelebrationGift {
  id: number;
  giftName: string;
  wish: string;
  reflection: string;
  boxColor: string;
  boxBorder: string;
  ribbonColor: string;
  pattern: string;
  iconName: string;
  isSpecialFinal?: boolean;
}

export interface Illustration {
  id: string;
  imagePath: string;
}

export interface ChocolateItem {
  id: number;
  name: string;
  description: string;
  note: string;
  color: string;
  topping: string;
}

// Backwards-compatible types
export type SceneId = 1 | 2 | 3 | 4 | 5 | 6;

export interface SceneMeta {
  id: SceneId;
  name: string;
  tagline: string;
}

export interface Wish {
  id: number;
  title: string;
  reflection: string;
  iconType: 'star' | 'flower' | 'butterfly' | 'moon' | 'sparkle' | 'heart' | 'book';
}

export interface AudioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
}
