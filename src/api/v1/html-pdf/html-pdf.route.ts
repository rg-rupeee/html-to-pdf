import logger from '@/utils/logger';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.status(201).json({
    message: 'Hello World!',
  });
});

logger.info('loaded html-pdf routes');

export default router;
