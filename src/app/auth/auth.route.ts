import { Router, Request, Response } from 'express';
import passport from 'passport';
import AuthController from '../auth/auth.controller';
import { ensureAuth, ensureGuest } from '../../middlewares/auth.middleware';

const router: Router = Router();
const authController: AuthController = new AuthController();

router.get('/sign-in', ensureGuest, (req, res) => authController.signIn(req, res));
router.post('/sign-out', ensureAuth, (req, res) => authController.signOut(req, res));

router.post('/google', ensureGuest, passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', ensureGuest,
    passport.authenticate('google', { failureRedirect: '/sign-in' }),
    function (req: Request, res: Response) {
        // Successful authentication, redirect home.
        req.flash('success', 'Congratulations, you have successfully signed in!');
        res.redirect('/');
    });

export default router;