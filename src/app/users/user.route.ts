import { Router, Request, Response } from 'express';
import passport from 'passport';
import { ensureAuth, ensureGuest } from '../../middlewares/auth.middleware';
import UserController from './user.controller';

const router: Router = Router();
const userController: UserController = new UserController();

router.get('/:username/profile', (req, res) => userController.profile(req, res));
router.get('/:username/profile/edit', ensureAuth, (req, res) => userController.editProfile(req, res));
router.post('/:username/profile/edit', ensureAuth, (req, res) => userController.editProfilePost(req, res));

export default router;