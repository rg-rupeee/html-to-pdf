import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
  });
});

export default router;
