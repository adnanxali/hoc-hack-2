const User = require('../schema/UserSchema')
async function findMatch(req,res,next){
    const pref = req.body.pref;
    const user =  await User.find({
         skills: { $in: [pref]  }
    })
    if(!user){
        res.status(404).json({
            success:false,
            msg:"No user with that preference",

        })
    }
    res.json(user);
}
module.exports = findMatch