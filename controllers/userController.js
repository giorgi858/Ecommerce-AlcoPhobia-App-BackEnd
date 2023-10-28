const User = require('../models/Users')

const getAllUser = async (req, res) => {
    const users = await User.find();
    if (!users) return res.sendStatus(204);
    res.send(users);
}
const updateUser = async (req, res) => {
    const id = req.body.id
    console.log(id);
    if (!id) return res.status(400).json({'message': 'id is required'});
    try {
        const userInReq = req.body.user;
        const pwdInReq = req.body.pwd;

        const userInDB = await User.findOne({ _id: id });
        if (userInReq) userInDB.user = userInReq
        if (pwdInReq) userInDB.password = pwdInReq
        const result = await userInDB.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'Error': err.message});
        console.log(err.stack);
    }
}
const deleteUser = async (req, res) => {
    const id = req.body.id
    console.log(id);
    if (!id) return res.status(400).json({'message': 'id is required'});
   try {
    const user = await User.findOne({ _id: id });
    const result = await user.deleteOne()
    res.json(result)
   } catch (err) {
    res.status(500).json({ 'Error': err.message});
    console.log(err.stack);
   }
}

module.exports = {
    getAllUser,
    updateUser,
    deleteUser
}