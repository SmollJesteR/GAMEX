import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    process.env.JWT_SECRET!,
    { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d' }
  );

  return res.json({
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      avatarUrl: admin.avatarUrl,
    },
  });
});

// GET /api/auth/me  (verify token + return current admin)
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  const admin = await prisma.adminUser.findUnique({
    where: { id: req.adminId },
    select: { id: true, email: true, name: true, role: true, avatarUrl: true },
  });

  if (!admin) return res.status(404).json({ error: 'Admin not found' });

  return res.json({ admin });
});

// PATCH /api/auth/me (update admin profile)
router.patch('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  const { name, email, password, avatarUrl } = req.body;
  const updateData: any = {};

  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
  
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.passwordHash = await bcrypt.hash(password, salt);
  }

  try {
    const admin = await prisma.adminUser.update({
      where: { id: req.adminId },
      data: updateData,
      select: { id: true, email: true, name: true, role: true, avatarUrl: true },
    });
    return res.json({ admin });
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update profile' });
  }
});

export default router;
