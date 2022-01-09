import { Request, Response } from "express";
import { renderWithUserDataAndFlash } from "../../helpers/render.helper";

export default class AuthController {
    public signIn(req: Request, res: Response) {
        return renderWithUserDataAndFlash({ req, res, title: "Sign in with your Google account", path: 'auth/sign-in' });
    }
}