import express from 'express';

const router = express.Router();

import healthCheckRoute from './health-check/health-check.route';
router.use('/health-check', healthCheckRoute);

import v1Route from './v1/index';
router.use('/v1', v1Route);

export default router;
