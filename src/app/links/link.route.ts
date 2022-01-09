import { Router, Request, Response } from 'express';
import passport from 'passport';
import LinkController from '../links/link.controller';
import { ensureAuth, ensureGuest } from '../../middlewares/auth.middleware';

const router: Router = Router();
const linkController: LinkController = new LinkController();

router.get('/', (req, res) => linkController.index(req, res));

export default router;