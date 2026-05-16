const BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('gamex_admin_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = options.body instanceof FormData;
  
  const headers: Record<string, string> = {
    ...(authHeaders() as Record<string, string>),
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE}${path}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// --- Auth ---
export const auth = {
  login: (email: string, password: string) =>
    request<{ token: string; admin: AdminUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<{ admin: AdminUser }>('/auth/me'),

  logout: () => localStorage.removeItem('gamex_admin_token'),

  saveToken: (token: string) => localStorage.setItem('gamex_admin_token', token),

  isLoggedIn: () => !!getToken(),
};

// --- Games ---
export const games = {
  getAll: () => request<Game[]>('/games'),
  getAllAdmin: () => request<Game[]>('/games/all'),
  getOne: (id: string) => request<Game>(`/games/${id}`),
  create: (data: Partial<Game>) =>
    request<Game>('/games', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Game>) =>
    request<Game>(`/games/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/games/${id}`, { method: 'DELETE' }),
};

// --- Reviews ---
export const reviews = {
  getAll: () => request<Review[]>('/reviews'),
  getAllAdmin: () => request<Review[]>('/reviews/all'),
  getOne: (id: string) => request<Review>(`/reviews/${id}`),
  create: (data: Partial<Review>) =>
    request<Review>('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Review>) =>
    request<Review>(`/reviews/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  publish: (id: string) =>
    request<Review>(`/reviews/${id}/publish`, { method: 'POST' }),
  delete: (id: string) =>
    request<void>(`/reviews/${id}`, { method: 'DELETE' }),
};

// --- RAWG ---
export const rawg = {
  search: (q: string) =>
    request<{ results: RawgGameResult[] }>(`/rawg/search?q=${encodeURIComponent(q)}`),
  getGame: (rawgId: string) =>
    request<RawgGameResult>(`/rawg/game/${rawgId}`),
};

// --- Media ---
export const media = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('media', file);
    return request<{ url: string }>('/upload', {
      method: 'POST',
      body: formData,
    });
  },
};

// --- Types (mirrored from backend shape) ---
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl: string | null;
}

export interface Game {
  id: string;
  title: string;
  developer: string;
  releaseYear: number;
  genre: string;
  rating: number;
  coverImage: string;
  heroImage: string;
  rawgId?: string;
  platforms: string[];
  review?: Review;
}

export interface Review {
  id: string;
  gameId: string;
  game?: Game;
  title: string;
  subtitle: string;
  content: string;
  screenshots: string[];
  publishedAt: string | null;
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED';
  readTime: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  highs: string[];
  lows: string[];
  verdict: string;
}

export interface RawgGameResult {
  rawgId: string;
  title: string;
  developer: string;
  releaseYear: number | null;
  rating: number;
  coverImage: string;
  heroImage: string;
  genres: string[];
  platforms: string[];
}
