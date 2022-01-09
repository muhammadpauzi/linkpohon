import { Request, Response } from "express";
import { renderWithUserDataAndFlash } from "../../helpers/render.helper";

export default class LinkController {
    public index(req: Request, res: Response) {
        return renderWithUserDataAndFlash({ req, res, title: "LinkPohon", path: 'index' });
    }
}