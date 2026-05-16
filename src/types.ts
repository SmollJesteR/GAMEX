export interface Game {
  id: string;
  title: string;
  developer: string;
  releaseYear: number;
  genre: string;
  rating: number; // 0-100
  coverImage: string;
  heroImage: string;
  gridImage?: string;
}

export interface Review {
  id: string;
  gameId: string;
  title: string;
  subtitle: string;
  content: string;
  screenshots: string[];
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  highs: string[];
  lows: string[];
  verdict: string;
}
