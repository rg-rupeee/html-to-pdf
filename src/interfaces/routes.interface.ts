import { Router } from 'express';

export interface Routes {
  path: string;
  version: string;
  router: Router;
}
