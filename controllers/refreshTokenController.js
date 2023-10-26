const User = require('../models/Users')
const jwt = require('jsonwebtoken')


const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) // forbidden
    console.log(foundUser);
    jwt.verify(refreshToken, process.env.REF_T, 
        (err, decoded) => {
            if (err || foundUser.user !== decoded.user ) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles).filter(Boolean);
            const accessToken = jwt.sign(
                { 'userInfo': { 'user': decoded.user, 'roles': roles } },
                process.env.ACC_T,
                { expiresIn: '1m' }
            );
            res.json({ roles, accessToken })
        }    
    )
};

module.exports = handleRefreshToken;