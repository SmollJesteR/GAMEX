import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/reviews  — public, only PUBLISHED
router.get('/', async (_req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    where: { status: 'PUBLISHED' },
    include: { game: true },
    orderBy: { publishedAt: 'desc' },
  });
  return res.json(reviews);
});

// GET /api/reviews/all  — admin only, all statuses
router.get('/all', requireAuth, async (_req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    include: { game: true },
    orderBy: { updatedAt: 'desc' },
  });
  return res.json(reviews);
});

// GET /api/reviews/:id  — public
router.get('/:id', async (req: Request, res: Response) => {
  const review = await prisma.review.findUnique({
    where: { id: req.params.id },
    include: { game: true },
  });
  if (!review) return res.status(404).json({ error: 'Review not found' });
  return res.json(review);
});

// POST /api/reviews  — admin only, creates a DRAFT
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const {
    gameId, title, subtitle, content,
    screenshots, readTime, authorName, authorRole, authorAvatar,
    highs, lows, verdict,
  } = req.body;

  if (!gameId || !title) {
    return res.status(400).json({ error: 'gameId and title are required' });
  }

  const existing = await prisma.review.findUnique({ where: { gameId } });
  if (existing) {
    return res.status(409).json({ error: 'A review for this game already exists. Use PATCH to update it.' });
  }

  const review = await prisma.review.create({
    data: {
      gameId, title, subtitle: subtitle || '', content: content || '',
      screenshots: screenshots || [], status: 'DRAFT',
      readTime: readTime || '10 MIN READ',
      authorName: authorName || 'GAMEX Editorial',
      authorRole: authorRole || 'Staff Critic',
      authorAvatar: authorAvatar || '',
      highs: highs || [], lows: lows || [],
      verdict: verdict || '',
    },
    include: { game: true },
  });

  return res.status(201).json(review);
});

// PATCH /api/reviews/:id  — admin only, update any field
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  const {
    title, subtitle, content, screenshots,
    readTime, authorName, authorRole, authorAvatar,
    highs, lows, verdict, status,
  } = req.body;

  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = title;
  if (subtitle !== undefined) data.subtitle = subtitle;
  if (content !== undefined) data.content = content;
  if (screenshots !== undefined) data.screenshots = screenshots;
  if (readTime !== undefined) data.readTime = readTime;
  if (authorName !== undefined) data.authorName = authorName;
  if (authorRole !== undefined) data.authorRole = authorRole;
  if (authorAvatar !== undefined) data.authorAvatar = authorAvatar;
  if (highs !== undefined) data.highs = highs;
  if (lows !== undefined) data.lows = lows;
  if (verdict !== undefined) data.verdict = verdict;

  if (status !== undefined) {
    const validStatuses = ['DRAFT', 'SCHEDULED', 'PUBLISHED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
    }
    data.status = status;
    if (status === 'PUBLISHED') data.publishedAt = new Date();
  }

  const review = await prisma.review.update({
    where: { id: req.params.id },
    data,
    include: { game: true },
  });

  return res.json(review);
});

// DELETE /api/reviews/:id  — admin only
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  await prisma.review.delete({ where: { id: req.params.id } });
  return res.status(204).send();
});

// POST /api/reviews/:id/publish  — admin only, shortcut to publish
router.post('/:id/publish', requireAuth, async (req: Request, res: Response) => {
  const review = await prisma.review.update({
    where: { id: req.params.id },
    data: { status: 'PUBLISHED', publishedAt: new Date() },
    include: { game: true },
  });
  return res.json(review);
});

export default router;
