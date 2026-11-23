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

export interface Illustration {
  id: string;
  title: string;
  caption: string;
  quote: string;
  imagePath: string;
}
