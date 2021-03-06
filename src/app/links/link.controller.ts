import { Request, Response } from "express";
import { renderWithUserDataAndFlash } from "../../helpers/render.helper";
import User from "../users/user.entity";
import Link, { validateLink } from "./link.entity";

export default class LinkController {
    public index(req: Request, res: Response) {
        return renderWithUserDataAndFlash({ req, res, title: "Welcome to LinkPohon", path: 'index' });
    }

    public async links(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const user = await User.findOne({
                where: { username },
                order: {
                    createdAt: "ASC"
                },
                relations: ['links']
            });

            if (req.headers["content-type"] == "application/json") {
                return res.status(200).json({ data: user });
            }

            if (user)
                return renderWithUserDataAndFlash({ req, res, title: "Links | LinkPohon", path: 'links/links', data: { _user: user } }); // _user to avoid with object user from session/passport

            return renderWithUserDataAndFlash({ req, res, title: "No user with the username | LinkPohon", path: '404' });
        } catch (error) {
            console.log(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { title, url, description } = req.body;
            const { id: userId } = <{ id: number }>req.user;
            const errors = await validateLink({ title, url, description });
            if (errors === true) {
                const link = await (await Link.create({ title, url, description, userId })).save();
                return res.status(201).json({ message: "Link has successfully created.", data: link });
            } else {
                return res.status(422).json({ message: "Data does not valid!", errors });
            }
        } catch (error) {
            console.log(error);
        }
    }
}