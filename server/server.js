import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import {nanoid} from 'nanoid'
import User from './Schema/User.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const server = express();
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json())
server.use(cors());

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

const formDataToSend = (user) => {
    const access_token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY)
    return{
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        username: user.personal_info.fullname
    }
}

const generalUsername = async(email) => {
    
    let userName = email.split('@')[0];

    let isUserNameNotUnique = await User.exists({'personal_info.username': userName}).then((result) => result)

    isUserNameNotUnique ? userName += nanoid().substring(0, 5) : '';

    return userName
}


server.post('/signup', (req, res) => {
    let { fullname, email, password } = req.body;

    //validate data 
    if (fullname.length < 3) {
        return res.status(403).json({ 'error': 'fullname must be at least 3 letters long' })
    }
    if (!email.length) {
        return res.status(403).json({ 'error': 'Enter Email' })
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ 'error': 'Email invalid' })
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ 'error': 'Password should be 6 to 28 characters long with a numeric, lowercase and 1 upercase letters ' })
    }
    bcrypt.hash(password, 10, async (err, hashed_password) => {
        let username = await generalUsername(email);

        let user = new User({
            'personal_info':{fullname, email, password: hashed_password, username}
        })
        user.save().then((u) => {
            return res.status(200).json(formDataToSend(u))
        })
        .catch(err => {
            if(err.code == 11000){
                return res.status(500).json({'error': 'Email already exists'})
            }
            return res.status(500).json({'error': err.message})
        })

    });

})

server.post('/signin', (req, res) => {
    let {email, password} = req.body
    User.findOne({'personal_info.email': email})
    .then((user) => {
        if(!user){
            return res.status(403).json({'error': 'Email not found'});
        }

        bcrypt.compare(password, user.personal_info.password , (err, result) => {
            if(err) return res.status(403).json({'error': 'Error occured while login please try again'});
            
            if(!result){
                return res.status(403).json({'error': 'Incorrect password'});
            }else{
                return res.status(200).json(formDataToSend(user))
            }


        })
    })
    .catch(err => {
        return res.status(500).json({'error': err.message});
    })
})

server.listen(PORT, () => {
    console.log('listening port', PORT);
})
