import { Request, Response } from "express";
import { renderWithUserDataAndFlash } from "../../helpers/render.helper";
import User from "../users/user.entity";

export default class LinkController {
    public index(req: Request, res: Response) {
        return renderWithUserDataAndFlash({ req, res, title: "Welcome to LinkPohon", path: 'index' });
    }
    public async links(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const user = await User.findOne({ where: { username } });
            return renderWithUserDataAndFlash({ req, res, title: "Links | LinkPohon", path: 'links/links', data: { _user: user } }); // _user to avoid with object user from session/passport
        } catch (error) {
            console.log(error);
        }
    }
}