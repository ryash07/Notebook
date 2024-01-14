const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "YashIsaGoodBoy$"

// Router 1 : Create a user using POST "/api/auth/createuser" . No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password lenght must be 5 characters').isLength({ min:5})
],async(req,res)=>{

    const result = validationResult(req);
    if(result.isEmpty()){

        // check if email of the user already exists
        try{
            let user = await User.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({error:'Email is already registered'});
            }
           
            // password converted to cipher
            const salt = bcrypt.genSaltSync(10);
            var secPass = bcrypt.hashSync(req.body.password, salt);

            //create a new user 
           user = await User.create({
                name:req.body.name,
                password:secPass,
                email: req.body.email,
            })
            .catch(err=> {console.log(err)
                res.json({error: err.array()});
            });

            //JWT token to the user
            const data = {
                user:{
                    id:user.id
                }
            }
            var authtoken = jwt.sign(data, JWT_SECRET);
            res.json({authtoken});

        }catch(error){
            console.log(error.message);
            res.status(500).send("some error occured");
        }
       
    }else{
        res.send({errors: result.array()});
    }
})

// Router 2 : Authenticate a user using POST "/api/auth/login". No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password lenght must be 5 characters').isLength({ min:5})
],async(req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(400).json({results:results.array()});
    }

    const{email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Invalid credentials'});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        var authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// Router 3 : Get logged in user details using POST "/api/auth/getuser". login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        userId = req.user.id;
        user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }

})

module.exports = router;