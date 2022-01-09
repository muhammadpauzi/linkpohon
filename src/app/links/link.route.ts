import { Router, Request, Response } from 'express';
import passport from 'passport';
import LinkController from '../links/link.controller';
import { ensureAuth, ensureGuest } from '../../middlewares/auth.middleware';

const router: Router = Router();
const linkController: LinkController = new LinkController();

router.get('/', (req, res) => linkController.index(req, res));
router.get('/:username', (req, res) => linkController.links(req, res));
router.post('/', ensureAuth, (req, res) => linkController.create(req, res));

export default router;