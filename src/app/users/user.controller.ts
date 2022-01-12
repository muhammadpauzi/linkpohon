import { Request, Response } from "express";
import { renderWithUserDataAndFlash } from "../../helpers/render.helper";
import User, { validateUser } from "./user.entity";

export default class UserController {
    public async profile(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const user = await User.findOne({ where: { username } });
            if (user)
                return renderWithUserDataAndFlash({ req, res, title: `${username}'s Profile | LinkPohon`, path: 'links/profile', data: { _user: user } }); // _user to avoid with object user from session/passport

            return renderWithUserDataAndFlash({ req, res, title: "No user with the username | LinkPohon", path: '404' });
        } catch (error) {
            console.log(error);
        }
    }

    public async editProfile(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const user = await User.findOne({ where: { username } });
            if (user)
                return renderWithUserDataAndFlash({ req, res, title: `Edit ${username}'s Profile | LinkPohon`, path: 'links/edit_profile', data: { _user: user } }); // _user to avoid with object user from session/passport

            return renderWithUserDataAndFlash({ req, res, title: "No user with the username | LinkPohon", path: '404' });
        } catch (error) {
            console.log(error);
        }
    }

    public async editProfilePost(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const user = await User.findOne({ where: { username } });
            if (user) {
                const { name, description } = req.body;
                const errors = await validateUser({ name, description });
                if (errors === true) {
                    user.name = name;
                    user.description = description;
                    user.save();
                    req.flash('success', "User has successfully updated!");
                    return res.redirect(`/${username}/profile`);
                } else {
                    return renderWithUserDataAndFlash({ req, res, title: `Edit ${username}'s Profile | LinkPohon`, path: 'links/edit_profile', data: { _user: user, errors } }); // _user to avoid with object user from session/passport
                }
            }

            return renderWithUserDataAndFlash({ req, res, title: "No user with the username | LinkPohon", path: '404' });
        } catch (error) {
            console.log(error);
        }
    }
}