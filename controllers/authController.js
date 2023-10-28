const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({'message': 'user and password are required!'});

    const foundUser = await User.findOne({ user: user }).exec();
    if (!foundUser) return res.status(401).json({'non-successfull': 'not authorized'})
    
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                'userInfo': { 'user': foundUser.user, 'roles': roles }
            },
            process.env.ACC_T,
            { expiresIn: '10m'}
        );
        const refreshToken = jwt.sign(
            {
                'user': foundUser.user,
            },
            process.env.REF_T,
            { expiresIn: '1d'}
        );
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);



        res.cookie('jwt', refreshToken, { httpOnly: true });
        res.json({ roles, accessToken });


    } else {
        res.sendStatus(401)
    }
    


}
module.exports = handleLogin;