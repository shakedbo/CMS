const { UserSchema, UserModel } = require('../Schemas/User');





async function createUser(req, res) {
    try {
        const username = req.body.username, password = req.body.password, email = req.body.email;
        const user = new UserModel({ username, email });
        await user.setPassword(password);
        await user.save();
        res.send({ success: user });
    } catch (err) {
        return res.status(400).send({ error: 'Something went wrong ...\n' + err });
    }
}


async function deleteUser(req, res) {
    try {
        const username = req.body.username, password = req.body.password;
        const deleted = await UserModel.deleteUser(username, password);
        return res.send({ User_deleted_successfully: deleted })
    } catch (err) {
        return res.status(400).send({ error: 'Something went wrong ...\n' + err });
    }
}

async function getUser(req, res) {

}



module.exports = { createUser, deleteUser, getUser };