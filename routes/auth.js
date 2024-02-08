const router = require('express').Router();
const User = require('../models/User');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

 
//REGISTER
router.post("/register", async (req, res) => {
    const newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: Crypto.AES.encrypt(req.body.password, process.env.SEC_KEY).toString(),
    });
    try {

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }

});


//Login

  
router.post("/login", async(req, res) => {

    try{
        //find user in db
        const user = await User.findOne(
           
                {
                    username: req.body.username
                }
       
            );

        //if there is no user as entered by the reutrn error
            !user && res.status(401).json("Wrong User Name");

        
        const hashedPassword = Crypto.AES.decrypt(
            user.password,
            process.env.SEC_KEY 
        );


        const originalPassword = hashedPassword.toString(Crypto.enc.Utf8);

        //if password enterd is nor equal to input password
        originalPassword != req.body.password && res.status(401).json("Wrong Password");

        //genrating token for id and if its admin 
        const accessToken = jwt.sign( // takes params ( {inputs } , key ,(expiresIn))
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
             process.env.JWT_KEY,
            {expiresIn:"3d"}
        );


        const{password , ...others} = user._doc; 
        
        res.status(200).json({...others,accessToken});

    }catch(err){
      console.log(err)
    }

});

module.exports = router;