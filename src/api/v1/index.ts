import express from 'express';

const router = express.Router();

import htmlToPdfRoute from './html-pdf/html-pdf.route';
router.use('/html-pdf', htmlToPdfRoute);

export default router;
