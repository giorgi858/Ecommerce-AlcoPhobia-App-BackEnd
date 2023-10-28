const User = require('../models/Users');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
   const { user, pwd } = req.body;
   if (!user || !pwd) return res.status(400).json({'message': 'user and password are required!'})
   const duplicate = await User.findOne({ user: user }).exec();
   if (duplicate) return res.sendStatus(409);
   try {
      const hashedPwd = await bcrypt.hash(pwd, 10);
      const result =  await User.create({
         'user': user,
         'password' : hashedPwd
      })
      console.log(result);
      res.status(201).json({'success':`New User ${user} has been added.`})
   } catch (err) {
      res.status(500).json({'message': err.message})
   }
}

module.exports = handleNewUser