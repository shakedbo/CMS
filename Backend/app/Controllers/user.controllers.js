const { UserSchema, UserModel } = require('../Schemas/User');





async function signup(req, res) {
    try {
        const username = req.body.username, password = req.body.password, email = req.body.email;
        const user = new UserModel({ username, email });
        await user.setPassword(password);
        await user.save();
        const userToken = await user.toAuthJSON();
        res.send(userToken);
    } catch (err) {
        return res.status(400).send({ error: `Something went wrong ...\n ${err}` });
    }
}

async function login(req, res) {
    try {
        const username = req.body.username, password = req.body.password;
        const user = await UserModel.login(username, password);
        // user is {username, email. token}
        res.status(200).send(user);
    } catch (err) {
        return res.status(400).send({ error: `Something went wrong ...\n ${err}` });
    }
}



async function deleteUser(req, res) {
    try {
        const username = req.body.username, password = req.body.password;
        const deleted = await UserModel.deleteUser(username, password);
        return res.send({ User_deleted_successfully: deleted })
    } catch (err) {
        return res.status(400).send({ error: `Something went wrong ...\n ${err}` });
    }
}

module.exports = { signup, deleteUser, login };
