import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/games  — public, returns all games that have a PUBLISHED review
router.get('/', async (_req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    where: { review: { status: 'PUBLISHED' } },
    include: { review: true },
    orderBy: { createdAt: 'desc' },
  });
  return res.json(games);
});

// GET /api/games/all  — admin only, returns all games regardless of review status
router.get('/all', requireAuth, async (_req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: { review: true },
    orderBy: { updatedAt: 'desc' },
  });
  return res.json(games);
});

// GET /api/games/:id  — public
router.get('/:id', async (req: Request, res: Response) => {
  const game = await prisma.game.findUnique({
    where: { id: req.params.id },
    include: { review: true },
  });
  if (!game) return res.status(404).json({ error: 'Game not found' });
  return res.json(game);
});

// POST /api/games  — admin only
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { title, developer, releaseYear, genre, rating, coverImage, heroImage, gridImage, rawgId, platforms, subGenres } = req.body;

  if (!title || !developer || !releaseYear || !genre) {
    return res.status(400).json({ error: 'title, developer, releaseYear, and genre are required' });
  }

  const game = await prisma.game.create({
    data: { title, developer, releaseYear: Number(releaseYear), genre, rating: Number(rating) || 0, coverImage, heroImage, gridImage, rawgId, platforms: platforms || [], subGenres: subGenres || [] },
  });
  return res.status(201).json(game);
});

// PATCH /api/games/:id  — admin only
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  const { title, developer, releaseYear, genre, rating, coverImage, heroImage, gridImage, platforms, subGenres } = req.body;

  const game = await prisma.game.update({
    where: { id: req.params.id },
    data: {
      ...(title && { title }),
      ...(developer && { developer }),
      ...(releaseYear && { releaseYear: Number(releaseYear) }),
      ...(genre && { genre }),
      ...(rating !== undefined && { rating: Number(rating) }),
      ...(coverImage && { coverImage }),
      ...(heroImage && { heroImage }),
      ...(gridImage !== undefined && { gridImage }),
      ...(platforms && { platforms }),
      ...(subGenres && { subGenres }),
    },
  });
  return res.json(game);
});

// DELETE /api/games/:id  — admin only
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  await prisma.game.delete({ where: { id: req.params.id } });
  return res.status(204).send();
});

export default router;
