import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const RAWG_BASE = process.env.RAWG_BASE_URL!;
const RAWG_KEY = process.env.RAWG_API_KEY!;

// GET /api/rawg/search?q=elden+ring
// Admin-only. Searches RAWG and returns game metadata for autofill.
router.get('/search', requireAuth, async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query || query.trim().length < 2) {
    return res.status(400).json({ error: 'Query parameter q is required and must be at least 2 characters' });
  }

  const url = `${RAWG_BASE}/games?key=${RAWG_KEY}&search=${encodeURIComponent(query)}&page_size=10&ordering=-rating`;

  const response = await fetch(url);

  if (!response.ok) {
    return res.status(502).json({ error: 'RAWG API request failed', status: response.status });
  }

  const data = await response.json() as { results: any[] };

  // Shape the response to match what the CMS autofill form needs
  const results = data.results.map((g: any) => ({
    rawgId: String(g.id),
    title: g.name,
    releaseYear: g.released ? new Date(g.released).getFullYear() : null,
    rating: g.metacritic || 0,
    coverImage: g.background_image || '',
    heroImage: g.background_image || '',
    genres: g.genres?.map((genre: any) => genre.name) || [],
    platforms: g.platforms?.map((p: any) => p.platform.name) || [],
    developer: g.developers?.[0]?.name || '',
  }));

  return res.json({ results });
});

// GET /api/rawg/game/:rawgId
// Admin-only. Fetches full details for a single game from RAWG.
router.get('/game/:rawgId', requireAuth, async (req: Request, res: Response) => {
  const { rawgId } = req.params;

  const url = `${RAWG_BASE}/games/${rawgId}?key=${RAWG_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    return res.status(502).json({ error: 'RAWG API request failed', status: response.status });
  }

  const g = await response.json() as any;

  return res.json({
    rawgId: String(g.id),
    title: g.name,
    developer: g.developers?.[0]?.name || '',
    releaseYear: g.released ? new Date(g.released).getFullYear() : null,
    rating: g.metacritic || 0,
    coverImage: g.background_image || '',
    heroImage: g.background_image || '',
    genres: g.genres?.map((genre: any) => genre.name) || [],
    platforms: g.platforms?.map((p: any) => p.platform.name) || [],
  });
});

export default router;
